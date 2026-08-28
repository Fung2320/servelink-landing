"use client";

import { useEffect, useState, useRef } from "react";
import { useLang } from "./LanguageContext";
import { supabase } from "../lib/supabase";

const NAMES = [
  { name: "Marie", city: "Douala" }, { name: "Jean", city: "Yaound\u00e9" },
  { name: "Sandrine", city: "Limb\u00e9" }, { name: "Pascal", city: "Buea" },
  { name: "Diane", city: "Mutengene" }, { name: "Alain", city: "Bafoussam" },
  { name: "Rachel", city: "Bamenda" }, { name: "Victor", city: "Douala" },
  { name: "Judith", city: "Yaound\u00e9" }, { name: "Emmanuel", city: "Douala" },
  { name: "Christelle", city: "Limb\u00e9" }, { name: "Boris", city: "Douala" },
  { name: "Nad\u00e8ge", city: "Yaound\u00e9" }, { name: "Franck", city: "Buea" },
  { name: "Ornella", city: "Mutengene" }, { name: "Bertrand", city: "Bafoussam" },
  { name: "Carine", city: "Douala" }, { name: "Rodrigue", city: "Bamenda" },
  { name: "F\u00e9licit\u00e9", city: "Yaound\u00e9" }, { name: "Armand", city: "Limb\u00e9" },
  { name: "Ghislaine", city: "Douala" }, { name: "Serge", city: "Buea" },
  { name: "Laure", city: "Mutengene" }, { name: "Thierry", city: "Douala" },
  { name: "Ingrid", city: "Yaound\u00e9" }, { name: "Wilfried", city: "Bafoussam" },
  { name: "Alvine", city: "Limb\u00e9" }, { name: "Ga\u00ebtan", city: "Douala" },
  { name: "Mireille", city: "Bamenda" }, { name: "Herv\u00e9", city: "Buea" },
  { name: "Josiane", city: "Douala" }, { name: "C\u00e9dric", city: "Yaound\u00e9" },
  { name: "Pulch\u00e9rie", city: "Limb\u00e9" }, { name: "L\u00e9on", city: "Mutengene" },
  { name: "Solange", city: "Douala" }, { name: "Patrice", city: "Bafoussam" },
  { name: "Larissa", city: "Bamenda" }, { name: "Gilles", city: "Buea" },
  { name: "Yvette", city: "Yaound\u00e9" }, { name: "Rostand", city: "Douala" },
  { name: "Astrid", city: "Limb\u00e9" }, { name: "Cl\u00e9ment", city: "Buea" },
  { name: "Raissa", city: "Douala" }, { name: "Landry", city: "Yaound\u00e9" },
  { name: "Estelle", city: "Mutengene" }, { name: "Martial", city: "Bafoussam" },
  { name: "Vani\u00e8ssa", city: "Douala" }, { name: "Didier", city: "Bamenda" },
  { name: "Paule", city: "Yaound\u00e9" }, { name: "Christian", city: "Limb\u00e9" },
  { name: "Brigitte", city: "Douala" }, { name: "Narcisse", city: "Buea" },
  { name: "Fl\u00e9mence", city: "Mutengene" }, { name: "Aurel", city: "Douala" },
  { name: "Priscille", city: "Yaound\u00e9" }, { name: "Edmond", city: "Bafoussam" },
  { name: "Danielle", city: "Bamenda" }, { name: "Ruphin", city: "Douala" },
  { name: "Tatiana", city: "Limb\u00e9" }, { name: "Fran\u00e7ois", city: "Buea" },
  { name: "Monique", city: "Douala" }, { name: "Gustave", city: "Yaound\u00e9" },
  { name: "Sylvie", city: "Limb\u00e9" }, { name: "Achille", city: "Mutengene" },
  { name: "Nadine", city: "Bafoussam" }, { name: "Roland", city: "Douala" },
  { name: "Viviane", city: "Bamenda" }, { name: "Alexis", city: "Buea" },
  { name: "Paulette", city: "Yaound\u00e9" }, { name: "St\u00e9phane", city: "Douala" },
  { name: "Aurore", city: "Limb\u00e9" }, { name: "Colette", city: "Mutengene" },
  { name: "Ren\u00e9", city: "Bamenda" }, { name: "Oph\u00e9lie", city: "Buea" },
  { name: "Maurice", city: "Douala" }, { name: "Denise", city: "Yaound\u00e9" },
  { name: "Lambert", city: "Limb\u00e9" }, { name: "Gloire", city: "Douala" },
  { name: "Symphorien", city: "Buea" }, { name: "Ch\u00e9ryl", city: "Bafoussam" },
  { name: "Aloys", city: "Yaound\u00e9" }, { name: "Suzanne", city: "Douala" },
  { name: "Gedeon", city: "Mutengene" }, { name: "Henriette", city: "Bamenda" },
  { name: "Josu\u00e9", city: "Douala" }, { name: "Anastasie", city: "Limb\u00e9" },
  { name: "Blaise", city: "Buea" }, { name: "Hilaire", city: "Yaound\u00e9" },
  { name: "Marleine", city: "Bafoussam" }, { name: "Fid\u00e8le", city: "Douala" },
  { name: "Justine", city: "Mutengene" }, { name: "S\u00e9bastien", city: "Bamenda" },
  { name: "Am\u00e9lie", city: "Buea" }, { name: "Norbert", city: "Douala" },
  { name: "Flore", city: "Yaound\u00e9" }, { name: "Constantin", city: "Limb\u00e9" },
];

