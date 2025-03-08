import React from "react";
import background from '../assets/registerEvent.webp'

const Login = () => {
  return (
    <div className="flex translate-y-[60px] min-h-screen items-center justify-center bg-gradient-to-r from-purple-500 to-blue-400 p-4">
      <div className="flex w-full max-w-4xl flex-col md:flex-row rounded-3xl bg-white shadow-lg overflow-hidden">
        {/* Left Side - Image */}
        <div className="hidden md:block md:w-1/2 relative">
          <img
            src={background}
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Nice to see you again</h2>
          
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Email or phone number</label>
              <input
                type="text"
                className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email or phone"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Password</label>
              <input
                type="password"
                className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
              />
            </div>

            <div className="flex justify-between items-center text-sm text-gray-600">
              <div>
                <input type="checkbox" className="mr-2" /> Remember me
              </div>
              <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
            </div>

            <button className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition">
              Sign In
            </button>

            <button className="w-full flex items-center justify-center bg-gray-900 text-white p-3 rounded-lg hover:bg-gray-800 transition">
              <img src={background} alt="Google" className="h-5 mr-2" />
              Sign in with Google
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-600 text-center">
            Don't have an account? <a href="#" className="text-blue-500 hover:underline">Sign up now</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
