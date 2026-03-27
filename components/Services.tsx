"use client";

import { useLang } from "./LanguageContext";
import AnimateOnScroll from "./AnimateOnScroll";

const services = [
  { emoji: "\ud83d\udc85", en: "svcBeauty", fr: "svcBeauty" },
  { emoji: "\ud83d\udc86", en: "svcWellness", fr: "svcWellness" },
  { emoji: "\ud83c\udfe0", en: "svcHome", fr: "svcHome" },
  { emoji: "\ud83e\uddf9", en: "svcCleaning", fr: "svcCleaning" },
  { emoji: "\ud83d\udc76", en: "svcCare", fr: "svcCare" },
  { emoji: "\ud83d\udcda", en: "svcEducation", fr: "svcEducation" },
  { emoji: "\ud83d\ude97", en: "svcAutomotive", fr: "svcAutomotive" },
  { emoji: "\ud83c\udf3f", en: "svcOutdoor", fr: "svcOutdoor" },
  { emoji: "\ud83c\udf7d\ufe0f", en: "svcFood", fr: "svcFood" },
  { emoji: "\ud83d\udcbb", en: "svcTech", fr: "svcTech" },
  { emoji: "\ud83c\udfcb\ufe0f", en: "svcFitness", fr: "svcFitness" },
  { emoji: "\ud83d\udce6", en: "svcMoving", fr: "svcMoving" },
] as const;

export default function Services() {
  const { t } = useLang();

  return (
    <section id="services" className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center mb-14">
          <h2
            className="text-3xl sm:text-4xl font-bold text-navy mb-4"
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
                className="group flex flex-col items-center justify-center rounded-2xl bg-gray-50 border border-gray-100 p-5 sm:p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-teal/30 hover:bg-teal/5 cursor-default"
              >
                <span className="text-3xl sm:text-4xl mb-3 transition-transform duration-300 group-hover:scale-110">
                  {svc.emoji}
                </span>
                <p className="text-sm font-semibold text-navy text-center leading-snug">
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
