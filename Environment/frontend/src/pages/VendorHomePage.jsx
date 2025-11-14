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
    const [loading, setLoading]= useState(true);
    const [events, setEvents] = useState({}); // key:eventID value:Event
    const [eventIdToStalls, setEventIdToStalls] = useState ({}); // key: eventID value: stalls for event[]

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
    // to define an events map(access event info) and the 
    // eventIdToStalls map(group stalls by eventID)
    const fetchEvents = async () => {
        
        const map = {};
        const eidToStalls = {}
        for (const stall of stalls) {
            if (stall?.eventID) {
                const res = await axiosInstance.get(`/events/${stall.eventID}`);
                map[stall.eventID] = res.data; 
                if(!eidToStalls[stall.eventID]){
                    eidToStalls[stall.eventID] = []
                }
                eidToStalls[stall.eventID].push(stall)  
            }
        }
        setEvents(map); // for accessing event model information
        setEventIdToStalls(eidToStalls); // for grouping stalls by events
        setLoading(false);
        
    };
    useEffect(() => { fetchEvents(); }, [stalls]);
    useEffect(() => { console.log("events:", events) });

    // Displays which step in the onboarding status the Vendor is at
    const onboardingStatusComponent = (onboardingStatus) => {
        switch (onboardingStatus) {
        case "noInvite":
            return (
            <span className="label-text font-bold text-error"> Uncontacted </span>
            );
        case "inviteSent":
            return (
            <span className="label-text font-bold text-warning"> Pending...</span>
            );
        case "vendorRegistered":
            return (
            <span className="label-text font-bold text-success"> Registered </span>
            );
        default:
            return (
            <span className="label-text font-bold"> Error </span>
            );

        }
    };
    
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
        // Original logic only mapped the eventID to a single stall
        // Object.entries converts the eventIdToStalls into an array of 
        // [key:eventID, value:stallsForEvent[]] the map() call then iterates
        // through each index in the array: 
        //    passes the eventID to the events map, getting our event info for header
        //    then add a row to the table per index in the stallsForEvent
        listStalls = (
        <div className="space-y-10">
            {Object.entries(eventIdToStalls).map(([eventID, stallsForEvent]) => {
                const event = events[eventID];
                return (
                    <div key={eventID} className="max-w-xl mx-auto rounded">
                        {/* Event Header */}
                        <div className="mb-3 border-b pb-1">
                            <h2 className="text-xl font-bold text-center">{event.eventName}</h2>
                            <p className="text-lg text-center text-base-content/70">
                                {event.location}
                                {" "}
                                {new Date(event.startDate).toLocaleDateString()}
                            </p>
                        </div>

                        {/* Table for stalls in this event */}
                        <div className="overflow-auto rounded-md border border-base-300">
                            <table className="table table-sm w-full">
                                <thead className="bg-base-200 sticky top-0">
                                <tr>
                                    <th className="text-left">Stall</th>
                                    <th className="text-left">Email</th>
                                    <th className="text-left">Onboarding Status</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {stallsForEvent.map((stall) => (
                                    <tr key={stall._id} className="hover:bg-base-100/50">
                                        <td className="py-2 whitespace-nowrap">{stall.name}</td>
                                        <td className="py-2 whitespace-nowrap">{stall.email}</td>
                                        <td className="py-2 whitespace-nowrap" >{onboardingStatusComponent(stall.onboardingStatus)}</td>
                                        <td className="py-2 whitespace-nowrap text-right">
                                            <Link
                                                to={`/vendor/register-stall/${stall._id}`}
                                                className="btn btn-xs btn-outline btn-primary"
                                            >
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            })}
        </div>
        );
    }
    
    if(loading){ 
        <div className="min-h-[200px] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary" />
        </div>
    }else{
        return (
            <div className="h-screen pt-20">
                    <div className="container flex flex-1 flex-col p-16 mx-auto bg-base-100/50">
                        <div className="max-w-xl justify-left space-y-6">
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold mt-2">
                                    Welcome back, {authUser?.fullname}!
                                </h1>
                                <h1 className="text-2xl font-bold mt-5">
                                    Events:
                                </h1>
                                <div className="mt-5">
                                    {listStalls}  
                                </div>          
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
};

export default VendorHomePage