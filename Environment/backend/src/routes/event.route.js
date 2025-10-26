import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {createEvent, getMyEvents, deleteEvent} from "../controllers/event.controller.js";

const router = express.Router();

router.post("/", protectRoute, createEvent); // create a route for the event controller createEvent, it will make a new database item and then send you to the page

router.get("/", protectRoute, getMyEvents); // gets events of current coordinator

router.delete("/:id", protectRoute, deleteEvent); // deletes selected event


export default router;