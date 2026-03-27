"use client";

import { useLang } from "./LanguageContext";
import Logo from "./Logo";

const socials = [
  {
    name: "TikTok",
    url: "https://tiktok.com/@servelinkapp",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.52a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.72a8.27 8.27 0 004.76 1.5V6.77a4.83 4.83 0 01-1-.08z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    url: "https://instagram.com/servelinkapp",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    url: "https://facebook.com/servelinkapp",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/company/servelink",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Snapchat",
    url: "https://snapchat.com/add/servelinkapp",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12.922-.254.197-.1.406-.1.585-.008.175.09.3.247.308.418.006.137-.06.27-.18.36-.298.236-.742.396-1.207.494-.067.015-.12.03-.18.045-.05.012-.12.03-.191.045a.618.618 0 00-.442.42c-.03.105-.03.21 0 .315.12.406.36.796.66 1.17.525.675 1.229 1.227 2.1 1.597.21.09.405.225.495.42a.6.6 0 01-.045.555c-.21.375-.72.585-1.515.63-.12.007-.24.022-.345.037-.18.025-.39.06-.615.102-.3.06-.495.24-.69.48-.195.24-.36.51-.51.75-.45.704-1.005 1.425-2.295 1.425-.36 0-.72-.06-1.065-.15-.525-.135-1.11-.33-1.89-.33-.15 0-.315.015-.48.045-.765.09-1.395.36-1.905.51-.345.09-.72.15-1.065.15-1.29 0-1.845-.72-2.295-1.425-.15-.24-.315-.51-.51-.75-.195-.24-.39-.42-.69-.48-.225-.045-.435-.075-.615-.102a7.28 7.28 0 00-.345-.037c-.795-.045-1.305-.255-1.515-.63a.6.6 0 01-.045-.555c.09-.195.285-.33.495-.42.87-.37 1.575-.922 2.1-1.597.3-.375.54-.765.66-1.17a.584.584 0 000-.315.618.618 0 00-.442-.42c-.07-.015-.12-.03-.191-.045-.06-.015-.113-.03-.18-.045-.466-.098-.909-.258-1.207-.494a.45.45 0 01-.18-.36.458.458 0 01.309-.418c.179-.092.388-.092.585.008.263.134.622.27.922.254.199 0 .326-.045.401-.09a9.04 9.04 0 01-.033-.57c-.104-1.628-.23-3.654.299-4.847C7.453 1.069 10.81.793 11.8.793h.406z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-navy-dark text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo size={32} />
            <p className="mt-4 text-sm text-white/60 leading-relaxed max-w-xs">
              {t("footerTagline")}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-4">
              {t("footerContact")}
            </h4>
            <a
              href="mailto:contact@servelinkapp.com"
              className="text-sm text-white/70 hover:text-orange transition-colors"
            >
              contact@servelinkapp.com
            </a>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-4">
              {t("footerFollow")}
            </h4>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 text-white/70 transition-all hover:bg-orange hover:text-white hover:scale-110"
                  aria-label={s.name}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-4">
              {t("footerLegal")}
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href="https://api.servelinkapp.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/70 hover:text-orange transition-colors"
              >
                {t("footerPrivacy")}
              </a>
              <a
                href="https://api.servelinkapp.com/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/70 hover:text-orange transition-colors"
              >
                {t("footerTerms")}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            {t("footerCopyright")}
          </p>
          <p className="text-sm text-white/50">
            {t("footerMade")} <span className="text-red-500">&#10084;&#65039;</span> {t("footerIn")} <span>&#127464;&#127474;</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
