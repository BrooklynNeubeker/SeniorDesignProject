import { useState, useRef, useEffect } from "react";
import { useGlobal } from "./GlobalContext";
import { useMap } from 'react-leaflet';

const SetCenter = ({}) => {
    const { location, setLocation, setZoom } = useGlobal();
    const map = useMap();

    const handleClick = () => { //Click event for setting map center and zoom
        var coords = map.getCenter();
        console.log(coords.lat);
        setLocation({
        lat: coords.lat,
        lng: coords.lng,
        label: location.label,
        });
        alert("Center set, don't forget to save :)");
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

    return (
        <div className="fixed top-62 md:top-48 lg:top-34 left-4 pointer-events-auto z-10 flex gap-4">
            <button className="btn btn-primary" 
            onClick={() => handleClick()}>
            <span className="text-md">Set Map Center</span>
            {/* and Zoom */}
            </button>
        </div>
    );
};

export default SetCenter;