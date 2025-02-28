import React from 'react'
import {Link} from 'react-router-dom'


function Navbar() {
  return (
    <div className='h-[70px] p-2 flex items-center justify-between'>
        <div className='flex'>
            <div className='bg-amber-300 h-[60px] w-[60px] '>
                <img src="" alt="" />
            </div>
            <div className='md:flex md:gap-5 hidden md:items-center mx-3'>
                <Link to="/">Home</Link>
                <Link to="/eventRegistration">Event Registration</Link>
                <Link to="/support">Chat Support</  Link>
                <Link to="/calender">Event Calender</Link>
            </div>
        </div>

        <div className='md:flex hidden gap-3.5'>
        <button className='p-2 border-2'>
                Login
            </button>
            <button className='p-2 bg-black text-white'>
                Sign Up
            </button>
        </div>
    </div>
  )
}

export default Navbar