"use client";

import { useLang } from "./LanguageContext";
import AnimateOnScroll from "./AnimateOnScroll";

const features = [
  {
    emoji: "\ud83d\udd12",
    titleKey: "feat1Title",
    descKey: "feat1Desc",
    color: "bg-[#00342a]/10 text-[#00342a]",
  },
  {
    emoji: "\ud83d\udcb0",
    titleKey: "feat2Title",
    descKey: "feat2Desc",
    color: "bg-[#fecc00]/10 text-[#735c00]",
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
    color: "bg-[#00342a]/10 text-[#1b1b1b]",
  },
  {
    emoji: "\u26a1",
    titleKey: "feat5Title",
    descKey: "feat5Desc",
    color: "bg-[#fecc00]/10 text-[#735c00]",
  },
] as const;

const aiFeatures = [
  {
    emoji: "\ud83e\udde0",
    titleKey: "aiFeat1Title",
    descKey: "aiFeat1Desc",
    color: "bg-[#00342a]/10 text-[#00342a]",
  },
  {
    emoji: "\ud83d\udcf8",
    titleKey: "aiFeat2Title",
    descKey: "aiFeat2Desc",
    color: "bg-[#00342a]/10 text-[#1b1b1b]",
  },
  {
    emoji: "\ud83e\udd16",
    titleKey: "aiFeat3Title",
    descKey: "aiFeat3Desc",
    color: "bg-green/10 text-green",
  },
  {
    emoji: "\u26a1",
    titleKey: "aiFeat4Title",
    descKey: "aiFeat4Desc",
    color: "bg-[#fecc00]/10 text-[#735c00]",
  },
] as const;

export default function Features() {
  const { t } = useLang();

  return (
    <>
      <section id="features" className="py-20 sm:py-28 bg-[#fcf9f8]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center mb-14">
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#1b1b1b] mb-4"
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
                  className={`group rounded-2xl bg-white border border-[#1b1b1b]/10 p-7 sm:p-8 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-[#00342a]/20 ${
                    i >= 3 ? "sm:col-span-1 lg:col-start-auto" : ""
                  }`}
                >
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${f.color} mb-5 text-2xl transition-transform duration-300 group-hover:scale-110`}
                  >
                    {f.emoji}
                  </div>
                  <h3
                    className="text-lg font-bold text-[#1b1b1b] mb-2"
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

      {/* AI Features Section */}
      <section id="ai-features" className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#00342a]/10 px-4 py-1.5 mb-4">
              <span className="text-sm font-semibold text-[#00342a]">\ud83e\udde0 AI</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#1b1b1b] mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t("aiSectionTitle")}
            </h2>
            <p className="mx-auto max-w-xl text-lg text-gray-600">
              {t("aiSectionSubtitle")}
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll stagger>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {aiFeatures.map((f, i) => (
                <div
                  key={i}
                  className="group rounded-2xl bg-[#fcf9f8] border border-[#1b1b1b]/10 p-7 sm:p-8 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-[#00342a]/20"
                >
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${f.color} mb-5 text-2xl transition-transform duration-300 group-hover:scale-110`}
                  >
                    {f.emoji}
                  </div>
                  <h3
                    className="text-lg font-bold text-[#1b1b1b] mb-2"
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
    </>
  );
}