interface Presence { name: string; city: string; key: string; }

export default function LivePresenceToast() {
  const { lang } = useLang();
  const [toast, setToast] = useState<Presence | null>(null);
  const myKey = useRef<string>("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const simulatedRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasRealVisitor = useRef(false);

  const showSimulated = () => {
    // Pick a random name that isn't the same as last toast
    const pick = NAMES[Math.floor(Math.random() * NAMES.length)];
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setToast({ name: pick.name, city: pick.city, key: "simulated" });
    timeoutRef.current = setTimeout(() => setToast(null), 5000);
  };

  useEffect(() => {
    const me = NAMES[Math.floor(Math.random() * NAMES.length)];
    myKey.current = `visitor_${Date.now()}_${Math.random().toString(36).slice(2)}`;

    const channel = supabase.channel("landing-presence", {
      config: { presence: { key: myKey.current } },
    });

    channel
      .on("presence", { event: "join" }, ({ newPresences }: { newPresences: any[] }) => {
        const other = newPresences.find((p: any) => p.key !== myKey.current);
        if (!other) return;
        hasRealVisitor.current = true;
        // Stop simulated when real visitors are present
        if (simulatedRef.current) { clearInterval(simulatedRef.current); simulatedRef.current = null; }
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setToast({ name: other.name, city: other.city, key: other.key });
        timeoutRef.current = setTimeout(() => setToast(null), 5000);
      })
      .on("presence", { event: "leave" }, () => {
        // When real visitors leave, restart simulated fallback
        hasRealVisitor.current = false;
        if (!simulatedRef.current) {
          simulatedRef.current = setInterval(showSimulated, 30000);
        }
      })
      .subscribe(async (status: string) => {
        if (status === "SUBSCRIBED") {
          await channel.track({ name: me.name, city: me.city, key: myKey.current });
        }
      });

    // Start simulated fallback after 8 seconds — show once then every 30s
    const firstTimer = setTimeout(() => {
      if (!hasRealVisitor.current) {
        showSimulated();
        simulatedRef.current = setInterval(() => {
          if (!hasRealVisitor.current) showSimulated();
        }, 30000);
      }
    }, 8000);

    return () => {
      clearTimeout(firstTimer);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (simulatedRef.current) clearInterval(simulatedRef.current);
      supabase.removeChannel(channel);
    };
  }, []);

  if (!toast) return null;

  const text = lang === "fr"
    ? `${toast.name} de ${toast.city} consulte la page en ce moment`
    : `${toast.name} from ${toast.city} is viewing right now`;

  return (
    <div className="fixed bottom-24 left-4 z-30 animate-slide-up">
      <div className="flex items-center gap-3 rounded-xl bg-[#1a2744] px-4 py-3 shadow-xl max-w-xs">
        <div className="relative flex h-3 w-3 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
        </div>
        <div className="w-7 h-7 rounded-full bg-teal flex items-center justify-center text-white text-xs font-bold shrink-0">
          {toast.name[0]}
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
