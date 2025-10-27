import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  const event = events.filter(ev =>
    ev._id === id
  );

  let listEventInfo = (
    <ul className="space-y-3">
    {event.map(ev => (
        <li key={ev._id} className="flex flex-col justify-left gap-x-6 p-3">

          <label className="label font-medium">Event Name</label>
              <p className="px-4 py-2 bg-base-200 border-base-400 rounded-sm border">{ev.eventName}</p>

          <label className="label font-medium">Event Location</label>
              <p className="px-4 py-2 bg-base-200 border-base-400 rounded-sm border">{ev.location}</p>

          <label className="label font-medium">Start Date</label>
              <p className="px-4 py-2 bg-base-200 border-base-400 rounded-sm border">{ev.startDate}</p>

          <label className="label font-medium">Start Time</label>
            <p className="px-4 py-2 bg-base-200 border-base-400 rounded-sm border">{ev.startTime}</p>

          <label className="label font-medium">End Date</label>
              <p className="px-4 py-2 bg-base-200 border-base-400 rounded-sm border">{ev.endDate}</p>

          <label className="label font-medium">End Time</label>
              <p className="px-4 py-2 bg-base-200 border-base-400 rounded-sm border">{ev.endTime}</p>
        </li>
    ))}
    </ul>)

  return(
    <div className="h-full pt-20">
      <div className="container flex flex-1 flex-col p-16 mx-auto bg-base-100/50">
          <div className="max-w-md justify-left space-y-6">

            <h1 className="text-2xl font-bold">Event Dashboard {id}</h1>

            {listEventInfo}

            <Link to={`/event/${id}/dashboard/site-plan`} className={`btn btn-primary btn-outline`}>
                <span>View Event Layout</span>
            </Link>
          
          </div>
      </div>
    </div>
  );
};

export default EventDashboardPage;
