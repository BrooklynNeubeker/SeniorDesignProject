import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {createEvent, getMyEvents, deleteEvent, updateEvent, createStall, deleteStall, getMyStalls, 
    createItineraryItem, deleteItineraryItem, getMyItineraryItems, createEventMap, deleteEventMap, getMyEventMap, updateEventMap} from "../controllers/event.controller.js";

const router = express.Router();

// event
router.post("/", protectRoute, createEvent); // create a route for the event controller createEvent, it will make a new database item and then send you to the page

router.get("/", protectRoute, getMyEvents); // gets events of current coordinator

router.delete("/:id", protectRoute, deleteEvent); // deletes selected event

router.put("/:id", protectRoute, updateEvent);

// stall
router.post("/:id/stalls", protectRoute, createStall); //Creates a stall object for the database

router.delete("/:eventId/stalls/:stallId", protectRoute, deleteStall);// Deletes stalls by stallID

router.get("/:id/stalls", protectRoute, getMyStalls); //Get the stalls that match the eventID

// itinerary
router.post("/", protectRoute, createItineraryItem); //Creates a stall object for the database THESE ROUTE LINKS WILL HAVE TO CHANGE

router.delete("/:id", protectRoute, deleteItineraryItem); // Deletes stalls by stallID

router.get("/:id", protectRoute, getMyItineraryItems); //Get the stalls that match the eventID

//eventMap
router.post("/:id/site-plan", protectRoute, createEventMap); //Create an event map

router.delete("/:id/site-plan/", protectRoute, deleteEventMap); //Delete an event map

router.get("/:id/site-plan", protectRoute, getMyEventMap); //Get event maps

router.put("/:id/site-plan/:mapId", protectRoute, updateEventMap); //Update an event map





export default router;