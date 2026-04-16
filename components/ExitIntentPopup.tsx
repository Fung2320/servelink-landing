"use client";

import { useState, useEffect } from "react";
import { useLang } from "./LanguageContext";

const SESSION_KEY = "servelink-exit-shown";

export default function ExitIntentPopup() {
  const { lang } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const handler = (e: MouseEvent) => {
      if (e.clientY < 10) {
        sessionStorage.setItem(SESSION_KEY, "1");
        setVisible(true);
      }
    };
    document.addEventListener("mousemove", handler);
    return () => document.removeEventListener("mousemove", handler);
  }, []);

  if (!visible) return null;

  const fr = lang === "fr";

  const scrollToWaitlist = () => {
    setVisible(false);
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1b1b1b]/50 backdrop-blur-sm animate-fade">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
        <button
          onClick={() => setVisible(false)}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#f6f3f2] flex items-center justify-center text-gray-400 hover:bg-[#e8e5e4] transition-colors"
        >
          &#10005;
        </button>
        <p className="text-4xl mb-4">&#9889;</p>
        <h3 className="text-xl font-bold text-[#1b1b1b] mb-2" style={{ fontFamily: "var(--font-heading)" }}>
          {fr ? "Attendez ! Ne manquez pas votre place" : "Wait! Don\u2019t miss your founding member spot"}
        </h3>
        <p className="text-sm text-[#4f4f4f] mb-6">
          {fr
            ? "Seulement 100 places de membres fondateurs. Rejoignez maintenant, c\u2019est gratuit."
            : "Only 100 founding member spots available. Join now, it\u2019s free."}
        </p>
        <button
          onClick={scrollToWaitlist}
          className="w-full rounded-xl bg-gradient-to-r from-[#fecc00] to-[#d4ad00] py-3.5 text-base font-bold text-[#1b1b1b] shadow-lg shadow-[#1b1b1b]/[0.06] hover:scale-[1.02] transition-transform"
        >
          {fr ? "Rejoindre la liste d\u2019attente \u2192" : "Join the waitlist \u2014 it\u2019s free \u2192"}
        </button>
        <p className="mt-3 text-xs text-gray-400">
          {fr ? "Pas de spam. D\u00e9sinscription possible." : "No spam. Unsubscribe anytime."}
        </p>
      </div>
      <style jsx>{`
        @keyframes fade { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade { animation: fade 0.25s ease-out; }
      `}</style>
    </div>
  );
}
