import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ParseExcel from "../components/ParseExcel.jsx";

const StallsPage = () => {
    // id = :id in route
    const { id } = useParams(); 
    // Uses id to find current event
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    // for stalls saved in database
    const [allStalls, setAllStalls] = useState([]); 
    // for manually entered stalls
    const [stalls, setStalls] = useState([{ id: crypto.randomUUID(), name: "" , description: ""}]); 
    
    // Booleans that enable/disable the various components
    const [showAddForm, setShowAddForm] = useState(false);
    const [showInvite, setInvite] = useState(false);
    const [showImport, setImport] = useState(false);
    const [showExport, setExport] = useState(false);
    
    

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


    const addStalls = () =>
      setStalls(prevStallState => [...prevStallState, { id: crypto.randomUUID(), name: "", description: "" }]);

    const removeStalls = (id) =>
      setStalls(prevStallState => prevStallState.filter(row => row.id !== id));

    const updateStalls = (id, field ,value) =>
      setStalls(prevStallState => prevStallState.map(row => (row.id === id ? { ...row, [field]: value } : row)));
    
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
            setStalls([{ id: crypto.randomUUID(), name: "", description: "" }]);
            toggleAddForm();
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
                >
                    Delete
                </button>
            </div>
            </li>
        ))}
        </ul>)
    }
     
    let addStallsForm = (
        <div id="addStallForm" className="rounded-lg border border-base-300 p-4 space-y-3">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="label">
                          <span className="label-text font-medium"> Add Stalls</span>
                      </label>
                      <div className="flex items-center justify-between mb-3">
                        <button
                            type="button"
                            className="btn btn-sm btn-outline"
                            onClick={addStalls}
                        >
                            + Add Stall
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-ghost text-error"
                          onClick={() => {
                            toggleAddForm();
                          }}
                        >
                          Collapse
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-ghost text-error"
                          onClick={() => {
                            setStalls([{ id: crypto.randomUUID(), name: "", description: "" }]);
                            toggleAddForm();
                          }}
                        >
                          Cancel
                      </button>
                    </div>
                  </div>

                <div className="space-y-4">
                  {stalls.map((stall) => (
                    <div
                      key={stall.id}
                      className="rounded-lg border border-base-300 p-4 space-y-3"
                    >
                      <input
                        className="input input-bordered w-full"
                        placeholder="Stall name"
                        value={stall.name}
                        onChange={(e) => updateStalls(stall.id, "name",  e.target.value)}
                      />
                      <input
                        className="input input-bordered w-full"
                        placeholder="Description"
                        value={stall.description}
                        onChange={(e) => updateStalls(stall.id, "description",  e.target.value)}
                      />
                    
                      <div className="text-right">
                        <button
                          type="button"
                          className="btn btn-xs btn-error btn-outline"
                          onClick={() => removeStalls(stall.id)}
                          disabled={stalls.length === 1}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-left gap-2">
                    <button type="submit" className="btn btn-primary btn-outline">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
              </form>
        </div>
    )

    const toggleAddForm = () => {
        setShowAddForm(!showAddForm);
    };

    const toggleImport = () => {
        setImport(!showImport);
    };

    const toggleExport = () => {
        setS(!showAddForm);
    };

    const toggleInvite = () => {
        setInvite(!showInvite);
    };

    let importFileComponent = (
        <div>
            <div className="flex items-center justify-between mb-3">
              <label className="label">
                  <span className="label-text font-medium"> Add Stalls</span>
              </label>
              <div className="flex items-center justify-between mb-3">
                <button
                  type="button"
                  className="btn btn-sm btn-ghost text-error"
                  onClick={() => {
                    toggleImport();
                  }}
                >
                  Collapse
                </button>
                {/* <button
                  type="button"
                  className="btn btn-sm btn-ghost text-error"
                  onClick={() => {
                    setStalls([{ id: crypto.randomUUID(), name: "", description: "" }]);
                    toggleImport();
                  }}
                >
                  Cancel
              </button> */}
            </div>
          </div>
          <ParseExcel></ParseExcel>
        </div>
    )
    let toggleAddStallsButton = (
        <button
            type="button"
            className="btn btn-primary btn-outline"
            disabled= {showAddForm}
            onClick={toggleAddForm}
        >
            Add Stalls
        </button>
    )
    let invitationButton = (
        <button
          type="button"
          className="btn btn-primary btn-outline"
          disabled= {showInvite}
          onClick={toggleInvite}
        >
          Vendor Registration
        </button>
    )
    let importStallsButton = (
        <button
          type="button"
          className="btn  btn-primary btn-outline"
          disabled= {showImport}
          onClick={toggleImport}
        >
          Import Stalls
        </button>
    )
    let exportStallsButton = (
        <button
          type="button"
          className="btn  btn-primary btn-outline"
          disabled= {showExport}
          onClick={toggleExport}
        >
          Export Stalls
        </button>
    )

    return(
        <div className="h-full pt-20">
          <div className="container flex flex-1 flex-col p-16 mx-auto bg-base-100/50">
              <div className="max-w-md justify-left space-y-6">
                <h1 className="text-4xl font-bold">Event Dashboard</h1>
                <h1 className="text-2xl font-bold">{event?.eventName} </h1>   
                <div className="max-w-md justify-left  mt-5">
                <div className="flex gap-2">
                  { toggleAddStallsButton }
                  { invitationButton }
                  { importStallsButton }
                  { exportStallsButton }
                </div> 
              </div>
                <h1 className="text-2xl font-bold mb-5"> Stalls</h1>
              </div>
              <div >
                {listStalls}
              </div>
              <div className="mt-5">
                {showAddForm && addStallsForm}
              </div>
              <div className="mt-5">
                {showImport && importFileComponent}
              </div>
              <div>
                
                  <Link to={`/event/${id}/dashboard`} className="btn btn-primary mt-5 justify-left gap-2">
                    Back
                  </Link> 
              </div>

          </div>
        </div>

    );

};

export default StallsPage;