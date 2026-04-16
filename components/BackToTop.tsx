"use client";

import { useState, useEffect } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 left-6 z-40 w-11 h-11 rounded-full bg-[#00342a] text-white flex items-center justify-center shadow-lg shadow-[#1b1b1b]/[0.06] hover:scale-110 transition-all animate-fade-in"
      aria-label="Back to top"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 14V4M9 4L4 9M9 4L14 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <style jsx>{`
        @keyframes fade-in { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
        .animate-fade-in { animation: fade-in 0.2s ease-out; }
      `}</style>
    </button>
  );
}
