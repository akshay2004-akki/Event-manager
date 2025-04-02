import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cors from 'cors'
import passport from 'passport'
import LocalStrategy from 'passport-local';
import {User} from './models/user.model.js'

const app = express()

app.use(express.json({limit:"20kb"}))
app.use(express.urlencoded({extended:true, limit:"20kb"}))
app.use(express.static("public"))
app.use(cors({credentials:true, origin:"http://localhost:5173"}))
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
  new LocalStrategy(async(username, password, done)=>{
    const user = await User.findOne({username})
    if (!user) return done(null, false, { message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return done(null, false, { message: "Invalid credentials" });

    return done(null, user);
  })
)

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

export default app;