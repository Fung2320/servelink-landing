"use client";

import { useState, useEffect } from "react";
import { useLang } from "./LanguageContext";

const NAMES = [
  { name: "Marie", city: "Douala" }, { name: "Jean", city: "Yaoundé" },
  { name: "Sandrine", city: "Limbé" }, { name: "Pascal", city: "Buea" },
  { name: "Diane", city: "Mutengene" }, { name: "Alain", city: "Bafoussam" },
  { name: "Rachel", city: "Bamenda" }, { name: "Victor", city: "Douala" },
  { name: "Judith", city: "Yaoundé" }, { name: "Emmanuel", city: "Douala" },
  { name: "Christelle", city: "Limbé" }, { name: "Boris", city: "Douala" },
  { name: "Nadège", city: "Yaoundé" }, { name: "Franck", city: "Buea" },
  { name: "Ornella", city: "Mutengene" }, { name: "Bertrand", city: "Bafoussam" },
  { name: "Carine", city: "Douala" }, { name: "Rodrigue", city: "Bamenda" },
  { name: "Félicité", city: "Yaoundé" }, { name: "Armand", city: "Limbé" },
  { name: "Ghislaine", city: "Douala" }, { name: "Serge", city: "Buea" },
  { name: "Laure", city: "Mutengene" }, { name: "Thierry", city: "Douala" },
  { name: "Ingrid", city: "Yaoundé" }, { name: "Wilfried", city: "Bafoussam" },
  { name: "Alvine", city: "Limbé" }, { name: "Gaëtan", city: "Douala" },
  { name: "Mireille", city: "Bamenda" }, { name: "Hervé", city: "Buea" },
  { name: "Josiane", city: "Douala" }, { name: "Cédric", city: "Yaoundé" },
  { name: "Pulchérie", city: "Limbé" }, { name: "Léon", city: "Mutengene" },
  { name: "Solange", city: "Douala" }, { name: "Patrice", city: "Bafoussam" },
  { name: "Larissa", city: "Bamenda" }, { name: "Gilles", city: "Buea" },
  { name: "Yvette", city: "Yaoundé" }, { name: "Rostand", city: "Douala" },
  { name: "Astrid", city: "Limbé" }, { name: "Clément", city: "Buea" },
  { name: "Raissa", city: "Douala" }, { name: "Landry", city: "Yaoundé" },
  { name: "Estelle", city: "Mutengene" }, { name: "Martial", city: "Bafoussam" },
  { name: "Vanièssa", city: "Douala" }, { name: "Didier", city: "Bamenda" },
  { name: "Paule", city: "Yaoundé" }, { name: "Christian", city: "Limbé" },
  { name: "Brigitte", city: "Douala" }, { name: "Narcisse", city: "Buea" },
  { name: "Flémence", city: "Mutengene" }, { name: "Aurel", city: "Douala" },
  { name: "Priscille", city: "Yaoundé" }, { name: "Edmond", city: "Bafoussam" },
  { name: "Danielle", city: "Bamenda" }, { name: "Ruphin", city: "Douala" },
  { name: "Tatiana", city: "Limbé" }, { name: "François", city: "Buea" },
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
