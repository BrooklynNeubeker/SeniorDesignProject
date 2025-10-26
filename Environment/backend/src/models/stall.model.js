import mongoose, { Schema } from "mongoose";
//const menuItemSchema = require('./menuItem.model.js')

const stallSchema = new mongoose.Schema(
    {
        name: {
            type: String, // name of the stall
            required: true,
            default: ""
        },
        vendor: {
            type: String, //Which vendor owns the stall?
            // required: true,
            default: ""
        },
        description: {
            type: String,
            required: true,
            default: ""
        },
        // stallId: {
        //     type: mongoose.Schema.Types.ObjectId,
        // },
        stallNumber: {
            type: Number,//int,
            default: null
        },
        stallType: {
            type: String,
            default: ""
        },
        // menu: {
        //     //type: [menuItemSchema], //menu items will have an allergen field that can be added
        //     type: [Schema.Types.ObjectId], 
        //     ref: "MenuItem",
        //     default: null
        // },
        tagList:{ //things like dairy-free, vegan, etc
            type: [String],
            default: null
        },
        eventID: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
    },
    { timestamps: true }
);

const stall = mongoose.model("stall", stallSchema);

export default stall;