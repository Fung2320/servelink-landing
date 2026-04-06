"use client";

import { useState, useEffect } from "react";
import { useLang } from "./LanguageContext";
import { supabase } from "../lib/supabase";
import AnimateOnScroll from "./AnimateOnScroll";

const LAUNCH_DATE = new Date("2026-09-01T00:00:00+01:00"); // WAT (Cameroon)

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(): TimeLeft | null {
  const diff = LAUNCH_DATE.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  const { lang } = useLang();
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(calcTimeLeft());
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);

  // Countdown tick
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Waitlist count — fetch on mount + every 60s
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const { count, error } = await supabase
          .from("waitlist")
          .select("*", { count: "exact", head: true });
        if (!error && count !== null) setWaitlistCount(count);
      } catch {
        // silent
      }
    };
    fetchCount();
    const interval = setInterval(fetchCount, 60_000);
    return () => clearInterval(interval);
  }, []);

  const labels =
    lang === "fr"
      ? { title: "ServeLink lance dans...", days: "JOURS", hours: "HEURES", min: "MIN", sec: "SEC", live: "Nous sommes EN LIGNE ! Telecharger maintenant", waiting: "personnes deja inscrites" }
      : { title: "ServeLink launches in...", days: "DAYS", hours: "HOURS", min: "MIN", sec: "SEC", live: "We are LIVE! Download now", waiting: "people already waiting" };

  return (
    <section className="relative py-16 sm:py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Subtle accent dots */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-teal/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 text-center">
        {/* Waitlist counter */}
        {waitlistCount !== null && waitlistCount > 0 && (
          <AnimateOnScroll>
            <p className="text-lg sm:text-xl font-bold text-teal mb-6">
              <span className="text-2xl">&#128293;</span>{" "}
              {waitlistCount.toLocaleString()} {labels.waiting}
            </p>
          </AnimateOnScroll>
        )}

        <AnimateOnScroll>
          {timeLeft ? (
            <>
              <h2
                className="text-2xl sm:text-3xl font-bold text-navy mb-8"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {labels.title}
              </h2>

              <div className="flex justify-center gap-3 sm:gap-5">
                {[
                  { value: timeLeft.days, label: labels.days },
                  { value: timeLeft.hours, label: labels.hours },
                  { value: timeLeft.minutes, label: labels.min },
                  { value: timeLeft.seconds, label: labels.sec },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center">
                    <div className="w-[72px] h-[80px] sm:w-[90px] sm:h-[96px] rounded-2xl bg-gradient-to-br from-teal to-teal-dark flex items-center justify-center shadow-lg shadow-teal/20">
                      <span className="text-3xl sm:text-4xl font-black text-white tabular-nums">
                        {String(item.value).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="mt-2 text-[11px] sm:text-xs font-bold tracking-widest text-orange">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cameroon flag accent bar */}
              <div className="flex justify-center gap-1 mt-8">
                <div className="w-8 h-1 rounded-full bg-green-500" />
                <div className="w-8 h-1 rounded-full bg-red-500" />
                <div className="w-8 h-1 rounded-full bg-yellow-400" />
              </div>
            </>
          ) : (
            <div className="py-8">
              <p className="text-3xl sm:text-4xl font-black text-teal">
                {labels.live} <span className="text-4xl">&#127881;</span>
              </p>
            </div>
          )}
        </AnimateOnScroll>
      </div>
    </section>
  );
}
