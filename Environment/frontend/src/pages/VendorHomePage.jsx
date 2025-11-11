import { useEffect, useState } from 'react'
import { useAuthStore } from "../store/useAuthStore";
import {  Link } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
/** 
 * @brief Vendor version of EventDashboard. Able to view all assigned stalls
 *        and their corresponding events.
 * @route /vendor
 * @note Would like to return to add a sort by event date feature
 * @navigation View button to /vendor/register-stall/:stallId
 * */
const VendorHomePage = () => {
    //get user
    const { authUser, isCheckingAuth } = useAuthStore();
    console.log(authUser);
    const [stalls, setStalls] = useState([]);
    const [loadingStalls, setLoadingStalls] = useState(true);
    const [events, setEvents] = useState({});

    //authUser?.stalls holds an array of all stallId's assigned to the User
    //We use the following to do a search for each stall in parallel
    //(backend call does one search at a time)
    useEffect(() => {
        if (!authUser?.stalls?.length) return; // if user has no assigned stalls 

        const fetchStalls = async () => {
        try {
            const stallObjects = await Promise.all(
                authUser.stalls.map(async (stallId) => {
                    const res = await axiosInstance.get(`/events/stalls/${stallId}`);
                    return res.data;
                })
            );
            setStalls(stallObjects);
        } catch (err) {
            console.error("Failed to fetch stall:", err);
        } finally {
            setLoadingStalls(false);
        }
        };

        fetchStalls();
    }, [authUser?.stalls]);

    // Once we have the stalls returned from fetchStalls we use each stall.eventID
    // to define an events map
    const fetchEvents = async () => {
        const map = {};
        for (const stall of stalls) {
        if (stall.eventID) {
            const res = await axiosInstance.get(`/events/${stall.eventID}`);
            map[stall.eventID] = res.data;
        }
        }
        setEvents(map);
        
    };
    useEffect(() => { fetchEvents(); }, [stalls]);

    // The console in the web inspector shows that the console.log on line 14
    // attempt to run a couple of times before useAuthStore funcs actually finish,
    // returning a null value for authUser
    // there is probably a better/more conventional way of dealing with this but
    // this seems to work for now
    if (isCheckingAuth) {
        return (
        <div className="min-h-screen grid place-items-center">
            <span className="loading loading-spinner loading-lg" />
        </div>
        );
    }
    if (!authUser) {
        return null;
    }
    
    let listStalls;

    if( loadingStalls){
        listStalls = (
            <div className="min-h-[200px] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary" />
            </div>
        )
    }else if (stalls.length === 0 ){
        listStalls = (
            <div className="min-h-[200px] flex items-center justify-center">
                <p className="text-base-content/60">No stalls yet.</p>
            </div>
        )
    }else {
        listStalls = (
        <div className="overflow-auto max-h-80 max-w-lg rounded-md">
            <table className="table table-sm w-full">
                <thead className="bg-base-200 sticky top-0">
                <tr>
                    <th className="text-left">Event</th>
                    <th className="text-left">Stall</th>
                </tr>
                </thead>
                <tbody>
                {stalls.map((stall) => {
                    const event = events[stall.eventID];
                    return (
                    <tr key={stall._id} className="align-top hover:bg-base-100/50">
                        {/* Event Column */}
                        <td className="py-3">
                        <div className="flex flex-col">
                            <span className="font-semibold text-base">
                                {event?.eventName}
                            </span>
                            <span className="text-sm text-base-content/70">
                                {event?.location}
                            </span>
                            <span className="text-xs text-base-content/60">
                                {new Date(event?.startDate).toLocaleDateString()}
                            </span>
                        </div>
                        </td>
                        {/* Stall Column */}
                        <td className="py-3">
                            <div className="flex items-center justify-between gap-4">
                                <span className="font-medium">{stall.name}</span>
                                <Link to={`/vendor/register-stall/${stall._id}`} className="btn btn-outline btn-primary">
                                    View
                                </Link>
                            </div>
                        </td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
        )
    }
 
  return (
       <div className="h-screen pt-20">
            <div className="container flex flex-1 flex-col p-16 mx-auto bg-base-100/50">
              <div className="max-w-md justify-left space-y-6">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold mt-2">
                        Welcome back, {authUser?.fullname}!
                        </h1>           
                    </div>
                </div>
                {listStalls}
            </div>
        </div>
    );
};

export default VendorHomePage