"use client";

import { useLang } from "./LanguageContext";
import AnimateOnScroll from "./AnimateOnScroll";

const features = [
  {
    emoji: "\ud83d\udd12",
    titleKey: "feat1Title",
    descKey: "feat1Desc",
    color: "bg-teal/10 text-teal",
  },
  {
    emoji: "\ud83d\udcb0",
    titleKey: "feat2Title",
    descKey: "feat2Desc",
    color: "bg-orange/10 text-orange",
  },
  {
    emoji: "\ud83c\udf0d",
    titleKey: "feat3Title",
    descKey: "feat3Desc",
    color: "bg-green/10 text-green",
  },
  {
    emoji: "\ud83e\udd16",
    titleKey: "feat4Title",
    descKey: "feat4Desc",
    color: "bg-navy/10 text-navy",
  },
  {
    emoji: "\u26a1",
    titleKey: "feat5Title",
    descKey: "feat5Desc",
    color: "bg-orange/10 text-orange",
  },
] as const;

export default function Features() {
  const { t } = useLang();

  return (
    <section id="features" className="py-20 sm:py-28 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center mb-14">
          <h2
            className="text-3xl sm:text-4xl font-bold text-navy mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {t("featuresTitle")}
          </h2>
          <p className="mx-auto max-w-xl text-lg text-gray-600">
            {t("featuresSubtitle")}
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll stagger>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((f, i) => (
              <div
                key={i}
                className={`group rounded-2xl bg-white border border-gray-100 p-7 sm:p-8 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-teal/20 ${
                  i >= 3 ? "sm:col-span-1 lg:col-start-auto" : ""
                }`}
              >
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${f.color} mb-5 text-2xl transition-transform duration-300 group-hover:scale-110`}
                >
                  {f.emoji}
                </div>
                <h3
                  className="text-lg font-bold text-navy mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {t(f.titleKey)}
                </h3>
                <p className="text-gray-600 leading-relaxed">{t(f.descKey)}</p>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
