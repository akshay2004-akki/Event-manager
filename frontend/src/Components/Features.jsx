import React from 'react';
import { motion } from 'framer-motion';

function Features() {
  const features = [
    {
      id: 1,
      title: "Effortless Communication with Real-Time Chat",
      description: "Engage directly with event coordinators anytime.",
      icon: "🗨️",
    },
    {
      id: 2,
      title: "Stay Updated with Automated Notifications",
      description: "Receive instant updates about your events.",
      icon: "🔔",
    },
    {
      id: 3,
      title: "Join Us for Seamless Event Experiences",
      description: "Experience the future of event management today.",
      icon: "🎉",
    },
  ];

  return (
    <section className="px-6 md:px-20 py-16 overflow-hidden">
      {/* Header Section */}
      <div className="md:flex md:justify-between md:items-start">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:w-1/3"
        >
          <h4 className="text-gray-500 uppercase tracking-wide">Connect</h4>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 leading-tight">
            Streamlined Event Management at Your Fingertips
          </h2>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:w-1/2 text-xl md:text-2xl mt-4 md:mt-7"
        >
          <p className="text-gray-600">
            Our platform simplifies event management for students and organizers alike.
            With real-time chat, you can easily communicate with event coordinators. Plus,
            automated notifications ensure you never miss an important update.
          </p>
        </motion.div>
      </div>

      {/* Features Grid */}
      <motion.div
        className="mt-11 grid md:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {features.map((feature) => (
          <motion.div
            key={feature.id}
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-center rounded-2xl border p-9 shadow-sm bg-white hover:shadow-md"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
            <p className="text-gray-600 mt-2">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Buttons */}
      <div className="mt-10 flex justify-center gap-4">
        <motion.button
          whileHover={{ y: -2, scale: 1.03 }}
          className="px-6 py-2 border border-gray-900 rounded-md hover:bg-gray-100"
        >
          Learn More
        </motion.button>
        <motion.button
          whileHover={{ y: -2, scale: 1.03 }}
          className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800"
        >
          Sign Up
        </motion.button>
      </div>
    </section>
  );
}

export default Features;
