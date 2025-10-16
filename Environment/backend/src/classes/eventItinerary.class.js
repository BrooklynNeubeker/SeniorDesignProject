
import {event} from './event.class'

class eventItinerary extends event(){
    constructor(name, location, startTime, endTime, description){
        this.name = name;
        this.location = location;
        this.startTime = startTime;
        this.endTime = endTime;
        this.description = description;
    }


    //Method functions so that these can be changed after construction
    
    //Set the name of an itinerary event (string)
    setItineraryEventName(name){
        this.name = name;
    }
    //Set the location of an itinerary event (string)
    setItineraryEventLocation(location){
        this.location = location;
    }
    //Set the start and end time of an itinerary event (string,string)
    setItineraryTime(start, end){
        //Need to add some error checking for formatting, either here or on page itself?
        this.startTime = start;
        this.endTime = end;
    }
    // Set the description of an itinerary event(description)
    setItineraryDescription(description){
        this.description = description;
    }
}