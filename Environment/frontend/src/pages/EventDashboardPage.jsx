import { useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const EventDashboardPage = () => {
  const { id } = useParams(); // id = :id in route
  console.log("Loaded event ID:", id);
  const navigate = useNavigate();

  return(
    <div className="h-full pt-20">
              <div className="container flex flex-1 flex-col p-16 mx-auto bg-base-100/50">
                  <div className="max-w-md justify-left space-y-6">

                  <h1 className="text-2xl font-bold">Event Dashboard {id}</h1>
                  <Link to={`/event/${id}/dashboard/site-plan`} className={`btn btn-primary btn-outline`}>
                      <span>View Event Layout</span>
                  </Link>
                  </div>
            </div>
    </div>
  );
};

export default EventDashboardPage;
