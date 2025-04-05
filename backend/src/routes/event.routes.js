import { Router } from "express"
import { createEvent , getEvent, getEventById } from "../controllers/event.controller.js";
const router = Router();

router.post('/createEvent', createEvent);
router.get('/getEvent' , getEvent)
router.get("/:eventid", getEventById)

export default router