import React from "react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="bg-[#EEF2FF] py-20 px-6">
      <div className="max-w-7xl mx-auto bg-[#4988C4] rounded-[2.5rem] py-16 px-8 flex flex-col items-center justify-center text-white shadow-2xl shadow-indigo-200">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Ready to Get Started?
        </h2>

        {/* Subtitle */}
        <p className="text-indigo-100 text-lg md:text-xl mb-12 text-center opacity-90">
          Join TaskFlow today and experience the future of project management
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
          <Link
            to="/login"
            className="bg-white text-[#1E293B] px-10 py-4 rounded-2xl font-bold text-lg flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-lg"
          >
            Get Started
            <span className="ml-2">→</span>
          </Link>

          <Link
            to="/signup"
            className="bg-transparent border-2 border-white/30 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition-colors"
          >
            Create Account
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
