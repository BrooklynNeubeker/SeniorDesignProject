import { useState, useEffect, useRef } from 'react';
import Map from '../components/Map';
import { useGlobal } from "../components/GlobalContext";
import {useParams} from "react-router-dom";
import {axiosInstance} from "../lib/axios";
import { Link } from "react-router-dom";

const PreviewPage = () => {
    const { imperial, location, zoom } = useGlobal();
    const saveBtnRef = useRef();
    const{ id } = useParams();

    const [structures, setStructures] = useState([]);
    const [loading, setLoading] = useState(true);

    const [myMap, setMap] = useState([]);

    const fetchMyMap = async () => {
        const payload = {
            mapCenter: { x: location.lng, y: location.lat },
            eventID: id,
            zoomLevel: zoom,
            mapMarkers: structures
        }

        try {
            let res = await axiosInstance.get(`/events/${id}/preview`);

            setMap(res.data || []);

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

    return (
        <div>
            <div className="fixed top-4 left-4 pointer-events-auto z-14 flex flex-col gap-4">
                <div className="text-center rounded border border-base-400 bg-base-100 p-1">
                    <label className="label text-base-content">Administrator View</label>
                </div>

            </div>

            <div className="fixed inset-0 z-10">
                {/* Some function checking if there is a function to check */}
                <Map structures={structures} removeStructure={removeStructure} center={[location.lat, location.lng]} 
                saveBtnRef={saveBtnRef} imperial={imperial}/> 
               
                {/* Render structures on Map component, pass in structures prop */}
            </div>

        </div>
    );
};
    
export default PreviewPage;
