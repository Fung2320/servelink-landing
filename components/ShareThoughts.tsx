"use client";

import { useState } from "react";
import { useLang } from "./LanguageContext";
import AnimateOnScroll from "./AnimateOnScroll";
import { supabase } from "../lib/supabase";

const CITIES = ["Douala", "Yaoundé", "Limbé", "Bafoussam", "Buea", "Bamenda", "Mutengene", "Other"];

export default function ShareThoughts() {
  const { t } = useLang();
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [role, setRole] = useState<"client" | "provider">("client");
  const [message, setMessage] = useState("");
  const [stars, setStars] = useState(0);
  const [hoverStars, setHoverStars] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !city || !message.trim() || stars === 0) {
      setError(t("shareError" as any));
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const { error: dbErr } = await supabase.from("testimonials").insert({
        name: name.trim(),
        city,
        role,
        message: message.trim(),
        stars,
        approved: false,
      });
      if (dbErr) throw dbErr;
      setSubmitted(true);
    } catch {
      setError(t("shareErrorGeneric" as any));
    }
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="mx-auto max-w-xl px-4 text-center">
          <AnimateOnScroll>
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <div className="text-4xl mb-4">🎉</div>
              <p className="text-lg font-semibold text-navy mb-2">
                {t("shareSuccess" as any)}
              </p>
              <p className="text-sm text-gray-500">
                {t("shareSuccessSub" as any)}
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="mx-auto max-w-xl px-4 sm:px-6">
        <AnimateOnScroll>
          <div className="text-center mb-8">
            <h2
              className="text-xl sm:text-2xl font-bold text-navy mb-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t("shareTitle" as any)}
            </h2>
            <p className="text-sm text-gray-500">
              {t("shareSub" as any)}
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll>
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4"
          >
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-navy mb-1">
                {t("shareName" as any)}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={50}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
                placeholder={t("shareNamePh" as any)}
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-navy mb-1">
                {t("shareCity" as any)}
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal bg-white"
              >
                <option value="">{t("shareCityPh" as any)}</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-navy mb-1">
                {t("shareRole" as any)}
              </label>
              <div className="flex gap-3">
                {(["client", "provider"] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className="flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors"
                    style={{
                      backgroundColor: role === r ? "#1B6B7B" : "transparent",
                      color: role === r ? "#fff" : "#1a2744",
                      borderColor: role === r ? "#1B6B7B" : "#e5e7eb",
                    }}
                  >
                    {r === "client"
                      ? t("shareRoleClient" as any)
                      : t("shareRoleProvider" as any)}
                  </button>
                ))}
              </div>
            </div>

            {/* Stars */}
            <div>
              <label className="block text-sm font-medium text-navy mb-1">
                {t("shareStars" as any)}
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStars(s)}
                    onMouseEnter={() => setHoverStars(s)}
                    onMouseLeave={() => setHoverStars(0)}
                    className="text-2xl transition-transform hover:scale-110"
                    style={{
                      color: s <= (hoverStars || stars) ? "#E85D04" : "#d1d5db",
                    }}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-navy mb-1">
                {t("shareMessage" as any)}
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, 200))}
                maxLength={200}
                rows={3}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal resize-none"
                placeholder={t("shareMessagePh" as any)}
              />
              <p className="text-xs text-gray-400 text-right mt-1">
                {message.length}/200
              </p>
            </div>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl py-3 text-white font-semibold text-sm transition-opacity disabled:opacity-50"
              style={{ backgroundColor: "#E85D04" }}
            >
              {submitting
                ? t("shareSubmitting" as any)
                : t("shareSubmit" as any)}
            </button>
          </form>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
