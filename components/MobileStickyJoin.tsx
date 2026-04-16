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
    <div className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-white/90 backdrop-blur-md border-t border-[#1b1b1b]/10 sm:hidden">
      <button
        onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}
        className="w-full rounded-xl bg-gradient-to-r from-[#fecc00] to-[#d4ad00] py-3.5 text-base font-bold text-[#1b1b1b] shadow-lg shadow-[#1b1b1b]/[0.06] active:scale-[0.98] transition-transform"
      >
        {lang === "fr" ? "Rejoindre la liste d\u2019attente \u2192" : "Join the waitlist \u2192"}
      </button>
    </div>
  );
}
