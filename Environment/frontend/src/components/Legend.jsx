import { useState, useRef, useEffect } from "react";
import { X, Utensils, Toilet, BriefcaseMedical, Info, Store, Undo2, Redo2, MapPin } from 'lucide-react';
import TileMapButton from './TileMapButton';
import { data, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useGlobal } from "./GlobalContext";
import { useMap } from 'react-leaflet';

const Legend = ({event, structures}) => {
    const { id } = useParams();
    const { zoom } = useGlobal();
    const map = useMap();
    // const {imperial, setImperial} = useGlobal();
    // const {stalls, setStalls} = useGlobal();
    console.log(event);
    console.log(event.eventName);

    // Search handle 
    const handleSubmit = async (e) => {
        e.preventDefault();
          console.log("We are searching tags!");
    };
    console.log(structures);

    const handleClick = (structure) => { //Click event for structure list in legend
        console.log(structure.position[0]);
        console.log(structure.position[1]);
        map.setView([structure.position[0], structure.position[1]], zoom);
        // Can we set the focus to the structure here somehow? 
    };


    return (
        <div>

            {/* "Legend" sidebar drawer */}
            <div className="drawer drawer-end fixed pointer-events-auto">

                <input id="legend-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content top-20 fixed right-4 flex gap-4 items-center">

                    {/* "Open Legend" button */}
                    <label htmlFor="legend-drawer" className="drawer-button btn btn-primary">Legend</label>
                </div>


                {/* Sidebar drawer */}
                <div className="drawer-side">
                    <label htmlFor="legend-drawer" aria-label="close legend" className="drawer-overlay"></label>

                    {/* Sidebar content */}
                    <ul className="menu bg-base-200 min-h-full w-80 p-4 pt-20 gap-2">
                        <li className="pointer-events-none">
                            <h1 className="text-xl font-bold">{event.eventName} </h1>
                        </li>

                        <li className="pointer-events-none">
                            <h1 className="text-lg font-bold">Dates and Times:</h1>
                        </li>
                        <li className="pointer-events-none">
                            <p className="text font-bold">{event.startDate} at {event.startTime}</p>
                        </li>
                        <li className="pointer-events-none">
                            <p className="text font-bold"> to </p>
                        </li>
                        <li className="pointer-events-none">
                            <p className="text font-bold">{event.endDate} at {event.endTime}</p>
                        </li>
                        {/* <li className="pointer-events-none">
                            <h1 className="text-lg font-bold">Start and End Time:</h1>
                        </li> */}
                        {/* <li className="pointer-events-none">
                            <p className="text font-bold">{event.event.startTime} to {event.event.endTime}</p>
                        </li> */}
                        <li className="pointer-events-none">
                            <h1 className="text-lg font-bold">Search Stall Tags for Keywords:</h1>
                        </li>
                        <li className="pointer-events-none">
                            <p className="text font-bold">Ex: Dairy-Free or Wheelchair Accessible</p>
                        </li>
                        <form onSubmit={handleSubmit}>
                            <input type="text" id="search-bar" placeholder="Search Tags Here..."></input>
                            <button type="submit">Search</button>
                        </form>

                        <li className="pointer-events-none">
                            <h1 className="text-lg font-bold">Stalls:</h1>
                        </li>
                            <ul>
                                {structures.map(structure => (
                                    <div className="vertical-button-container">
                                        <button className="btn" key={structure._id} onClick={() => handleClick(structure)}>
                                            {structure.name}
                                            </button>
                                    </div>
                                ))}
                            </ul>

                        {/* Close button */}
                        <li className="mb-4">
                            <label htmlFor="legend-drawer" className="btn btn-md btn-primary fixed left-4 bottom-4">
                                <X size={18} />
                                Close
                            </label>
                        </li>
                    </ul>

                </div>
                
            </div>

        </div>
    );
};

export default Legend;