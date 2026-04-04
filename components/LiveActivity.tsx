"use client";

import { useEffect, useState } from "react";
import { useLang } from "./LanguageContext";

export default function LiveActivity() {
  const { t } = useLang();
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Simulate live activity — random number between 80-200
    const base = 80 + Math.floor(Math.random() * 120);
    setCount(base);
    setVisible(true);

    // Bump count every 15-45 seconds to feel alive
    const interval = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 15000 + Math.random() * 30000);

    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 left-5 z-40 animate-fade-in-up">
      <div className="flex items-center gap-2.5 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2.5 shadow-lg border border-gray-100">
        {/* Pulsing green dot */}
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
        </span>

        <span className="text-xs sm:text-sm font-semibold text-navy">
          <span className="text-teal font-bold">{count}</span>{" "}
          {t("liveActivity" as any)}
        </span>
      </div>
    </div>
  );
}
