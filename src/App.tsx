"use client";

import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

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
import FloatingActions from "./components/FloatingActions";

// Pages
import Residential from "./pages/Residential";
import Contact from "./pages/Contact";
import Career from "./pages/Career";
import About from "./pages/About";
import PMCPage from "./pages/PMCPage";
import Commercial from "./pages/Commercial";
import Ongoing from "./pages/Ongoing";
import Completed from "./pages/Completed";

// Admin
import AdminLayout from "./admin/AdminLayout";
import DashboardHome from "./admin/pages/DashboardHome";
import LoginPage from "./admin/LoginPage";
import ProjectsManager from "./admin/pages/ProjectsManager";
import CareersManager from "./admin/pages/CareersManager";
import BannersManager from "./admin/pages/BannersManager";
import ContactDetailsManager from "./admin/pages/ContactDetailsManager";

function AppContent({ isLogoAnimating, setIsLogoAnimating }: { isLogoAnimating: boolean, setIsLogoAnimating: (val: boolean) => void }) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-white">
      {/* Global Utilities */}
      <ScrollToTop />
      {!isAdmin && <CursorWaveEffect />}

      {/* Floating Actions: Visible on all pages after logo animation */}
      {!isLogoAnimating && !isAdmin && <FloatingActions />}

      {/* Initial Loading State */}
      {!isAdmin && <LogoAnimation onAnimationComplete={() => setIsLogoAnimating(false)} />}

      {/* Fixed Header */}
      {!isAdmin && <Header isLogoAnimating={isLogoAnimating} />}

      {/* Page Content */}
      <main
        className={`${!isAdmin ? `transition-opacity duration-1000 ${isLogoAnimating ? "opacity-0" : "opacity-100"}` : ""}`}
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

          {/* Admin Routes */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="banners" element={<BannersManager />} />
            <Route path="projects" element={<ProjectsManager />} />
            <Route path="careers" element={<CareersManager />} />
            <Route path="contact-details" element={<ContactDetailsManager />} />
          </Route>
        </Routes>
      </main>

      {/* Global Footer */}
      {!isAdmin && <Footer />}
    </div>
  );
}

function App() {
  const [isLogoAnimating, setIsLogoAnimating] = useState(true);

  return (
    <Router basename="/">
      <AppContent isLogoAnimating={isLogoAnimating} setIsLogoAnimating={setIsLogoAnimating} />
    </Router>
  );
}

export default App;