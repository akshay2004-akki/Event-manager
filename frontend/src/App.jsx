import CTASection from "./Components/CTASection.jsx"
import Empowering from "./Components/Empowering.jsx"
import Features from "./Components/Features.jsx"
import Hero from "./Components/Hero.jsx"
import Navbar from "./Components/Navbar.jsx"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Team from "./Components/Team.jsx"
import FAQ from "./Components/FAQ.jsx"
import Footer from "./Components/Footer.jsx"

function App() {

  return (
    <>
      <Router>
        <Navbar/>
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
          <Route path="/eventRegistration" element={<></>} />
        </Routes>
        <Footer/>
      </Router>
    </>
  )
}

export default App
