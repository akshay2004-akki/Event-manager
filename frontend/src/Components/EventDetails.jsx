import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UsersIcon,
  Building2Icon,
  User,
  Mail,
  Phone,
  LogIn,
} from "lucide-react";

const EventDetails = ({ event, registeredEvents }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registered, setRegistered] = useState(false)

  const formattedDate = event?.dateTime
    ? new Date(event.dateTime).toLocaleDateString()
    : "N/A";
  const formattedTime = event?.dateTime
    ? new Date(event.dateTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/getDetails`,
          { withCredentials: true }
        );
        setUserData(res.data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleRegister = async (eventId, eventName) => {
    if (!userData) {
      alert("Please login to register for the event.");
      return;
    }
    try {
      const res = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/event/registerEvent/${eventId}`,
        {
          name: userData.userId.fullName,
          email: userData.userId.email,
          department: userData.department,
          phoneNumber: userData.phoneNumber,
          section: userData.section,
          collegeName: userData.collegeName,
          semester: userData.semester,
          rollNumber: userData.rollNumber,
          eventName: eventName,
        },
        { withCredentials: true }
      );

      alert(`${res.data.message}`)
      
    } catch (error) {
      alert(`${error.response.data.message}`);
    }
  };

  const formatDescription = (description) => {
    if (!description) return "<p>No description available.</p>";
    let formattedDescription = description.replace(
      /\*\*(.*?)\*\*/g,
      '<strong class="font-semibold">$1</strong>'
    );
    formattedDescription = formattedDescription.replace(
      /##(.*?)##/g,
      '<b class="font-bold">$1</b>'
    );
    formattedDescription = formattedDescription.replace(/\n/g, "<br />");
    return formattedDescription;
  };

  const eventDescription = formatDescription(event?.description);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
  };
  useEffect(()=>{
      const isAlreadyRegistered = registeredEvents.some((e)=>{
          return e.eventId._id===event._id || e.eventId.dateTime < Date.now()
      });
      setRegistered(isAlreadyRegistered)
    },[event, registeredEvents])

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-200">
        <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-teal-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200"
    >
      {/* Cover Image */}
      <div className="relative w-full flex justify-center items-center h-[300px] sm:h-[400px] overflow-hidden">
        <img
          src={event.eventImage}
          alt="Event Cover"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-black/30" /> {/* Darker overlay */}
        <motion.h1
          variants={itemVariants}
          className="absolute text-3xl sm:text-5xl font-extrabold text-white text-center drop-shadow-lg z-10 px-4"
        >
          {event?.eventName}
        </motion.h1>
      </div>

      {/* Event Content */}
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-3xl p-6 sm:p-8 mt-8">
        {/* Title */}
        <motion.h2
          variants={itemVariants}
          className="text-3xl sm:text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-teal-400 to-cyan-500 text-center mb-2"
        >
          {event?.eventName}
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-gray-500 text-center mt-1 mb-4 text-sm sm:text-base"
        >
          {event?.category}
        </motion.p>

        {/* Date, Time, Location, Club, Department */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-between items-center mt-4 text-gray-700 gap-2 sm:gap-4 text-sm sm:text-base"
        >
          <p className="flex items-center gap-2 text-teal-600 hover:text-teal-700 transition duration-300">
            <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>{formattedDate}</span>
          </p>
          <p className="flex items-center gap-2 text-teal-600 hover:text-teal-700 transition duration-300">
            <ClockIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>{formattedTime}</span>
          </p>
          <p className="flex items-center gap-2 text-teal-600 hover:text-teal-700 transition duration-300">
            <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>{event?.location || "N/A"}</span>
          </p>
          <p className="flex items-center gap-2 text-teal-600 hover:text-teal-700 transition duration-300">
            <UsersIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>{event?.club || "N/A"}</span>
          </p>
          <p className="flex items-center gap-2 text-teal-600 hover:text-teal-700 transition duration-300">
            <Building2Icon className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>{event?.department || "N/A"}</span>
          </p>
        </motion.div>

        {/* Coordinator & Faculty Details */}
        <motion.div
          variants={itemVariants}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Event Coordinator */}
          <div className="bg-gradient-to-r from-green-500 via-teal-500 to-cyan-400 p-4 sm:p-6 rounded-xl border border-gray-200 shadow-lg hover:shadow-2xl transition duration-300">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-1.5">
              <User className="w-5 h-5" />
              Event Coordinator
            </h3>
            <p className="text-gray-700 flex items-center gap-1.5">
              <LogIn className="w-4 h-4" />{" "}
              <span>{event?.coordinatorName || "N/A"}</span>
            </p>
            <p className="text-gray-700 flex items-center gap-1.5">
              <Phone className="w-4 h-4" />{" "}
              <span>{event?.coordinatorContact || "N/A"}</span>
            </p>
            <p className="text-gray-700 flex items-center gap-1.5">
              <Mail className="w-4 h-4" />{" "}
              <span>{event?.coordinatorEmail || "N/A"}</span>
            </p>
          </div>

          {/* Faculty Coordinator */}
          <div className="bg-gradient-to-r from-green-500 via-teal-500 to-cyan-400 p-4 sm:p-6 rounded-xl border border-gray-200 shadow-lg hover:shadow-2xl transition duration-300">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-1.5">
              <User className="w-5 h-5" />
              Faculty Coordinator
            </h3>
            <p className="text-gray-700 flex items-center gap-1.5">
              <LogIn className="w-4 h-4" />{" "}
              <span>{event?.facultyName || "N/A"}</span>
            </p>
            <p className="text-gray-700 flex items-center gap-1.5">
              <Mail className="w-4 h-4" />{" "}
              <span>{event?.facultyEmail || "N/A"}</span>
            </p>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div variants={itemVariants} className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            About the Event
          </h3>
          <div
            className="text-gray-700 leading-relaxed whitespace-pre-line"
            dangerouslySetInnerHTML={{
              __html: eventDescription,
            }}
          />
        </motion.div>

        {/* Buttons */}
        <motion.div
          variants={itemVariants}
          className="mt-8 flex justify-center gap-4"
        >
          <button
            onClick={() => handleRegister(event?._id, event.eventName)}
            className={`px-6 py-3 rounded-full bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300 ${registered?"hidden":"block"}`}
          >
            Register Now
          </button>
          <button className="px-6 py-3 rounded-full border border-gray-300 hover:bg-gray-100 hover:scale-105 font-bold transition duration-300">
            Contact Coordinator
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EventDetails;
