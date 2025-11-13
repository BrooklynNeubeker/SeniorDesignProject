import { useState, useEffect, useRef } from 'react';
import Map from '../components/Map';
import Overlay from '../components/Overlay';
import { useGlobal } from "../components/GlobalContext";
import DefaultMap from '../components/DefaultMap';
import {useParams} from "react-router-dom";
import {Loader2} from "lucide-react";
import {axiosInstance} from "../lib/axios";
import { map } from 'leaflet';

const SitePlanPage = () => {
    const { imperial, location, setLocation, zoom} = useGlobal();
    const saveBtnRef = useRef();
    const{ id } = useParams();
    // Keep track of structures added, these will be rendered on map
    const [structures, setStructures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [myMap, setMap] = useState([]);
    // const [newMap, setNewMap] = useState([{mapCenter: {x: location.lng, y: location.lat}, eventID: id, zoomLevel: zoom, mapMarkers: []}]);

    /* useEffect(() => {
        if (myMap && myMap.length > 0) {
            console.log("Map updated:", myMap);
            console.log("Map ID:", myMap[0]._id);
        }
    }, [myMap]); */

    const fetchMyMap = async () => {
        const payload = {
            mapCenter: { x: location.lng, y: location.lat },
            eventID: id,
            zoomLevel: zoom,
            mapMarkers: structures
        }

        try {
            let res = await axiosInstance.get(`/events/${id}/site-plan`);
            if (res.data.length === 0) {
                res = await axiosInstance.post(`/events/${id}/site-plan`, [payload]);
                console.log("Created new map:", res.data);
                fetchMyMap();
            }
            else {
                console.log("Fetched existing map:", res.data);
            }
            setMap(res.data || []);
            const center = res.data[0].mapCenter;
            // console.log(center.x['$numberDecimal']); //Set the state variable to display the map at the right location!!
            // console.log(center.y['$numberDecimal']);
            setLocation({ //Set the location globals, but this won't update them right this moment so it's mostly just for the markers
                lat: center.y['$numberDecimal'],
                lng: center.x['$numberDecimal'],
                label: location.label,
            });
            // console.log(location.lat);
            // console.log(location.lng);
            if (res.data && res.data.length > 0) { setStructures(res.data[0].mapMarkers || []); }
        } catch (error) {
            console.error("Failed to load map:", error);
        } finally {
            setLoading(false);
        }
    };

    let hasFetched = false;

    useEffect(() => {
        if (!hasFetched) {
            fetchMyMap();
            hasFetched = true;
        }
    }, []);

    const saveEventMap = async (e) => {
        e.preventDefault();
        // var payload = null;
        const payload = {
            mapCenter: { x: location.lng, y: location.lat }, //IF there was a search, use the new location.lng/location.lat. Dont' ask me why, but setting centerX or Y state using these uses whatever they were when the page loaded, not hte search, so it has to be this way...
            eventID: id,
            zoomLevel: zoom,
            mapMarkers: structures
        }
        setMap(prev => [...prev, payload])

        try {
            axiosInstance.put(`/events/${id}/site-plan/${myMap[0]._id}`, [payload]);
            alert("Map updated successfully");
            //console.log(`/events/${id}/site-plan/${myMap[0]._id}`)
        } catch(error){
            console.error("Failed to update map", error);
        }

        let res = await axiosInstance.get(`/events/${id}/site-plan`);
        setMap(res.data)
    }
    

    {/* 
        Function to add structures to 'structures' array

        name: name of the structure
        Icon: Icon used to represent structure
        bgColor: color of the strucutre object
        iconColor: color of Icon and text attached to object
        description: description of the structure
        tagType: used to determine type of tags that can belong to structure

        dimensions: width and length of structure in real-life feet/meters, default 20 x 20
        position: position of structure on map, generates at center of map by default
    */}
    const addStructure = (name, Icon, bgColor, iconColor, border, description, tagType) => {
        const newStructure = { id: crypto.randomUUID(),
            name, Icon, bgColor, iconColor, border, description, tagType, orientation: 0,
            dimensions: [20, 20], position: [location.lat, location.lng], tags: []} //Show structures at the center from db
        setStructures(prev => [...prev, newStructure])
    }

    const removeStructure = (id) => {
        setStructures(prev => prev.filter(structure => structure.id !== id));
    }

    while (loading) { //Load until db has been fetched and the global variables are updated
        return <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>;
    }

    return (
        <div>
            <div className="fixed inset-0 z-10">
                {/* Some function checking if there is a function to check */}
                <Map structures={structures} removeStructure={removeStructure} center={[location.lat, location.lng]}  //Map should display at center coordinates from db by default if a search has not happened. To make these place at the right spot immediately after a search, change it back to location.lat and location.lng, but be aware that that means that when the map loads in and no search has happened, 
                saveBtnRef={saveBtnRef} imperial={imperial}/> 
               
                {/* Render structures on Map component, pass in structures prop */}
            </div>

            <div className='fixed inset-0 z-10 pointer-events-none'>
                <Overlay addStructure={addStructure}/>  
                {/* Buttons in Overlay will be clicked to add structures, pass in addStructures prop */}
            </div>
            
            {/* Save EventMap*/}
            <div className="fixed top-32 left-4 pointer-events-auto z-14">
                <button type="button" ref={saveBtnRef} onClick={saveEventMap} className={'btn btn-primary'}>
                    <span>Save</span>
                </button>
            </div>
        </div>
    );
};

export default SitePlanPage;
