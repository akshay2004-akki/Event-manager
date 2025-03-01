import React from "react";

const events = [
  { title: "Tech Fest 2024", date: "March 15, 2024", description: "A festival showcasing the latest in tech innovations." },
  { title: "Career Fair", date: "April 5, 2024", description: "Meet recruiters and explore career opportunities." },
  { title: "Music Night", date: "May 20, 2024", description: "Enjoy live performances from talented students." },
];

const testimonials = [
  { name: "John Doe", feedback: "Attending Tech Fest was a game-changer for my career!" },
  { name: "Sarah Lee", feedback: "Loved the networking opportunities at the Career Fair." },
];

const timeline = [
  { milestone: "Registration Opens", date: "March 1, 2024" },
  { milestone: "Event Start", date: "March 15, 2024" },
  { milestone: "Closing Ceremony", date: "March 16, 2024" },
];

const EventsPage = () => {
  return (
    <div className="max-w-6xl translate-y-[60px] max-h-auto mx-auto px-6 py-12 space-y-16">
      
      {/* Header Section */}
      <section className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">Upcoming Events</h1>
        <p className="text-gray-600 mt-2">
          Stay updated with the latest events and opportunities on campus.
        </p>
      </section>

      {/* Events List Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900">Events List</h2>
        <div className="mt-4 space-y-4">
          {events.map((event, index) => (
            <div key={index} className="p-4 border rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-500">{event.date}</p>
              <p className="text-gray-700 mt-1 p-2">{event.description}</p>
              <button className="border p-2 bg-black text-white">Event Details</button>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900">Why Attend?</h2>
        <p className="text-gray-600 mt-2">
          Attending events can help you network, learn, and have fun!
        </p>
        <ul className="list-disc pl-6 mt-3 text-gray-700 space-y-2">
          <li>Gain valuable knowledge from industry experts.</li>
          <li>Expand your professional network.</li>
          <li>Experience engaging activities and workshops.</li>
        </ul>
      </section>

      {/* How It Works Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900">How It Works</h2>
        <ol className="list-decimal pl-6 mt-3 text-gray-700 space-y-2">
          <li>Visit the event page and choose an event.</li>
          <li>Click on "Register" to sign up.</li>
          <li>Receive a confirmation email with event details.</li>
          <li>Join the event and enjoy!</li>
        </ol>
      </section>

      {/* Timeline Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900">Event Timeline</h2>
        <div className="mt-4 space-y-4">
          {timeline.map((item, index) => (
            <div key={index} className="p-4 border rounded-lg shadow-sm flex justify-between">
              <p className="text-gray-700">{item.milestone}</p>
              <p className="text-gray-500">{item.date}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900">What Attendees Say</h2>
        <div className="mt-4 space-y-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-4 border rounded-lg shadow-sm">
              <p className="text-gray-700 italic">"{testimonial.feedback}"</p>
              <p className="text-sm text-gray-500 mt-2">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-gray-100 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-900">Register Now!</h2>
        <p className="text-gray-600 mt-2">Join exciting events and explore new opportunities.</p>
        <button className="mt-4 px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800">
          Sign Up for Events
        </button>
      </section>

      {/* Contact Section */}
      <section className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900">Need More Info?</h2>
        <p className="text-gray-600 mt-2">Reach out to us for event-related inquiries and support.</p>
        <button className="mt-4 px-6 py-2 border border-gray-900 rounded-md hover:bg-gray-100">
          Contact Us
        </button>
      </section>
    </div>
  );
};

export default EventsPage;
