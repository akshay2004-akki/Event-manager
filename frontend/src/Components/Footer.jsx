import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import logo from '../assets/logo.jpg'
const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-300 py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Logo */}
        <div className="col-span-1">
          <h2 className="font-semibold italic"><img src={logo} alt="" className="h-[200px] w-[200px]" /></h2>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-gray-600">
            <li><Link to="/" className="hover:text-black">Home</Link></li>
            <li><Link to="/events" className="hover:text-black">Events</Link></li>
            <li><Link to="/contact" className="hover:text-black">Contact Us</Link></li>
            <li><Link to="/about" className="hover:text-black">About Us</Link></li>
            <li><Link to="/support" className="hover:text-black">Support</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Resources</h3>
          <ul className="mt-3 space-y-2 text-gray-600">
            <li><Link to="/blog" className="hover:text-black">Blog</Link></li>
            <li><Link to="/faqs" className="hover:text-black">FAQs</Link></li>
            <li><Link to="/events-guide" className="hover:text-black">Events Guide</Link></li>
            <li><Link to="/user-guide" className="hover:text-black">User Guide</Link></li>
            <li><Link to="/feedback" className="hover:text-black">Feedback</Link></li>
          </ul>
        </div>

        {/* Stay Updated */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Stay Updated</h3>
          <ul className="mt-3 space-y-2 text-gray-600">
            <li><Link to="/newsletter" className="hover:text-black">Newsletter</Link></li>
            <li><Link to="/event-alerts" className="hover:text-black">Event Alerts</Link></li>
            <li><Link to="/campus-news" className="hover:text-black">Campus News</Link></li>
            <li><Link to="/event-tips" className="hover:text-black">Event Tips</Link></li>
            <li><Link to="/surveys" className="hover:text-black">Surveys</Link></li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Subscribe</h3>
          <p className="text-gray-600 mt-2">Join our newsletter for the latest updates and event news.</p>
          <div className="mt-3 flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-gray-300 p-2 rounded-l-md w-full"
            />
            <button className="bg-black text-white px-4 py-2 rounded-r-md hover:bg-gray-800">
              Subscribe
            </button>
          </div>
          <p className="text-gray-500 text-xs mt-2">
            By subscribing, you agree to our <Link to="/privacy-policy" className="underline">Privacy Policy</Link> and receive updates.
          </p>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="mt-10 text-center text-gray-600 text-sm border-t border-gray-300 pt-6">
        <p>© 2024 Campus Connect. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-3">
          <Link to="/privacy-policy" className="hover:text-black">Privacy Policy</Link>
          <Link to="/terms-of-service" className="hover:text-black">Terms of Service</Link>
          <Link to="/cookie-settings" className="hover:text-black">Cookie Settings</Link>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-4 mt-4 text-gray-500">
          <Link to="/" className="hover:text-black">🌍</Link> {/* Website */}
          <Link to="/" className="hover:text-black">📘</Link> {/* Facebook */}
          <Link to="/" className="hover:text-black">🐦</Link> {/* Twitter */}
          <Link to="/" className="hover:text-black">📷</Link> {/* Instagram */}
          <Link to="/" className="hover:text-black">▶️</Link> {/* YouTube */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
