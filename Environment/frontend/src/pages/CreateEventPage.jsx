import { useState } from "react";
import { Link } from "react-router-dom";

const CreateEventPage = () => {
      const [formData, setFormData] = useState({
        name: "",
        location: "",
        start_date: "",
        start_time: "",
        end_date: "",
        end_time: "",
      });
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        login(formData);
      };

  
  return (
    <div className="h-screen pt-20">
        <div className="container flex flex-1 flex-col p-16 mx-auto bg-base-100/50">
            <div className="max-w-md justify-left space-y-6">

            <h1 className="text-2xl font-bold">Create Event</h1>
            
            {/* Event name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Event Name</span>
              </label>
              <div className="relative">
                <input
                  className={`input input-bordered w-full`}
                  placeholder="placeholder"
                  value={formData.name}
                  required={true}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
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
                  placeholder="placeholder"
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

            <Link to={"/event"} className={`btn btn-neutral btn-outline`}>
                <span>Create Event Layout</span>
            </Link>

            </div>
        </div>
    </div>
  );
};


export default CreateEventPage;