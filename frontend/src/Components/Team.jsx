import React from "react";

const teamMembers = [
  {
    name: "Akshay Anand",
    role: "Project Lead | Fullstack Dev",
    description:
      "Passionate about creating memorable experiences for students and organizers alike.",
    image: "", // Add image URL here
  },
  {
    name: "Aarya Ratnam Sinha",
    role: "Frontend Developer",
    description:
      "Expert in promoting events and engaging with the student community effectively. Also Contricuted in the Frontend Development.",
    image: "", // Add image URL here
  },
  {
    name: "Abdul Fater",
    role: "Backend Developer",
    description:
      "Ensures seamless integration of technology for a smooth event experience. Also Contributed in the Backend Developemnt",
    image: "", // Add image URL here
  },
];

const Team = () => {
  return (
    <section className="max-w-6xl mx-auto my-16 px-6">
      {/* Heading */}
      <div className="text-center mb-12">
        <p className="text-gray-500 uppercase text-sm">Meet</p>
        <h2 className="text-4xl font-bold text-gray-900">Our Team</h2>
        <p className="text-gray-600 mt-2">
          Dedicated professionals committed to your event success.
        </p>
      </div>

      {/* Centered Team Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center place-items-center">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex border p-5 md:border-none md:p-0 flex-col items-center text-center">
            {/* Profile Picture */}
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span className="text-gray-500">📷</span>
              )}
            </div>

            {/* Info */}
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              {member.name}
            </h3>
            <p className="text-sm text-gray-500">{member.role}</p>
            <p className="text-gray-600 mt-2 text-sm">{member.description}</p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-3 text-gray-500">
              <span className="hover:text-black cursor-pointer">🔗</span>
              <span className="hover:text-black cursor-pointer">✉️</span>
              <span className="hover:text-black cursor-pointer">🌐</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
