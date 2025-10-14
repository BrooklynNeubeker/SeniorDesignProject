import mongoose, { Schema } from "mongoose";

const menuItemSchema = new mongoose.Schema(
    {
        dishName: {
            type: String,
            required: true,
            default: ""
        },
        ingredients: {
            type: [String], //Which vendor owns the stall?
            default: null
        },
        description: {
            type: String,
            required: true,
            default: ""
        },
        allergens: {
            type: [String],
            default: null
        },
        price: {
            type: int,
            default: null
        }
    },
    { timestamps: true }
);

const menuItem = mongoose.model("menuItem", menuItemSchema);

export default menuItem;