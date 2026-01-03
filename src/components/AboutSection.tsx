"use client";

import {
  Award,
  Building2,
  Users,
  HeadphonesIcon,
  Clock,
} from "lucide-react";

import AboutIntro from "./AboutIntro";
import LusionCardSection from "./LusionCardSection";
import CommercialExpertiseSection from "./CommercialExpertiseSection";
import LogoTickerSection from "./LogoTickerSection";

export default function AboutSection() {
  const features = [
    { icon: Award, title: "25 Years Expert", description: "Deep execution expertise ensuring seamless delivery." },
    { icon: Building2, title: "800+ Projects", description: "Designed and executed premium interior projects." },
    { icon: Users, title: "500+ Clients", description: "A proven record of quality delivery and satisfaction." },
    { icon: HeadphonesIcon, title: "24/7 Support", description: "We are available round the clock to assist you." },
    { icon: Clock, title: "On-Time", description: "We guarantee on-time delivery with systematic execution." },
    { icon: Building2, title: "Lifetime Support", description: "After-sales support to ensure interiors remain perfect." },
  ];

  return (
    <div className="w-full bg-white overflow-hidden">
      <AboutIntro />
      <LusionCardSection features={features} />
      <CommercialExpertiseSection />
      <LogoTickerSection />
    </div>
  );
}
