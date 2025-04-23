import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar as CalendarIcon,
  MapPin,
  Users,
  Mail,
  FilePlus,
  Loader2,
} from "lucide-react";

// Initialize Google Generative AI client
const apiKey = import.meta.env.VITE_GENERATIVE_AI_API;
const genAI = new GoogleGenerativeAI(apiKey);

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeInOut",
      staggerChildren: 0.3, // Increased stagger for more pronounced effect
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 }, // Added scale
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

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
    eventImagePreview: null,
  });

  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track form submission state

  // Handle file upload
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        eventImage: file,
        eventImagePreview: URL.createObjectURL(file),
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
      const prompt = `Generate a detailed and engaging event description of at least 120 words based on the following details:
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

      The description should highlight the purpose, key details, and benefits of attending this event. Ensure it is well-structured, persuasive, and includes a call to action.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();

      setFormData((prevData) => ({
        ...prevData,
        description: text,
      }));
    } catch (error) {
      console.error("Error generating event description:", error);
      alert(
        "Failed to generate description. Please check your internet connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set submitting state
    try {
      const submissionData = new FormData();
      for (const key in formData) {
        if (formData[key] && key !== "eventImagePreview") {
          submissionData.append(key, formData[key]);
        }
      }

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/event/createEvent`,
        submissionData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
      alert("Event created successfully!");
      setFormData({
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
        eventImagePreview: null,
      });
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to create event. Please try again.");
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <div className="min-h-screen translate-y-[60px] bg-gradient-to-br from-indigo-200 via-purple-600 to-pink-600 py-12 px-6 flex items-center justify-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl w-full backdrop-blur-md bg-transparent shadow-black shadow-2xl rounded-3xl p-8 transform transition-all duration-700 ease-in-out border border-white/10"
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl font-extrabold text-gray-900 text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text"
        >
          Create a New Event
        </motion.h2>
        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Event Details */}
          <motion.div
            variants={itemVariants}
            className="border-b pb-6 border-gray-300/50"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <CalendarIcon className="w-6 h-6 text-blue-500" />
              Event Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Event Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleChange}
                  className="w-full bg-white/80 p-3 border rounded"
                  placeholder="Enter event name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Date & Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  name="dateTime"
                  value={formData.dateTime}
                  onChange={handleChange}
                  className="w-full bg-white/80 p-3 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2 flex items-center gap-1">
                  <MapPin className="w-4 h-4 inline-block mr-1" />
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full bg-white/80 p-3 border rounded"
                  placeholder="Enter event location"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-white/80 p-3 border rounded"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Technical">Technical</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Sports">Sports</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Seminar">Seminar</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Club
                </label>
                <input
                  type="text"
                  name="club"
                  value={formData.club}
                  onChange={handleChange}
                  className="w-full bg-white/80 p-3 border rounded"
                  placeholder="Enter club name"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full bg-white/80 p-3 border rounded"
                  placeholder="Enter department name"
                />
              </div>
            </div>
          </motion.div>

          {/* Upload Image */}
          <motion.div
            variants={itemVariants}
            className="border-b pb-6 border-gray-300/50"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FilePlus className="w-6 h-6 text-white" />
              Upload Event Image
            </h3>
            <input
              type="file"
              onChange={handleImageUpload}
              className="w-full bg-white/80 p-3 border rounded"
              accept="image/*"
            />
            {formData.eventImagePreview && (
              <div className="mt-4">
                <img
                  src={formData.eventImagePreview}
                  alt="Event Preview"
                  className="w-full h-auto rounded shadow-lg"
                />
              </div>
            )}
          </motion.div>

          {/* Coordinator & Faculty Details */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Users className="w-6 h-6 text-yellow-500" />
              Coordinator and Faculty Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Coordinator Name
                </label>
                <input
                  type="text"
                  name="coordinatorName"
                  value={formData.coordinatorName}
                  onChange={handleChange}
                  className="w-full bg-white/80 p-3 border rounded"
                  placeholder="Enter coordinator name"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Coordinator Contact
                </label>
                <input
                  type="text"
                  name="coordinatorContact"
                  value={formData.coordinatorContact}
                  onChange={handleChange}
                  className="w-full bg-white/80 p-3 border rounded"
                  placeholder="Enter coordinator contact"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Coordinator Email
                </label>
                <input
                  type="email"
                  name="coordinatorEmail"
                  value={formData.coordinatorEmail}
                  onChange={handleChange}
                  className="w-full bg-white/80 p-3 border rounded"
                  placeholder="Enter coordinator email"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Faculty Name
                </label>
                <input
                  type="text"
                  name="facultyName"
                  value={formData.facultyName}
                  onChange={handleChange}
                  className="w-full bg-white/80 p-3 border rounded"
                  placeholder="Enter faculty name"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Faculty Email
                </label>
                <input
                  type="email"
                  name="facultyEmail"
                  value={formData.facultyEmail}
                  onChange={handleChange}
                  className="w-full bg-white/80 p-3 border rounded"
                  placeholder="Enter faculty email"
                />
              </div>
            </div>
          </motion.div>

          {/* Event Description with AI */}
          <motion.div
            variants={itemVariants}
            className="border-b pb-6 border-gray-300/50"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Event Description
            </h3>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-white/80 p-3 border rounded"
              rows={6}
              placeholder="Write a brief description of the event..."
            />
            <button
              type="button"
              onClick={generateDescription}
              disabled={loading}
              className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded shadow-md"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Generating...
                </span>
              ) : (
                "Generate Description with AI"
              )}
            </button>
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md shadow-md"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Create Event"}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateEvents;
