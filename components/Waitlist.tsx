"use client";

import { useState } from "react";
import { useLang } from "./LanguageContext";
import AnimateOnScroll from "./AnimateOnScroll";
import { supabase } from "../lib/supabase";

export default function Waitlist() {
  const { t, lang } = useLang();
  const [tab, setTab] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const entry = {
        name: name.trim() || null,
        email: tab === "email" ? email.trim() : null,
        phone: tab === "phone" ? `237${phone}` : null,
        type: tab,
        language: lang,
      };

      const { error: dbError } = await supabase.from("waitlist").insert([entry]);

      if (dbError) throw dbError;

      setSubmitted(true);
    } catch (err: any) {
      console.error("Waitlist error:", err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="waitlist" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-teal-dark" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-teal blur-3xl" />
        <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-orange blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
        <AnimateOnScroll>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {t("waitlistTitle")}
          </h2>
          <p className="text-lg text-white/70 mb-10">
            {t("waitlistSubtitle")}
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll>
          {submitted ? (
            <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 sm:p-10">
              <div className="text-5xl mb-4">&#127881;</div>
              <p className="text-xl font-semibold text-white">
                {t("successMsg")}
              </p>
            </div>
          ) : (
            <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 sm:p-8">
              {/* Tabs */}
              <div className="flex rounded-xl bg-white/10 p-1 mb-6">
                <button
                  onClick={() => setTab("email")}
                  className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-all ${
                    tab === "email"
                      ? "bg-white text-navy shadow-sm"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {t("tabEmail")}
                </button>
                <button
                  onClick={() => setTab("phone")}
                  className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-all ${
                    tab === "phone"
                      ? "bg-white text-navy shadow-sm"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {t("tabPhone")}
                </button>
              </div>

              {/* Trust badges */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-6 text-sm text-white/60">
                <span>{t("trustBadge1")}</span>
                <span className="hidden sm:inline">·</span>
                <span>{t("trustBadge2")}</span>
              </div>

              {/* Name input */}
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("namePlaceholder")}
                className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent mb-3"
              />

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                {tab === "email" ? (
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("emailPlaceholder")}
                    className="flex-1 rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
                  />
                ) : (
                  <div className="flex-1 flex items-center rounded-xl bg-white/10 border border-white/20 overflow-hidden focus-within:ring-2 focus-within:ring-orange">
                    <span className="pl-4 pr-2 text-white/60 text-sm font-medium">
                      +237
                    </span>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value.replace(/\D/g, "").slice(0, 9))
                      }
                      placeholder={t("phonePlaceholder")}
                      className="flex-1 bg-transparent px-2 py-3 text-white placeholder-white/40 focus:outline-none"
                    />
                  </div>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-xl bg-orange px-6 py-3 text-base font-semibold text-white transition-all hover:bg-orange-dark hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      ...
                    </span>
                  ) : (
                    t("joinBtn")
                  )}
                </button>
              </form>

              {/* Privacy note + SSL */}
              <div className="mt-4 flex flex-col items-center gap-2">
                <p className="text-xs text-white/40">
                  {t("privacyNote")}{" "}
                  <a
                    href="https://api.servelinkapp.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-white/60 transition-colors"
                  >
                    {t("privacyLink")}
                  </a>
                </p>
                <p className="text-xs text-white/30">{t("sslNote")}</p>
              </div>
            </div>
          )}
        </AnimateOnScroll>

        <AnimateOnScroll>
          <p className="mt-6 text-sm text-white/50">
            {t("socialProof")}
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
