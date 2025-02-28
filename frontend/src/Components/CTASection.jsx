import React from "react";
import events from '../assets/events.jpg'

const CTASection = () => {
  return (
    <section className="w-full h-screen flex items-center border justify-center bg-white">
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 border border-gray-300">
        {/* Left Side - Text Content */}
        <div className="p-10 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Join Our Exciting Events Today
          </h2>
          <p className="text-gray-600 mt-4 text-lg">
            Sign up or log in to connect with event coordinators and explore campus activities.
          </p>
          <div className="mt-6 flex gap-4">
            <button className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 text-lg">
              Sign Up
            </button>
            <button className="px-6 py-3 border border-gray-900 rounded-md hover:bg-gray-100 text-lg">
              Log In
            </button>
          </div>
        </div>

        {/* Right Side - Image Placeholder */}
        <div className="flex items-center justify-center">
          <div className="w-3/4 h-3/4 flex items-center justify-center rounded-md">
            <span className="text-gray-600 text-2xl"><img src={events} alt="" /></span> {/* Replace with an actual image */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
