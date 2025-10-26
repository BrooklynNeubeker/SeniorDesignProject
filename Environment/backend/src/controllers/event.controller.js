import Event from "../models/event.model.js";
import eventItinerary from "../models/eventItinerary.model.js";
import eventMap from "../models/eventMap.model.js";
import stall from "../models/stall.model.js";
import menuItem from "../models/menuItem.model.js";
import jwt from "jsonwebtoken"; // Don't think we need this

//Make an event object and save it to the database. Must pass event name, location, start date, start time, end date, and end time.
export const createEvent = async (req, res) => {
    const {eventName, eventID, location, startDate, startTime, endDate, endTime, eventMap, eventCoordinatorName, eventCoordinatorID} = req.body; // get event stuff

    try {
        if (!eventName || !eventID || !location || !startDate || !startTime || !endDate || !endTime || !eventMap || !eventCoordinatorName || !eventCoordinatorID){
            return res.status(400).json({message: "All fields are required"}); // If any of these are empty, they must be filled
        }
        const newEvent = new Event ({ // Create the newEvent with the filled fields. Currently require all, may change this
            eventName: eventName,
            eventID: eventID,
            location: location,
            startDate: startDate,
            startTime: startTime,
            endDate: endDate,
            endTime: endTime,
            eventMap: eventMap,
            eventCoordinatorName: eventCoordinatorName,
            eventCoordinatorID: eventCoordinatorID
        });
        const savedEvent = await newEvent.save(); // save to database
        res.status(201).json(savedEvent); // pass back the new mongoose object in the data
        }
    catch (error) {
        console.log("Error in create event controller", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
};

//Delete an event based on eventID. We should consider whether we want this to be eventId or _id. _id is the mongoDB object, eventID is the field in the document
export const deleteEvent = async (req, res) => {
    const {id} = req.body;
    try {
        await Event.deleteOne({eventId: id}); // Try to delete based on ID

        return res.status(410).json({
        success:true,
        message: "Event deleted successfully"
    })
    } catch (error) { // Else throw an error
        return res.status(412).send({
            success: false,
            message: error.message
        })
    }
};

export const updateEvent = async (req, res) => {
    
};

export const addStall = async (req, res) => {
    
};

export const removeStall = async (req, res) => {

};

export const addEventItineraryItem = async (req,res) => {

};


export const removeEventItineraryItem = async (req,res) => {

};

export const setEventMap = async (req,res) => {
    const {map} = req.body;

};

export const deleteEventMap = async(req, res) => {

};
