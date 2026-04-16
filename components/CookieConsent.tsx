"use client";

import { useState, useEffect } from "react";
import { useLang } from "./LanguageContext";

const STORAGE_KEY = "servelink-cookie-consent";

export default function CookieConsent() {
  const { lang } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  };

  const manage = () => {
    // For now, same as accept — can expand later
    localStorage.setItem(STORAGE_KEY, "managed");
    setVisible(false);
  };

  if (!visible) return null;

  const text =
    lang === "fr"
      ? "Nous utilisons des cookies pour ameliorer votre experience. En continuant, vous acceptez notre"
      : "We use cookies to improve your experience. By continuing, you agree to our";

  const policyLabel =
    lang === "fr" ? "Politique de confidentialite" : "Privacy Policy";

  const acceptLabel = lang === "fr" ? "Tout accepter" : "Accept All";
  const manageLabel =
    lang === "fr" ? "Gerer les preferences" : "Manage Preferences";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white shadow-2xl border border-[#1b1b1b]/10 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-gray-600 flex-1 leading-relaxed">
          {text}{" "}
          <a
            href="https://api.servelinkapp.com/cookies"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00342a] font-semibold underline hover:text-[#004d3f] transition-colors"
          >
            {policyLabel}
          </a>
          .
        </p>
        <div className="flex gap-2 sm:gap-3 shrink-0 flex-wrap">
          <button
            onClick={() => { localStorage.setItem(STORAGE_KEY, "essential-only"); setVisible(false); }}
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-[#4f4f4f] bg-[#fcf9f8] hover:bg-[#f6f3f2] transition-colors"
          >
            {lang === "fr" ? "Refuser" : "Reject Non-Essential"}
          </button>
          <button
            onClick={manage}
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-600 bg-[#f6f3f2] hover:bg-[#e8e5e4] transition-colors"
          >
            {manageLabel}
          </button>
          <button
            onClick={accept}
            className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white bg-[#00342a] hover:bg-[#004d3f] transition-colors"
          >
            {acceptLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
