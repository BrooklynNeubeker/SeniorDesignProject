import mongoose from "mongoose";
import User from "./user.model.js";
//May need to import the below things instead of how its setup

const eventItinerarySchema = require('./eventItinerary.model.js') // a guide said to do this, I don't know for sure if it's implemented properly
const eventMapSchema = require('./eventMap.model.js')
const eventVendorSchema = require('./eventVendor.model.js')

const eventSchema = new mongoose.Schema(
    {
        eventName: {
            type: String, 
            required: true
        },
        eventId: {
            type: mongoose.ObjectID, //I believe to populate this :  const event = new eventSchema(); event.eventId = new mongoose.Types.ObjectId()
            required: true,
            unique: true
        },
        // Start and end date so events can have ranges
        startDate: {
            type: String, 
            required: true,
            default: new Date().toISOString().slice(0,10)  // Gets the current date as a default
        }, 
        endDate: {
            type: String, 
            required: true,
            default: startDate //Defaults to the start date for one day events
        },
        eventItinerary: {
            type: [eventItinerarySchema], //array of itinerary events
            default: null
        },
        eventMap: {
            type: eventMapSchema, //grabbing the map schema 
            default: null,
            unique: true
        },
        eventCoordinator: {
            type: User,
            required: true,
            default: null
        },
        eventVendorList: {
            type: [eventVendorSchema],
            default: null
        }
    },
    { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;