import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const EventDashboardPage = () => {
  const { id } = useParams(); // id = :id in route
  console.log("Loaded event ID:", id);
  const navigate = useNavigate();

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

  // Updates the event if fields are changed
  const updateEvents = (id, field, value) => 
    setEvents(prevEventState => prevEventState.map(row => (row.id === id ? {...row, [field]:value } : row)));

  const event = events.filter(ev =>
    ev._id === id
  );

// Gets the updated event, changes the data on the database
  const handleSubmit = async (e) => {
      e.preventDefault();
      const event = events.filter(eve => 
        eve._id === id
      );
      const payload = event.map(({eventName, location, lat, lng, startDate, startTime, endDate, endTime, eventCoordinatorName, eventCoordinatorID }) => ({ 
        eventName,
        location,
        lat,
        lng,
        startDate,
        startTime,
        endDate,
        endTime,
        eventCoordinatorName,
        eventCoordinatorID
      }));
      // console.log(payload);
      try {
        await axiosInstance.put(`/events/${id}`, payload);
        alert("Event updated successfully");
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
                <label className="label">
                  <span className="label-text font-medium">Event Name</span>
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
                <label className="label">
                  <span className="label-text font-medium">Event Location</span>
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
                <label className="label">
                  <span className="label-text font-medium">Start Date</span>
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
                <label className="label">
                  <span className="label-text font-medium">End Date</span>
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

            </form>
        </li>
    ))}
    </ul>)

  return(
    <div className="h-screen pt-20">
      <div className="container flex flex-1 flex-col p-16 mx-auto bg-base-100/50">
          <div className="max-w-md justify-left space-y-6">
            <h1 className="text-2xl font-bold">Event Dashboard </h1>
            
            {listEventInfo}   
            
            <div className="flex items-center gap-2">
              <Link to={`/event/${id}/dashboard/site-plan`} className={`btn btn-primary btn-outline`}> 
                    <span>View Event Layout</span>
              </Link>
              <Link to={`/event/${id}/dashboard/stalls`} className={`btn btn-primary btn-outline`}>
                    <span>View Stalls</span>
              </Link>
              <button type="submit" className="btn btn-primary btn-outline">
                Save Changes
              </button>
            </div>

            <div className="flex items-center gap-2">
              <Link to={`/event/${id}/dashboard/preview`} className={`btn btn-primary btn-outline`}> 
                    <span>Preview</span>
              </Link>
              <Link to={`/event/${id}/viewmap`} className={`btn btn-primary btn-outline`}>
                    <span>View Published Map</span>
              </Link>
            </div>

          </div>
      </div>
    </div>
  );
};

export default EventDashboardPage;
