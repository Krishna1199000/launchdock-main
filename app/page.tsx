"use client";

import { useCallback, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Technologies from "@/components/Technologies";
import WhyChooseUs from "@/components/WhyChooseUs";
import OurProcess from "@/components/OurProcess";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Blog from "@/components/Blog";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import TalkToExpertModal from "@/components/TalkToExpertModal";
import ChatWidget from "@/components/ChatWidget";

const Index = () => {
  const [talkOpen, setTalkOpen] = useState(false);
  const openTalk = useCallback(() => setTalkOpen(true), []);
  const closeTalk = useCallback(() => setTalkOpen(false), []);
  const scrollProcess = useCallback(() => {
    const el = document.getElementById("our-process");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <div className="min-h-screen bg-background">
        <Navbar />
        <Hero />
        <Services />
        <Technologies />
        <WhyChooseUs />
        <OurProcess onAction={openTalk} />
        <Portfolio />
        <Testimonials />
        <Pricing onPlanAction={() => openTalk()} />
        <Blog />
        <CTA onAction={openTalk} onViewProcess={scrollProcess} />
        <Contact onSchedule={openTalk} />
      </div>
      <TalkToExpertModal open={talkOpen} onClose={closeTalk} />
      <ChatWidget />
    </>
  );
};

export default Index;
