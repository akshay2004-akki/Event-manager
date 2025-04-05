import { Router } from "express"
import { createEvent , getEvent } from "../controllers/event.controller.js";
const router = Router();

router.post('/createEvent', createEvent);
router.get('/getEvent' , getEvent)

export default router