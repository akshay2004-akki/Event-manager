import axios from "axios";
import React, { useEffect, useState } from "react";
import EventDetails from "./EventDetails";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
      } finally {
        setIsLoading(false);
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

  const SkeletonCard = () => (
    <div className="rounded-xl shadow-md overflow-hidden bg-white animate-pulse">
      <div className="h-48 bg-gray-300"></div>
      <div className="p-4">
        <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="mt-4 h-8 bg-gray-300 rounded w-full"></div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24">
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
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : events.map((event, index) => (
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
          className="fixed inset-0 p-2 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-screen h-screen max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end">
              <button
                className="text-gray-500 hover:text-red-600 text-2xl"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close"
              >
                X 
              </button>
            </div>
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">
              Event Details
            </h2>
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
};

export default EventsPage;
