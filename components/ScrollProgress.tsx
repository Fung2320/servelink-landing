"use client";

import { useState, useEffect } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (progress < 1) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px]">
      <div
        className="h-full bg-gradient-to-r from-[#00342a] to-[#004d3f] transition-[width] duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
