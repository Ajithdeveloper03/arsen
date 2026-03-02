"use client";

import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";

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

// Admin (Lazy Load)
import { lazy, Suspense } from 'react';
const AdminLayout = lazy(() => import("./admin/AdminLayout"));
const DashboardHome = lazy(() => import("./admin/pages/DashboardHome"));
const LoginPage = lazy(() => import("./admin/LoginPage"));
const ProjectsManager = lazy(() => import("./admin/pages/ProjectsManager"));
const CareersManager = lazy(() => import("./admin/pages/CareersManager"));
const BannersManager = lazy(() => import("./admin/pages/BannersManager"));
const ContactDetailsManager = lazy(() => import("./admin/pages/ContactDetailsManager"));
const SecuritySettings = lazy(() => import("./admin/pages/SecuritySettings"));

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
          <Route path="/admin/login" element={
            <Suspense fallback={<div className="min-h-screen bg-[#0F1F2A] flex items-center justify-center text-white">Loading Admin Portal...</div>}>
              <LoginPage />
            </Suspense>
          } />

          <Route path="/admin" element={
            <Suspense fallback={<div className="min-h-screen bg-[#F1F5F9] flex items-center justify-center text-[#022C22]">Loading Dashboard...</div>}>
              <AdminLayout />
            </Suspense>
          }>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="banners" element={<BannersManager />} />
            <Route path="projects" element={<ProjectsManager />} />
            <Route path="careers" element={<CareersManager />} />
            <Route path="contact-details" element={<ContactDetailsManager />} />
            <Route path="security" element={<SecuritySettings />} />
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