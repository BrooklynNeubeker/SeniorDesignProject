import { useState, useEffect, useRef } from 'react';
import Map from '../components/Map';
import { useGlobal } from "../components/GlobalContext";
import {useParams, useSearchParams} from "react-router-dom";
import {axiosInstance} from "../lib/axios";
import { Link } from "react-router-dom";
import {Loader2} from "lucide-react";
import Legend from '../components/Legend';

const PreviewPage = () => {
    const { imperial, location, zoom, setLocation, setEditing, mini, showGrid, setShowGrid } = useGlobal();
    const saveBtnRef = useRef();
    const{ id } = useParams();
    const [searchParams] = useSearchParams();
    const isEmbedded = searchParams.get('embedded') === 'true';
    console.log(mini);
    const [structures, setStructures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [events, setEvents] = useState([]);
    const [isPublished, setIsPublished] = useState(false);

    const [myMap, setMap] = useState([]);

    useEffect(() => {
        setEditing(false);
    }, []);

    const fetchMyEvents = async () => {
      try {
      const res = await axiosInstance.get("/events");
      setEvents(res.data || []);
    //   console.log(res.data[0]);
      console.log(res.data[0].published);
      setIsPublished(res.data[0].published);
      } catch (error) {
      console.error("Failed to load events:", error);
      } finally {
      setLoading2(false);
      }
  };
    const fetchMyMap = async () => {
        try {
            let res = await axiosInstance.get(`/events/${id}/site-plan`);
            // console.log(res.data);
            setMap(res.data || []);
            const center = res.data[0].mapCenter;
            setLocation({ //Set the location globals based on db center
                lat: center.y['$numberDecimal'],
                lng: center.x['$numberDecimal'],
                label: location.label,
            });
            console.log(res.data[0].mapMarkers);
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
    let hasFetched2 = false;

    useEffect(() => {
        if (!hasFetched2) {
            fetchMyEvents();
            hasFetched2 = true;
        }
    }, []);


    const removeStructure = (id) => {
        setStructures(prev => prev.filter(structure => structure.id !== id));
    }

    while (loading || loading2) { //Load until db has been fetched and the global variables are updated
        return <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>;
    }

    return (
        <>
        <div>

            <div className="fixed inset-0 z-10">
                {/* Some function checking if there is a function to check */}
                <Map structures={structures} removeStructure={removeStructure} center={[location.lat, location.lng]} 
                 saveBtnRef={saveBtnRef} imperial={imperial} zoom={zoom} event={events[0]} /> 
               
                {/* Render structures on Map component, pass in structures prop */}
            </div>

            {/* Back to dashboard */}
            {!isPublished && !isEmbedded && (
            <div>
                <div className="fixed top-20 left-4 pointer-events-auto z-14 flex flex-col gap-4">
                    <Link to={`/event/${id}/dashboard`} className={`btn btn-primary`}>
                        <span>Back to Dashboard</span>
                    </Link>
                </div>
            </div>
            )};
                        
            {!isPublished &&(
            <div className="fixed top-4 left-4 pointer-events-auto z-14 flex gap-4 items-center">
                <div className="text-center rounded border border-base-400 bg-base-100 p-1">
                    <label className="label text-base-content">Administrator View</label>
                </div>
                <div className="bg-base-100 p-3 pt-2 pb-2 rounded-lg shadow-lg border border-neutral-300">
                    <label className="label text-base-content">
                        Toggle Grid
                        <input type="checkbox" className="toggle checked:toggle-success"
                        checked={showGrid} onChange={() => setShowGrid(!showGrid)}
                        onKeyDown={e => (e.key === "Enter") && e.target.click()}/>
                    </label>
                </div>
            </div>
            )};
            {/* <div className='fixed inset-0 z-10 pointer-events-none'>
                <Legend event={events[0]} structures={structures}/>  
            </div>     */}
        </div>
        </>
    );
};
    
export default PreviewPage;
