"use client";

import { useLang } from "./LanguageContext";
import AnimateOnScroll from "./AnimateOnScroll";

const services = [
  { emoji: "💅🏽", en: "svcBeauty", fr: "svcBeauty" },
  { emoji: "💆🏽", en: "svcWellness", fr: "svcWellness" },
  { emoji: "🔧", en: "svcHome", fr: "svcHome" },
  { emoji: "🧹", en: "svcCleaning", fr: "svcCleaning" },
  { emoji: "👶🏽", en: "svcCare", fr: "svcCare" },
  { emoji: "📚", en: "svcEducation", fr: "svcEducation" },
  { emoji: "🚗", en: "svcAutomotive", fr: "svcAutomotive" },
  { emoji: "🌿", en: "svcOutdoor", fr: "svcOutdoor" },
  { emoji: "🍽️", en: "svcFood", fr: "svcFood" },
  { emoji: "💻", en: "svcTech", fr: "svcTech" },
  { emoji: "💪🏽", en: "svcFitness", fr: "svcFitness" },
  { emoji: "📦", en: "svcMoving", fr: "svcMoving" },
] as const;

export default function Services() {
  const { t } = useLang();

  return (
    <section id="services" className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center mb-14">
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#1b1b1b] mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {t("servicesTitle")}
          </h2>
          <p className="mx-auto max-w-xl text-lg text-gray-600">
            {t("servicesSubtitle")}
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll stagger>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
            {services.map((svc) => (
              <div
                key={svc.en}
                className="group flex flex-col items-center justify-center rounded-2xl bg-[#fcf9f8] border border-[#1b1b1b]/10 p-5 sm:p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-[#00342a]/30 hover:bg-[#00342a]/5 cursor-default"
              >
                <span className="text-3xl sm:text-4xl mb-3 transition-transform duration-300 group-hover:scale-110">
                  {svc.emoji}
                </span>
                <p className="text-sm font-semibold text-[#1b1b1b] text-center leading-snug">
                  {t(svc.en)}
                </p>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
