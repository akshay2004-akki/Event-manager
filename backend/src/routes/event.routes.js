import { Router } from "express"
import { createEvent , getEvent } from "../controllers/event.controller";
const router = Router();

router.post('/createEvent', createEvent);
router.get('/getEvent' , getEvent)

export default router