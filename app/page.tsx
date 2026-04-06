"use client";

import { LanguageProvider } from "@/components/LanguageContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import VideoSection from "@/components/VideoSection";
import Testimonials from "@/components/Testimonials";
import ShareThoughts from "@/components/ShareThoughts";
import PricingFAQ from "@/components/PricingFAQ";
import LiveActivity from "@/components/LiveActivity";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import Countdown from "@/components/Countdown";
import AppScreenshots from "@/components/AppScreenshots";
import FAQ from "@/components/FAQ";
import ProviderRecruitment from "@/components/ProviderRecruitment";
import EscrowExplainer from "@/components/EscrowExplainer";

export default function Home() {
  return (
    <LanguageProvider>
      <Navbar />
      <main>
        <Hero />
        <Countdown />
        <Services />
        <Features />
        <AppScreenshots />
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
        <EscrowExplainer />
        <FAQ />
        <ProviderRecruitment />
        <Testimonials />
        <ShareThoughts />
        <Waitlist />
      </main>
      <Footer />
      <LiveActivity />
      <CookieConsent />
    </LanguageProvider>
  );
}
