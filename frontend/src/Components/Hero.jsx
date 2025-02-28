function Hero() {
  return (
    <>
      <div className="flex font-poppins translate-y-[60px] flex-col items-center justify-center min-h-screen bg-white text-center p-8">
      {/* Heading Section */}
      <h1 className="text-4xl font-bold text-gray-900">
        Connect, Engage, and Elevate Your Campus Experience
      </h1>
      <p className="text-gray-600 mt-4 max-w-2xl">
        Welcome to your ultimate college event management platform! Seamlessly register for 
        events and communicate with coordinators in real-time to enhance your campus life.
      </p>

      {/* Buttons */}
      <div className="mt-6">
        <button className="bg-black text-white px-6 py-2 mr-4">
          Learn More
        </button>
        <button className="bg-white border border-gray-900 text-gray-900 px-6 py-2">
          Sign Up
        </button>
      </div>

      {/* Placeholder Image */}
      <div className="mt-12 w-full max-w-4xl h-64 bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500">Image Placeholder</span>
      </div>
    </div>
    </>
  )
}

export default Hero