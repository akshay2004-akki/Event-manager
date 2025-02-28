import React from 'react'
import logo from '../assets/logo.jpg'

function Empowering() {
  return (
    <>
        <section className="flex flex-col items-center text-center px-6 py-16">
      {/* Logo */}
      <div className="mb-4">
        <img
          src={logo}
          alt="Webflow Logo"
          className="h-[100px] w-[100px]"
        />
      </div>

      {/* Testimonial Quote */}
      <blockquote className="p-4 text-lg font-semibold max-w-2xl">
        "This platform has transformed the way we organize events, making communication seamless and efficient."
      </blockquote>

      {/* Profile Section */}
      <div className="mt-6 flex flex-col items-center">
        {/* Avatar */}
        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
          AK
        </div>
        {/* Name and Designation */}
        <h4 className="mt-2 font-semibold text-gray-900">Akshay Anand</h4>
        <p className="text-gray-600">Student, CGC-CEC Landran</p>
      </div>
    </section>
    </>
  )
}

export default Empowering