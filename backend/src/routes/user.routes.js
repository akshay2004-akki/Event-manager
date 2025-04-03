import { Router } from "express"
import { register, login } from "../controllers/user.controller.js";
import passport from "passport";

const router = Router();

router.post("/register", register)
router.post("/login", passport.authenticate("local"), login )

export default router;