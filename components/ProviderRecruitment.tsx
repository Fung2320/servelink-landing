"use client";

import { useState } from "react";
import { useLang } from "./LanguageContext";
import AnimateOnScroll from "./AnimateOnScroll";

const SKILLS = [
  { icon: "\uD83D\uDC85\uD83C\uDFFD", en: "Hair & Beauty", fr: "Coiffure & Beaut\u00e9" },
  { icon: "\uD83D\uDD27", en: "Plumbing & Repairs", fr: "Plomberie & R\u00e9parations" },
  { icon: "\uD83E\uDDF9", en: "Cleaning", fr: "M\u00e9nage" },
  { icon: "\uD83D\uDCDA", en: "Tutoring", fr: "Cours particuliers" },
  { icon: "\uD83D\uDCBB", en: "Tech Support", fr: "Support technique" },
  { icon: "\uD83D\uDE97", en: "Auto Services", fr: "Automobile" },
  { icon: "\uD83D\uDC86\uD83C\uDFFD", en: "Wellness & Massage", fr: "Bien-\u00eatre & Massage" },
  { icon: "\uD83C\uDF3F", en: "Gardening", fr: "Jardinage" },
  { icon: "\uD83C\uDF7D\uFE0F", en: "Catering & Events", fr: "Traiteur & \u00c9v\u00e9nements" },
  { icon: "\uD83D\uDC76\uD83C\uDFFD", en: "Childcare", fr: "Garde d\u2019enfants" },
  { icon: "\uD83D\uDCE6", en: "Moving & Delivery", fr: "D\u00e9m\u00e9nagement" },
  { icon: "\u26A1", en: "Electrical", fr: "\u00c9lectricit\u00e9" },
];

const PRICES = [5000, 8000, 10000, 15000, 20000];

