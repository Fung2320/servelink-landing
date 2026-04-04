"use client";

import { LanguageProvider } from "@/components/LanguageContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import VideoSection from "@/components/VideoSection";
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
        <VideoSection
          titleKey="videoProviderTitle"
          subtitleKey="videoProviderSub"
          src="/videos/tutorial-provider.mp4"
          bgClass="bg-gray-50"
        />
        <HowItWorks />
        <VideoSection
          titleKey="videoClientTitle"
          subtitleKey="videoClientSub"
          src="/videos/tutorial-client.mp4"
        />
        <Waitlist />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
