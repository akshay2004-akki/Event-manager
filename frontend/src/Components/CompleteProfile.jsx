import React, { useState } from "react";
import axios from "axios";

const CompleteProfile = () => {
  const [formData, setFormData] = useState({
    department: "",
    phoneNumber: "",
    section: "",
    collegeName: "",
    semester: "",
    rollNumber: "",
    bio: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(formData);
        
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/profile`, formData, {
        withCredentials: true,
      });
      setMessage(response.data.message);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Create Your Profile</h2>
      {message && <p className="text-green-600 mb-4">{message}</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg"
          required
        />

        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg"
          required
        />

        <input
          type="text"
          name="section"
          placeholder="Section"
          value={formData.section}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg"
          required
        />

        <input
          type="text"
          name="collegeName"
          placeholder="College Name"
          value={formData.collegeName}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg"
          required
        />

        <input
          type="text"
          name="semester"
          placeholder="Semester"
          value={formData.semester}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg"
          required
        />

        <input
          type="text"
          name="rollNumber"
          placeholder="Roll Number"
          value={formData.rollNumber}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <textarea
          name="bio"
          placeholder="Short Bio (Optional)"
          value={formData.bio}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CompleteProfile;
