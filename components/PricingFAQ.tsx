"use client";

import { useState } from "react";
import { useLang } from "./LanguageContext";
import AnimateOnScroll from "./AnimateOnScroll";

const FAQ_KEYS = [
  { qKey: "priceFaq1Q", aKey: "priceFaq1A" },
  { qKey: "priceFaq2Q", aKey: "priceFaq2A" },
  { qKey: "priceFaq3Q", aKey: "priceFaq3A" },
  { qKey: "priceFaq4Q", aKey: "priceFaq4A" },
  { qKey: "priceFaq5Q", aKey: "priceFaq5A" },
];

const FaqItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left bg-white rounded-xl border border-gray-100 px-6 py-5 shadow-sm hover:shadow-md transition-all"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm sm:text-base font-semibold text-navy">
          {q}
        </span>
        <span className="text-teal text-xl font-bold flex-shrink-0">
          {open ? "−" : "+"}
        </span>
      </div>
      {open && (
        <p className="mt-3 text-sm text-gray-500 leading-relaxed">{a}</p>
      )}
    </button>
  );
};

export default function PricingFAQ() {
  const { t } = useLang();

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <div className="text-center mb-10">
            <h2
              className="text-2xl sm:text-3xl font-bold text-navy mb-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t("pricingTitle" as any)}
            </h2>
            <p className="text-base text-gray-500">
              {t("pricingSub" as any)}
            </p>
          </div>
        </AnimateOnScroll>

        <div className="flex flex-col gap-3">
          {FAQ_KEYS.map((item, i) => (
            <AnimateOnScroll key={i}>
              <FaqItem
                q={t(item.qKey as any)}
                a={t(item.aKey as any)}
              />
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
