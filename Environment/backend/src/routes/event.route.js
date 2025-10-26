import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {createEvent, getMyEvents, deleteEvent, createStall, deleteStall, getMyStalls} from "../controllers/event.controller.js";

const router = express.Router();

router.post("/", protectRoute, createEvent); // create a route for the event controller createEvent, it will make a new database item and then send you to the page

router.get("/", protectRoute, getMyEvents); // gets events of current coordinator

router.delete("/:id", protectRoute, deleteEvent); // deletes selected event

router.post("/", protectRoute, createStall); //Creates a stall object for the database

router.delete("/:id", protectRoute, deleteStall); // Deletes stalls by stallID

router.get("/", protectRoute, getMyStalls); //

export default router;