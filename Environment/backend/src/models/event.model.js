import mongoose from "mongoose";
import User from "./user.model.js";
//May need to import the below things instead of how its setup

// const eventItinerarySchema = require('./eventItinerary.model.js') // a guide said to do this, I don't know for sure if it's implemented properly
// const eventMapSchema = require('./eventMap.model.js')
// const stallSchema = require('./stall.model.js')

const eventSchema = new mongoose.Schema(
    {
        eventName: {
            type: String, 
            required: true
        },
        // eventID: { // we can use mongoDB's generated id
        //     type: mongoose.Schema.Types.ObjectId,//mongoose.ObjectID, //I believe to populate this :  const event = new eventSchema(); event.eventId = new mongoose.Types.ObjectId()
        //     // required: true, -> think this must be set after creating the object, so it cannot be required
        //     unique: true
        // },
        location: {
            type: String,
            required:true,
            default: ""
        },
        // Start and end date so events can have ranges
        startDate: {
            type: String, 
            required: true,
            default: new Date().toISOString().slice(0,10)  // Gets the current date as a default
        },
        startTime: {
            type: String,
            default: ""
        },
        endDate: {
            type: String, 
            required: true,
            default: new Date().toISOString().slice(0,10)  //startDate //Defaults to the start date for one day events
        },
        endTime: {
            type: String,
            default: ""
        },
        // vendors: [{ 
        //     name: { type: String, required: true } 
        // }],
        // eventItinerary: {
        //     type: [eventItinerarySchema], //array of itinerary events
        //     default: null
        // },
        // eventMap: {
        //     type: eventMapSchema, //grabbing the map schema 
        //     default: null,
        //     unique: true
        // },
        eventCoordinatorName: {
            type: String,
            default: null
        },
        eventCoordinatorID: {
            type: mongoose.Schema.Types.ObjectId,//mongoose.ObjectID, // this should be the user id of the owner of the event
            default: null

        },
        
        // eventVendorList: {
        //     type: [eventVendorSchema],
        //     default: null
        // }
    },
    { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;