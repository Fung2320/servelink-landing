"use client";

import { LanguageProvider } from "@/components/LanguageContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProofTicker from "@/components/SocialProofTicker";
import Countdown from "@/components/Countdown";
import Services from "@/components/Services";
import Features from "@/components/Features";
import AppScreenshots from "@/components/AppScreenshots";
import VideoSection from "@/components/VideoSection";
import HowItWorks from "@/components/HowItWorks";
import EscrowExplainer from "@/components/EscrowExplainer";
import CityMap from "@/components/CityMap";
import FAQ from "@/components/FAQ";
import ProviderRecruitment from "@/components/ProviderRecruitment";
import ReferralSection from "@/components/ReferralSection";
import Testimonials from "@/components/Testimonials";
import ShareThoughts from "@/components/ShareThoughts";
import PressSection from "@/components/PressSection";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";
import LiveActivity from "@/components/LiveActivity";
import CookieConsent from "@/components/CookieConsent";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import RecentSignupToast from "@/components/RecentSignupToast";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import ScrollProgress from "@/components/ScrollProgress";
import MobileStickyJoin from "@/components/MobileStickyJoin";

export default function Home() {
  return (
    <LanguageProvider>
      <Navbar />
      <main>
        <section id="hero"><Hero /></section>
        <SocialProofTicker />
        <section id="countdown"><Countdown /></section>
        <section id="services"><Services /></section>
        <section id="features"><Features /></section>
        <AppScreenshots />
        <VideoSection
          titleKey="videoProviderTitle"
          subtitleKey="videoProviderSub"
          src="/videos/tutorial-provider.mp4"
          bgClass="bg-gray-50"
        />
        <section id="how-it-works"><HowItWorks /></section>
        <section id="escrow"><EscrowExplainer /></section>
        <section id="cities"><CityMap /></section>
        <VideoSection
          titleKey="videoClientTitle"
          subtitleKey="videoClientSub"
          src="/videos/tutorial-client.mp4"
        />
        <section id="faq"><FAQ /></section>
        <section id="providers"><ProviderRecruitment /></section>
        <ReferralSection />
        <section id="testimonials"><Testimonials /></section>
        <ShareThoughts />
        <PressSection />
        <section id="waitlist"><Waitlist /></section>
      </main>
      <Footer />
      <LiveActivity />
      <CookieConsent />
      <ScrollProgress />
      <WhatsAppButton />
      <BackToTop />
      <RecentSignupToast />
      <ExitIntentPopup />
      <MobileStickyJoin />
    </LanguageProvider>
  );
}
