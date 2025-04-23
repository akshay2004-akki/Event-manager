import React, { useEffect } from "react";
import events from '../assets/events.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';

const CTASection = () => {
  useEffect(() => {
    AOS.init({ once: true, duration: 1000 });
  }, []);

  return (
    <section className="w-full h-screen flex items-center justify-center bg-white">
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2">
        {/* Left Side - Text Content */}
        <div
          className="p-10 flex flex-col justify-center"
          data-aos="fade-up"
        >
          <h2 className="text-4xl font-bold text-gray-900" data-aos="flip-left" data-aos-delay="200">
            Join Our Exciting Events Today
          </h2>
          <p className="text-gray-600 mt-4 text-lg" data-aos="fade-up" data-aos-delay="400">
            Sign up or log in to connect with event coordinators and explore campus activities.
          </p>
          <div className="mt-6 flex gap-4" data-aos="fade-up" data-aos-delay="600">
            <button className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 text-lg">
              Sign Up
            </button>
            <button className="px-6 py-3 border border-gray-900 rounded-md hover:bg-gray-100 text-lg">
              Log In
            </button>
          </div>
        </div>

        {/* Right Side - Image Section */}
        <div
          className="flex items-center justify-center"
          data-aos="zoom-in-up"
        >
          <div className="w-3/4 h-3/4 rounded-xl overflow-hidden shadow-2xl">
            <img
              src={events}
              alt="Event Visual"
              className="object-cover w-full h-full rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
