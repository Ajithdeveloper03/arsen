import { useState } from 'react';
import LogoAnimation from './components/LogoAnimation';
import Header from './components/Header';
import HeroCarousel from './components/HeroCarousel';
import AboutSection from './components/AboutSection';
import MapSection from './components/MapSection';
import ProjectsSection from './components/ProjectsSection';
import Footer from './components/Footer';
import Enquiry from './components/Enquiry';

function App() {
  const [isLogoAnimating, setIsLogoAnimating] = useState(true);

  return (
    <div className="min-h-screen bg-white">
      <LogoAnimation onAnimationComplete={() => setIsLogoAnimating(false)} />

      <Header isLogoAnimating={isLogoAnimating} />

      <main className={`transition-opacity duration-1000 ${isLogoAnimating ? 'opacity-0' : 'opacity-100'}`}>
        <HeroCarousel />
        <AboutSection />
        <MapSection />
        <ProjectsSection />
        <Enquiry/>
      </main>

      <Footer />
    </div>
  );
}

export default App;
