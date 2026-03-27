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
  title: "ServeLink \u2014 Trusted Home Services in Cameroon",
  description:
    "Book 118+ verified home services across Cameroon. Hair braiding, plumbing, tutoring, cleaning \u2014 all in one app. Pay with MTN MoMo or Orange Money.",
  keywords: [
    "home services",
    "Cameroon",
    "plumbing",
    "cleaning",
    "tutoring",
    "mobile money",
    "ServeLink",
    "Douala",
    "Yaound\u00e9",
    "Limb\u00e9",
    "Buea",
  ],
  authors: [{ name: "ServeLink Company Limited" }],
  openGraph: {
    title: "ServeLink \u2014 Trusted Home Services in Cameroon",
    description:
      "Book 118+ verified services across Cameroon. Hair braiding, plumbing, tutoring, cleaning \u2014 all in one app.",
    url: "https://www.servelinkapp.com",
    siteName: "ServeLink",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ServeLink \u2014 Trusted Home Services in Cameroon",
    description:
      "Book 118+ verified services across Cameroon. Pay with Mobile Money.",
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
      className={`${inter.variable} ${poppins.variable} antialiased`}
    >
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'><path d='M24 4C16.268 4 10 10.268 10 18c0 10.5 14 26 14 26s14-15.5 14-26c0-7.732-6.268-14-14-14z' fill='%231B6B7B'/><circle cx='24' cy='18' r='8' fill='%23E85D04'/><path d='M20.5 18L23 20.5L28 15.5' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'/></svg>"
          type="image/svg+xml"
        />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
