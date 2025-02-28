import Navbar from "./Components/Navbar.jsx"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

function App() {

  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<></>}/>
          <Route path="/eventRegistration" element={<></>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
