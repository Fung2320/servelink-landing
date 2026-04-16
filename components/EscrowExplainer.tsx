"use client";

import { useLang } from "./LanguageContext";
import AnimateOnScroll from "./AnimateOnScroll";

/* ── Step data ───────────────────────────────────────────────────────────── */
const STEPS = [
  {
    num: "1",
    emoji: "\uD83D\uDCF1",
    color: "from-[#00342a] to-[#004d3f]",
    shadow: "shadow-[#1b1b1b]/[0.06]",
    titleEn: "You book & pay",
    titleFr: "Vous r\u00e9servez & payez",
    descEn: "You pay via MTN MoMo or Orange Money. Your money goes into secure escrow \u2014 NOT to the provider yet.",
    descFr: "Vous payez via MTN MoMo ou Orange Money. Votre argent va en escrow s\u00e9curis\u00e9 \u2014 PAS encore au prestataire.",
  },
  {
    num: "2",
    emoji: "\u2705",
    color: "from-[#fecc00] to-[#d4ad00]",
    shadow: "shadow-[#1b1b1b]/[0.06]",
    titleEn: "Job gets done",
    titleFr: "Le travail est effectu\u00e9",
    descEn: "The provider arrives and completes your service. You can chat with them before and during the job.",
    descFr: "Le prestataire arrive et effectue votre service. Vous pouvez discuter avec lui avant et pendant le travail.",
  },
  {
    num: "3",
    emoji: "\uD83D\uDCB8",
    color: "from-[#004d3f] to-[#00342a]",
    shadow: "shadow-green-500/20",
    titleEn: "You confirm & money releases",
    titleFr: "Vous confirmez & l\u2019argent est lib\u00e9r\u00e9",
    descEn: "You confirm the job is done. 85% goes instantly to the provider via MoMo. You\u2019re protected the whole time.",
    descFr: "Vous confirmez que le travail est termin\u00e9. 85% va instantan\u00e9ment au prestataire via MoMo. Vous \u00eates prot\u00e9g\u00e9 tout le long.",
  },
];

