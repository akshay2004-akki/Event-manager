import React from "react";

const EventDetails = ({ event }) => {

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Cover Image */}
      <div className="relative w-full h-80">
        <img
          src={event?.eventImage || "https://via.placeholder.com/1500x600?text=Event+Cover"}
          alt="Event Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">{event?.eventName}</h1>
        </div>
      </div>

      {/* Event Content */}
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center">{event?.eventName}</h2>
        <p className="text-gray-500 text-center mt-1">{event?.category}</p>

        {/* Event Date, Location, and Club */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-4 text-gray-700">
          <p className="flex items-center">
            📅 <span className="ml-2">{event?.dateTime}</span>
          </p>
          <p className="flex items-center">
            📍 <span className="ml-2">{event?.location}</span>
          </p>
          <p className="flex items-center">
            🎭 <span className="ml-2">{event?.club}</span>
          </p>
        </div>

        {/* Coordinator & Faculty Details */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800">Event Coordinator</h3>
            <p className="text-gray-700 mt-1">👤 {event?.coordinatorName}</p>
            <p className="text-gray-700">📞 {event?.coordinatorContact}</p>
            <p className="text-gray-700">✉️ {event?.coordinatorEmail}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800">Faculty Coordinator</h3>
            <p className="text-gray-700 mt-1">👨‍🏫 {event?.facultyName}</p>
            <p className="text-gray-700">✉️ {event?.facultyEmail}</p>
          </div>
        </div>

        {/* Event Description */}
        <div className="mt-6">
          <h3 className="text-2xl font-semibold text-gray-800">About the Event</h3>
          <div
            className="mt-3 text-gray-700"
            dangerouslySetInnerHTML={{ __html: event?.description || "<p>No description available.</p>" }}
          />
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <button className="px-6 py-2 bg-white text-black border font-medium rounded-lg hover:bg-blue-700">
            Register Now
          </button>
          <button className="px-6 py-2 border bg-black text-white font-medium rounded-lg hover:bg-gray-100">
            Contact Coordinator
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
