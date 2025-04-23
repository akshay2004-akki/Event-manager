import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { motion } from "framer-motion";

function Hero() {
  const route = useNavigate();

  const handleLoginRoute = () => {
    route("/login");
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const toastShown = localStorage.getItem("isLoginToastShown");

    if (isLoggedIn === "true" && !toastShown) {
      toast.success("Logged in successfully 🎉");
      localStorage.setItem("isLoginToastShown", "true");
    }
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/notify/getMyNotifications`,
          { withCredentials: true }
        );
        console.log(res.data);

        if (res.data.notifications.length > 0) {
          res.data.notifications.forEach((notification) => {
            toast.info(`📢 ${notification.content}`, {
              duration: 5000,
            });
          });
        }
      } catch (err) {
        console.error("Notification fetch failed", err);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex font-poppins translate-y-[60px] flex-col items-center justify-center min-h-screen bg-white text-center p-8"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-4xl font-bold text-gray-900"
      >
        Connect, Engage, and Elevate Your Campus Experience
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="text-gray-600 mt-4 max-w-2xl"
      >
        Welcome to your ultimate college event management platform! Seamlessly register for 
        events and communicate with coordinators in real-time to enhance your campus life.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="mt-6 flex gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLoginRoute}
          className="bg-black text-white px-6 py-2 hover:cursor-pointer rounded"
        >
          Log in
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white border border-gray-900 text-gray-900 px-6 py-2 rounded"
        >
          Sign Up
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="mt-12 w-full max-w-4xl h-64 bg-gray-200 flex items-center justify-center rounded-xl shadow-md"
      >
        <span className="text-gray-500">Image Placeholder</span>
      </motion.div>
    </motion.div>
  );
}

export default Hero;