/* ── Animated arrow (CSS pulse) ──────────────────────────────────────────── */
function Arrow() {
  return (
    <div className="hidden sm:flex items-center justify-center w-10 shrink-0 self-center">
      <svg width="28" height="20" viewBox="0 0 28 20" fill="none" className="animate-pulse">
        <path d="M2 10H22M22 10L16 4M22 10L16 16" stroke="#00342a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/* ── Mobile arrow (vertical) ─────────────────────────────────────────────── */
function ArrowDown() {
  return (
    <div className="flex sm:hidden items-center justify-center py-2">
      <svg width="20" height="28" viewBox="0 0 20 28" fill="none" className="animate-pulse">
        <path d="M10 2V22M10 22L4 16M10 22L16 16" stroke="#00342a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function EscrowExplainer() {
  const { lang } = useLang();
  const fr = lang === "fr";

  return (
    <section className="py-16 sm:py-24 bg-white overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* ── Title ─────────────────────────────────────────── */}
        <AnimateOnScroll>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1b1b1b]" style={{ fontFamily: "var(--font-heading)" }}>
              {fr ? "Votre argent est toujours prot\u00e9g\u00e9" : "Your money is always protected"}{" "}
              <span className="text-3xl">{"\uD83D\uDD12"}</span>
            </h2>
            <p className="mt-3 text-lg text-[#4f4f4f] max-w-2xl mx-auto">
              {fr
                ? "L\u2019escrow ServeLink prot\u00e8ge votre paiement de la r\u00e9servation \u00e0 la fin du travail"
                : "ServeLink escrow keeps your payment safe from booking to completion"}
            </p>
          </div>
        </AnimateOnScroll>

        {/* ── 3-Step Flow ───────────────────────────────────── */}
        <AnimateOnScroll>
          <div className="flex flex-col sm:flex-row items-stretch justify-center gap-0 mb-16">
            {STEPS.map((step, i) => (
              <div key={step.num} className="contents">
                {/* Card */}
                <div className={`flex-1 max-w-xs mx-auto sm:mx-0 rounded-2xl bg-white p-6 shadow-lg ${step.shadow} text-center`}>
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} mx-auto flex items-center justify-center text-white font-black text-lg mb-4 shadow-md`}>
                    {step.num}
                  </div>
                  <p className="text-2xl mb-2">{step.emoji}</p>
                  <h3 className="text-lg font-bold text-[#1b1b1b] mb-2">
                    {fr ? step.titleFr : step.titleEn}
                  </h3>
                  <p className="text-sm text-[#4f4f4f] leading-relaxed">
                    {fr ? step.descFr : step.descEn}
                  </p>
                </div>
                {/* Arrow */}
                {i < STEPS.length - 1 && (
                  <>
                    <Arrow />
                    <ArrowDown />
                  </>
                )}
              </div>
            ))}
          </div>
        </AnimateOnScroll>

        {/* ── Safety badges ─────────────────────────────────── */}
        <AnimateOnScroll>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-16">
            {[
              { icon: "\uD83D\uDD12", en: "Money held by ServeLink \u2014 not the provider", fr: "Argent d\u00e9tenu par ServeLink \u2014 pas le prestataire" },
              { icon: "\u21A9\uFE0F", en: "Free cancellation within 30 minutes", fr: "Annulation gratuite sous 30 minutes" },
              { icon: "\u2696\uFE0F", en: "Dispute resolution within 24 hours", fr: "R\u00e9solution des litiges sous 24 heures" },
              { icon: "\uD83D\uDCF5", en: "No cash \u2014 no risk", fr: "Pas de cash \u2014 pas de risque" },
              { icon: "\uD83C\uDDE8\uD83C\uDDF2", en: "Powered by MTN MoMo & Orange Money", fr: "Via MTN MoMo & Orange Money" },
            ].map((b) => (
              <span key={b.en} className="text-sm text-[#4f4f4f] font-medium">
                {b.icon} {fr ? b.fr : b.en}
              </span>
            ))}
          </div>
        </AnimateOnScroll>

        {/* ── Comparison table ──────────────────────────────── */}
        <AnimateOnScroll>
          <div className="max-w-2xl mx-auto">
            <h3 className="text-center text-lg font-bold text-[#1b1b1b] mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              {fr ? "L\u2019ancienne mani\u00e8re vs ServeLink" : "The old way vs ServeLink"}
            </h3>
            <div className="rounded-2xl overflow-hidden shadow-lg shadow-[#1b1b1b]/[0.06]">
              {/* Header */}
              <div className="grid grid-cols-2 text-center">
                <div className="bg-[#f6f3f2] py-3 px-4">
                  <span className="text-sm font-bold text-gray-400">{fr ? "Avant" : "Old way"} &#128542;</span>
                </div>
                <div className="bg-[#00342a] py-3 px-4">
                  <span className="text-sm font-bold text-white">ServeLink &#128640;</span>
                </div>
              </div>
              {/* Rows */}
              {[
                {
                  old: fr ? "Payer cash \u00e0 l\u2019avance" : "Pay cash upfront",
                  new: fr ? "Payer via MoMo en s\u00e9curit\u00e9" : "Pay securely via MoMo",
                },
                {
                  old: fr ? "Esp\u00e9rer que le prestataire vienne" : "Hope provider shows up",
                  new: fr ? "Prestataires v\u00e9rifi\u00e9s uniquement" : "Verified providers only",
                },
                {
                  old: fr ? "Aucun recours si mal fait" : "No recourse if job is bad",
                  new: fr ? "Protection litige 24h" : "24hr dispute protection",
                },
                {
                  old: fr ? "Pas de re\u00e7u" : "No receipt",
                  new: fr ? "Historique complet" : "Full transaction history",
                },
                {
                  old: fr ? "Faire confiance \u00e0 un inconnu" : "Trust a stranger",
                  new: fr ? "Faire confiance \u00e0 un pro not\u00e9" : "Trust a rated professional",
                },
              ].map((row, i) => (
                <div key={i} className={`grid grid-cols-2 ${i % 2 === 0 ? "bg-white" : "bg-[#fcf9f8]/50"}`}>
                  <div className="py-3 px-4 border-r border-[#1b1b1b]/10 flex items-center">
                    <span className="text-sm text-gray-400 line-through decoration-red-300">{row.old}</span>
                  </div>
                  <div className="py-3 px-4 flex items-center gap-2">
                    <span className="text-green-500 text-sm">{"\u2713"}</span>
                    <span className="text-sm text-[#1b1b1b] font-semibold">{row.new}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
