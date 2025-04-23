import React from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.jpg';

function Empowering() {
  return (
    <motion.section
      className="flex flex-col items-center text-center px-6 py-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Logo */}
      <motion.div
        className="mb-4"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <img
          src={logo}
          alt="Webflow Logo"
          className="h-[100px] w-[100px] rounded-full shadow-md"
        />
      </motion.div>

      {/* Testimonial Quote */}
      <motion.blockquote
        className="p-4 text-lg font-semibold max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        "This platform has transformed the way we organize events, making communication seamless and efficient."
      </motion.blockquote>

      {/* Profile Section */}
      <motion.div
        className="mt-6 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        {/* Avatar */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 font-semibold"
        >
          AK
        </motion.div>

        {/* Name and Designation */}
        <h4 className="mt-2 font-semibold text-gray-900">Akshay Anand</h4>
        <p className="text-gray-600">Student, CGC-CEC Landran</p>
      </motion.div>
    </motion.section>
  );
}

export default Empowering;
