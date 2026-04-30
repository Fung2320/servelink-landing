"use client";

import { useRef } from "react";
import Image from "next/image";
import { useLang } from "./LanguageContext";
import AnimateOnScroll from "./AnimateOnScroll";

/* ── Screenshot data (build 49) ──────────────────────────────────────────── */
type Screen = {
  id: string;
  src: string;
  captionEn: string;
  captionFr: string;
};

const SCREENS: Screen[] = [
  {
    id: "client-home",
    src: "/screenshots/02-client-home.webp",
    captionEn: "Find any service instantly",
    captionFr: "Trouvez n'importe quel service instantanément",
  },
  // TODO: Replace with dedicated services-grid screenshot — currently using create-job category picker
  {
    id: "services",
    src: "/screenshots/06-create-job-step1.webp",
    captionEn: "118+ service categories",
    captionFr: "Plus de 118 catégories de services",
  },
  {
    id: "create-job",
    src: "/screenshots/07-create-job-step2.webp",
    captionEn: "Book in under 2 minutes",
    captionFr: "Réservez en moins de 2 minutes",
  },
  {
    id: "worker-home",
    src: "/screenshots/12-worker-home.webp",
    captionEn: "Providers manage jobs easily",
    captionFr: "Les prestataires gèrent leurs missions facilement",
  },
  {
    id: "ai-search",
    src: "/screenshots/04-smart-search-results.webp",
    captionEn: "AI search in French or English",
    captionFr: "Recherche IA en français ou en anglais",
  },
  // TODO: Replace with real provider chat thread when chat-screen screenshot captured
  {
    id: "ai-chat",
    src: "/screenshots/05-ai-chat.webp",
    captionEn: "AI assistant for help",
    captionFr: "Assistant IA pour vous aider",
  },
  {
    id: "mode-switch",
    src: "/screenshots/19-mode-switch-alert.webp",
    captionEn: "Switch between Client and Provider modes",
    captionFr: "Basculez entre client et prestataire",
  },
  {
    id: "heatmap",
    src: "/screenshots/13-heatmap.webp",
    captionEn: "See demand near you",
    captionFr: "Voyez la demande près de vous",
  },
  {
    id: "wallet",
    src: "/screenshots/11-wallet-client.webp",
    captionEn: "Pay with MTN MoMo or Orange Money",
    captionFr: "Payez avec MTN MoMo ou Orange Money",
  },
  {
    id: "login",
    src: "/screenshots/01-login.webp",
    captionEn: "Sign up in seconds",
    captionFr: "Inscrivez-vous en quelques secondes",
  },
];

/* Native screenshot dimensions after status-bar crop */
const SCREEN_W = 1179;
const SCREEN_H = 2476;

/* ── Phone frame ─────────────────────────────────────────────────────────── */
function PhoneMockup({
  src,
  alt,
  caption,
  priority,
}: {
  src: string;
  alt: string;
  caption: string;
  priority: boolean;
}) {
  return (
    <div className="flex flex-col items-center shrink-0 w-[200px] sm:w-[220px]">
      <div className="relative w-[180px] sm:w-[200px] rounded-[24px] bg-gradient-to-b from-[#1a2744] to-[#0f1926] p-[6px] shadow-xl shadow-navy/20">
        {/* Notch */}
        <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-16 h-[6px] rounded-b-lg bg-[#0f1926] z-10" />
        {/* Screen */}
        <div
          className="relative bg-white rounded-[20px] overflow-hidden"
          style={{ aspectRatio: `${SCREEN_W}/${SCREEN_H}` }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 640px) 180px, 200px"
            priority={priority}
            loading={priority ? undefined : "lazy"}
            className="object-cover"
          />
        </div>
      </div>
      <p className="mt-4 text-sm font-semibold text-navy text-center leading-snug">{caption}</p>
    </div>
  );
}

/* ── Main Section ────────────────────────────────────────────────────────── */
export default function AppScreenshots() {
  const { lang } = useLang();
  const scrollRef = useRef<HTMLDivElement>(null);

  const title = lang === "fr" ? "Decouvrez ServeLink en action" : "See ServeLink in action";
  const subtitle =
    lang === "fr"
      ? "Simple, rapide et concu pour le Cameroun"
      : "Clean, fast and built for Cameroon";

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <div className="text-center mb-10 sm:mb-14">
            <h2
              className="text-3xl sm:text-4xl font-bold text-navy"
              style={{ fontFamily: "var(--font-heading)" }}
            >
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
                       px-4 sm:px-6"
          >
            {SCREENS.map((screen, i) => (
              <div key={screen.id} className="snap-center">
                <PhoneMockup
                  src={screen.src}
                  alt={lang === "fr" ? screen.captionFr : screen.captionEn}
                  caption={lang === "fr" ? screen.captionFr : screen.captionEn}
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        </AnimateOnScroll>

        <p className="mt-4 text-center text-xs text-gray-400 sm:hidden">
          {lang === "fr" ? "← Glissez pour voir plus →" : "← Swipe to see more →"}
        </p>
      </div>
    </section>
  );
}
