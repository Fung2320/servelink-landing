"use client";

import { useRef } from "react";
import { useLang } from "./LanguageContext";
import AnimateOnScroll from "./AnimateOnScroll";

/* ── Mock screen data ────────────────────────────────────────────────────── */
const SCREENS = [
  {
    id: "client-home",
    captionEn: "Find any service instantly",
    captionFr: "Trouvez un service en un instant",
  },
  {
    id: "services",
    captionEn: "118+ service categories",
    captionFr: "118+ categories de services",
  },
  {
    id: "create-job",
    captionEn: "Book in under 2 minutes",
    captionFr: "Reservez en moins de 2 minutes",
  },
  {
    id: "worker-home",
    captionEn: "Providers manage jobs easily",
    captionFr: "Les prestataires gerent facilement",
  },
  {
    id: "ai-search",
    captionEn: "AI search in French or English",
    captionFr: "Recherche IA en francais ou anglais",
  },
  {
    id: "chat",
    captionEn: "Chat before the job starts",
    captionFr: "Discutez avant le debut du travail",
  },
];

/* ── Tiny mock UI pieces ─────────────────────────────────────────────────── */
const Pill = ({ children, active = false }: { children: string; active?: boolean }) => (
  <span
    className={`inline-block px-2 py-0.5 rounded-full text-[7px] font-bold ${
      active ? "bg-teal text-white" : "bg-gray-100 text-gray-500"
    }`}
  >
    {children}
  </span>
);

const MockBtn = ({ children, orange = false }: { children: string; orange?: boolean }) => (
  <span
    className={`block text-center text-[8px] font-bold py-1.5 rounded-lg ${
      orange ? "bg-orange text-white" : "bg-teal text-white"
    }`}
  >
    {children}
  </span>
);

const BarRow = ({ w }: { w: string }) => (
  <div className="h-1.5 rounded-full bg-gray-100" style={{ width: w }} />
);

/* ── Individual screen mockups ───────────────────────────────────────────── */
function ClientHome() {
  return (
    <div className="flex flex-col gap-1.5 p-2">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[7px] text-gray-400">Good morning</p>
          <p className="text-[9px] font-bold text-navy">Yannick</p>
        </div>
        <div className="w-5 h-5 rounded-full bg-teal flex items-center justify-center text-[7px] text-white font-bold">Y</div>
      </div>
      <div className="rounded-lg bg-gradient-to-r from-teal to-teal-dark p-2">
        <p className="text-[7px] text-white/80">Need help?</p>
        <p className="text-[9px] font-bold text-white">Book a service</p>
        <MockBtn orange>Post a Job</MockBtn>
      </div>
      <div className="flex gap-1">
        <div className="flex-1 rounded-md bg-gray-50 p-1.5 text-center">
          <p className="text-[7px] text-teal font-bold">Browse</p>
        </div>
        <div className="flex-1 rounded-md bg-gray-50 p-1.5 text-center">
          <p className="text-[7px] text-teal font-bold">Smart Search</p>
        </div>
      </div>
      <p className="text-[7px] font-bold text-navy mt-0.5">Popular Services</p>
      <div className="grid grid-cols-4 gap-1">
        {["💅🏽","🔧","🧹","📚"].map((e,i)=>(
          <div key={i} className="aspect-square rounded-md bg-gray-50 flex items-center justify-center text-sm">{e}</div>
        ))}
      </div>
    </div>
  );
}

