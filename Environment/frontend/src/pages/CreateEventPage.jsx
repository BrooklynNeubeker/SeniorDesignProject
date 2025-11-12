import { useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { OpenStreetMapProvider } from "leaflet-geosearch";


const CreateEventPage = () => {
  const provider = new OpenStreetMapProvider({
    params: {
      email: "annregalab@gmail.com",
    },
  });

  const {authUser} = useAuthStore();

  const [formData, setFormData] = useState({
    eventName: "",
    location: "",
    lat: "",
    lng: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    eventCoordinatorName: "",
    eventCoordinatorID: "",
  });
  const [searches, setSearches] = useState([]);

  const navigate = useNavigate();

  const handleSearch = async (query) => {
    //error checking 
    try {
      const results = await provider.search({ query });
      setSearches(results);
    } catch (err) {
      console.error("OSM search error:", err);
    }
  };

  const handleSelect = (search) => {
    //setting the data for lat/lng for formdata
    setFormData({
      ...formData,
      location: search.label,
      lat: search.y,
      lng: search.x,
    
    });
    setSearches([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     const payload = { 
        ...formData, 
        eventCoordinatorName: authUser?.email,
        eventCoordinatorID: authUser?._id,
       };
    try {
      const res = await axiosInstance.post("/events", payload);
      const createdEventId = res.data._id;
      alert("event created");
      navigate(`/event/${createdEventId}/dashboard`);
      console.log("created event:", res.data);
    } catch (err) {
      alert("error");
      console.error("create event failed:", err);
    }
  };

  return (
    <div className="h-screen pt-20">
      <div className="container flex flex-1 flex-col p-16 mx-auto bg-base-100/50">
        <div className="max-w-md justify-left space-y-6">
          <h1 className="text-2xl font-bold">Create Event</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Event name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Event Name</span>
              </label>
              <div className="relative">
                <input
                  className={`input input-bordered w-full`}
                  placeholder="Enter event name"
                  value={formData.eventName}
                  required={true}
                  onChange={(e) =>
                    setFormData({ ...formData, eventName: e.target.value })
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
                  placeholder="Enter event location"
                  value={formData.location}
                  onChange={async (e) => {
                    handleSearch(e.target.value);
                    setFormData({ ...formData, location: e.target.value });
                  }}
                />
                {/* Seearching */}
                {searches.length > 0 && (
                  <ul className="absolute bg-white border border-gray-300 w-full mt-1 rounded shadow-lg z-10">
                    {searches.map((result, idx) => (
                      <li
                        key={idx}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSelect(result)}
                      >
                        {result.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {/*saving the longitude and latitude*/}
              <input type="hidden" name="lat" value={formData.lat} />
              <input type="hidden" name="lng" value={formData.lng} />
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
                  placeholder="Enter start date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                />

                <input
                  type="time"
                  className={`input input-bordered w-full`}
                  placeholder="Enter start time"
                  value={formData.startTime}
                  onChange={(e) =>
                    setFormData({ ...formData, startTime: e.target.value })
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
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                />
                <input
                  type="time"
                  className={`input input-bordered w-full`}
                  placeholder="Enter end time"
                  value={formData.endTime}
                  onChange={(e) =>
                    setFormData({ ...formData, endTime: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button type="submit" className="btn btn-primary btn-outline">
                Submit Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


export default CreateEventPage;