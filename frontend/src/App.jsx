import CTASection from "./Components/CTASection.jsx"
import Empowering from "./Components/Empowering.jsx"
import Features from "./Components/Features.jsx"
import Hero from "./Components/Hero.jsx"
import Navbar from "./Components/Navbar.jsx"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Team from "./Components/Team.jsx"
import FAQ from "./Components/FAQ.jsx"
import Footer from "./Components/Footer.jsx"
import EventsPage from "./Components/EventsPage.jsx"
import CreateEvents from "./Components/CreateEvents.jsx"
import EventDetails from "./Components/EventDetails.jsx"
import Login from "./Components/Login.jsx"
// import Chat from "./Components/Chant.jsx"
import SignUp from "./Components/SignUp.jsx"
import { useState } from "react"
import Profile from "./Components/Profile.jsx"
import EditProfile from "./Components/EditProfile.jsx"
import CompleteProfile from "./Components/CompleteProfile.jsx"

function App() {

  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <>
      <Router>
        <Navbar loggedIn={loggedIn}/>
        <Routes>
          <Route path="/" element={
            <>
              <Hero/>
              <Features/>
              <Empowering/>
              <CTASection/>
              <Team/>
              <FAQ/>
          </>}/>
          <Route path="/eventRegistration" element={<EventsPage/>} />
          <Route path="/events" element={<CreateEvents/>} />
          <Route path="/events/:eventId" element = {<EventDetails/>} />
          <Route path="/login" element = {<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
          <Route path="/register" element={<SignUp/>} />
          <Route path="/profile" element={<Profile setLoggedIn={setLoggedIn}/>} />
          {/* <Route path="/chat" element={<Chat senderId="67f275d5d84894ddd2c0b3a1" receiverId="67f19d0731ab4bf3b7a34411" />} /> */}
          <Route path="/editProfile" element={<EditProfile/>} />
          <Route path="/cmptProf" element={<CompleteProfile/>}/>
        </Routes>
        <Footer/>
      </Router>
    </>
  )
}

export default App
