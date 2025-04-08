import axios from "axios";
import React, { useEffect, useState } from "react";
import EventDetails from "./EventDetails";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/event/getEvent`,
          { withCredentials: true }
        );
        setEvents(res.data.events);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchEvents();
  }, []);

  const handleGetDetails = async (eventId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/event/${eventId}`,
        { withCredentials: true }
      );
      setSelectedEvent(res.data[0]);
      setIsModalOpen(true);
    } catch (error) {
      console.log("Error fetching event details:", error.message);
    }
  };

  return (
    <div className="max-w-7xl translate-y-[60px] mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Header */}
      <section className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Upcoming Events
        </h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Stay updated with the latest events and opportunities on campus.
        </p>
      </section>

      {/* Events Section */}
      <section>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
          Events List
        </h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div
              key={index}
              className="border rounded-xl shadow-md overflow-hidden flex flex-col bg-white"
            >
              {event.eventImage && (
                <img
                  src={event.eventImage}
                  alt={event.eventName}
                  className="h-48 w-full object-cover"
                />
              )}
              <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                    {event.eventName}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(event.dateTime).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <button
                  onClick={() => handleGetDetails(event._id)}
                  className="mt-4 px-4 py-2 text-sm sm:text-base bg-black text-white border border-black hover:bg-gray-800 rounded-md transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && selectedEvent && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm min-h-screen"
    role="dialog"
    aria-modal="true"
    onClick={() => setIsModalOpen(false)}
  >
    <div
      className="relative w-full mx-4 sm:mx-6 md:mx-8 max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close Button */}
      <div className="flex justify-end">
        <button
          className="text-gray-500 hover:text-red-600 text-2xl"
          onClick={() => setIsModalOpen(false)}
          aria-label="Close"
        >
          X
        </button>
      </div>

      {/* Modal Content */}
      <h2 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-4">
        Event Details
      </h2>
      <EventDetails event={selectedEvent} />

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => setIsModalOpen(false)}
          className="bg-indigo-600 text-white px-4 sm:px-5 py-2 rounded-md font-medium hover:bg-indigo-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default EventsPage;
