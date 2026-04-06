"use client";

import { useState } from "react";
import { useLang } from "./LanguageContext";
import AnimateOnScroll from "./AnimateOnScroll";

interface FAQItem {
  qEn: string;
  qFr: string;
  aEn: string;
  aFr: string;
}

const CLIENT_FAQS: FAQItem[] = [
  {
    qEn: "Is ServeLink free to use?",
    qFr: "ServeLink est-il gratuit ?",
    aEn: "Yes! Creating an account and browsing providers is completely free. You only pay when you book a service.",
    aFr: "Oui ! La cr\u00e9ation d\u2019un compte et la consultation des prestataires est enti\u00e8rement gratuite. Vous ne payez que lorsque vous r\u00e9servez un service.",
  },
  {
    qEn: "How does payment work?",
    qFr: "Comment fonctionne le paiement ?",
    aEn: "You pay through MTN MoMo or Orange Money before the job starts. Your money is held safely in escrow and only released to the provider after you confirm the job is done.",
    aFr: "Vous payez via MTN MoMo ou Orange Money avant le d\u00e9but du travail. Votre argent est conserv\u00e9 en toute s\u00e9curit\u00e9 et n\u2019est lib\u00e9r\u00e9 au prestataire qu\u2019apr\u00e8s votre confirmation.",
  },
  {
    qEn: "What if I\u2019m not happy with the service?",
    qFr: "Que faire si je ne suis pas satisfait du service ?",
    aEn: "You have 24 hours after job completion to raise a dispute. Our team will review and resolve it fairly. Your money stays protected until you\u2019re satisfied.",
    aFr: "Vous avez 24 heures apr\u00e8s la fin du travail pour signaler un litige. Notre \u00e9quipe examinera et r\u00e9soudra le probl\u00e8me \u00e9quitablement.",
  },
  {
    qEn: "Can I cancel a booking?",
    qFr: "Puis-je annuler une r\u00e9servation ?",
    aEn: "Yes! You can cancel for free within 30 minutes of booking. After 30 minutes, a 10% cancellation fee applies.",
    aFr: "Oui ! Vous pouvez annuler gratuitement dans les 30 minutes suivant la r\u00e9servation. Apr\u00e8s 30 minutes, des frais d\u2019annulation de 10% s\u2019appliquent.",
  },
  {
    qEn: "Are the providers verified?",
    qFr: "Les prestataires sont-ils v\u00e9rifi\u00e9s ?",
    aEn: "Yes. Every provider must upload their national ID card before accepting bookings. We verify their identity and display their real ratings from real clients.",
    aFr: "Oui. Chaque prestataire doit t\u00e9l\u00e9charger sa carte d\u2019identit\u00e9 nationale avant d\u2019accepter des r\u00e9servations. Nous v\u00e9rifions leur identit\u00e9 et affichons leurs vraies notes.",
  },
];

const PROVIDER_FAQS: FAQItem[] = [
  {
    qEn: "How much do I earn per booking?",
    qFr: "Combien je gagne par r\u00e9servation ?",
    aEn: "You keep 85% of every booking. ServeLink takes a 15% platform fee to cover payment processing, insurance, and platform maintenance.",
    aFr: "Vous gardez 85% de chaque r\u00e9servation. ServeLink prend 15% de frais de plateforme pour couvrir le traitement des paiements et la maintenance.",
  },
  {
    qEn: "When do I get paid?",
    qFr: "Quand suis-je pay\u00e9 ?",
    aEn: "Your payment is released immediately after the client confirms the job is done. No waiting, no delays.",
    aFr: "Votre paiement est lib\u00e9r\u00e9 imm\u00e9diatement apr\u00e8s que le client confirme que le travail est termin\u00e9. Pas d\u2019attente, pas de d\u00e9lais.",
  },
  {
    qEn: "Which cities does ServeLink cover?",
    qFr: "Quelles villes ServeLink couvre-t-il ?",
    aEn: "We currently cover Douala, Yaound\u00e9, Limb\u00e9, Buea, Mutengene, Bafoussam and Bamenda. More cities coming soon!",
    aFr: "Nous couvrons actuellement Douala, Yaound\u00e9, Limb\u00e9, Buea, Mutengene, Bafoussam et Bamenda. D\u2019autres villes arrivent bient\u00f4t !",
  },
  {
    qEn: "Does ServeLink work on 3G?",
    qFr: "ServeLink fonctionne-t-il en 3G ?",
    aEn: "Absolutely! ServeLink was built specifically for Cameroon\u2019s mobile networks. It works smoothly on 3G and even 2G in most areas.",
    aFr: "Absolument ! ServeLink a \u00e9t\u00e9 con\u00e7u sp\u00e9cifiquement pour les r\u00e9seaux mobiles du Cameroun. Il fonctionne parfaitement en 3G et m\u00eame en 2G.",
  },
  {
    qEn: "When does ServeLink launch?",
    qFr: "Quand ServeLink sera-t-il lanc\u00e9 ?",
    aEn: "We launch September 1, 2026. Join the waitlist now to be among the first to get access and receive founding member benefits.",
    aFr: "Nous lan\u00e7ons le 1er septembre 2026. Rejoignez la liste d\u2019attente maintenant pour \u00eatre parmi les premiers \u00e0 y avoir acc\u00e8s.",
  },
];

function AccordionItem({ item, lang, open, onToggle }: { item: FAQItem; lang: string; open: boolean; onToggle: () => void }) {
  const q = lang === "fr" ? item.qFr : item.qEn;
  const a = lang === "fr" ? item.aFr : item.aEn;

  return (
    <div className="rounded-2xl bg-white shadow-sm shadow-black/[0.04] overflow-hidden transition-all">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-gray-50/50 transition-colors"
      >
        <span className="text-[15px] font-semibold text-navy leading-snug">{q}</span>
        <span
          className={`shrink-0 w-7 h-7 rounded-full bg-teal/10 flex items-center justify-center text-teal transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4.5L6 8.5L10 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="px-5 pb-5 text-sm text-gray-500 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const { lang } = useLang();
  const [tab, setTab] = useState<"client" | "provider">("client");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const title = lang === "fr" ? "Questions Fr\u00e9quentes" : "Frequently Asked Questions";
  const clientTab = lang === "fr" ? "Clients" : "Clients";
  const providerTab = lang === "fr" ? "Prestataires" : "Providers";

  const faqs = tab === "client" ? CLIENT_FAQS : PROVIDER_FAQS;

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <AnimateOnScroll>
          <div className="text-center mb-10">
            <h2
              className="text-3xl sm:text-4xl font-bold text-navy"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {title} <span className="text-3xl">&#10067;</span>
            </h2>
          </div>
        </AnimateOnScroll>

        {/* Tabs */}
        <AnimateOnScroll>
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-xl bg-white p-1 shadow-sm shadow-black/[0.04]">
              <button
                onClick={() => { setTab("client"); setOpenIndex(0); }}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  tab === "client"
                    ? "bg-teal text-white shadow-md shadow-teal/20"
                    : "text-gray-500 hover:text-navy"
                }`}
              >
                &#128100; {clientTab}
              </button>
              <button
                onClick={() => { setTab("provider"); setOpenIndex(0); }}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  tab === "provider"
                    ? "bg-teal text-white shadow-md shadow-teal/20"
                    : "text-gray-500 hover:text-navy"
                }`}
              >
                &#128119; {providerTab}
              </button>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Accordion */}
        <AnimateOnScroll>
          <div className="flex flex-col gap-3">
            {faqs.map((item, i) => (
              <AccordionItem
                key={`${tab}-${i}`}
                item={item}
                lang={lang}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
