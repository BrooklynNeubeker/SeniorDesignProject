import Event from "../models/event.model.js";
import eventItinerary from "../models/eventItinerary.model.js";
import eventMap from "../models/eventMap.model.js";
import stall from "../models/stall.model.js";
import menuItem from "../models/menuItem.model.js";
import jwt from "jsonwebtoken"; // Don't think we need this

//Make an event object and save it to the database. Must pass event name, location, start date, start time, end date, and end time.
export const createEvent = async (req, res) => {
    //const {eventName, eventID, location, startDate, startTime, endDate, endTime, eventMap, eventCoordinatorName, eventCoordinatorID} = req.body; // get event stuff
    const{eventName, location, startDate, startTime, endDate, endTime,vendors, eventCoordinatorName,eventCoordinatorID} = req.body
    try {
        // if (!eventName || !eventID || !location || !startDate || !startTime || !endDate || !endTime || !eventMap || !eventCoordinatorName || !eventCoordinatorID){
        //     return res.status(400).json({message: "All fields are required"}); // If any of these are empty, they must be filled
        // }
        const newEvent = new Event ({ // Create the newEvent with the filled fields. Currently require all, may change this
            eventName: eventName,
            //eventID: eventID,
            location: location,
            startDate: startDate,
            startTime: startTime,
            endDate: endDate,
            endTime: endTime,
            //eventMap: eventMap,
            eventCoordinatorName: eventCoordinatorName,
            eventCoordinatorID: eventCoordinatorID,
            // vendors: vendors,
        });
        const savedEvent = await newEvent.save(); // save to database
        res.status(201).json(savedEvent); // pass back the new mongoose object in the data
        }
    catch (error) {
        console.log("Error in create event controller", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
};


export const deleteEvent = async (req, res) => {
    try {
        //console.log("DELETE /events/:id", { params: req.params, req.body }); // debug

        const { id } = req.params; 

        const event = await Event.findByIdAndDelete(id);
        if (!event) {
        return res.status(404).json({
            success: false,
            message: "Event not found",
        });
        }

        return res.status(200).json({
        success: true,
        message: "Event deleted successfully",
        });
    }catch(error){
        console.error("Error deleting event:", error);
        return res.status(500).json({
        success: false,
        message: error.message,
        });
    }
};


export const getMyEvents = async (req, res) => {
  try {
    const userId = req.user._id; 
    const events = await Event
      .find({ eventCoordinatorID: userId })
      .sort({ createdAt: -1 }); // newest first
    res.status(200).json(events);
  } catch (error) {
    console.error("getMyEvents error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// export const updateEvent = async (req, res) => {
    
// };

// export const addStall = async (req, res) => {
    
// };

// export const removeStall = async (req, res) => {

// };

// export const addEventItineraryItem = async (req,res) => {

// };


// export const removeEventItineraryItem = async (req,res) => {

// };

// export const setEventMap = async (req,res) => {
//     const {map} = req.body;

// };

// export const deleteEventMap = async(req, res) => {

// };
