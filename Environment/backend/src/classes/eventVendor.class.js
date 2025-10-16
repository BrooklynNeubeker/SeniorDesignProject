import {event} from './event.class.js'

class eventVendor extends event{
    constructor(name, vendor, description, stallID, stallNumber,foodSold){
        this.name = name;
        this.vendor = vendor;
        this.description = description;
        this.stallID = stallID;
        this.stallNumber = stallNumber;
        this.foodSold = foodSold;
        this.menu = [];
        this.dietaryCompliance = [];
    }

    // Set the name of the stall. Name should be a string. This cannot be the empty string.
    setStallName(name){
        if (name === ""){
            console.warn("Stall requires a name");
        } else {
            this.name = name;
        }
    }
    //Set the vendor name(which company owns the stall). This should be a string, or empty string.
    setVendorName(name){
        this.vendor = name;
    }
    // Set the description of the stall. This should be a string.
    setDescription(description){
        this.description = description;
    }
    // Set the stall number
    setStallNumber(num){
        this.stallID = num;
    }
    //Set the foodSold boolean, true for a food stall, false for a non food stall.
    setFoodSold(sold){
        this.foodSold = sold;
    }
    //Add menu item
    addMenuItem(menuItem){

    }
    //Remove menu item
    removeMenuItem(menuItem){

    }
    addDietaryCompliance(dietcomp){

    }
    removeDietaryCompliance(dietcomp){

    }
}