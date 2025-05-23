import CTASection from "./Components/CTASection.jsx";
import Empowering from "./Components/Empowering.jsx";
import Features from "./Components/Features.jsx";
import Hero from "./Components/Hero.jsx";
import Navbar from "./Components/Navbar.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Team from "./Components/Team.jsx";
import FAQ from "./Components/FAQ.jsx";
import Footer from "./Components/Footer.jsx";
import EventsPage from "./Components/EventsPage.jsx";
import CreateEvents from "./Components/CreateEvents.jsx";
import EventDetails from "./Components/EventDetails.jsx";
import Login from "./Components/Login.jsx";
// import Chat from "./Components/Chant.jsx"
import SignUp from "./Components/SignUp.jsx";
import { useEffect, useState } from "react";
import Profile from "./Components/Profile.jsx";
import EditProfile from "./Components/EditProfile.jsx";
import CompleteProfile from "./Components/CompleteProfile.jsx";
import { Toaster } from "sonner";
import ScrollToTop from "./util/ScrollToTop.jsx";
import UpcomingEvents from "./Components/UpcomingEvents.jsx";
import AOS from 'aos';
import 'aos/dist/aos.css';
import EventDescription from "./Components/EventDescription.jsx";
import ChatSupport from "./Components/ChatSupport.jsx";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", loggedIn);
  }, [loggedIn]);

  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);

  return (
    <>
      <Router>
        <ScrollToTop/>
        <Navbar loggedIn={loggedIn} />
        <Toaster
          richColors
          position="top-right"
          toastOptions={{
            duration: 3000,
            className: "font-poppins text-[21px] ",
          }}
        />
        <Routes preventScrollReset = {true}>
          <Route
            path="/"
            element={
              <>
                <Hero loggedIn={loggedIn} />
                <Features />
                <Empowering />
                <CTASection />
                <UpcomingEvents/>
                <Team />
                <FAQ />
                <ChatSupport/>
              </>
            }
          />
          <Route path="/eventRegistration" element={<><EventsPage /> <ChatSupport/></>} />
          <Route path="/events" element={<><CreateEvents /> <ChatSupport/></>} />
          <Route path="/events/:eventId" element={<EventDetails />} />
          <Route
            path="/login"
            element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
          />
          <Route path="/register" element={<SignUp />} />
          <Route
            path="/profile"
            element={<Profile setLoggedIn={setLoggedIn} />}
          />
          {/* <Route path="/chat" element={<Chat senderId="67f275d5d84894ddd2c0b3a1" receiverId="67f19d0731ab4bf3b7a34411" />} /> */}
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/cmptProf" element={<CompleteProfile />} />
          <Route path="/eventDetails" element={<><EventDescription/> <ChatSupport/></>}/>
          {/* <Route path="/support" element={} /> */}
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
