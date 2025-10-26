import mongoose, { Schema } from "mongoose";

//This will likely hold the things needed to generate a geoJSON?
//Will need: Markers with type, coordinates, descriptons? zoom level, and starting center coordinate for display
const eventMapSchema = new mongoose.Schema(
    {
        eventLocation: {
            type: [Number/*float*/],
            required: true,
            default: null
        },
        eventArea: {
            type: [Number/*float*/],
            required: true,
            default: null
        },
        eventID: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
        // baseMap: {

        // }
    },
    { timestamps: true }
);

const eventMap = mongoose.model("eventMap", eventMapSchema);

export default eventMap;