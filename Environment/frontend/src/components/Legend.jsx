import { useState, useRef, useEffect } from "react";
import { X, Utensils, Toilet, BriefcaseMedical, Info, Store, Undo2, Redo2, MapPin } from 'lucide-react';
import TileMapButton from './TileMapButton';
import { data, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useGlobal } from "./GlobalContext";
import { useMap } from 'react-leaflet';

const Legend = ({event, structures}) => {

    //focusRef is being used to focus on an item
    const focusRef = useRef(null);
    const { id } = useParams();
    const { zoom } = useGlobal();
    const map = useMap();
    const [startDateFormatted, setStartDate] = useState("");
    const [startTimeFormatted, setStartTime] = useState("");
    const [endDateFormatted, setEndDate] = useState("");
    const [endTimeFormatted, setEndTime] = useState("");
    const [search, setSearch] = useState("");

    // const {imperial, setImperial} = useGlobal();
    // const {stalls, setStalls} = useGlobal();
    console.log(event);
    console.log(event.eventName);

    // Search handle 
    const handleSubmit = async (e) => {
        e.preventDefault();
          console.log("We are searching tags!");
    };
    //lowering the users search results
    const lowerCaseSearch = search.trim().toLowerCase();
    // filtering the structure list so only those with valid tag types are visible.
     const filteredStructures = structures.filter(structure => {
        const lowerCaseTags = structure.tags.map(tag => tag.toLowerCase());
        //if there's no searching, then show all strucutes
        //  Note: this could be changed to a for loop that changes the structures 
        //        with every change in the search
        if (lowerCaseSearch == "")
            return structure;
        // if a tag has been searched only show the stalls that match the tag
        else 
            return lowerCaseTags.includes(lowerCaseSearch);
    });

    console.log(structures);

    const handleClick = (structure) => { //Click event for structure list in legend
        console.log(structure.position[0]);
        console.log(structure.position[1]);
        map.setView([structure.position[0], structure.position[1]], zoom);
        // Can we set the focus to the structure here somehow? 

        //making the focus on the structure but don't know if it works
        useEffect(() => {
            focusRef.current.focus();
        });
    };
    useEffect(() => { //Setter for all times
        setStartDate(formatDate(event.startDate));
        setEndDate(formatDate(event.endDate));
        setStartTime(formatTime(event.startTime));
        setEndTime(formatTime(event.endTime));
    }, []);

    const formatDate = (date) => { //Make date in form "Month Date, Year"
        let parts = date.split('-');
        var months = ["January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December"];
        var s = months[parts[1] - 1];
        s = s + " " + parts[2] +  ", " + parts[0];
        return s;
    };

    const formatTime = (time) => { //Make the time show AM/PM instead of military time
        let parts = time.split(':');
        var hour = Number(parts[0]);
        var s = "";
        if (hour < 13){
            s = parts[0] + ":" + parts[1] + " AM";
        } else {
            hour = hour - 12;
            s = String(hour)
            if(hour < 10){
                s = "0"+ s;
            }
            s = s + ":" + parts[1] + " PM";
        }
        return s;
    };


    return (
        <div>

            {/* "Legend" sidebar drawer */}
            <div className="drawer drawer-end">

                <input id="legend-drawer" type="checkbox" className="drawer-toggle"
                onKeyDown={e => (e.key === "Enter") && e.target.click()} />
                <div className="drawer-content top-20 fixed right-4 flex gap-4 items-center">

                    {/* "Open Legend" button */}
                    <label htmlFor="legend-drawer" className="drawer-button btn btn-primary">Legend</label>
                </div>


                {/* Sidebar drawer */}
                <div className="drawer-side">
                    <label htmlFor="legend-drawer" aria-label="close legend" className="drawer-overlay"></label>

                    {/* Sidebar content */}
                    <ul className="menu bg-base-200 min-h-full w-80 p-4 pt-20 gap-4">
                        <li className="pointer-events-none">
                            <header id="eventName" tabIndex="0">
                                <h1 className="text-xl font-bold">{event.eventName} </h1>
                            </header>
                        </li>

                        <li className="pointer-events-none">
                            <header id="eventName" tabIndex="0">
                            <h1 className="text-lg font-bold">Dates and Times:</h1>
                            </header>
                        </li>
                        <li className="pointer-events-none">
                            <p className="text font-bold">{startDateFormatted} at {startTimeFormatted}</p>
                        </li>
                        <li className="pointer-events-none">
                            <p className="text font-bold"> to </p>
                        </li>
                        <li className="pointer-events-none">
                            <p className="text font-bold">{endDateFormatted} at {endTimeFormatted}</p>
                        </li>
                        {/* <li className="pointer-events-none">
                            <h1 className="text-lg font-bold">Start and End Time:</h1>
                        </li> */}
                        {/* <li className="pointer-events-none">
                            <p className="text font-bold">{event.event.startTime} to {event.event.endTime}</p>
                        </li> */}
                        <li className="pointer-events-none">
                            <header id="eventName" tabIndex="0">
                            <h1 className="text-lg font-bold">Search Stall Tags for Keywords:</h1>
                            </header>
                        </li>
                        <li className="pointer-events-none">
                            <p className="text text-neutral-600">e.g. Dairy-Free, Wheelchair Accessible, etc.</p>
                        </li>
                        <form onSubmit={handleSubmit}>
                            <input type="text" id="search-bar" placeholder="Search Tags Here..." value={search} onChange={e => setSearch(e.target.value)}></input>
                            <button className="btn" type="submit">Search</button>
                        </form>
                        <li className="pointer-events-none">
                            <header id="eventName" tabIndex="0">
                                <h1 className="text-lg font-bold">Stalls:</h1>
                            </header>
                        </li>
                        <div className="max-h-40 overflow-auto">
                            <ul>
                                {filteredStructures.map(structure => (
                                    <div className="vertical-button-container">
                                        <li>
                                        <button className="btn btn-outline hover:btn-primary" 
                                        onClick={() => handleClick(structure)}>
                                            <span className="text-md" ref={focusRef}>{structure.name}</span>
                                        </button>
                                        </li>

                                    </div>
                                ))}
                            </ul>
                        </div>

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