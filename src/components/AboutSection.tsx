"use client";

import {
  Award,
  Building2,
  MessageSquare, Factory,
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
    { 
      icon: Award, 
      title: "20 Years Excellence", 
      description: "Two decades of deep execution expertise ensuring seamless project delivery." 
    },
    { 
      icon: Factory, // You may need to import this from your icon library
      title: "8000 Sq.Ft. Factory", 
      description: "State-of-the-art setup equipped with high-end imported machinery for precision." 
    },
    { 
      icon: Users, 
      title: "Expert Team", 
      description: "Creative designers, experienced engineers, and skilled workers under one roof." 
    },
    { 
      icon: Clock, 
      title: "On-Time Delivery", 
      description: "We guarantee timely completion through systematic planning and execution." 
    },
    { 
      icon: HeadphonesIcon, 
      title: "Service Support", 
      description: "Dedicated after-sales support to ensure your interiors remain in perfect condition." 
    },
    { 
      icon: MessageSquare, // Or similar icon for consultation
      title: "Free Consultation", 
      description: "Expert guidance to help you visualize and plan your dream space at no cost." 
    },
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
