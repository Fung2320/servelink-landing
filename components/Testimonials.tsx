"use client";

import { useLang } from "./LanguageContext";
import AnimateOnScroll from "./AnimateOnScroll";

const TESTIMONIALS = [
  {
    nameKey: "test1Name",
    roleKey: "test1Role",
    textKey: "test1Text",
    rating: 5,
    avatar: "AM",
    color: "#1B6B7B",
  },
  {
    nameKey: "test2Name",
    roleKey: "test2Role",
    textKey: "test2Text",
    rating: 5,
    avatar: "NM",
    color: "#E85D04",
  },
  {
    nameKey: "test3Name",
    roleKey: "test3Role",
    textKey: "test3Text",
    rating: 5,
    avatar: "JF",
    color: "#007A3D",
  },
];

export default function Testimonials() {
  const { t } = useLang();

  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <div className="text-center mb-12">
            <h2
              className="text-2xl sm:text-3xl font-bold text-navy mb-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t("testimonialsTitle" as any)}
            </h2>
            <p className="text-base text-gray-500">
              {t("testimonialsSub" as any)}
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, i) => (
            <AnimateOnScroll key={i}>
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: item.rating }).map((_, j) => (
                    <span key={j} className="text-yellow-400 text-lg">
                      ★
                    </span>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-5">
                  &ldquo;{t(item.textKey as any)}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy">
                      {t(item.nameKey as any)}
                    </p>
                    <p className="text-xs text-gray-400">
                      {t(item.roleKey as any)}
                    </p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
