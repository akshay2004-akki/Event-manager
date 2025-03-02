import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Google Generative AI client
const apiKey = import.meta.env.VITE_GENERATIVE_AI_API;
const genAI = new GoogleGenerativeAI(apiKey);

const CreateEvents = () => {
  // State for form data
  const [formData, setFormData] = useState({
    eventName: "",
    dateTime: "",
    location: "",
    category: "",
    coordinatorName: "",
    coordinatorContact: "",
    coordinatorEmail: "",
    club: "",
    department: "",
    facultyName: "",
    facultyEmail: "",
    description: "",
    eventImage: null,
  });

  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        eventImage: URL.createObjectURL(file), // Show preview of uploaded image
      }));
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Generate Event Description Using AI
  const generateDescription = async () => {
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Generate a detailed and engaging event description of at least 100 words based on the following details:
      - Event Name: ${formData.eventName}
      - Date & Time: ${formData.dateTime}
      - Location: ${formData.location}
      - Category: ${formData.category}
      - Coordinator Name: ${formData.coordinatorName}
      - Coordinator Contact: ${formData.coordinatorContact}
      - Coordinator Email: ${formData.coordinatorEmail}
      - Club: ${formData.club}
      - Department: ${formData.department}
      - Faculty Coordinator: ${formData.facultyName} (${formData.facultyEmail})

      The description should highlight the purpose, key details, and benefits of attending this event. Ensure it is well-structured and engaging.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();

      console.log(text);
      

      setFormData((prevData) => ({
        ...prevData,
        description: text,
      }));
    } catch (error) {
      console.error("Error generating event description:", error);
    }
    setLoading(false);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log("Submitted Data:", formData);
    alert("Event Created Successfully!");
  };

  return (
    <div className="min-h-screen translate-y-[60px] bg-gray-100 py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
        
        {/* Header Section */}
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Create a New Event</h2>
        
        {/* Form Section */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          
          {/* Event Details */}
          <div className="border-b pb-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Event Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium">Event Name</label>
                <input type="text" name="eventName" value={formData.eventName} onChange={handleChange} className="w-full p-2 border rounded mt-1" placeholder="Enter event name" required />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Date & Time</label>
                <input type="datetime-local" name="dateTime" value={formData.dateTime} onChange={handleChange} className="w-full p-2 border rounded mt-1" required />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Location</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full p-2 border rounded mt-1" placeholder="Enter event location" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded mt-1">
                  <option>Select Category</option>
                  <option>Technical</option>
                  <option>Cultural</option>
                  <option>Sports</option>
                  <option>Workshop</option>
                </select>
              </div>
            </div>
          </div>

          {/* Coordinators Section */}
          <div className="border-b pb-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Event Coordinators</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium">Coordinator Name</label>
                <input type="text" name="coordinatorName" value={formData.coordinatorName} onChange={handleChange} className="w-full p-2 border rounded mt-1" placeholder="Enter coordinator name" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Coordinator Contact</label>
                <input type="tel" name="coordinatorContact" value={formData.coordinatorContact} onChange={handleChange} className="w-full p-2 border rounded mt-1" placeholder="Enter contact number" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Coordinator Email</label>
                <input type="email" name="coordinatorEmail" value={formData.coordinatorEmail} onChange={handleChange} className="w-full p-2 border rounded mt-1" placeholder="Enter email address" />
              </div>
            </div>
          </div>

          <div className="border-b pb-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Upload Event Image</h3>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full p-2 border rounded mt-1" />
            {formData.eventImage && (
              <div className="mt-4">
                <p className="text-gray-700 font-medium">Image Preview:</p>
                <img src={formData.eventImage} alt="Event" className="w-full h-48 object-cover mt-2 rounded-lg border" />
              </div>
            )}
          </div>

          {/* Faculty Coordinator */}
          <div className="border-b pb-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Faculty Coordinator</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium">Faculty Name</label>
                <input type="text" name="facultyName" value={formData.facultyName} onChange={handleChange} className="w-full p-2 border rounded mt-1" placeholder="Enter faculty name" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Faculty Email</label>
                <input type="email" name="facultyEmail" value={formData.facultyEmail} onChange={handleChange} className="w-full p-2 border rounded mt-1" placeholder="Enter faculty email" />
              </div>
            </div>
          </div>

          {/* Event Description with AI */}
          <div className="border-b pb-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Event Description</h3>
            <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-3 border rounded mt-1" rows="4" placeholder="Write a brief description of the event..."></textarea>
            <button type="button" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded" onClick={generateDescription} disabled={loading}>
              {loading ? "Generating..." : "Generate Description"}
            </button>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button type="submit" className="px-6 py-2 bg-black text-white font-medium rounded-lg hover:bg-blue-700">Create Event</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateEvents;
