"use client";

import { useMemo } from "react";
import { useLang } from "./LanguageContext";
import AnimateOnScroll from "./AnimateOnScroll";

const ALL_TESTIMONIALS = [
  { nameKey: "test1Name", roleKey: "test1Role", textKey: "test1Text", avatar: "AM", color: "#1B6B7B" },
  { nameKey: "test2Name", roleKey: "test2Role", textKey: "test2Text", avatar: "NM", color: "#E85D04" },
  { nameKey: "test3Name", roleKey: "test3Role", textKey: "test3Text", avatar: "JF", color: "#007A3D" },
  { nameKey: "test4Name", roleKey: "test4Role", textKey: "test4Text", avatar: "PB", color: "#CE1126" },
  { nameKey: "test5Name", roleKey: "test5Role", textKey: "test5Text", avatar: "EN", color: "#FCD116" },
  { nameKey: "test6Name", roleKey: "test6Role", textKey: "test6Text", avatar: "CT", color: "#1B6B7B" },
  { nameKey: "test7Name", roleKey: "test7Role", textKey: "test7Text", avatar: "SM", color: "#E85D04" },
  { nameKey: "test8Name", roleKey: "test8Role", textKey: "test8Text", avatar: "RN", color: "#007A3D" },
  { nameKey: "test9Name", roleKey: "test9Role", textKey: "test9Text", avatar: "DA", color: "#CE1126" },
  { nameKey: "test10Name", roleKey: "test10Role", textKey: "test10Text", avatar: "FE", color: "#FCD116" },
  { nameKey: "test11Name", roleKey: "test11Role", textKey: "test11Text", avatar: "BM", color: "#1B6B7B" },
  { nameKey: "test12Name", roleKey: "test12Role", textKey: "test12Text", avatar: "GN", color: "#E85D04" },
  { nameKey: "test13Name", roleKey: "test13Role", textKey: "test13Text", avatar: "LT", color: "#007A3D" },
  { nameKey: "test14Name", roleKey: "test14Role", textKey: "test14Text", avatar: "MK", color: "#CE1126" },
  { nameKey: "test15Name", roleKey: "test15Role", textKey: "test15Text", avatar: "OA", color: "#FCD116" },
];

// Shuffle and pick 3 — different each page load
function pickRandom(arr: typeof ALL_TESTIMONIALS, count: number) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default function Testimonials() {
  const { t } = useLang();
  const selected = useMemo(() => pickRandom(ALL_TESTIMONIALS, 3), []);

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
          {selected.map((item, i) => (
            <AnimateOnScroll key={i}>
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <span key={j} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-5">
                  &ldquo;{t(item.textKey as any)}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy">{t(item.nameKey as any)}</p>
                    <p className="text-xs text-gray-400">{t(item.roleKey as any)}</p>
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
