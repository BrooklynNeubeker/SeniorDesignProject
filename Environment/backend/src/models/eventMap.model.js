import mongoose, { Schema } from "mongoose";

//This will likely hold the things needed to generate a geoJSON?
const eventMapSchema = new mongoose.Schema(
    {
        eventLocation: {
            type: [float],
            required: true,
            default: null
        },
        eventArea: {
            type: [float],
            required: true,
            default: null
        },
        // baseMap: {

        // }
    },
    { timestamps: true }
);

const eventMap = mongoose.model("eventMap", eventMapSchema);

export default eventMap;