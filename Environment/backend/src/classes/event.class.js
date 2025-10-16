import {eventItinerary} from './eventItinerary.class.js'
import {eventVendor} from './eventVendor.class.js'

class event {
    constructor(eventName, eventId, startDate, endDate, eventMap, eventCoordinator){
        this.eventName = eventName;
        this.eventId = eventId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.eventItineraryList = []; // array of itinerary items (each event)
        this.eventMap = eventMap;
        this.eventCoordinator = eventCoordinator;
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
        if (oneEventItinerary instanceof eventItinerary){
            this.eventItineraryList.push(oneEventItinerary);
        } else {
            console.warn("Attempted to push a non itinerary object to itinerary list.");
        }
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
}