import { useState, useEffect, useRef } from 'react';
import Map from '../components/Map';
import { useGlobal } from "../components/GlobalContext";
import {useParams} from "react-router-dom";
import {axiosInstance} from "../lib/axios";
import { Link } from "react-router-dom";
import {Loader2} from "lucide-react";
import Overlay from '../components/Overlay';

const PreviewPage = () => {
    const { imperial, location, zoom, setLocation, setEditing } = useGlobal();
    const saveBtnRef = useRef();
    const{ id } = useParams();

    const [structures, setStructures] = useState([]);
    const [loading, setLoading] = useState(true);

    const [myMap, setMap] = useState([]);

    useEffect(() => {
        setEditing(false);
    }, []);

    const fetchMyMap = async () => {
        try {
            let res = await axiosInstance.get(`/events/${id}/site-plan`);
            console.log(res.data);
            setMap(res.data || []);
            const center = res.data[0].mapCenter;
            setLocation({ //Set the location globals based on db center
                lat: center.y['$numberDecimal'],
                lng: center.x['$numberDecimal'],
                label: location.label,
            });
            // console.log(res.data[0].mapMarkers);

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
                <Map structures={structures} removeStructure={removeStructure} center={[location.lat, location.lng]} 
                 saveBtnRef={saveBtnRef} imperial={imperial} zoom={zoom}/> 
               
                {/* Render structures on Map component, pass in structures prop */}
            </div>
                {/* Back to dashboard */}
            <div className="fixed top-20 left-4 pointer-events-auto z-14 flex flex-col gap-4">
                <Link to={`/event/${id}/dashboard`} className={`btn btn-primary`}>
                    <span>Back to Dashboard</span>
                </Link>
            </div>
            <div className="fixed top-4 left-4 pointer-events-auto z-14 flex flex-col gap-4">
                <div className="text-center rounded border border-base-400 bg-base-100 p-1">
                    <label className="label text-base-content">Administrator View</label>
                </div>

            </div>

        </div>
    );
};
    
export default PreviewPage;
