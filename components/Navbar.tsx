"use client";

import { useState, useEffect } from "react";
import { useLang } from "./LanguageContext";
import Logo from "./Logo";

export default function Navbar() {
  const { lang, toggleLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex-shrink-0">
            <Logo size={32} />
          </a>

          {/* Desktop actions */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={toggleLang}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                scrolled
                  ? "bg-[#f6f3f2] text-[#1b1b1b] hover:bg-[#e8e5e4]"
                  : "bg-white/15 text-white hover:bg-white/25"
              }`}
              aria-label="Toggle language"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"
                />
              </svg>
              {lang === "en" ? "FR" : "EN"}
            </button>
            <a
              href="#waitlist"
              className="rounded-full bg-[#fecc00] px-5 py-2 text-sm font-semibold text-[#1b1b1b] transition-all hover:bg-[#d4ad00] hover:scale-105 pulse-glow"
            >
              {t("navCta")}
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={toggleLang}
              className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                scrolled
                  ? "bg-[#f6f3f2] text-[#1b1b1b]"
                  : "bg-white/15 text-white"
              }`}
            >
              {lang === "en" ? "FR" : "EN"}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`p-1 rounded-md ${
                scrolled ? "text-[#1b1b1b]" : "text-white"
              }`}
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="sm:hidden pb-4">
            <a
              href="#waitlist"
              onClick={() => setMenuOpen(false)}
              className="block w-full rounded-full bg-[#fecc00] px-5 py-2.5 text-center text-sm font-semibold text-white"
            >
              {t("navCta")}
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
