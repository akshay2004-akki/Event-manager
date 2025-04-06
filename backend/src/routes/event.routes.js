import { Router } from "express"
import { createEvent , getEvent, getEventById, registerForEvent, getRegisteredEvent } from "../controllers/event.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router.post('/createEvent', upload.single("eventImage") ,createEvent);
router.get('/getEvent' , getEvent)
router.get("/:eventid", getEventById)
router.post("/registerEvent/:eventid", isAuthenticated, registerForEvent)
router.post("/get-registered-events", getRegisteredEvent)

export default router