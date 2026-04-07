import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-white/80 backdrop-blur-md border-t border-slate-100 py-8 px-6 font-sans">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left Side: Brand & Slogan */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-3xl font-bold tracking-tighter text-slate-900">
              TASK<span className="text-[#4988C4]">NOVE</span>
            </h2>
            <p className="text-[12px] text-slate-500 font-medium uppercase tracking-widest mt-1">
              Enterprise Management System
            </p>
          </div>

          {/* Right Side: Copyright */}
          <div className="text-right">
            <p className="text-[13px] text-slate-400">
              © 2026{" "}
              <span className="text-[#4988C4] font-semibold">Tasknove</span>.
              Built with ❤️
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
