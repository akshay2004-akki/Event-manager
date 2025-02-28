import Features from "./Components/Features.jsx"
import Hero from "./Components/Hero.jsx"
import Navbar from "./Components/Navbar.jsx"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

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
          </>}/>
          <Route path="/eventRegistration" element={<></>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
