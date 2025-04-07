import React from "react";

const EventDetails = ({ event }) => {
  console.log("inside component",event);
  
  const formattedDate = new Date(event?.dateTime).toLocaleDateString();
  const formattedTime = new Date(event?.dateTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Cover Image */}
      <div className="relative w-full flex justify-center items-center h-80">
        <img
          src={event.eventImage}
          alt="Event Cover"
          className="w-full h-full object-contain"
        />
        
      </div>

      {/* Event Content */}
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-900 text-center">{event?.eventName}</h2>
        <p className="text-gray-500 text-center mt-1">{event?.category}</p>

        {/* Date, Time, Location, Club, Department */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-4 text-gray-700 gap-2 text-sm md:text-base">
          <p className="flex items-center">📅 <span className="ml-2">{formattedDate}</span></p>
          <p className="flex items-center">⏰ <span className="ml-2">{formattedTime}</span></p>
          <p className="flex items-center">📍 <span className="ml-2">{event?.location}</span></p>
          <p className="flex items-center">🏛️ <span className="ml-2">{event?.club}</span></p>
          <p className="flex items-center">🏫 <span className="ml-2">{event?.department}</span></p>
        </div>

        {/* Coordinator & Faculty Details */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Event Coordinator */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Event Coordinator</h3>
            <p className="text-gray-700">👤 {event?.coordinatorName}</p>
            <p className="text-gray-700">📞 {event?.coordinatorContact}</p>
            <p className="text-gray-700">✉️ {event?.coordinatorEmail}</p>
          </div>

          {/* Faculty Coordinator */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Faculty Coordinator</h3>
            <p className="text-gray-700">👨‍🏫 {event?.facultyName}</p>
            <p className="text-gray-700">✉️ {event?.facultyEmail}</p>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <h3 className="text-2xl font-semibold text-gray-800">About the Event</h3>
          <div
            className="mt-3 text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: event?.description || "<p>No description available.</p>",
            }}
          />
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <button className="px-6 py-2 bg-white text-black border font-medium rounded-lg hover:bg-blue-700 hover:text-white transition">
            Register Now
          </button>
          <button className="px-6 py-2 border bg-black text-white font-medium rounded-lg hover:bg-gray-100 hover:text-black transition">
            Contact Coordinator
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
