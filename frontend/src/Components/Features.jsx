import React from 'react'

function Features() {
    const features = [
        {
          id: 1,
          title: "Register for Events Effortlessly",
          description: "Easily sign up for events that interest you.",
          img: "https://via.placeholder.com/150", // Replace with actual image
        },
        {
          id: 2,
          title: "Instant Communication with Event Coordinators",
          description: "Chat in real time to get your questions answered.",
          img: "https://via.placeholder.com/150", // Replace with actual image
        },
        {
          id: 3,
          title: "Stay Updated with Automatic Notifications",
          description: "Receive timely updates about upcoming events directly.",
          img: "https://via.placeholder.com/150", // Replace with actual image
        },
      ];
    
      return (
        <section className="text-center py-16 px-6">
          <h4 className="text-gray-500 uppercase tracking-wide">Connect</h4>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">
            Discover Our Key Features for Students
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Our platform simplifies event participation for students. Enjoy seamless 
            access to all the events happening on campus.
          </p>
    
          {/* Features Grid */}
          <div className="mt-10 grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.id} className="p-6 rounded-lg">
                <div className="bg-gray-200 h-40 flex items-center justify-center mb-4">
                  <img
                    src={feature.img}
                    alt={feature.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 mt-2">{feature.description}</p>
              </div>
            ))}
          </div>
    
          {/* Buttons */}
          <div className="mt-10 flex justify-center gap-4">
            <button className="px-6 py-2 border border-gray-900 hover:bg-gray-100">
              Learn More
            </button>
            <button className="px-6 py-2 bg-black text-white hover:bg-gray-800">
              Sign Up
            </button>
          </div>
        </section>
      );
}

export default Features