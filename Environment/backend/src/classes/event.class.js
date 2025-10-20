import mongoose from "mongoose"
import Event from '../models/event.model.js'
import {eventItinerary} from './eventItinerary.class.js'
import {eventVendor} from './eventVendor.class.js'

class event {
    constructor(eventName, startDate, startTime, endDate, endTime, eventCoordinatorName, eventCoordinatorID){
        this.eventName = eventName;
        this.eventId = null; // Want the ID to be the same as the one generated for the database object, so we will hold off for now
        this.startDate = startDate;
        this.startTime = startTime;
        this.endDate = endDate;
        this.endTime = endTime;
        this.eventItineraryList = []; // array of itinerary items (each event)
        this.eventMap = null;
        this.eventCoordinatorName = eventCoordinatorName; // pass the user fullname!
        this.eventCoordinatorID = eventCoordinatorID; // PASS THE USER ID from database: user.id_ 
        this.eventVendorList = []; // array to hold vendor list
    }


    displayMap(){
        //TBD?
    }
    exportMap(){
        //TBD?
    }
    // add an event to the itinerary
    addEventItinerary(oneEventItinerary) {
        if (oneEventItinerary instanceof eventItinerary){ // push the event itinerary class object to the class
            this.eventItineraryList.push(oneEventItinerary);
        } else {
            console.warn("Attempted to push a non itinerary object to itinerary list in the class.");
        }
        // Now we create a event itinerary document and add it to the db, 

        // var newEventItinerary
    }
    //remove this item form the list of itineraries
    removeEventItinerary(oneEventItinerary){
        const index = this.eventItineraryList.indexOf(oneEventItinerary);
        if(index > -1){
            this.oneEventItinerary.splice(index, 1);
        }
        // console.log(this.eventItineraryList);
    }
    // add a vendor to the list of vendors
    addEventVendor(oneVendor){
        if (oneVendor instanceof eventVendor){
            this.eventVendorList.push(oneVendor);
        } else {
            console.warn("Attempted to add a non vendor object to vendor list.");
        }
    }
    // Remove a vendor from the list of vendors
    removeEventVendor(oneVendor){
        const index = this.eventVendorList.indexOf(oneVendor);
        if (index > -1){
            this.eventVendorList.splice(index, 1);
        }
        // console.log(this.eventVendorList);
    }
    // display the itinerary
    displayItinerary(){
        this.eventItineraryList.forEach(object => {
            //can change this to whatever we need to do to display
            console.log('Name: ' + object.name + '\nLocation: ' + object.location + '\nStart Time: ' + object.startTime + '\nEnd Time: ' + object.endTime + '\nDescription: ' + object.description);
        });
    }
    exportItinerary(){
        //TBD
    }
    setEventName(name){
        this.name = name;
    }
    // Set the start and end date of an event. 
    setEventDate(start, end){
        this.startDate = start;
        this.endDate = end;
    }
    setEventCoordinator(Coordinator){
        this.eventCoordinator = Coordinator;
    }
    setEventMap(map){
        this.eventMap = map;
    }

    // Creates a new document for the event schema and stores the current values of the class object into it. Returns the document.
    // pass the user ID obtained from uAuthStore, so that each event contains a user ID that matches the owner.
    async createNewEventDocument(user_id){

        var newEvent = new Event({eventName: this.eventName, startDate: this.startDat}); // Create a new document for the database
        newEvent.eventId = newEvent.id; // Store the mongoose object ID into the schema ID, the id is generated after the item is created
        this.eventID = newEvent.id; //Also save it to the current class object in case we do more with it at the moment
        newEvent.endDate = this.endDate;
        newEvent.endTime = this.endTime;
        newEvent.eventMap = this.eventMap;
        newEvent.eventCoordinatorName = this.eventCoordinatorName;
        newEvent.eventCoordinatorID = user_id;
        //WE DONT ACTUALLY WANT THIS FILLED HERE, will have the addVendor function do this to add vendors one by one.
        // Push items into the db:
        // How to handle subdocuments.... hmmmmmm
        // this.eventItineraryList.forEach(object => {
        //     newEvent.eventItinerary.push(object); // object is a class object, do we need to make schemas all the way down??
        // })
        // this.eventVendorList.forEach(object => {
        //     newEvent.eventVendorList.push(object);
        // })
        await newEvent.save();
        return newEvent;
    }
    // Save our event into the database
    // Pass the document to be saved.
    async saveNewEventObject(eventMongooseDocument){
        await eventMongooseDocument.save();
    }
    // Will update the event document with the current fields in the class
    updateEventDocument(){

    }
}