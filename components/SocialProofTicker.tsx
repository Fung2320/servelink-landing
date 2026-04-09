"use client";

import { useLang } from "./LanguageContext";

const NAMES = [
  { name: "Henriette", city: "Douala" },
  { name: "Pascal", city: "Yaound\u00e9" },
  { name: "Winifred", city: "Mutengene" },
  { name: "Alain", city: "Buea" },
  { name: "Irene", city: "Limb\u00e9" },
  { name: "Thierry", city: "Bafoussam" },
  { name: "Rachel", city: "Bamenda" },
  { name: "Victor", city: "Douala", provider: true },
  { name: "Judith", city: "Yaound\u00e9", provider: true },
  { name: "Narcisse", city: "Douala", provider: true },
  { name: "Sandrine", city: "Limb\u00e9" },
  { name: "Bernard", city: "Buea" },
  { name: "C\u00e9line", city: "Bafoussam" },
  { name: "Francis", city: "Douala", provider: true },
  { name: "Pauline", city: "Yaound\u00e9" },
  { name: "Emmanuel", city: "Bamenda" },
  { name: "Diane", city: "Mutengene" },
  { name: "Roger", city: "Douala" },
  { name: "Marie-Claire", city: "Yaound\u00e9", provider: true },
  { name: "Patrick", city: "Limb\u00e9" },
];

export default function SocialProofTicker() {
  const { lang } = useLang();
  const fr = lang === "fr";

  const statItems = [
    fr ? "🧠 IA intégrée pour trouver le bon prestataire" : "🧠 AI-powered to find the perfect provider",
    fr ? "🛒 90+ services disponibles" : "🛒 90+ services available",
    fr ? "💳 Paiement sécurisé MoMo & Orange Money" : "💳 Secure payment via MoMo & Orange Money",
    fr ? "📸 Identifiez un service par photo avec l'IA" : "📸 Identify a service from a photo with AI",
    fr ? "🔒 Argent sécurisé en escrow jusqu'à fin du travail" : "🔒 Funds held in escrow until job is done",
  ];

  const userItems = NAMES.map((n) => {
    const suffix = n.provider
      ? fr ? " en tant que prestataire" : " as a provider"
      : "";
    return `\uD83D\uDD25 ${n.name} ${fr ? "de" : "from"} ${n.city} ${fr ? "vient de rejoindre" : "just joined"}${suffix}`;
  });

  // Interleave stat items among user join items, then duplicate for seamless loop
  const items: string[] = [];
  userItems.forEach((item, i) => {
    items.push(item);
    if ((i + 1) % 4 === 0) {
      items.push(statItems[Math.floor(i / 4) % statItems.length]);
    }
  });

  // Duplicate for seamless loop
  const all = [...items, ...items];

  return (
    <div className="bg-teal overflow-hidden py-2.5">
      <div className="flex animate-marquee whitespace-nowrap">
        {all.map((text, i) => (
          <span key={i} className="mx-8 text-sm font-medium text-white/90">{text}</span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
      `}</style>
    </div>
  );
}
