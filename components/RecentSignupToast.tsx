"use client";

import { useState, useEffect } from "react";
import { useLang } from "./LanguageContext";

const NAMES = [
  { name: "Marie", city: "Douala" }, { name: "Jean", city: "Yaound\u00e9" },
  { name: "Sandrine", city: "Limb\u00e9" }, { name: "Pascal", city: "Buea" },
  { name: "Diane", city: "Mutengene" }, { name: "Alain", city: "Bafoussam" },
  { name: "Rachel", city: "Bamenda" }, { name: "Victor", city: "Douala" },
  { name: "Judith", city: "Yaound\u00e9" }, { name: "Emmanuel", city: "Douala" },
];

export default function RecentSignupToast() {
  const { lang } = useLang();
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const show = () => {
      setIndex((i) => (i + 1) % NAMES.length);
      setVisible(true);
      setTimeout(() => setVisible(false), 5000);
    };
    const timer = setInterval(show, 30000);
    // Show first one after 8 seconds
    const first = setTimeout(show, 8000);
    return () => { clearInterval(timer); clearTimeout(first); };
  }, []);

  if (!visible) return null;

  const n = NAMES[index];
  const mins = (index % 5) + 1;
  const text = lang === "fr"
    ? `${n.name} de ${n.city} vient de rejoindre il y a ${mins} min`
    : `${n.name} from ${n.city} just joined ${mins} min ago`;

  return (
    <div className="fixed bottom-24 left-4 z-30 animate-slide-up">
      <div className="flex items-center gap-3 rounded-xl bg-[#1a2744] px-4 py-3 shadow-xl max-w-xs">
        <div className="w-8 h-8 rounded-full bg-teal flex items-center justify-center text-white text-xs font-bold shrink-0">
          {n.name[0]}
        </div>
        <p className="text-sm text-white/90 font-medium leading-snug">{text}</p>
      </div>
      <style jsx>{`
        @keyframes slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
      `}</style>
    </div>
  );
}
