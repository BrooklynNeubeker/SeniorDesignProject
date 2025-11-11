import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {createEvent, getMyEvents, getEventById, deleteEvent, updateEvent, createStall, deleteStall, updateStall ,getMyStalls, createItineraryItem, deleteItineraryItem, getMyItineraryItems, getStall, } from "../controllers/event.controller.js";

const router = express.Router();

// event
router.post("/", protectRoute, createEvent); // create a route for the event controller createEvent, it will make a new database item and then send you to the page

router.get("/", protectRoute, getMyEvents); // gets events of current coordinator

router.get("/:eventId", protectRoute, getEventById)// gets event by mongoose object id

router.delete("/:id", protectRoute, deleteEvent); // deletes selected event

router.put("/:id", protectRoute, updateEvent);

// stall
router.post("/:id/stalls", protectRoute, createStall); //Creates a stall object for the database

router.delete("/:eventId/stalls/:stallId", protectRoute, deleteStall);// Deletes stalls by stallID

router.get("/:id/stalls", protectRoute, getMyStalls); //Get the stalls that match the eventID

router.get("/stalls/:stallId", getStall); // Gets the requested stall

router.put("/stalls/update/:stallId", protectRoute, updateStall) // Updates Stall

// itinerary
router.post("/", protectRoute, createItineraryItem); //Creates a stall object for the database

router.delete("/:id", protectRoute, deleteItineraryItem); // Deletes stalls by stallID

router.get("/", protectRoute, getMyItineraryItems); //Get the stalls that match the eventID








export default router;