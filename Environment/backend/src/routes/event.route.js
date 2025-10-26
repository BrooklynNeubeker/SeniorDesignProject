import express from "express";
import {createEvent, deleteEvent} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/event", createEvent); // create a route for the event controller createEvent, it will make a new database item and then send you to the page

router.post("/", deleteEvent); // deletes event, goes back to homepage for simplicity

export default router;