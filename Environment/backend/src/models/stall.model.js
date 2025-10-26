import mongoose, { Schema } from "mongoose";
const menuItemSchema = require('./menuItem.model.js')

const stallSchema = new mongoose.Schema(
    {
        name: {
            type: String, // name of the stall
            required: true,
            default: ""
        },
        vendor: {
            type: String, //Which vendor owns the stall?
            required: true,
            default: ""
        },
        description: {
            type: String,
            required: true,
            default: ""
        },
        stallId: {
            type: mongoose.ObjectID
        },
        stallNumber: {
            type: int,
            default: null
        },
        foodSold: {
            type: Boolean,
            default: False
        },
        menu: {
            type: [menuItemSchema], //menu items will have an allergen field that can be added
            default: null
        },
        dietaryComplianceList:{ //things like dairy-free, vegan, etc
            type: [String],
            default: null
        },
        eventID: {
            type: mongoose.ObjectID,
            required: true
        }
    },
    { timestamps: true }
);

const stall = mongoose.model("stall", stallSchema);

export default stall;