import { useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const CreateEventPage = () => {
    const { authUser } = useAuthStore();
    const [formData, setFormData] = useState({
      eventName: "",
      location: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      eventCoordinatorName: "",
      eventCoordinatorID: "",
    });
    
    const navigate = useNavigate();

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
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
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