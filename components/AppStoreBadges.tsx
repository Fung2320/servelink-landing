"use client";

import { useLang } from "./LanguageContext";

export default function AppStoreBadges() {
  const { lang } = useLang();
  const fr = lang === "fr";

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
      {/* Google Play */}
      <div className="flex items-center gap-2.5 rounded-xl bg-gray-100 px-5 py-2.5 opacity-60">
        <svg className="w-6 h-6 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3.609 1.814L13.792 12 3.609 22.186a2.372 2.372 0 01-.609-1.648V3.462c0-.624.22-1.2.609-1.648zm.497-.404l11.481 5.742-2.798 2.798L3.609 1.814l.497-.404zm0 21.18l.497.404 9.18-8.136-2.798 2.798L3.609 22.186l.497.404v-.002zm15.183-11.1l-3.165 1.582L13.792 12l2.332-1.872 3.165 1.582c.57.284.919.8.919 1.372s-.349 1.088-.919 1.372z"/>
        </svg>
        <div>
          <p className="text-[9px] text-gray-400 font-medium leading-none">Google Play</p>
          <p className="text-xs text-gray-500 font-bold">{fr ? "Bient\u00f4t" : "Coming"} Sept 2026</p>
        </div>
      </div>
      {/* App Store */}
      <div className="flex items-center gap-2.5 rounded-xl bg-gray-100 px-5 py-2.5 opacity-60">
        <svg className="w-6 h-6 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
        </svg>
        <div>
          <p className="text-[9px] text-gray-400 font-medium leading-none">App Store</p>
          <p className="text-xs text-gray-500 font-bold">{fr ? "Bient\u00f4t" : "Coming"} Sept 2026</p>
        </div>
      </div>
    </div>
  );
}
