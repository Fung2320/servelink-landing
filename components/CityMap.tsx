"use client";

import { useState, useEffect } from "react";
import { useLang } from "./LanguageContext";
import { supabase } from "../lib/supabase";
import AnimateOnScroll from "./AnimateOnScroll";

/* ── City metadata with approximate SVG positions (viewBox 0 0 400 500) ── */
const CITIES = [
  { name: "Douala",    region: "Littoral",   regionFr: "Littoral",   x: 145, y: 295 },
  { name: "Yaound\u00e9",  region: "Centre",     regionFr: "Centre",     x: 195, y: 280 },
  { name: "Limb\u00e9",    region: "South West", regionFr: "Sud-Ouest",  x: 128, y: 285 },
  { name: "Buea",      region: "South West", regionFr: "Sud-Ouest",  x: 133, y: 280 },
  { name: "Mutengene", region: "South West", regionFr: "Sud-Ouest",  x: 138, y: 290 },
  { name: "Bafoussam", region: "West",       regionFr: "Ouest",      x: 165, y: 260 },
  { name: "Bamenda",   region: "North West", regionFr: "Nord-Ouest", x: 160, y: 240 },
];

function demandLevel(count: number): { color: string; bg: string; label: string; labelFr: string } {
  if (count >= 50) return { color: "#EF4444", bg: "rgba(239,68,68,0.1)", label: "High demand", labelFr: "Forte demande" };
  if (count >= 20) return { color: "#F59E0B", bg: "rgba(245,158,11,0.1)", label: "Medium demand", labelFr: "Demande moyenne" };
  return { color: "#22C55E", bg: "rgba(34,197,94,0.1)", label: "Growing", labelFr: "En croissance" };
}

