"use client";

import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import LogoAnimation from "./components/LogoAnimation";
import Header from "./components/Header";
import HeroCarousel from "./components/HeroCarousel";
import AboutSection from "./components/AboutSection";
import MapSection from "./components/MapSection";
import ProjectsSection from "./components/ProjectsSection";
import Footer from "./components/Footer";
import Enquiry from "./components/Enquiry";
import CursorWaveEffect from "./components/CursorWaveEffect";
import ScrollToTop from "./components/ScrollToTop";
import FloatingActions from "./components/FloatingActions"; // Import the new component

// Pages
import Residential from "./pages/Residential";
import Contact from "./pages/Contact";
import Career from "./pages/Career";
import About from "./pages/About";
import PMCPage from "./pages/PMCPage";
import Commercial from "./pages/Commercial";
import Ongoing from "./pages/Ongoing";
import Completed from "./pages/Completed";

function App() {
  const [isLogoAnimating, setIsLogoAnimating] = useState(true);

  return (
    <Router basename="/">
      <div className="min-h-screen bg-white">
        {/* Global Utilities */}
        <ScrollToTop />
        <CursorWaveEffect />

        {/* Floating Actions: Visible on all pages after logo animation */}
        {!isLogoAnimating && <FloatingActions />}

        {/* Initial Loading State */}
        <LogoAnimation onAnimationComplete={() => setIsLogoAnimating(false)} />

        {/* Fixed Header */}
        <Header isLogoAnimating={isLogoAnimating} />

        {/* Page Content */}
        <main
          className={`transition-opacity duration-1000 ${
            isLogoAnimating ? "opacity-0" : "opacity-100"
          }`}
        >
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HeroCarousel />
                  <AboutSection />
                  <MapSection />
                  <ProjectsSection />
                  <Enquiry />
                </>
              }
            />

            <Route path="/pmc" element={<PMCPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/career" element={<Career />} />
            <Route path="/residential" element={<Residential />} />
            <Route path="/commercial" element={<Commercial />} />
            <Route path="/ongoing" element={<Ongoing />} />
            <Route path="/completed" element={<Completed />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;