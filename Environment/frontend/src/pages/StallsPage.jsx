import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const StallsPage = () => {
    const { id } = useParams(); // id = :id in route
   
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

    const event = events.find(ev =>
    ev._id === id
    );


    const [allStalls, setAllStalls] = useState([]);
    const fetchMyStalls = async () => {
        try {
        const res = await axiosInstance.get(`/events/${id}/stalls`);
        setAllStalls(res.data || []);
        } catch (error) {
        console.error("Failed to load stalls:", error);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyStalls();
    }, [id]);

    

    const [stalls, setStalls] = useState([{ id: crypto.randomUUID(), name: "" , description: ""}]);

    const addStalls = () =>
      setStalls(s => [...s, { id: crypto.randomUUID(), name: "", description: "" }]);

    const removeStalls = (id) =>
      setStalls(s => s.filter(row => row.id !== id));

    const updateStalls = (id, field ,value) =>
      setStalls(s => s.map(row => (row.id === id ? { ...row, [field]: value } : row)));
    
    const deleteStall = async (stallId) => {
    if (!window.confirm("Confirm: delete this stall?")) return;
        try {
            await axiosInstance.delete(`/events/${id}/stalls/${stallId}`);
            await fetchMyStalls();
        } catch (error) {
            console.error("Failed to delete stall:", error);
            alert("Error: failed to delete stall");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payloads = stalls.map(({ id: _tmp, name, description }) => ({
            name,
            description,
            eventID: id, 
        }));

        try {
            for (const payload of payloads) {
                await axiosInstance.post(`/events/${id}/stalls`, payload);
            }
            alert("Stalls created successfully");
            await fetchMyStalls();
            // need to remove manually entered stalls from page
            // call removeStall() ??  remamp payload to carry _tmp, pass as input?
        } catch (err) {
            console.error("Failed to create stalls", err);
        }
    };


    let listStalls;
    if(loading) {
        listStalls = <p className="text-base-content/60">Loading your Stalls…</p>;
    }else if (allStalls.length === 0) {
        listStalls = <p className="text-base-content/60">No stalls yet. Create your first one!</p>;
    }else {
        listStalls = (
        <ul className="space-y-3">
        {allStalls.map(stall => (
            <li key={stall._id} className="flex items-center justify-between gap-x-6 rounded border border-base-300 p-3">
            <div >
                <div className="font-medium">{stall.name}</div>
                <div className="text-sm text-base-content/60">{stall.description}</div>
            </div>

            <div>
                <button 
                type="delete"
                className="btn btn-xs btn-primary"
                onClick={() => deleteStall(stall._id)} 
                >Delete
                </button>
            </div>
            </li>
        ))}
        </ul>)
    }
    let addStallsForm = (
        <form onSubmit={handleSubmit} className="space-y-6">
        <div>
                    <div className="flex items-center justify-between mb-3">
                    <label className="label">
                        <span className="label-text font-medium"> Add Stalls</span>
                    </label>
                    
                    <button
                        type="button"
                        className="btn btn-sm btn-outline"
                        onClick={addStalls}
                    >
                        + Add Stall
                    </button>
                    </div>

                <div className="space-y-4">
                  {stalls.map((s) => (
                    <div
                      key={s.id}
                      className="rounded-lg border border-base-300 p-4 space-y-3"
                    >
                      <input
                        className="input input-bordered w-full"
                        placeholder="Stall name"
                        value={s.name}
                        onChange={(e) => updateStalls(s.id, "name",  e.target.value)}
                      />
                      <input
                        className="input input-bordered w-full"
                        placeholder="Description"
                        value={s.description}
                        onChange={(e) => updateStalls(s.id, "description",  e.target.value)}
                      />
                    
                      <div className="text-right">
                        <button
                          type="button"
                          className="btn btn-xs btn-error btn-outline"
                          onClick={() => removeStalls(s.id)}
                          disabled={stalls.length === 1}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                <div className="flex justify-left">
                    <button type="submit" className="btn btn-primary btn-outline">
                        Submit
                    </button>
                    {/* <Link to={`/event/${id}/dashboard`} className="btn btn-sm btn-outline">
                        Cancel
                    </Link>  */}
                </div>
                </div>
              </div>
              </form>

    )
    return(
        <div className="h-full pt-20">
          <div className="container flex flex-1 flex-col p-16 mx-auto bg-base-100/50">
              <div className="max-w-md justify-left space-y-6">
                <h1 className="text-4xl font-bold">Event Dashboard</h1>
                <h1 className="text-2xl font-bold">{event?.eventName} </h1>   
                <h1 className="text-2xl font-bold"> Stalls</h1>
              </div>
              <div>
                {listStalls}
              </div>
              
                {addStallsForm}

          </div>
        </div>

    );
}

export default StallsPage;