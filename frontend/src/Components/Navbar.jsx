import React, { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import logo from "../assets/logo.jpg";

function Navbar({loggedIn}) {
  const [toggle, setToggle] = useState(false);

  window.onscroll = ()=>{
    setToggle(false);
  }
  const handlLinkToggle = ()=>{
    setToggle(false)
  }
  const route = useNavigate()
  const handleLoginRoute = ()=>{
    route("/login")
  }
  const route2 = useNavigate()
  const handleSignUpRoute = ()=>{
    route2("/register")
  }

  const handleProfile = async(e)=>{
    
  }
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Left Section: Logo & Desktop Links */}
        <div className="flex items-center">
          <div className="bg-amber-300 h-[50px] w-[50px] rounded-full overflow-hidden">
            <img src={logo} alt="Logo" className="w-full h-full object-cover" />
          </div>
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex md:gap-6 ml-6 text-gray-800 font-medium">
            <Link onClick={handlLinkToggle} to="/" className="hover:text-amber-500">Home</Link>
            <Link onClick={handlLinkToggle} to="/events" className="hover:text-amber-500">Events</Link>
            <Link onClick={handlLinkToggle} to="/eventRegistration" className="hover:text-amber-500">Event Registration</Link>
            <Link onClick={handlLinkToggle} to="/support" className="hover:text-amber-500">Chat Support</Link>
          </div>
        </div>

        {/* Right Section: Buttons */}
        {
          loggedIn ? (<div className={`hidden md:flex gap-4 ${loggedIn?"hidden":"block"}`}>
            <button onClick={handleLoginRoute} className="px-4 py-2 border-2 border-black rounded-md hover:bg-gray-100">
              Login
            </button>
            <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800" onClick={handleSignUpRoute}>
              Sign Up
            </button>
          </div>) : (<button onClick={handleProfile} className="text-left text-red-400 rounded-full hover:text-red-800">Profile</button>)
        }

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setToggle((prev) => !prev)}
            className="text-2xl text-gray-900 focus:outline-none"
          >
            <i className={`fa-solid ${toggle ? "fa-xmark" : "fa-bars"}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-[70px] right-4 bg-black text-white w-[200px] rounded-lg overflow-hidden transition-all duration-500 ${
          toggle ? "max-h-[200px] p-4" : "max-h-0 p-0"
        }`}
      >
        <div className="flex flex-col gap-3">
          <Link onClick={handlLinkToggle} to="/" className="hover:text-amber-400">Home</Link>
          <Link onClick={handlLinkToggle} to="/events" className="hover:text-amber-400">Events</Link>
          <Link onClick={handlLinkToggle} to="/eventRegistration" className="hover:text-amber-400">Event Registration</Link>
          <Link onClick={handlLinkToggle} to="/support" className="hover:text-amber-400">Chat Support</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
