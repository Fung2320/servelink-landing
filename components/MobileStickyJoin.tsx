"use client";

import { useState, useEffect } from "react";
import { useLang } from "./LanguageContext";

export default function MobileStickyJoin() {
  const { lang } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-white/90 backdrop-blur-md border-t border-gray-100 sm:hidden">
      <button
        onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}
        className="w-full rounded-xl bg-gradient-to-r from-orange to-[#C94608] py-3.5 text-base font-bold text-white shadow-lg shadow-orange/30 active:scale-[0.98] transition-transform"
      >
        {lang === "fr" ? "Rejoindre la liste d\u2019attente \u2192" : "Join the waitlist \u2192"}
      </button>
    </div>
  );
}
