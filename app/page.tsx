"use client";

import { LanguageProvider } from "@/components/LanguageContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <LanguageProvider>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Features />
        <HowItWorks />
        <Waitlist />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
