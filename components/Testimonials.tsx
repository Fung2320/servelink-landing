"use client";

import { useState, useEffect, useCallback } from "react";
import { useLang } from "./LanguageContext";
import AnimateOnScroll from "./AnimateOnScroll";
import { supabase, type TestimonialEntry } from "../lib/supabase";

const ALL_TESTIMONIALS = [
  { nameKey: "test1Name", roleKey: "test1Role", textKey: "test1Text", avatar: "YF", color: "#1B6B7B" },
  { nameKey: "test2Name", roleKey: "test2Role", textKey: "test2Text", avatar: "HN", color: "#0E5E6B" },
  { nameKey: "test3Name", roleKey: "test3Role", textKey: "test3Text", avatar: "VE", color: "#1B6B7B" },
  { nameKey: "test4Name", roleKey: "test4Role", textKey: "test4Text", avatar: "JM", color: "#0E5E6B" },
  { nameKey: "test5Name", roleKey: "test5Role", textKey: "test5Text", avatar: "AT", color: "#1B6B7B" },
  { nameKey: "test6Name", roleKey: "test6Role", textKey: "test6Text", avatar: "IF", color: "#0E5E6B" },
  { nameKey: "test7Name", roleKey: "test7Role", textKey: "test7Text", avatar: "PN", color: "#1B6B7B" },
  { nameKey: "test8Name", roleKey: "test8Role", textKey: "test8Text", avatar: "RE", color: "#0E5E6B" },
  { nameKey: "test9Name", roleKey: "test9Role", textKey: "test9Text", avatar: "TM", color: "#1B6B7B" },
  { nameKey: "test10Name", roleKey: "test10Role", textKey: "test10Text", avatar: "WB", color: "#0E5E6B" },
  { nameKey: "test11Name", roleKey: "test11Role", textKey: "test11Text", avatar: "NK", color: "#1B6B7B" },
  { nameKey: "test12Name", roleKey: "test12Role", textKey: "test12Text", avatar: "AM", color: "#0E5E6B" },
  { nameKey: "test13Name", roleKey: "test13Role", textKey: "test13Text", avatar: "FE", color: "#1B6B7B" },
  { nameKey: "test14Name", roleKey: "test14Role", textKey: "test14Text", avatar: "BM", color: "#0E5E6B" },
  { nameKey: "test15Name", roleKey: "test15Role", textKey: "test15Text", avatar: "GN", color: "#1B6B7B" },
  { nameKey: "test16Name", roleKey: "test16Role", textKey: "test16Text", avatar: "CT", color: "#0E5E6B" },
  { nameKey: "test17Name", roleKey: "test17Role", textKey: "test17Text", avatar: "SM", color: "#1B6B7B" },
  { nameKey: "test18Name", roleKey: "test18Role", textKey: "test18Text", avatar: "DA", color: "#0E5E6B" },
  { nameKey: "test19Name", roleKey: "test19Role", textKey: "test19Text", avatar: "LT", color: "#1B6B7B" },
  { nameKey: "test20Name", roleKey: "test20Role", textKey: "test20Text", avatar: "MK", color: "#0E5E6B" },
  { nameKey: "test21Name", roleKey: "test21Role", textKey: "test21Text", avatar: "OA", color: "#1B6B7B" },
  { nameKey: "test22Name", roleKey: "test22Role", textKey: "test22Text", avatar: "PB", color: "#0E5E6B" },
  { nameKey: "test23Name", roleKey: "test23Role", textKey: "test23Text", avatar: "EN", color: "#1B6B7B" },
  { nameKey: "test24Name", roleKey: "test24Role", textKey: "test24Text", avatar: "JF", color: "#0E5E6B" },
  { nameKey: "test25Name", roleKey: "test25Role", textKey: "test25Text", avatar: "RN", color: "#1B6B7B" },
  { nameKey: "test26Name", roleKey: "test26Role", textKey: "test26Text", avatar: "EB", color: "#0E5E6B" },
  { nameKey: "test27Name", roleKey: "test27Role", textKey: "test27Text", avatar: "JN", color: "#1B6B7B" },
  { nameKey: "test28Name", roleKey: "test28Role", textKey: "test28Text", avatar: "FT", color: "#0E5E6B" },
];

interface CardData {
  type: "static" | "user";
  // static
  nameKey?: string;
  roleKey?: string;
  textKey?: string;
  avatar?: string;
  // user-submitted
  name?: string;
  role?: string;
  text?: string;
  stars?: number;
  initials?: string;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function Testimonials() {
  const { t } = useLang();
  const [index, setIndex] = useState(0);
  const [cards, setCards] = useState<CardData[]>(
    ALL_TESTIMONIALS.map((item) => ({ type: "static", ...item }))
  );

  // Fetch approved user testimonials and merge
  useEffect(() => {
    (async () => {
      try {
        const { data } = await supabase
          .from("testimonials")
          .select("*")
          .eq("approved", true)
          .order("created_at", { ascending: false });

        if (data && data.length > 0) {
          const userCards: CardData[] = (data as TestimonialEntry[]).map((t) => ({
            type: "user" as const,
            name: t.name,
            role:
              t.role === "provider"
                ? `Provider (waiting) — ${t.city}`
                : `Waiting list — ${t.city}`,
            text: t.message,
            stars: t.stars,
            initials: getInitials(t.name),
          }));
          setCards([
            ...ALL_TESTIMONIALS.map((item) => ({ type: "static" as const, ...item })),
            ...userCards,
          ]);
        }
      } catch {
        // Supabase not configured — show static only
      }
    })();
  }, []);

  const total = cards.length;

  const next = useCallback(() => {
    setIndex((prev) => (prev + 3) % total);
  }, [total]);

  useEffect(() => {
    const timer = setInterval(next, 3000);
    return () => clearInterval(timer);
  }, [next]);

  const visible = [
    cards[index % total],
    cards[(index + 1) % total],
    cards[(index + 2) % total],
  ];

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
          {visible.map((item, i) => {
            const isUser = item.type === "user";
            const displayStars = isUser ? (item.stars ?? 5) : 5;
            const displayText = isUser ? item.text! : t(item.textKey as any);
            const displayName = isUser ? item.name! : t(item.nameKey as any);
            const displayRole = isUser ? item.role! : t(item.roleKey as any);
            const displayAvatar = isUser ? item.initials! : item.avatar!;

            return (
              <div
                key={`${index}-${i}`}
                className="rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-500 h-full flex flex-col animate-fade-in"
                style={{ backgroundColor: "#0E5E6B" }}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <span
                      key={j}
                      className="text-lg"
                      style={{ color: j < displayStars ? "#E85D04" : "rgba(255,255,255,0.2)" }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-white/90 text-sm leading-relaxed flex-1 mb-5">
                  &ldquo;{displayText}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/20">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ backgroundColor: "#1B6B7B", color: "#ffffff" }}
                  >
                    {displayAvatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{displayName}</p>
                    <p className="text-xs text-white/60">{displayRole}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-1.5 mt-6">
          {Array.from({ length: Math.ceil(total / 3) }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i * 3)}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: Math.floor(index / 3) === i ? "#E85D04" : "#CBD5E1",
              }}
              aria-label={`Go to testimonials ${i * 3 + 1}-${i * 3 + 3}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
