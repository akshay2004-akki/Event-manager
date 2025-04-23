import React from "react";
import { motion } from "framer-motion";
import arya from '../assets/arya.jpg';
import akshay from '../assets/image.png';

const teamMembers = [
  {
    name: "Akshay Anand",
    role: "Project Lead | Fullstack Developer",
    description: "Passionate about creating memorable experiences for students and organizers alike.",
    image: akshay,
  },
  {
    name: "Aarya Ratnam Sinha",
    role: "Frontend Developer",
    description: "Expert in promoting events and engaging with the student community effectively. Also contributed in the frontend development.",
    image: arya,
  },
  {
    name: "Abdul Fater",
    role: "Backend Developer",
    description: "Ensures seamless integration of technology for a smooth event experience. Also contributed in the backend development.",
    image: "",
  },
];

// Animation Variants
const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const card = {
  hidden: { opacity: 0, scale: 0.8, y: 40 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Team = () => {
  return (
    <motion.section
      className="max-w-6xl mx-auto my-16 px-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
    >
      {/* Heading */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <p className="text-gray-500 uppercase text-sm">Meet</p>
        <h2 className="text-4xl font-bold text-gray-900">Our Team</h2>
        <p className="text-gray-600 mt-2">
          Dedicated professionals committed to your event success.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center place-items-center">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            className="flex border p-5 md:border-none md:p-0 flex-col items-center text-center bg-white rounded-xl shadow-md hover:shadow-xl transition"
            variants={card}
          >
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span className="text-gray-500 text-2xl">📷</span>
              )}
            </div>

            <h3 className="mt-4 text-lg font-semibold text-gray-900">{member.name}</h3>
            <p className="text-sm text-gray-500">{member.role}</p>
            <p className="text-gray-600 mt-2 text-sm">{member.description}</p>

            <div className="flex gap-4 mt-3 text-gray-500">
              <span className="hover:text-black cursor-pointer">🔗</span>
              <span className="hover:text-black cursor-pointer">✉️</span>
              <span className="hover:text-black cursor-pointer">🌐</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Team;
