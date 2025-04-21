import { useState, useEffect } from "react";
import { Mail, Phone, Save, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditProfile = () => {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/getDetails`, {
          withCredentials: true,
        });
        console.log(res.data);
        
        setProfileData(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchUser();
  }, []);
  
  

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    bio: "",
    department: "",
    semester: "",
    rollNumber: "", // ✅ Added roll number to state
    section : ""
  });

  useEffect(() => {
    if (profileData) {
      setFormData({
        fullName: profileData.userId.fullName,
        email: profileData.userId.email,
        phoneNumber: profileData.phoneNumber,
        bio: profileData?.bio || "",
        department: profileData.department || "",
        semester: profileData.semester || "",
        rollNumber: profileData.rollNumber || "", // ✅ Populate roll number
        section : profileData.section
      });
    }
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
        // console.log(formData);
        
      const req = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/users/updateProfile`, formData, {
        withCredentials: true
      });
      console.log("req",req);
      
      navigate("/profile"); // redirect to profile page
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 pt-24">
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-indigo-700">Edit Profile</h2>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-sm text-indigo-600 hover:underline"
          >
            <ArrowLeft size={16} className="mr-1" /> Back
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 text-sm shadow-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 text-sm shadow-sm"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 text-sm shadow-sm"
            />
          </div>

          {/* Branch */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Branch</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 text-sm shadow-sm"
            />
          </div>

          {/* Year */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Year</label>
            <input
              type="text"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 text-sm shadow-sm"
            />
          </div>
          {/* section */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Year</label>
            <input
              type="text"
              name="section"
              value={formData.section}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 text-sm shadow-sm"
            />
          </div>

          {/* Roll Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Roll Number</label>
            <input
              type="text"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 text-sm shadow-sm"
            />
          </div>

          {/* Bio */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full border rounded-md p-2 text-sm shadow-sm"
              placeholder="Write something about yourself..."
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSubmit}
            className="inline-flex items-center px-5 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
          >
            <Save size={16} className="mr-2" /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
