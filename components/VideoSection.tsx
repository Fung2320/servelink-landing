"use client";

import { useLang } from "./LanguageContext";
import AnimateOnScroll from "./AnimateOnScroll";

interface VideoSectionProps {
  titleKey: string;
  subtitleKey: string;
  src: string;
  bgClass?: string;
}

export default function VideoSection({
  titleKey,
  subtitleKey,
  src,
  bgClass = "bg-white",
}: VideoSectionProps) {
  const { t } = useLang();

  return (
    <section className={`py-16 sm:py-20 ${bgClass}`}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <div className="text-center mb-10">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#1b1b1b] mb-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t(titleKey as any)}
            </h2>
            <p className="text-base text-[#4f4f4f] max-w-lg mx-auto">
              {t(subtitleKey as any)}
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll>
          <div className="flex justify-center">
            <div className="w-full max-w-xs rounded-2xl overflow-hidden shadow-xl border border-[#1b1b1b]/10">
              <video
                src={src}
                className="w-full"
                controls
                muted
                playsInline
                preload="metadata"
                poster=""
              />
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