export default function ProviderRecruitment() {
  const { lang } = useLang();
  const fr = lang === "fr";

  const [jobsPerWeek, setJobsPerWeek] = useState(5);
  const [avgPrice, setAvgPrice] = useState(8000);
  const monthly = jobsPerWeek * 4 * avgPrice * 0.85;

  const scrollToWaitlist = () => {
    const el = document.getElementById("waitlist");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-gradient-to-br from-[#1B6B7B] via-[#185E6C] to-[#0F3E48]">
      {/* Decorative blurs */}
      <div className="absolute top-20 -left-20 w-80 h-80 rounded-full bg-orange/10 blur-3xl" />
      <div className="absolute bottom-10 right-0 w-96 h-96 rounded-full bg-teal/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* ── Title ─────────────────────────────────────────── */}
        <AnimateOnScroll>
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
              {fr ? "Transformez vos comp\u00e9tences en revenus" : "Turn your skills into income"}{" "}
              <span className="text-3xl">&#128176;</span>
            </h2>
            <p className="mt-3 text-lg text-white/60">
              {fr
                ? "Rejoignez la plateforme de services qui grandit le plus vite au Cameroun"
                : "Join Cameroon\u2019s fastest growing service platform"}
            </p>
          </div>
        </AnimateOnScroll>

        {/* ── Hero stats ────────────────────────────────────── */}
        <AnimateOnScroll>
          <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-14 max-w-2xl mx-auto">
            {[
              { val: "85%", label: fr ? "Pour vous directement" : "Goes directly to you" },
              { val: "118+", label: fr ? "Services disponibles" : "Services available" },
              { val: "0 XAF", label: fr ? "Pour rejoindre \u2014 c\u2019est gratuit" : "To join \u2014 it\u2019s free" },
            ].map((s) => (
              <div key={s.val} className="text-center">
                <p className="text-3xl sm:text-4xl font-black text-orange">{s.val}</p>
                <p className="mt-1 text-xs sm:text-sm text-white/60 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </AnimateOnScroll>

        {/* ── Skills grid ───────────────────────────────────── */}
        <AnimateOnScroll>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 mb-16 max-w-3xl mx-auto">
            {SKILLS.map((sk) => (
              <div
                key={sk.en}
                className="flex flex-col items-center gap-1.5 rounded-xl bg-white/10 backdrop-blur-sm p-3 hover:bg-white/15 transition-colors"
              >
                <span className="text-2xl">{sk.icon}</span>
                <span className="text-[11px] font-semibold text-white/80 text-center leading-tight">
                  {fr ? sk.fr : sk.en}
                </span>
              </div>
            ))}
          </div>
        </AnimateOnScroll>

        {/* ── How it works (3 steps) ────────────────────────── */}
        <AnimateOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                emoji: "\uD83D\uDCDD",
                title: fr ? "Cr\u00e9ez votre profil" : "Create your profile",
                desc: fr
                  ? "Inscrivez-vous gratuitement, uploadez votre ID, r\u00e9digez votre bio (l\u2019IA vous aide !)"
                  : "Sign up free, upload your ID, write your bio (AI helps you!)",
              },
              {
                step: "2",
                emoji: "\uD83D\uDD0D",
                title: fr ? "Soyez d\u00e9couvert" : "Get discovered",
                desc: fr
                  ? "Les clients vous trouvent par service, ville et note. L\u2019IA vous associe aux bons emplois."
                  : "Clients find you by service, city and rating. AI matches you to the right jobs.",
              },
              {
                step: "3",
                emoji: "\uD83D\uDCB8",
                title: fr ? "Soyez pay\u00e9 instantan\u00e9ment" : "Get paid instantly",
                desc: fr
                  ? "Terminez le travail, le client confirme, 85% arrive sur votre MoMo imm\u00e9diatement."
                  : "Complete the job, client confirms, 85% hits your MoMo immediately.",
              },
            ].map((s) => (
              <div key={s.step} className="rounded-2xl bg-white/10 backdrop-blur-sm p-6 text-center">
                <div className="w-10 h-10 rounded-full bg-orange mx-auto flex items-center justify-center text-white font-black text-sm mb-3">
                  {s.step}
                </div>
                <p className="text-lg font-bold text-white mb-1">
                  {s.title} {s.emoji}
                </p>
                <p className="text-sm text-white/60 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </AnimateOnScroll>

        {/* ── Earnings calculator ───────────────────────────── */}
        <AnimateOnScroll>
          <div className="max-w-lg mx-auto rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 p-6 sm:p-8 mb-14">
            <h3 className="text-xl font-bold text-white text-center mb-6">
              {fr ? "Calculez vos gains" : "Calculate your earnings"} &#129297;
            </h3>

            {/* Jobs per week slider */}
            <label className="block mb-5">
              <span className="text-sm font-semibold text-white/70">
                {fr ? "Combien de missions par semaine ?" : "How many jobs per week?"}
              </span>
              <div className="flex items-center gap-4 mt-2">
                <input
                  type="range"
                  min={1}
                  max={20}
                  value={jobsPerWeek}
                  onChange={(e) => setJobsPerWeek(Number(e.target.value))}
                  className="flex-1 accent-orange h-2"
                />
                <span className="text-xl font-black text-orange w-8 text-right">{jobsPerWeek}</span>
              </div>
            </label>

            {/* Average price */}
            <label className="block mb-6">
              <span className="text-sm font-semibold text-white/70">
                {fr ? "Prix moyen par mission (XAF)" : "Average job price (XAF)"}
              </span>
              <div className="flex gap-2 mt-2 flex-wrap">
                {PRICES.map((p) => (
                  <button
                    key={p}
                    onClick={() => setAvgPrice(p)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                      avgPrice === p
                        ? "bg-orange text-white shadow-md shadow-orange/30"
                        : "bg-white/10 text-white/70 hover:bg-white/20"
                    }`}
                  >
                    {p.toLocaleString()} F
                  </button>
                ))}
              </div>
            </label>

            {/* Result */}
            <div className="rounded-xl bg-white/15 p-5 text-center">
              <p className="text-sm text-white/60 mb-1">
                {fr ? "Vos gains mensuels estim\u00e9s" : "Your estimated monthly earnings"}
              </p>
              <p className="text-4xl sm:text-5xl font-black text-orange">
                {monthly.toLocaleString()} <span className="text-xl">XAF</span>
              </p>
              <p className="text-xs text-white/40 mt-2">
                {jobsPerWeek} {fr ? "missions" : "jobs"}/
                {fr ? "sem" : "wk"} &times; {avgPrice.toLocaleString()} F &times; 85%
              </p>
            </div>
          </div>
        </AnimateOnScroll>

        {/* ── Trust badges ──────────────────────────────────── */}
        <AnimateOnScroll>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-10 max-w-2xl mx-auto">
            {[
              fr ? "Pay\u00e9 avant votre arriv\u00e9e" : "Get paid before you arrive",
              fr ? "Pas de d\u00e9placements inutiles" : "No wasted trips",
              fr ? "Construisez votre r\u00e9putation" : "Build your reputation with reviews",
              fr ? "Travaillez \u00e0 votre rythme" : "Work on your own schedule",
              fr ? "Pause quand vous voulez" : "Pause anytime you\u2019re busy",
            ].map((badge) => (
              <span key={badge} className="text-sm text-white/70 font-medium">
                &#9989; {badge}
              </span>
            ))}
          </div>
        </AnimateOnScroll>

        {/* ── CTA ───────────────────────────────────────────── */}
        <AnimateOnScroll>
          <div className="text-center">
            <button
              onClick={scrollToWaitlist}
              className="inline-block rounded-2xl bg-gradient-to-r from-orange to-[#C94608] px-10 py-4 text-lg font-bold text-white shadow-xl shadow-orange/30 hover:scale-105 transition-transform"
            >
              {fr
                ? "Rejoindre comme Prestataire \u2014 C\u2019est Gratuit \u2192"
                : "Join as a Provider \u2014 It\u2019s Free \u2192"}
            </button>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
