import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarIcon, ClockIcon, MapPinIcon } from "lucide-react";
import { Link } from "react-router-dom";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/event/getEvent`,
          { withCredentials: true }
        );

        if (Array.isArray(res.data)) {
          setEvents(res.data);
        } else if (Array.isArray(res.data.events)) {
          setEvents(res.data.events);
        } else {
          setEvents([]);
        }
      } catch (error) {
        console.error("Error fetching upcoming events:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingEvents();
  }, []);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString();

  const formatTime = (dateString) =>
    new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-extrabold text-center mb-8 text-teal-700"
        >
          Upcoming Events
        </motion.h2>

        {events.length === 0 ? (
          <p className="text-center text-gray-500">No upcoming events.</p>
        ) : (
          <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          >
            <AnimatePresence>
              {events.slice(0, 2).map((event) => (
                <motion.div
                  key={event._id}
                  variants={cardVariants}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden cursor-pointer"
                >
                  <motion.img
                    src={event.eventImage}
                    alt={event.eventName}
                    className="w-full h-48 object-cover"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                      {event.eventName}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">{event.category}</p>
                    <div className="flex items-center text-sm text-gray-600 gap-2 mb-1">
                      <CalendarIcon className="w-4 h-4" />
                      {formatDate(event.dateTime)}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 gap-2 mb-1">
                      <ClockIcon className="w-4 h-4" />
                      {formatTime(event.dateTime)}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 gap-2">
                      <MapPinIcon className="w-4 h-4" />
                      {event.location || "TBD"}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* View All Events Card */}
              <motion.div
                variants={cardVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-teal-500 to-teal-700 text-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 flex items-center justify-center"
              >
                <Link
                  to="/eventRegistration"
                  className="w-full h-full flex flex-col items-center justify-center p-8 text-center"
                >
                  <span className="text-2xl font-bold mb-2">View All Events</span>
                  <span className="text-sm">
                    Explore all our upcoming events here!
                  </span>
                </Link>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UpcomingEvents;
