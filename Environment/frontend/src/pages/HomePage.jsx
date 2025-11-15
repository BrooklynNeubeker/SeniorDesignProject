import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../lib/axios";

const HomePage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const fetchMyEvents = async () => {
        try {
        const res = await axiosInstance.get("/events");
        setEvents(res.data || []);
        } catch (error) {
        console.error("Failed to load events:", error);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyEvents();
    }, []);

    const deleteEvent = async (id) => {
        if (!window.confirm("Are you sure you want to delete this event?")) return;

        try {
            await axiosInstance.delete(`/events/${id}`);
            await axiosInstance.delete(`/events/${id}/site-plan`);
            await fetchMyEvents();
        } catch (error) {
            console.error("failed to delete event:", error);
            alert("error: failed to delete event");
        }
    };

    const [searchValue, setSearchValue] = useState("");
    const filteredEvents = events.filter(event =>
            event.eventName.toLowerCase().includes(searchValue.toLowerCase())
        );

    const searchBar = (
        <input
            type="input"
            className="input input-bordered w-3/4"
            placeholder="Search..."
            onChange={(e) => setSearchValue(e.target.value)}
        > 
        </input>
    )
    let listEvents;
    if(loading) {
        listEvents = <p className="text-base-content/60">Loading your events…</p>;
    }else if (events.length === 0) {
        listEvents = <p className="text-base-content/60">No events yet. Create your first one!</p>;
    }else {
        listEvents = (
        <ul className="space-y-3">
        {filteredEvents.map(ev => (
            <li key={ev._id} className="flex items-center justify-between gap-x-6 rounded border border-base-300 p-3">
            <div >
                <div className="font-medium">{ev.eventName}</div>
                <div className="text-sm text-base-content/60">{ev.location}</div>
            </div>
            <Link to={`/event/${ev._id}/dashboard`} className="btn btn-sm btn-outline">
                Open Dashboard
            </Link>
            <div>
                <button 
                type="delete"
                className="btn btn-xs btn-primary"
                onClick={() => deleteEvent(ev._id)} 
                >Delete
                </button>
            </div>
            </li>
        ))}
        </ul>)
    }
  return (
    <div className="h-screen pt-20">
        <div className="w-full flex flex-1 flex-col  justify-left p-16 bg-base-100/50">
            <div className="max-w-md space-y-6 gap-2">
                <h1 className="text-4xl font-bold ">My Events</h1> 
                <div className="flex justify-end space-x-2 mtb-5">   
                    {searchBar}
                    <Link to={"/event/create-event"} className={`btn btn-primary btn-outline`}>
                        <span>Create Event</span>
                    </Link>
                </div>
                {listEvents}
            </div>
        </div>
    </div>
  );
}

export default HomePage;