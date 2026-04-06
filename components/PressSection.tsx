"use client";

import { useLang } from "./LanguageContext";
import AnimateOnScroll from "./AnimateOnScroll";

export default function PressSection() {
  const { lang } = useLang();
  const fr = lang === "fr";

  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
        <AnimateOnScroll>
          <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            {fr ? "ServeLink dans les m\u00e9dias" : "ServeLink in the news"}{" "}
            <span className="text-2xl">{"\uD83D\uDCF0"}</span>
          </h2>
          <p className="text-gray-500 mb-8">
            {fr
              ? "Nous construisons la plus grande plateforme de services \u00e0 domicile d\u2019Afrique de l\u2019Ouest"
              : "We\u2019re building West Africa\u2019s largest home services platform"}
          </p>

          {/* Placeholder logos */}
          <div className="flex justify-center gap-8 mb-10 opacity-20">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-24 h-10 rounded-lg bg-gray-300 flex items-center justify-center">
                <span className="text-xs text-gray-500 font-bold">MEDIA</span>
              </div>
            ))}
          </div>

          <div className="inline-flex flex-col sm:flex-row items-center gap-4 rounded-2xl bg-gray-50 p-6 sm:p-8">
            <div className="text-4xl">{"\uD83C\uDFA4"}</div>
            <div className="text-left">
              <p className="text-sm font-bold text-navy">
                {fr ? "Demandes presse" : "Press inquiries"}
              </p>
              <a href="mailto:press@servelinkapp.com" className="text-sm text-teal font-semibold hover:underline">
                press@servelinkapp.com
              </a>
              <p className="text-xs text-gray-400 mt-1">
                {fr
                  ? "Nous sommes disponibles pour des interviews et des articles"
                  : "We are available for interviews and features"}
              </p>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
