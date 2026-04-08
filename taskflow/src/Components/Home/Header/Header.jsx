import React from "react";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Header = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      className="flex flex-col items-center justify-center py-20 px-4 bg-white gap-1"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        variants={itemVariants}
        className="w-16 h-16 bg-gradient-to-br from-[#4988C4] to-[#125391] rounded-2xl flex items-center justify-center shadow-lg mb-8"
      >
        <span className="text-white text-2xl font-bold italic">
          <HiAdjustmentsHorizontal />
        </span>
      </motion.div>

      <motion.h1
        variants={itemVariants}
        className="text-5xl md:text-6xl font-bold text-[#4988C4] mb-4 text-center"
      >
        Welcome to TaskNova
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="text-gray-600 text-lg md:text-xl text-center max-w-2xl leading-relaxed mb-10"
      >
        Enterprise-level project management system with real-time collaboration,{" "}
        <br className="hidden md:block" />
        Kanban boards, and comprehensive analytics.
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Link
          to="/login"
          className="bg-[#4988C4] hover:bg-[#6ba6dd] text-white px-8 py-3 rounded-full font-medium flex items-center justify-center transition-all"
        >
          Get Started
          <span className="ml-2">→</span>
        </Link>

        <Link
          to="/signup"
          className="bg-[#F8F9FC] hover:bg-gray-100 text-[#1E293B] px-8 py-3 rounded-full font-medium border border-gray-100 shadow-sm transition-all inline-block text-center"
        >
          Create Account
        </Link>
      </motion.div>
    </motion.section>
  );
};

export default Header;
