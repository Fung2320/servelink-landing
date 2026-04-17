"use client";

import { useState } from "react";
import { useLang } from "./LanguageContext";
import AnimateOnScroll from "./AnimateOnScroll";
import VideoModal from "./VideoModal";

export default function Hero() {
  const { t, lang } = useLang();
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center hero-gradient overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-teal/20 blur-3xl float-slow" />
        <div className="absolute bottom-20 -left-16 w-64 h-64 rounded-full bg-orange/15 blur-2xl float-medium" />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-white/5 blur-xl float-slow" />
        <div className="absolute bottom-1/4 right-1/3 w-32 h-32 rounded-full border border-white/10" />
        <div className="absolute top-1/4 left-1/4 w-24 h-24 rounded-full border border-white/5" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
        <AnimateOnScroll>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {t("heroTitle")}
          </h1>
        </AnimateOnScroll>

        <AnimateOnScroll>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 px-3.5 py-1.5 text-sm font-medium text-white/90">
              🧠 {lang === "fr" ? "IA int\u00e9gr\u00e9e" : "AI-powered"}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 px-3.5 py-1.5 text-sm font-medium text-white/90">
              💳 MoMo &amp; Orange Money
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 px-3.5 py-1.5 text-sm font-medium text-white/90">
              🛒 118+ {lang === "fr" ? "services" : "services"}
            </span>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll>
          <p className="mx-auto max-w-2xl text-lg sm:text-xl text-white/80 leading-relaxed mb-10">
            {t("heroSubtitle")}
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="#waitlist"
              className="w-full sm:w-auto rounded-full bg-orange px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-orange-dark hover:scale-105 pulse-glow"
            >
              {t("heroCta1")}
            </a>
            <button
              onClick={() => setShowVideo(true)}
              className="w-full sm:w-auto rounded-full border-2 border-white/30 px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-white/10 hover:border-white/50"
            >
              ▶ {t("heroCta2")}
            </button>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll>
          <div className="inline-flex flex-wrap items-center justify-center gap-6 sm:gap-10 rounded-2xl bg-white/10 backdrop-blur-sm px-8 py-4 border border-white/10">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-white">{t("stat1").split(" ")[0]}</p>
              <p className="text-sm text-white/60">{t("stat1").split(" ").slice(1).join(" ")}</p>
            </div>
            <div className="w-px h-10 bg-white/20 hidden sm:block" />
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-white">{t("stat2").split(" ")[0]}</p>
              <p className="text-sm text-white/60">{t("stat2").split(" ").slice(1).join(" ")}</p>
            </div>
            <div className="w-px h-10 bg-white/20 hidden sm:block" />
            <div className="text-center flex items-center gap-2">
              <p className="text-lg sm:text-xl font-bold text-orange">{t("stat3")}</p>
              <span className="text-xl" role="img" aria-label="coming soon">&#128284;</span>
            </div>
          </div>
        </AnimateOnScroll>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 40L48 35C96 30 192 20 288 22C384 24 480 38 576 44C672 50 768 48 864 42C960 36 1056 26 1152 24C1248 22 1344 28 1392 31L1440 34V80H1392C1344 80 1248 80 1152 80C1056 80 960 80 864 80C768 80 672 80 576 80C480 80 384 80 288 80C192 80 96 80 48 80H0V40Z"
            fill="white"
          />
        </svg>
      </div>

      <VideoModal
        src="/videos/promo.mp4"
        isOpen={showVideo}
        onClose={() => setShowVideo(false)}
      />
    </section>
  );
}
