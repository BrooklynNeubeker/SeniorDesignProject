import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import QRCodePage from "../components/QRCodePage";
import { useGlobal } from "../components/GlobalContext";
import { SquarePen, MapPin, Calendar } from "lucide-react";

const EventDashboardPage = () => {
  const { id } = useParams(); // id = :id in route
  console.log("Loaded event ID:", id);
  const navigate = useNavigate();
  const { mini, setMini} = useGlobal();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPrintQR, setShowPrintQR] = useState({ open: false, eventName: "", qrValue: "" });
  const [showPreview, setShowPreview] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  const fetchMyEvents = async () => {
      try {
      const res = await axiosInstance.get("/events");
      setEvents(res.data || []);
      setIsPublished(res.data[0].published);
      } catch (error) {
      console.error("Failed to load events:", error);
      } finally {
      setLoading(false);
      }
  };

  useEffect(() => {
      fetchMyEvents();
  }, []);

  useEffect(() => {
      setMini(true);
  }), [];
  // Updates the event if fields are changed
  const updateEvents = (id, field, value) => 
    setEvents(prevEventState => prevEventState.map(row => (row.id === id ? {...row, [field]:value } : row)));

  const event = events.filter(ev =>
    ev._id === id
  );

// Gets the updated event, changes the data on the database
  const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("We got here!");
      const event = events.filter(eve => 
        eve._id === id
      );
      const payload = event.map(({eventName, location, startDate, startTime, endDate, endTime, eventCoordinatorName, eventCoordinatorID, stalls, published }) => ({ 
        eventName,
        location,
        startDate,
        startTime,
        endDate,
        endTime,
        eventCoordinatorName,
        eventCoordinatorID,
        stalls,
        published
      }));
      console.log(payload);
      try {
        await axiosInstance.put(`/events/${id}`, payload);
        console.log("Event updated successfully");
        //Anything else?
      } catch(error){
        console.error("Failed to update event", err);
      }
  };

  let listEventInfo = (
  
    <ul className="space-y-3">
    {event.map(ev => (
        <li key={ev._id} className="flex flex-col justify-left gap-x-6 p-3">
            <form onSubmit = {handleSubmit} className = "space-y-6">
              {/* Event name */}
              
              <div className="form-control">
                <label className="label space-y-1.5 text-sm flex items-center gap-2">
                  <SquarePen className="w-4 h-4" />
                  <span className="font-medium pb-2 text-base-content">Event Name</span>
                </label>
                <div className="relative">
                  <input
                    className={`input input-bordered w-full`}
                    placeholder={ev.eventName} //Show the existing event instead of an "enter"
                    value={ev.eventName}
                    required={true}
                    onChange={(e) =>
                      updateEvents(ev.id, "eventName", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Event Location */}
              <div className="form-control">
                <label className="label space-y-1.5 text-sm flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium pb-2 text-base-content">Event Location</span>
                </label>
                <div className="relative">
                  <input
                    className={`input input-bordered w-full`}
                    placeholder={ev.location}
                    value={ev.location}
                    onChange={(e) =>
                      updateEvents(ev.id, "location", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Start date & time */}
              <div className="form-control">
                <label className="label space-y-1.5 text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium pb-2 text-base-content">Start Date</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    className={`input input-bordered w-full`}
                    placeholder={ev.startDate}
                    value={ev.startDate}
                    onChange={(e) =>
                      updateEvents(ev.id, "startDate", e.target.value)
                    }
                  />
                  <input
                    type="time"
                    className={`input input-bordered w-full`}
                    placeholder={ev.startTime}
                    value={ev.startTime}
                    onChange={(e) =>
                      updateEvents(ev.id, "startTime", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* End date & time */}
              <div className="form-control">
                <label className="label space-y-1.5 text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium pb-2 text-base-content">End Date</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    className={`input input-bordered w-full`}
                    placeholder="Enter end date"
                    value={ev.endDate}
                    onChange={(e) =>
                      updateEvents(ev.id, "endDate", e.target.value)
                    }
                  />
                  <input
                    type="time"
                    className={`input input-bordered w-full`}
                    placeholder="Enter end time"
                    value={ev.endTime}
                    onChange={(e) =>
                      updateEvents(ev.id, "endTime", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button type="submit" className="btn btn-accent">
                  Save Changes
                </button>
              </div>

            <div className="flex flex-wrap items-center justify-between gap-y-6 mb-8 mt-8">
              <Link to={`/event/${id}/dashboard/site-plan`} className={`btn btn-primary`}> 
                    <span>Edit Event Layout</span>
              </Link>
              <Link to={`/event/${id}/dashboard/stalls`} className={`btn btn-primary`}>
                    <span>View Stalls</span>
              </Link>
              {/* <Link to={`/event/${id}/dashboard/preview`} className={`btn btn-primary`}> 
                    <span>View Full Preview</span>
              </Link> */}
              <button 
                onClick={() => {
                  // setMini(false); //This isn't working for the full page, the global is resetting or something when the page loads? But it does work for the preview
                  {isPublished? window.location = `/event/${id}/public/map` : window.location = `/event/${id}/dashboard/preview`}; 
                }} 
                className= "btn btn-primary">
                {isPublished? "View Map" : "View Full Preview"}
              </button>

              { /* <button 
                onClick={() => setShowPreview(!showPreview)}
                className="btn btn-primary btn-outline"
              >
                {showPreview ? "Hide Preview" : "Show Preview"}
              </button> */ }

              {/* Publish the Map (Updates database as well) */}
              <button 
              onClick={() => { 
                console.log(isPublished);
                updateEvents(ev.id, "published", !isPublished);
                setIsPublished(!isPublished);
                console.log("is published after setting to its opposite");
                console.log(isPublished);
                handleSubmit();
                console.log("map is now public")
              }}  
              className={`btn btn-primary`}>
                    {isPublished? "Unpublish Map" : "Make Map Public"}
              </button>


              <button 
                onClick={() => {
                  const eventName = event.length > 0 ? event[0].eventName : "Event";
                  setShowPrintQR({
                    open: true,
                    eventName: eventName,
                    qrValue: `${window.location.origin}/event/${id}/public/map`
                  });
                }}
                className="btn btn-primary w-full">
                Generate QR Code
              </button>
            </div>
            </form>
        </li>
    ))}
    </ul>

    )

  return(
    <div className="min-h-screen pt-20 bg-base-200">
        <div className="mx-4 p-4 py-8">
          <div className="bg-base-100 rounded-xl p-6 space-y-8">
            <div className="text-center mb-14">
              <h1 className="text-3xl font-semibold ">Event Dashboard</h1>
              <p className="mt-2">Manage your event details and layout!</p>
            </div>
            
            <div className="flex w-full gap-14">
              <div className="w-1/2">
                {listEventInfo}
              </div>

              <div className="w-1/2">
                {/* Right side - Preview */}
                <div className="flex-1 bg-white rounded-lg shadow-lg overflow-hidden h-full">
                  <iframe 
                    src={`/event/${id}/dashboard/preview?embedded=true`}
                    className="w-full h-full border-none"
                    title="Event Preview"
                  />
                </div>
              </div>

              <QRCodePage 
                open={showPrintQR.open}
                onClose={() => setShowPrintQR({...showPrintQR, open: false})}
                title={showPrintQR.eventName}
                qrValue={showPrintQR.qrValue}
              />

            </div>
            
          </div>
          
      </div>
    </div>
  );
};

export default EventDashboardPage;