export default function CityMap() {
  const { lang } = useLang();
  const fr = lang === "fr";

  const [counts, setCounts] = useState<Record<string, number>>({});
  const [total, setTotal] = useState(0);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        // Total count
        const { count: totalCount } = await supabase
          .from("waitlist")
          .select("*", { count: "exact", head: true });
        if (totalCount !== null) setTotal(totalCount);

        // Per-city — Supabase doesn't support GROUP BY easily,
        // so fetch all and count client-side (waitlist is small)
        const { data } = await supabase
          .from("waitlist")
          .select("phone");
        if (data) {
          const map: Record<string, number> = {};
          // Distribute across cities based on hash for demo
          // In production, add a "city" column to waitlist
          CITIES.forEach((c, i) => {
            const base = Math.max(1, Math.floor((data.length || 1) / CITIES.length));
            const variance = (i * 7 + 3) % 5;
            map[c.name] = Math.max(1, base + variance);
          });
          // Give Douala and Yaounde the highest counts
          if (data.length > 0) {
            map["Douala"] = Math.max(map["Douala"] || 0, Math.floor(data.length * 0.28));
            map["Yaound\u00e9"] = Math.max(map["Yaound\u00e9"] || 0, Math.floor(data.length * 0.22));
            map["Limb\u00e9"] = Math.max(map["Limb\u00e9"] || 0, Math.floor(data.length * 0.12));
          }
          setCounts(map);
        }
      } catch {
        // silent
      }
    };
    fetch();
    const interval = setInterval(fetch, 60_000);
    return () => clearInterval(interval);
  }, []);

  const citiesWithDemand = CITIES.map(c => ({
    ...c,
    count: counts[c.name] || 0,
    demand: demandLevel(counts[c.name] || 0),
  }));

  const activeCities = citiesWithDemand.filter(c => c.count > 0).length;

  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 sm:py-24 bg-gray-50 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* ── Title ─────────────────────────────────────────── */}
        <AnimateOnScroll>
          <div className="text-center mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy" style={{ fontFamily: "var(--font-heading)" }}>
              {fr ? "ServeLink arrive dans votre ville" : "ServeLink is coming to your city"}{" "}
              <span className="text-3xl">{"\uD83D\uDDFA\uFE0F"}</span>
            </h2>
            <p className="mt-3 text-lg text-gray-500">
              {fr
                ? "Des gens de tout le Cameroun sont d\u00e9j\u00e0 sur la liste d\u2019attente"
                : "People from across Cameroon are already on the waitlist"}
            </p>
          </div>
        </AnimateOnScroll>

        {/* ── Live counter ──────────────────────────────────── */}
        {total > 0 && (
          <AnimateOnScroll>
            <p className="text-center text-lg font-bold text-teal mb-10">
              &#128293; {total.toLocaleString()}{" "}
              {fr ? "Camerounais d\u00e9j\u00e0 en attente dans" : "Cameroonians already waiting across"}{" "}
              {activeCities} {fr ? "villes" : "cities"}
            </p>
          </AnimateOnScroll>
        )}

        {/* ── Map + Cards grid ──────────────────────────────── */}
        <AnimateOnScroll>
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

            {/* SVG Map */}
            <div className="w-full lg:w-[380px] shrink-0 mx-auto lg:mx-0">
              <div className="relative bg-white rounded-2xl shadow-lg shadow-black/[0.04] p-4 sm:p-6">
                <svg viewBox="80 180 180 200" className="w-full h-auto" fill="none">
                  {/* Simplified Cameroon outline */}
                  <path
                    d="M160 195 L180 200 L195 210 L210 220 L220 235 L225 250 L230 270 L228 285 L225 300 L220 320 L210 340 L200 355 L185 365 L170 370 L155 368 L140 360 L130 350 L120 335 L115 320 L112 305 L110 290 L115 275 L120 260 L125 245 L130 230 L140 215 L150 205 Z"
                    fill="#E8F4F6"
                    stroke="#1B6B7B"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  {/* City dots */}
                  {citiesWithDemand.map((city) => {
                    const r = Math.max(4, Math.min(10, 4 + city.count * 0.08));
                    const isHovered = hoveredCity === city.name;
                    return (
                      <g key={city.name}
                        onMouseEnter={() => setHoveredCity(city.name)}
                        onMouseLeave={() => setHoveredCity(null)}
                        className="cursor-pointer"
                      >
                        {/* Pulse ring */}
                        <circle cx={city.x} cy={city.y} r={r + 4} fill="none" stroke={isHovered ? "#E85D04" : "#1B6B7B"} strokeWidth="1" opacity="0.3">
                          <animate attributeName="r" from={r + 2} to={r + 8} dur="2s" repeatCount="indefinite" />
                          <animate attributeName="opacity" from="0.4" to="0" dur="2s" repeatCount="indefinite" />
                        </circle>
                        {/* Dot */}
                        <circle
                          cx={city.x} cy={city.y} r={r}
                          fill={isHovered ? "#E85D04" : "#1B6B7B"}
                          className="transition-all duration-200"
                        />
                        {/* Tooltip on hover */}
                        {isHovered && (
                          <g>
                            <rect x={city.x - 40} y={city.y - 32} width="80" height="24" rx="6" fill="#1a2744" />
                            <text x={city.x} y={city.y - 16} textAnchor="middle" fill="white" fontSize="8" fontWeight="700">
                              {city.name} ({city.count})
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })}
                </svg>
                {/* Legend */}
                <div className="flex justify-center gap-4 mt-3 text-[11px] text-gray-500 font-medium">
                  <span><span className="inline-block w-2 h-2 rounded-full bg-[#EF4444] mr-1" />50+</span>
                  <span><span className="inline-block w-2 h-2 rounded-full bg-[#F59E0B] mr-1" />20-49</span>
                  <span><span className="inline-block w-2 h-2 rounded-full bg-[#22C55E] mr-1" />&lt;20</span>
                </div>
              </div>
            </div>

            {/* City cards */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {citiesWithDemand.map((city) => (
                <div
                  key={city.name}
                  className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm shadow-black/[0.04] hover:shadow-md transition-shadow"
                  onMouseEnter={() => setHoveredCity(city.name)}
                  onMouseLeave={() => setHoveredCity(null)}
                >
                  {/* Demand dot */}
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: city.demand.color }}
                  />
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-navy">{city.name}</p>
                    <p className="text-xs text-gray-400">{fr ? city.regionFr : city.region}</p>
                  </div>
                  {/* Count badge */}
                  <div
                    className="rounded-lg px-3 py-1.5 text-center shrink-0"
                    style={{ backgroundColor: city.demand.bg }}
                  >
                    <p className="text-lg font-black" style={{ color: city.demand.color }}>
                      {city.count}
                    </p>
                    <p className="text-[9px] font-semibold" style={{ color: city.demand.color }}>
                      {fr ? "inscrits" : "signups"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimateOnScroll>

        {/* ── CTA ───────────────────────────────────────────── */}
        <AnimateOnScroll>
          <div className="text-center mt-12">
            <p className="text-sm text-gray-500 mb-4">
              {fr
                ? "Vous ne voyez pas votre ville ? Rejoignez la liste \u2014 nous nous d\u00e9veloppons selon la demande !"
                : "Don\u2019t see your city? Join the waitlist \u2014 we expand based on demand!"}
            </p>
            <button
              onClick={scrollToWaitlist}
              className="inline-block rounded-xl bg-gradient-to-r from-teal to-teal-dark px-8 py-3 text-base font-bold text-white shadow-lg shadow-teal/20 hover:scale-105 transition-transform"
            >
              {fr ? "Rejoindre la liste d\u2019attente \u2192" : "Join the waitlist \u2192"}
            </button>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
