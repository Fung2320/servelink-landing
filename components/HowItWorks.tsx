"use client";

import { useLang } from "./LanguageContext";
import AnimateOnScroll from "./AnimateOnScroll";

const steps = [
  {
    number: "1",
    titleKey: "step1Title",
    descKey: "step1Desc",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    color: "bg-teal",
  },
  {
    number: "2",
    titleKey: "step2Title",
    descKey: "step2Desc",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    color: "bg-orange",
  },
  {
    number: "3",
    titleKey: "step3Title",
    descKey: "step3Desc",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: "bg-green",
  },
] as const;

export default function HowItWorks() {
  const { t } = useLang();

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center mb-14">
          <h2
            className="text-3xl sm:text-4xl font-bold text-navy mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {t("howTitle")}
          </h2>
          <p className="mx-auto max-w-xl text-lg text-gray-600">
            {t("howSubtitle")}
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll stagger>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
            {/* Connector line (desktop only) */}
            <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-teal via-orange to-green" aria-hidden="true" />

            {steps.map((step) => (
              <div key={step.number} className="relative flex flex-col items-center text-center group">
                <div
                  className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-2xl ${step.color} text-white mb-6 shadow-lg transition-transform duration-300 group-hover:scale-110`}
                >
                  {step.icon}
                </div>
                <span className="absolute top-0 right-1/2 translate-x-12 -translate-y-1 text-xs font-bold text-white bg-navy rounded-full w-6 h-6 flex items-center justify-center z-20">
                  {step.number}
                </span>
                <h3
                  className="text-xl font-bold text-navy mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {t(step.titleKey)}
                </h3>
                <p className="text-gray-600 leading-relaxed max-w-xs">
                  {t(step.descKey)}
                </p>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
