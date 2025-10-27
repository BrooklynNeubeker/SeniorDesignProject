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
      start_date: "",
      start_time: "",
      end_date: "",
      end_time: "",
      eventCoordinatorName: "",
      eventCoordinatorID: "",
    });
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      const payload = { 
        ...formData, 
        // vendors,
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
  

    // const [vendors, setVendors] = useState([{ id: crypto.randomUUID(), name: "" }]);

    // const addVendor = () =>
    //   setVendors(v => [...v, { id: crypto.randomUUID(), name: "" }]);

    // const removeVendor = (id) =>
    //   setVendors(v => v.filter(row => row.id !== id));

    // const updateVendor = (id, value) =>
    //   setVendors(v => v.map(row => (row.id === id ? { ...row, name: value } : row)));
      
    return (
      <div className="h-full pt-20">
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
                    placeholder="placeholder"
                    value={formData.start_date}
                    onChange={(e) =>
                      setFormData({ ...formData, start_date: e.target.value })
                    }
                  />
                  <input
                    type="time"
                    className={`input input-bordered w-full`}
                    placeholder="placeholder"
                    value={formData.start_time}
                    onChange={(e) =>
                      setFormData({ ...formData, start_time: e.target.value })
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
                    placeholder="placeholder"
                    value={formData.end_date}
                    onChange={(e) =>
                      setFormData({ ...formData, end_date: e.target.value })
                    }
                  />
                  <input
                    type="time"
                    className={`input input-bordered w-full`}
                    placeholder="placeholder"
                    value={formData.end_time}
                    onChange={(e) =>
                      setFormData({ ...formData, end_time: e.target.value })
                    }
                  />
                </div>
              </div>
              
              {/* Vendors
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="label">
                    <span className="label-text font-medium">Vendors</span>
                  </label>
                  <button
                    type="addVendor"
                    className="btn btn-sm btn-outline"
                    onClick={addVendor}
                  >
                    + Add Vendor
                  </button>
                </div>

                <div className="space-y-4">
                  {vendors.map((v) => (
                    <div
                      key={v.id}
                      className="rounded-lg border border-base-300 p-4 space-y-3"
                    >
                      <input
                        className="input input-bordered w-full"
                        placeholder="Vendor name"
                        value={v.name}
                        onChange={(e) => updateVendor(v.id, e.target.value)}
                      />
                      <div className="text-right">
                        <button
                          type="removeVendor"
                          className="btn btn-xs btn-error btn-outline"
                          onClick={() => removeVendor(v.id)}
                          disabled={vendors.length === 1}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div> */}
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