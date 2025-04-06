import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cors from 'cors'
import passport from 'passport'
import LocalStrategy from 'passport-local';
import {User} from './models/user.model.js'
import dotenv from 'dotenv'

dotenv.config({path:".env"})

const app = express()

app.use(express.json({limit:"20kb"}))
app.use(express.urlencoded({extended:true, limit:"20kb"}))
app.use(express.static("public"))
app.use(cors({credentials:true, origin:process.env.CORS_ORIGIN, methods:["GET", "POST", "PUT", "DELETE"]}))


app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 90, // 👈 3 months
      httpOnly: true,
      secure: false, // set true only if using HTTPS
      sameSite: "lax",
    },
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


app.use((req, res, next) => {
  console.log("Session user:", req.user); // 👈 this should log on every request
  next();
});

 
import userRoutes from './routes/user.routes.js'
import eventRouter from './routes/event.routes.js'
import chatRouter from './routes/chat.routes.js'
app.use("/api/users", userRoutes)
app.use("/api/event" , eventRouter)
app.use("/api/chat", chatRouter)

export default app;