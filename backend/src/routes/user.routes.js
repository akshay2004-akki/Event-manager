import { Router } from "express"
import { register, login } from "../controllers/user.controller.js";
import passport from "passport";

const router = Router();

router.post("/register", register)

router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return next(err); // If an error occurs, pass it to Express error handler
        if (!user) return res.status(400).json({ error: info.message }); // Send error response

        req.logIn(user, (err) => {
            if (err) return next(err); // Handle session error
            return res.json({ message: "Login successful", user });
        });
    })(req, res, next);
});

router.post("/logout", (req, res) => {
    req.logout((err) => {
      if (err) return res.status(500).json({ error: "Logout failed" });
      req.session.destroy();
      res.json({ message: "Logout successful" });
    });
  });


export default router;