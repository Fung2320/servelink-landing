"use client";

import { useState, useEffect } from "react";
import { useLang } from "./LanguageContext";
import AnimateOnScroll from "./AnimateOnScroll";
import { supabase } from "../lib/supabase";
import QRCodeBlock from "./QRCode";
import AppStoreBadges from "./AppStoreBadges";

export default function Waitlist() {
  const { t, lang } = useLang();
  const [tab, setTab] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [ageChecked, setAgeChecked] = useState(false);
  const [spotsLeft, setSpotsLeft] = useState(100);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  // Fetch signup count for scarcity
  useEffect(() => {
    (async () => {
      try {
        const { count } = await supabase.from("waitlist").select("*", { count: "exact", head: true });
        if (count !== null) setSpotsLeft(Math.max(0, 100 - count));
      } catch { /* silent */ }
    })();
  }, []);

  // Rotate testimonial quotes
  useEffect(() => {
    const timer = setInterval(() => setTestimonialIdx((i) => (i + 1) % 3), 5000);
    return () => clearInterval(timer);
  }, []);

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
      <div className="absolute inset-0 bg-gradient-to-br from-[#00342a] via-[#004d3f] to-[#004d3f]" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-[#00342a] blur-3xl" />
        <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-[#fecc00] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
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
              <p className="text-xl font-semibold text-white mb-4">
                {t("successMsg")}
              </p>
              <p className="text-sm text-white/60 mb-5">
                {lang === "fr" ? "Partagez ServeLink avec vos amis :" : "Share ServeLink with friends:"}
              </p>
              <div className="flex justify-center gap-3">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(lang === "fr" ? "Je viens de rejoindre ServeLink ! Une nouvelle app pour r\u00e9server des services \u00e0 domicile au Cameroun. Rejoins-moi : servelinkapp.com" : "I just joined the ServeLink waitlist! A new app to book verified home services in Cameroon. Join me: servelinkapp.com")}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center text-white hover:scale-110 transition-transform"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://servelinkapp.com")}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:scale-110 transition-transform"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <button
                  onClick={() => { navigator.clipboard.writeText("https://servelinkapp.com"); }}
                  className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white hover:scale-110 transition-transform"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                </button>
              </div>
              <AppStoreBadges />
            </div>
          ) : (
            <>
            {/* Scarcity banner */}
            <div className="mb-4 rounded-xl bg-[#fecc00]/20 backdrop-blur-sm px-4 py-2.5 text-center">
              <p className="text-sm font-bold text-[#735c00]">
                &#9889; {spotsLeft > 0
                  ? (lang === "fr"
                    ? `Seulement ${spotsLeft} places de membres fondateurs restantes`
                    : `Only ${spotsLeft} founding member spots left`)
                  : (lang === "fr" ? "Liste d\u2019attente ouverte !" : "Waitlist is open!")}
              </p>
            </div>

            {/* Rotating testimonial */}
            <div className="mb-5 text-center transition-opacity duration-500">
              {[
                { q: lang === "fr" ? "\u00abEnfin une vraie plateforme de services au Cameroun !\u00bb" : "\u201cFinally a real services platform in Cameroon!\u201d", n: "Henriette, Douala", s: "\u2B50\u2B50\u2B50\u2B50\u2B50" },
                { q: lang === "fr" ? "\u00abJ\u2019ai h\u00e2te de trouver des clients facilement\u00bb" : "\u201cI can\u2019t wait to find clients easily\u201d", n: "Pascal, Yaound\u00e9", s: "\u2B50\u2B50\u2B50\u2B50\u2B50" },
                { q: lang === "fr" ? "\u00abPayer avec MoMo, c\u2019est exactement ce qu\u2019il nous fallait\u00bb" : "\u201cPaying with MoMo is exactly what we needed\u201d", n: "Marie, Limb\u00e9", s: "\u2B50\u2B50\u2B50\u2B50\u2B50" },
              ].filter((_, i) => i === testimonialIdx).map((t) => (
                <div key={t.n}>
                  <p className="text-sm text-white/80 italic">{t.q}</p>
                  <p className="text-xs text-white/50 mt-1">{t.s} \u2014 {t.n}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 sm:p-8">
              {/* Tabs */}
              <div className="flex rounded-xl bg-white/10 p-1 mb-6">
                <button
                  onClick={() => setTab("email")}
                  className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-all ${
                    tab === "email"
                      ? "bg-white text-[#1b1b1b] shadow-sm"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {t("tabEmail")}
                </button>
                <button
                  onClick={() => setTab("phone")}
                  className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-all ${
                    tab === "phone"
                      ? "bg-white text-[#1b1b1b] shadow-sm"
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
                className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#fecc00] focus:border-transparent mb-3"
              />

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                {tab === "email" ? (
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("emailPlaceholder")}
                    className="flex-1 rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#fecc00] focus:border-transparent"
                  />
                ) : (
                  <div className="flex-1 flex items-center rounded-xl bg-white/10 border border-white/20 overflow-hidden focus-within:ring-2 focus-within:ring-[#fecc00]">
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
                  disabled={loading || !privacyChecked || !ageChecked}
                  className="rounded-xl bg-[#fecc00] px-6 py-3 text-base font-semibold text-[#1b1b1b] transition-all hover:bg-[#d4ad00] hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
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

              {/* Privacy + Terms checkbox */}
              <label className="mt-4 flex items-start gap-3 cursor-pointer text-left">
                <input
                  type="checkbox"
                  checked={privacyChecked}
                  onChange={(e) => setPrivacyChecked(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded accent-[#fecc00] shrink-0"
                />
                <span className="text-xs text-white/60 leading-relaxed">
                  {t("privacyCheckboxFull")}{" "}
                  <a href="https://api.servelinkapp.com/privacy" target="_blank" rel="noopener noreferrer"
                    className="underline hover:text-white/80 transition-colors">{t("privacyLink")}</a>
                  {" & "}
                  <a href="https://api.servelinkapp.com/terms" target="_blank" rel="noopener noreferrer"
                    className="underline hover:text-white/80 transition-colors">{t("footerTerms")}</a>
                </span>
              </label>

              {/* Age confirmation checkbox */}
              <label className="mt-2 flex items-start gap-3 cursor-pointer text-left">
                <input
                  type="checkbox"
                  checked={ageChecked}
                  onChange={(e) => setAgeChecked(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded accent-[#fecc00] shrink-0"
                />
                <span className="text-xs text-white/60 leading-relaxed">
                  {t("ageConfirmation")}
                </span>
              </label>

              {/* Privacy note + SSL */}
              <div className="mt-3 flex flex-col items-center gap-2">
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
            </>
          )}
        </AnimateOnScroll>

        <AnimateOnScroll>
          <div className="mt-8">
            <QRCodeBlock label={t("qrShareFriends")} size={150} showDownload />
          </div>
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
