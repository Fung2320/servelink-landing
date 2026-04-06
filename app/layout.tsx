import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ServeLink \u2014 Home Services in Cameroon | Book Verified Providers",
  description:
    "Book verified plumbers, cleaners, tutors and 115+ more services in Douala, Yaound\u00e9, Limb\u00e9 and across Cameroon. Pay safely with MTN MoMo. Powered by AI.",
  keywords: [
    "home services Cameroon", "plumber Douala", "cleaner Yaound\u00e9",
    "MTN MoMo", "book services Cameroon", "ServeLink",
    "Orange Money", "Limb\u00e9", "Buea", "Bafoussam", "Bamenda",
    "tutoring Cameroon", "cleaning Douala", "beauty services",
  ],
  authors: [{ name: "ServeLink Company Limited" }],
  robots: { index: true, follow: true },
  alternates: { canonical: "https://servelinkapp.com", languages: { "fr-CM": "/", "en-CM": "/" } },
  openGraph: {
    title: "ServeLink \u2014 Home Services in Cameroon",
    description:
      "Book verified service providers in Douala, Yaound\u00e9 and across Cameroon. Pay with MTN MoMo. Powered by AI.",
    url: "https://servelinkapp.com",
    siteName: "ServeLink",
    locale: "fr_CM",
    alternateLocale: ["en_CM"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ServeLink \u2014 Home Services in Cameroon",
    description:
      "Book verified providers across Cameroon. Pay with MTN MoMo & Orange Money.",
  },
  metadataBase: new URL("https://www.servelinkapp.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} antialiased scroll-smooth`}
    >
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'><path d='M24 4C16.268 4 10 10.268 10 18c0 10.5 14 26 14 26s14-15.5 14-26c0-7.732-6.268-14-14-14z' fill='%231B6B7B'/><circle cx='24' cy='18' r='8' fill='%23E85D04'/><path d='M20.5 18L23 20.5L28 15.5' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'/></svg>"
          type="image/svg+xml"
        />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
            <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');` }} />
          </>
        )}
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