function ServicesGrid() {
  const icons = ["💅🏽","💆🏽","🔧","🧹","👶🏽","📚","🚗","🌿","🍽","💻","💪🏽","📦"];
  const names = ["Beauty","Wellness","Home","Clean","Care","Edu","Auto","Garden","Food","Tech","Fit","Move"];
  return (
    <div className="flex flex-col gap-1.5 p-2">
      <p className="text-[9px] font-bold text-navy">All Services</p>
      <p className="text-[7px] text-gray-400">118+ services available</p>
      <div className="grid grid-cols-3 gap-1.5 mt-1">
        {icons.map((icon, i) => (
          <div key={i} className="rounded-lg bg-gray-50 p-1.5 flex flex-col items-center gap-0.5">
            <span className="text-base">{icon}</span>
            <span className="text-[6px] font-semibold text-gray-500">{names[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CreateJob() {
  return (
    <div className="flex flex-col gap-1.5 p-2">
      <p className="text-[9px] font-bold text-navy">Post a Job</p>
      <div className="rounded-md border border-dashed border-teal/40 p-2 text-center">
        <p className="text-[7px] text-teal font-semibold">📷 Add photo</p>
      </div>
      <p className="text-[6px] text-gray-400 font-bold tracking-wider">CATEGORY *</p>
      <div className="flex gap-1 flex-wrap">
        <Pill active>🔧 Home</Pill>
        <Pill>🧹 Clean</Pill>
        <Pill>💅🏽 Beauty</Pill>
      </div>
      <p className="text-[6px] text-gray-400 font-bold tracking-wider">CITY *</p>
      <div className="rounded-md bg-gray-50 px-2 py-1">
        <p className="text-[7px] text-navy">📍 Douala</p>
      </div>
      <p className="text-[6px] text-gray-400 font-bold tracking-wider">BUDGET *</p>
      <div className="flex gap-1">
        <Pill>3,000 F</Pill>
        <Pill active>5,000 F</Pill>
        <Pill>8,000 F</Pill>
      </div>
      <MockBtn orange>Book Now — 5,000 XAF</MockBtn>
    </div>
  );
}

function WorkerHome() {
  return (
    <div className="flex flex-col gap-1.5 p-2">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[7px] text-gray-400">Good morning</p>
          <p className="text-[9px] font-bold text-navy">Marie</p>
        </div>
        <Pill active>Online</Pill>
      </div>
      <div className="flex gap-1">
        {[
          { icon: "⚡", val: "3", label: "Active", color: "text-orange" },
          { icon: "🏁", val: "12", label: "Done", color: "text-green-500" },
          { icon: "⭐", val: "4.8", label: "Rating", color: "text-yellow-500" },
        ].map((s) => (
          <div key={s.label} className="flex-1 rounded-lg bg-white p-1.5 text-center shadow-sm">
            <p className="text-xs">{s.icon}</p>
            <p className={`text-[10px] font-black ${s.color}`}>{s.val}</p>
            <p className="text-[6px] text-gray-400">{s.label}</p>
          </div>
        ))}
      </div>
      <p className="text-[7px] font-bold text-navy">Open Jobs</p>
      {[1,2].map((i) => (
        <div key={i} className="rounded-lg bg-white p-1.5 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-[7px] font-bold text-navy">Plumbing repair</p>
              <p className="text-[6px] text-gray-400">📍 Bonanjo, Douala</p>
            </div>
            <p className="text-[8px] font-bold text-orange">{i===1?"8,000":"5,000"} F</p>
          </div>
          <MockBtn>Accept</MockBtn>
        </div>
      ))}
    </div>
  );
}

function AISearch() {
  return (
    <div className="flex flex-col gap-1.5 p-2">
      <p className="text-[9px] font-bold text-navy">Smart Search</p>
      <div className="flex items-center gap-1 rounded-lg bg-gray-50 px-2 py-1.5">
        <span className="text-xs">🧠</span>
        <p className="text-[7px] text-gray-400 flex-1">Describe what you need...</p>
      </div>
      <div className="rounded-lg bg-teal/5 p-1.5 border-l-2 border-teal">
        <p className="text-[6px] text-teal font-bold tracking-wider">AI INTERPRETATION</p>
        <p className="text-[7px] text-navy">Looking for a plumber in Douala</p>
      </div>
      <div className="flex gap-1">
        <Pill active>Douala</Pill>
        <Pill active>HOME_MAINT</Pill>
      </div>
      <p className="text-[7px] text-gray-400 font-semibold">2 results</p>
      {[1,2].map((i) => (
        <div key={i} className="flex items-center gap-1.5 rounded-lg bg-white p-1.5 shadow-sm">
          <div className="w-6 h-6 rounded-full bg-teal flex items-center justify-center text-[7px] text-white font-bold">{i===1?"J":"P"}</div>
          <div className="flex-1">
            <p className="text-[7px] font-bold text-navy">{i===1?"Jean Pierre":"Paul Nana"}</p>
            <p className="text-[6px] text-gray-400">⭐ 4.{i===1?8:5} · {i===1?"8,000":"6,000"} F/h</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ChatScreen() {
  return (
    <div className="flex flex-col h-full p-2">
      <div className="flex items-center gap-1.5 mb-2">
        <div className="w-5 h-5 rounded-full bg-teal flex items-center justify-center text-[7px] text-white font-bold">J</div>
        <div>
          <p className="text-[8px] font-bold text-navy">Jean Pierre</p>
          <p className="text-[6px] text-green-500">Online</p>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-1 justify-end">
        <div className="self-start max-w-[75%] rounded-xl rounded-bl-sm bg-gray-100 px-2 py-1">
          <p className="text-[7px] text-navy">Bonjour! Je serai la a 14h</p>
          <p className="text-[5px] text-gray-400 text-right">14:02</p>
        </div>
        <div className="self-end max-w-[75%] rounded-xl rounded-br-sm bg-teal px-2 py-1">
          <p className="text-[7px] text-white">Parfait, merci!</p>
          <p className="text-[5px] text-white/50 text-right">14:03 ✓✓</p>
        </div>
        <div className="self-start max-w-[75%] rounded-xl rounded-bl-sm bg-gray-100 px-2 py-1">
          <p className="text-[7px] text-navy">Apportez les outils SVP</p>
          <p className="text-[5px] text-gray-400 text-right">14:05</p>
        </div>
        <div className="self-end max-w-[75%] rounded-xl rounded-br-sm bg-teal px-2 py-1">
          <p className="text-[7px] text-white">Pas de souci, j&apos;ai tout!</p>
          <p className="text-[5px] text-white/50 text-right">14:06 ✓✓</p>
        </div>
      </div>
      <div className="flex items-center gap-1 mt-1.5">
        <div className="flex-1 rounded-full bg-gray-50 px-2 py-1">
          <p className="text-[7px] text-gray-300">Message...</p>
        </div>
        <div className="w-5 h-5 rounded-full bg-teal flex items-center justify-center text-[8px] text-white font-bold">↑</div>
      </div>
    </div>
  );
}

const SCREEN_COMPONENTS = [ClientHome, ServicesGrid, CreateJob, WorkerHome, AISearch, ChatScreen];

/* ── Phone frame ─────────────────────────────────────────────────────────── */
function PhoneMockup({ children, caption }: { children: React.ReactNode; caption: string }) {
  return (
    <div className="flex flex-col items-center shrink-0 w-[200px] sm:w-[220px]">
      {/* Phone */}
      <div className="relative w-[180px] sm:w-[200px] rounded-[24px] bg-gradient-to-b from-[#1a2744] to-[#0f1926] p-[6px] shadow-xl shadow-navy/20">
        {/* Notch */}
        <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-16 h-[6px] rounded-b-lg bg-[#0f1926] z-10" />
        {/* Screen */}
        <div className="relative bg-white rounded-[20px] overflow-hidden" style={{ aspectRatio: "9/17" }}>
          {/* Status bar */}
          <div className="flex items-center justify-between px-3 py-0.5 bg-white">
            <span className="text-[6px] text-gray-400 font-medium">9:41</span>
            <div className="flex gap-0.5">
              <div className="w-2 h-1.5 rounded-sm bg-gray-300" />
              <div className="w-1 h-1.5 rounded-sm bg-gray-300" />
              <div className="w-3 h-1.5 rounded-sm bg-green-400" />
            </div>
          </div>
          {children}
        </div>
      </div>
      {/* Caption */}
      <p className="mt-4 text-sm font-semibold text-navy text-center leading-snug">{caption}</p>
    </div>
  );
}

/* ── Main Section ────────────────────────────────────────────────────────── */
export default function AppScreenshots() {
  const { lang } = useLang();
  const scrollRef = useRef<HTMLDivElement>(null);

  const title = lang === "fr" ? "Decouvrez ServeLink en action" : "See ServeLink in action";
  const subtitle = lang === "fr" ? "Simple, rapide et concu pour le Cameroun" : "Clean, fast and built for Cameroon";

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy" style={{ fontFamily: "var(--font-heading)" }}>
              {title} <span className="text-3xl sm:text-4xl">&#128241;</span>
            </h2>
            <p className="mt-3 text-lg text-gray-500">{subtitle}</p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll>
          <div
            ref={scrollRef}
            className="flex gap-6 sm:gap-8 overflow-x-auto pb-6 snap-x snap-mandatory scroll-smooth
                       [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                       px-4 sm:px-0 sm:justify-center"
          >
            {SCREENS.map((screen, i) => {
              const Comp = SCREEN_COMPONENTS[i];
              return (
                <div key={screen.id} className="snap-center">
                  <PhoneMockup caption={lang === "fr" ? screen.captionFr : screen.captionEn}>
                    <Comp />
                  </PhoneMockup>
                </div>
              );
            })}
          </div>
        </AnimateOnScroll>

        {/* Scroll hint on mobile */}
        <p className="mt-4 text-center text-xs text-gray-400 sm:hidden">
          {lang === "fr" ? "← Glissez pour voir plus →" : "← Swipe to see more →"}
        </p>
      </div>
    </section>
  );
}
