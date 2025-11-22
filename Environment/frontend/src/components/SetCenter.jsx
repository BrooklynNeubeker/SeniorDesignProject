import { useState, useRef, useEffect } from "react";
import { useGlobal } from "./GlobalContext";
import { useMap } from 'react-leaflet';
import toast from "react-hot-toast";
import { Lock, LockOpen, } from 'lucide-react';

const SetCenter = ({}) => {
    const { location, setLocation, setZoom } = useGlobal();
    const map = useMap();
    const [locked, setLocked] = useState(true);    // lock mechanism to prevent accidental map center changes

    const handleClick = () => { //Click event for setting map center and zoom
        var coords = map.getCenter();
        console.log(coords.lat);
        setLocation({
        lat: coords.lat,
        lng: coords.lng,
        label: location.label,
        });
        toast.success("Map center set");
        console.log(map.getZoom());
        // Setting is buggy if zoom goes beyond 19, commented it out for now to test more later
        // if (map.getZoom() > 19){
        //     alert("Cannot set zoom this close, zoom level unchanged.");
        // } else {
        //     setZoom(map.getZoom());
        // }
        // setLocation([structure.position[0], structure.position[1]], zoom);
        // setZoom();
        // Can we set the focus to the structure here somehow? 
    };

    if (locked) {
        // locked
        return (
            <div className="fixed top-63 md:top-48 lg:top-34 left-4 pointer-events-auto z-10 flex">
                <button className="btn btn-soft cursor-not-allowed pointer-events-none" 
                onClick={() => handleClick()}>
                <span className="text-md text-gray-600">Set Map Center</span>
                </button>
                <button className="btn btn-square" onClick={() => setLocked(!locked)}><Lock size={18}/></button>
            </div>
        );
    }
    else {
        // unlocked
        return (
            <div className="fixed top-62 md:top-48 lg:top-34 left-4 pointer-events-auto z-10 flex">
                <button className="btn btn-primary" 
                onClick={() => handleClick()}>
                <span className="text-md">Set Map Center</span>
                </button>
                <button className="btn btn-square" onClick={() => setLocked(!locked)}><LockOpen size={18}/></button>
            </div>
        );
        console.log(locked);
    }

};

export default SetCenter;