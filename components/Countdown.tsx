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

// ─── Simulated growth baseline ────────────────────────────────────────────────
const WAITLIST_START_DATE = new Date("2026-04-09");
const WAITLIST_BASE_COUNT = 47;
const WAITLIST_GROWTH_PER_DAY = 6;

function getSimulatedCount(): number {
  const daysPassed = Math.floor(
    (Date.now() - WAITLIST_START_DATE.getTime()) / (1000 * 60 * 60 * 24)
  );
  // Small hourly variation: ±1 based on current hour
  const hourVariation = new Date().getHours() % 2 === 0 ? 1 : 0;
  return WAITLIST_BASE_COUNT + daysPassed * WAITLIST_GROWTH_PER_DAY + hourVariation;
}

export default function Countdown() {
  const { lang } = useLang();
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(calcTimeLeft());
  const [waitlistCount, setWaitlistCount] = useState<number>(getSimulatedCount());

  // Countdown tick
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Waitlist count — fetch on mount + every 60s, always show max(real, simulated)
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const { count, error } = await supabase
          .from("waitlist")
          .select("*", { count: "exact", head: true });
        if (!error && count !== null) {
          setWaitlistCount(Math.max(count, getSimulatedCount()));
        } else {
          setWaitlistCount(getSimulatedCount());
        }
      } catch {
        setWaitlistCount(getSimulatedCount());
      }
    };
    fetchCount();
    const interval = setInterval(fetchCount, 60_000);
    return () => clearInterval(interval);
  }, []);

  const labels =
    lang === "fr"
      ? { title: "ServeLink lance dans...", days: "JOURS", hours: "HEURES", min: "MIN", sec: "SEC", live: "Nous sommes EN LIGNE ! Telecharger maintenant", waiting: `🔥 ${waitlistCount.toLocaleString()} personnes déjà en attente` }
      : { title: "ServeLink launches in...", days: "DAYS", hours: "HOURS", min: "MIN", sec: "SEC", live: "We are LIVE! Download now", waiting: `🔥 ${waitlistCount.toLocaleString()} people already waiting` };

  return (
    <section className="relative py-16 sm:py-20 bg-gradient-to-b from-[#fcf9f8] to-[#f6f3f2] overflow-hidden">
      {/* Subtle accent dots */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#00342a]/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 text-center">
        {/* Waitlist counter */}
        <AnimateOnScroll>
          <p className="text-lg sm:text-xl font-bold text-[#00342a] mb-6">
            {labels.waiting}
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll>
          {timeLeft ? (
            <>
              <h2
                className="text-2xl sm:text-3xl font-bold text-[#1b1b1b] mb-8"
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
                    <div className="w-[72px] h-[80px] sm:w-[90px] sm:h-[96px] rounded-2xl bg-gradient-to-br from-[#00342a] to-[#004d3f] flex items-center justify-center shadow-lg shadow-[#1b1b1b]/[0.06]">
                      <span className="text-3xl sm:text-4xl font-black text-white tabular-nums">
                        {String(item.value).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="mt-2 text-[11px] sm:text-xs font-bold tracking-widest text-[#735c00]">
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
              <p className="text-3xl sm:text-4xl font-black text-[#00342a]">
                {labels.live} <span className="text-4xl">&#127881;</span>
              </p>
            </div>
          )}
        </AnimateOnScroll>
      </div>
    </section>
  );
}
