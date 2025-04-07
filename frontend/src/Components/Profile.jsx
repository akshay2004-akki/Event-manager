import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Pencil,
  Mail,
  Phone,
  CheckCircle,
  Building,
  Briefcase,
  Hash,
  GraduationCap,
  CalendarDays,
  MapPin,
  Clock,
  X
} from "lucide-react";
import EventDetails from "./EventDetails";

function ProfileSection() {
  const [profileData, setProfileData] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/getDetails`,
          {
            withCredentials: true,
          }
        );
        setProfileData(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/event/get-registered-events`,
          {},
          { withCredentials: true }
        );

        const formattedEvents = res.data
          .filter((item) => item.eventId)
          .map((item) => ({
            _id: item._id,
            eventId: item.eventId._id,
            name: item.eventId.eventName,
            description: item.eventId.description || "No description available.",
            date: new Date(item.eventId.dateTime).toLocaleDateString(),
            time: new Date(item.eventId.dateTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            location: item.eventId.location,
          }));

        setRegisteredEvents(formattedEvents);
      } catch (error) {
        console.log("Error fetching registered events:", error.message);
      }
    };
    fetchRegisteredEvents();
  }, []);

  const handleGetDetails = async (eventId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/event/${eventId}`,
        { withCredentials: true }
      );
      console.log(res.data[0]);
      
      setSelectedEvent(res.data[0]);
      setIsModalOpen(true);
    } catch (error) {
      console.log("Error fetching event details:", error.message);
    }
  };

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-amber-50 pt-24 px-4 flex items-center justify-center">
        <div className="space-y-4">
          <div className="animate-pulse w-[200px] h-[40px] bg-gray-300 rounded-md mx-auto"></div>
          <div className="animate-pulse w-[300px] h-[200px] bg-gray-300 rounded-xl shadow-lg"></div>
        </div>
      </div>
    );
  }

  const {
    collegeName,
    department,
    phoneNumber,
    section,
    semester,
    userId,
    profilePic,
  } = profileData;

  const academicDetails = [
    {
      icon: Building,
      label: "College",
      value: collegeName,
      color: "bg-indigo-100 text-indigo-600 group-hover:bg-indigo-500",
      delay: "delay-300",
    },
    {
      icon: Briefcase,
      label: "Department",
      value: department,
      color: "bg-purple-100 text-purple-600 group-hover:bg-purple-500",
      delay: "delay-400",
    },
    {
      icon: Hash,
      label: "Section",
      value: section,
      color: "bg-sky-100 text-sky-600 group-hover:bg-sky-500",
      delay: "delay-500",
    },
    {
      icon: GraduationCap,
      label: "Semester",
      value: semester,
      color: "bg-amber-100 text-amber-600 group-hover:bg-amber-500",
      delay: "delay-600",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24">
  {/* Profile Header */}
  <div className="bg-indigo-600 text-white rounded-t-xl p-6 md:p-10 shadow-lg relative overflow-hidden">
    <div className="absolute top-4 right-4 z-10">
      <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-medium py-2 px-4 rounded-lg text-xs inline-flex items-center transition duration-200 shadow-sm hover:shadow-md">
        <Pencil size={12} className="mr-1.5" /> Edit Profile
      </button>
    </div>

    <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-6">
      <div className="relative mb-4 sm:mb-0 flex-shrink-0">
        <img
          className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-indigo-300 shadow-lg object-cover"
          src={profilePic || "https://placehold.co/144x144/E0E7FF/4338CA?text=User"}
          alt="User Profile"
        />
        <span className="absolute bottom-1 right-1 block h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-green-400 border-2 border-white ring-2 ring-green-300"></span>
      </div>
      <div className="text-center sm:text-left flex-1">
        <h1 className="text-2xl sm:text-3xl font-bold drop-shadow-lg">{userId.fullName}</h1>
        <p className="text-indigo-200 text-sm mt-1"><Mail size={14} className="inline mr-1.5" /> {userId.email}</p>
        <p className="text-indigo-200 text-sm"><Phone size={14} className="inline mr-1.5" /> {phoneNumber}</p>

        <div className="mt-4 inline-flex items-center bg-white/90 text-indigo-700 px-4 py-2 rounded-lg shadow-md">
          <CheckCircle size={20} className="mr-2.5 text-green-500" />
          <span className="text-base font-semibold mr-1">{registeredEvents.length}</span>
          <span className="text-sm font-medium text-gray-600">Events Registered</span>
        </div>
      </div>
    </div>
  </div>

  {/* Profile Content */}
  <div className="bg-white rounded-b-xl shadow-lg p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
    {/* Left Column */}
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4 border-l-4 border-indigo-500 pl-3">Academic Details</h2>
        <div className="space-y-4">
          {academicDetails.map((detail) => (
            <div key={detail.label} className={`flex items-center group ${detail.delay}`}>
              <div className={`icon-bg mr-4 transition-colors duration-200 ${detail.color}`}>
                <detail.icon size={18} />
              </div>
              <div>
                <span className="font-semibold text-gray-800 text-sm">{detail.label}:</span>
                <p className="text-gray-600 text-sm">{detail.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3 border-l-4 border-purple-500 pl-3">Bio</h3>
        <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-200">
          Passionate learner with a deep interest in tech and development.
        </p>
      </div>
    </div>

    {/* Right Column */}
    <div className="lg:col-span-2">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 border-l-4 border-sky-500 pl-3">Registered Events</h2>
      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
        {registeredEvents.map((event, index) => (
          <div
            key={event._id || index}
            className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm border-l-4 border-l-sky-300"
          >
            <h3 className="font-semibold text-indigo-700 mb-1.5 text-base">{event.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{event.description}</p>
            <div className="text-sm text-gray-500 space-y-1">
              <div><CalendarDays size={14} className="inline mr-1" /> {event.date}</div>
              <div><MapPin size={14} className="inline mr-1" /> {event.location}</div>
              <div><Clock size={14} className="inline mr-1" /> {event.time}</div>
              <button
                onClick={() => handleGetDetails(event.eventId)}
                className="mt-2 bg-black text-white px-3 py-1.5 text-sm rounded-xl hover:bg-gray-800"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* Modal */}
  {isModalOpen && selectedEvent && (
    <div
      className="fixed inset-0 p-2 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      role="dialog"
      aria-modal="true"
      onClick={() => setIsModalOpen(false)}
    >
      <div
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-end">
          <button
            className="text-gray-500 hover:text-red-600 text-2xl"
            onClick={() => setIsModalOpen(false)}
            aria-label="Close"
          >
            <X />
          </button>
        </div>

        {/* Modal Content */}
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">Event Details</h2>
        <EventDetails event={selectedEvent} />

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )}
</div>

  );
}

export default ProfileSection;
