import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ParseExcel from "../components/ParseExcel.jsx";
import * as XLSX from "xlsx";


/**
 * @brief Coordinators can assign stalls to a given event
 * 
 * @description StallsPage has four main actions a Coordinator can take:
 *       [1.] Add/Remove individual Stalls
 *       [2.] Import Stalls via a properly formatted .xlsx file
 *       [3.] Export all Stalls the Event currently has
 *       [4.] Invite Vendors to register their stall
 * @route /event/:id/dashboard/stalls
 * @note The stalls present in the table are in the database currently
 * @navigation Back button to /event/:id/dashboard
 */
const StallsPage = () => {

  /*
    TODO:
    -TESTING: what happens when stall is deleted from Coordinator side during onboarding process?
    -sort for table? // delete all ??
    -make an edit button in stalls list 
    -make the top level buttons (add stalls, vendor reg...) collapsable on click as well
        maybe make them all a collapsable pane to the left
    x-implement export stalls
    -implement vendor registration <-- working -- vvv
        -review the if statements guarding the returns on VendorSignup and login
        -trackdown console.logs
        x-create the form on VendorViewStallPage
        x-build out submit route through the backend- change stall status
        x-create the Vendor homePage
            will serve as dashboard
              have all events that they are related to
              be able to select event
                have all stalls for event able to view
        x-create a save template feature that will save a particular stallform
            for other events
    - Change NavBar for Vendor view
    - After finished with stall page, rework messages:
        coordinator can see all vendors of their events
        vendors can only see the coordinator they are assinged to 
        
  */

  // id = :id in route
  const { id } = useParams();
  // Uses id to find current event
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  // for stalls saved in database
  const [allStalls, setAllStalls] = useState([]);
  // for entered but unsaved stalls
  const [stalls, setStalls] = useState([{ id: crypto.randomUUID(), name: "", email: "" }]);
  // For sending email invites to vendors
  const [sending, setSending] = useState(false);

  // Booleans that enable/disable the various components
  const [showAddForm, setShowAddForm] = useState(false);
  const [showInvite, setInvite] = useState(false);
  const [showImport, setImport] = useState(false);
  const [showExport, setExport] = useState(false);    
 

  //grabs an event using the eventID in the route
  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return; 
      try {
        const res = await axiosInstance.get(`/events/${id}`); 
        setEvent(res.data);   
        console.log("Fetched event:", res.data);
      } catch (err) {
        console.error("Failed to fetch event:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  //uses the eventID to find all stalls for event
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

  //helper functions for stall manipulation
  const addStalls = () =>
    setStalls(prevStallState => [...prevStallState, { id: crypto.randomUUID(), name: "", email: "" }]);

  const removeStalls = (id) =>
    setStalls(prevStallState => prevStallState.filter(row => row.id !== id));

  const updateStalls = (id, field, value) =>
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


  // Sends invites to all stalls from the event that haven't received an invite yet
  const sendInvites = async () => {
    if (!allStalls || allStalls.length === 0) return;
    setSending(true);

    try {
      const targets = allStalls.filter(s => s.onboardingStatus === "noInvite");
      for (const stall of targets) {
        const { _id: stallId, name, email, eventID } = stall;
        await axiosInstance.post(`/auth/${stallId}/signup-vendor-email`, {
          name, email, eventID
        });
      }
      alert(`Invites sent to ${targets.length} stall(s).`);
    } catch (err) {
      console.error("Bulk invite error:", err);
      alert("Some invites may have failed. Check console for details.");
    } finally {
      await fetchMyStalls();
      setSending(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payloads = stalls.map(({ id: _tmp, name, email }) => ({
      name,
      email,
      eventID: id,
    }));

    try {
      //we decided the backend would update the stalls one at a time
      // so we have to iteratively call them
      for (const payload of payloads) {
        await axiosInstance.post(`/events/${id}/stalls`, payload);
      }
      alert("Stalls created successfully");
      await fetchMyStalls();// refreshes the table
      setStalls([{ id: crypto.randomUUID(), name: "", email: "" }]); //re-initializes proposed stalls
      toggleAddForm();
    } catch (err) {
      console.error("Failed to create stalls", err);
    }
  };

  // Displays which step in the onboarding status the Vendor is at
  const onboardingStatusComponent = (onboardingStatus) => {
    switch (onboardingStatus) {
      case "noInvite":
        return (
          <span className="label-text font-bold text-error"> Uncontacted </span>
        );
      case "inviteSent":
        return (
          <span className="label-text font-bold text-warning"> Pending...</span>
        );
      case "vendorRegistered":
        return (
          <span className="label-text font-bold text-success"> Registered </span>
        );
      default:
        return (
          <span className="label-text font-bold"> Error </span>
        );

    }
  };

  // Helper functions for Import Stalls
  const [importRows, setImportRows] = useState([]);
  
  // Save parsed excel rows from ParseExcel to state for importToBackend
  const handleParsed = (rows) => {
    setImportRows(rows); // rows are already {name, email}
  };
  
  // attempt to take incoming rows and pass them to createStall in event.controller.js
  const importToBackend = async () => {
    if (importRows.length === 0) return;
    try {
      await Promise.all(
        importRows.map((row) =>
          axiosInstance.post(`/events/${id}/stalls`, {
            name: row.name,
            email: row.email,
            eventID: id,
          })
        )
      );
      alert(`Imported ${importRows.length} stalls`);
      setImportRows([]);
      await fetchMyStalls();
    } catch (err) {
      console.error(err);
      alert("Import failed for some rows.");
    }
  };
  
  // helper function for Export Stalls
  // writes an out a file of current stalls to:
  // *event name*-Stalls.xlsx
  const exportStallsToXLSX = () => {

    if (!allStalls || allStalls.length <= 0) {
      alert("No stalls to export");
      return;
    }

    const rows = allStalls.map((stall) => [
      stall.name,
      stall.email,
      console.log("in exportStallsToXLSX:", stall.name, stall.email)
    ]);

    const ws = XLSX.utils.aoa_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `${event.eventName}-Stalls.xlsx`);
  };


  // Responsible for rendering the main table. Displays all stalls currently assigned to 
  // this event
  let listStalls;
  if (loading) {
    listStalls = <p className="text-base-content/60">Loading your Stalls…</p>;
  } else if (allStalls.length === 0) {
    listStalls = <p className="text-base-content/60">No stalls yet. Create your first one!</p>;
  } else {
    listStalls = (
      <div className="overflow-auto max-h-80 rounded-md ">

        <table className="table table-sm w-full">
          <thead className="bg-base-200 sticky top-0">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Onboarding Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allStalls.map((stall) => (
              <tr key={stall._id} className="hover">
                <td className="whitespace-nowrap">{stall.name}</td>
                <td className="whitespace-nowrap">{stall.email}</td>
                <td className="whitespace-nowrap">{onboardingStatusComponent(stall.onboardingStatus)}</td>
                <td className="text-center">
                  <button
                    type="button"
                    className="btn btn-xs btn-error btn-outline"
                    onClick={() => deleteStall(stall._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  // lets Coordinator enter/remove stalls one at a time.
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
                  setStalls([{ id: crypto.randomUUID(), name: "", email: "" }]);
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
                  placeholder="stall name"
                  value={stall.name}
                  onChange={(e) => updateStalls(stall.id, "name", e.target.value)}
                />
                <input
                  className="input input-bordered w-full"
                  placeholder="e-mail"
                  value={stall.email}
                  onChange={(e) => updateStalls(stall.id, "email", e.target.value)}
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
    setExport(!showExport);
  };

  const toggleInvite = () => {
    setInvite(!showInvite);
  };

  // Displays ParseExcel component
  let importFileComponent = (
    <div className="rounded-lg border border-base-300 p-4 space-y-3">
      <div className="flex items-center justify-between mb-3">
        <label className="label">
          <span className="label-text font-medium"> Import Stalls</span>
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
        </div>
      </div >
      <div className="rounded-lg border border-base-300 p-4 space-y-3">
        <ParseExcel onParsed={handleParsed} />
        <button
          type="button"
          className="btn btn-sm btn-primary btn-outline mt-3"
          onClick={importToBackend}
          disabled={importRows.length === 0}
        >
          Import Stalls
        </button>
      </div>

    </div>
  )

  // dislays the vendor registration 
  let inviteComponent = (
    <div className="rounded-lg border border-base-300 p-4 space-y-3">
      <div className="flex items-center justify-between mb-3">
        <label className="label">
          <span className="label-text font-medium"> Invite Vendors</span>
        </label>
        <div className="flex items-center justify-between mb-3">
          <button
            type="button"
            className="btn btn-sm btn-ghost text-error"
            onClick={() => {
              toggleInvite();
            }}
          >
            Collapse
          </button>
        </div>
      </div>
      <div>
        <button
          type="button"
          className="btn btn-primary btn-outline mt-3 hover:btn-primary"
          onClick={sendInvites}
          disabled={sending}>
          {sending ? "Sending…" : "Send Invites"}
        </button>
      </div>
    </div>
  )
  
  // displays export stalls button
  let exportStallsComponent = (
    <div className="rounded-lg border border-base-300 p-4 space-y-3">
      <div className="flex items-center justify-between mb-3">
        <label className="label">
          <span className="label-text font-medium"> Export Stalls</span>
        </label>
        <div className="flex items-center justify-between mb-3">
          <button
            type="button"
            className="btn btn-sm btn-ghost text-error"
            onClick={() => {
              toggleExport();
            }}
          >
            Collapse
          </button>
        </div>
      </div>
      <div>
        <button
          type="button"
          className="btn btn-primary btn-outline mt-3 hover:btn-primary"
          onClick={exportStallsToXLSX}
        >
          Export Stalls
        </button>
      </div>
    </div>
  )

  let toggleAddStallsButton = (
    <button
      type="button"
      className="btn btn-primary btn-outline"
      disabled={showAddForm}
      onClick={toggleAddForm}
    >
      Add Stalls
    </button>
  )
  let invitationButton = (
    <button
      type="button"
      className="btn btn-primary btn-outline"
      disabled={showInvite}
      onClick={toggleInvite}
    >
      Vendor Registration
    </button>
  )
  let importStallsButton = (
    <button
      type="button"
      className="btn  btn-primary btn-outline"
      disabled={showImport}
      onClick={toggleImport}
    >
      Import Stalls
    </button>
  )
  let exportStallsButton = (
    <button
      type="button"
      className="btn  btn-primary btn-outline"
      disabled={showExport}
      onClick={toggleExport}
    >
      Export Stalls
    </button>
  )
  return (
    <div className="h-full pt-20">
      <div className="container max-w-5xl flex flex-1 flex-col p-16 mx-auto bg-base-100/50">
        <div className="max-w-md justify-left space-y-6">
          <h1 className="text-4xl font-bold">Event Dashboard</h1>
          <h1 className="text-2xl font-bold">{event?.eventName} </h1>
          <div className="max-w-md justify-left  mt-5">
            <div className="flex gap-2">
              {toggleAddStallsButton}
              {importStallsButton}
              {exportStallsButton}
              {invitationButton}
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
        <div className="mt-5">
          {showExport && exportStallsComponent}
        </div>
        <div className="mt-5">
          {showInvite && inviteComponent}
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