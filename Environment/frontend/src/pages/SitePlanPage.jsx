import { useState, useEffect, useLayoutEffect } from 'react';
import Map from '../components/Map';
import Overlay from '../components/Overlay';
import { useGlobal } from "../components/GlobalContext";
import DefaultMap from '../components/DefaultMap';
import {useParams} from "react-router-dom";
import {axiosInstance} from "../lib/axios";
import { map } from 'leaflet';
import { useMap } from 'react-leaflet';

const SitePlanPage = () => {
    const { imperial, location, zoom } = useGlobal();
    const {setLocation} = useGlobal();
    const{ id } = useParams();
    // console.log(location);
    // Keep track of structures added, these will be rendered on map
    const [structures, setStructures] = useState([]);
    const [loading, setLoading] = useState(true);

    const [myMap, setMap] = useState([]);
    const [newMap, setNewMap] = useState([{mapCenter: {x: location.lng, y: location.lat}, eventID: id, zoomLevel: zoom, mapMarkers: []}]);

    const fetchMyMap = async () => {
          try {
          const res = await axiosInstance.get(`/events/${id}/site-plan`);
          setMap(res.data || []);
          } catch (error) {
          console.error("Failed to load map:", error);
          } finally {
          setLoading(false);
          }
      };

    useEffect(() => {
        fetchMyMap();
      }, []);

    var currMap = myMap;

    const updateCurr = async() => {
        currMap = myMap;
    }

    // Gets the updated event, changes the data on the database
    const saveEventMap = async (e) => {
        e.preventDefault();
        //If no current map, set new map
        // console.log(currMap);
        var makeNew = false;
        if(currMap.length === 0){
            setNewMap(prevMapState => [...prevMapState, {mapCenter: {x: location.lng, y: location.lat}, eventID: id, zoomLevel: zoom, mapMarkers: []}]);
            console.log("Trying to make new map!");
            makeNew = true;
        } else {
            setMap(prevMapState => [...prevMapState, {mapCenter: {x: location.lng, y: location.lat}, eventID: id, zoomLevel: zoom, mapMarkers: [] }]);
            console.log("Trying to use existing map!");

        }
        var payload = null;
        //If new, make one out of newmap, if not use old map
        if (makeNew){
            payload = newMap.map(({mapCenter, eventID, zoomLevel, mapMarkers}) => ({ 
                mapCenter,
                eventID,
                zoomLevel,
                mapMarkers,
            }));
        } else {
            payload = currMap.map(({mapCenter, eventID, zoomLevel, mapMarkers}) => ({ 
                mapCenter,
                eventID,
                zoomLevel,
                mapMarkers,
            }));
        }

        // console.log(payload);

        //If new map, create new, if old map, update
        if (makeNew){
            try {
                await axiosInstance.post(`/events/${id}/site-plan/`, payload);
                alert("Map created successfully");
                //Anything else?
                } catch(error){
                    console.error("Failed to create map", error);
            }
        } else {
            try {
                await axiosInstance.put(`/events/${id}/site-plan/${currMap._id}`, payload);
                alert("Map updated successfully");
                //Anything else?
                } catch(error){
                    console.error("Failed to update map", error);
            }

        }
        //If we made a new one or updated, fetch map and update currMap
        await fetchMyMap();
        updateCurr;
    };
    
    //checking if there is a saved map
    //const isThereSavedMap = useState(false);

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
            dimensions: [20, 20], position: [location.lat, location.lng]}
        setStructures(prev => [...prev, newStructure])
    }

    const removeStructure = (id) => {
        setStructures(prev => prev.filter(structure => structure.id !== id));
    }

    return (
        <div>
            <div className="fixed inset-0 z-10">
                {/* Some function checking if there is a function to check */}
                <Map structures={structures} removeStructure={removeStructure} center={[location.lat, location.lng]} imperial={imperial}/> 
               
                {/* Render structures on Map component, pass in structures prop */}
            </div>

            <div className='fixed inset-0 z-10 pointer-events-none'>
                <Overlay addStructure={addStructure}/>  
                {/* Buttons in Overlay will be clicked to add structures, pass in addStructures prop */}
            </div>
            
            {/* Save EventMap*/}
            <div className="fixed top-32 left-4 pointer-events-auto z-14">
                <button type="button" onClick = {saveEventMap} className={'btn btn-primary'}>
                    <span>Save</span>
                </button>

            </div>
        </div>
    );
};

export default SitePlanPage;
