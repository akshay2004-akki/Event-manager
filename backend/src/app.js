import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import passport from 'passport'
import LocalStrategy from 'passport-local';
import {User} from './models/user.model.js'
import dotenv from 'dotenv'

dotenv.config({path:".env"})

const app = express()

app.use(express.json({limit:"20kb"}))
app.use(express.urlencoded({extended:true, limit:"20kb"}))
app.use(express.static("public"))
app.use(cors({credentials:true, origin:process.env.CORS_ORIGIN}))


app.use(
    session({
      secret: process.env.SESSION_KEY, // Change this to a secure key
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }), // Store sessions in MongoDB
      cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 90 }, // 1-hour session
    })
);

app.use(passport.initialize()); 
app.use(passport.session());

passport.use(
  new LocalStrategy({ usernameField: "email", passwordField: "password" }, async (email, password, done) => {
    const user = await User.findOne({ email }).select("+password");
    console.log(user);
    console.log(password);
    
    
    if (!user) {
      console.warn("⚠️ User Not Found");
      return done(null, false, { message: "User not found" });
    }
    
    const isMatch = await user.comparePassword(password, user.password); 
    console.log(isMatch);
    
    if (!isMatch) {
      console.warn("⚠️ Incorrect Password");
      return done(null, false, { message: "Invalid credentials" });
    }

    console.log("✅ Login Successful:", user.email);
    return done(null, user);
  })
);


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

import userRoutes from './routes/user.routes.js'
import eventRouter from './routes/event.routes.js'

app.use("/api/users", userRoutes)
app.use("/api/event" , eventRouter)

export default app;