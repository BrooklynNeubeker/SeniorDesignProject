import { useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { SquarePen, MapPin, Calendar } from "lucide-react";

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
      <div className="min-h-screen pt-20 bg-base-200">
        <div className="max-w-2xl mx-auto p-4 py-8">
          <div className="bg-base-100 rounded-xl p-6 space-y-8">

              <div className="text-center mb-14">
                <h1 className="text-3xl font-semibold ">Create a New Event</h1>
                <p className="mt-2">Start by first creating a new event!</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 flex flex-col gap-3">
              
              {/* Event name */}
              <div className="form-control">
                <label className="label space-y-1.5 text-sm flex items-center gap-2">
                  <SquarePen className="w-4 h-4" />
                  <span className="font-medium pb-2 text-base-content">Event Name</span>
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
                <label className="label space-y-1.5 text-sm flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium pb-2 text-base-content">Event Location</span>
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
                <label className="label space-y-1.5 text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium pb-2 text-base-content">Start Date</span>
                </label>
                <div className="relative flex flex-col gap-2">
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
                <label className="label space-y-1.5 text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium pb-2 text-base-content">End Date</span>
                </label>
                <div className="relative flex flex-col gap-2">
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
              <button type="submit" className="btn btn-primary">
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