"use client";

import React from 'react';
import gallery1 from '../assets/gallery-commercial1.jpg';
import gallery2 from '../assets/gallery-commercial11.jpeg';
import gallery3 from '../assets/gallery-commercial3.jpg';
import gallery4 from '../assets/gallery-commercial5.jpg';
import gallery5 from '../assets/gallery-commercial7.jpg';
import gallery6 from '../assets/gallery-commercial9.jpeg';
import gallery7 from '../assets/greens3.jpg';
import gallery8 from '../assets/oecl2.jpg';
import gallery9 from '../assets/gallery-commercial8.jpg';
import gallery10 from '../assets/gallery-commercial6.jpg';
import gallery11 from '../assets/saf-gmaes-vilalge.jpg';
import gallery12 from '../assets/gallery-commercial4.jpg';
import gallery13 from '../assets/gallery-commercial2.jpg';
import gallery14 from '../assets/gallery-commercial10.jpeg';


const projectsRow1 = [
  gallery1,
  gallery10,
  gallery11,
  gallery12,
  gallery13,
  gallery7,
  gallery8
];

const projectsRow2 = [
  gallery14,
  gallery2,
  gallery3,
  gallery4,
  gallery5,
  gallery6,
  gallery9
];

export default function CompactProjectsSection() {
  
  const ProjectCard = ({ image, index }: { image: string, index: number }) => {
    const isLarge = index % 2 === 0;
    return (
      <div className={`
          flex-shrink-0 rounded-[1.2rem] md:rounded-[1.5rem] overflow-hidden transition-all duration-700 group relative
          ${isLarge ? 'w-[220px] h-[260px] md:w-[280px] md:h-[320px]' : 'w-[160px] h-[200px] md:w-[200px] md:h-[240px]'} 
          bg-white shadow-md hover:shadow-xl border border-gray-100 self-center
        `}>
        <img 
          src={image} 
          className="w-full h-full object-cover  group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
          alt="Arsen Project" 
        />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
           <p className="text-[10px] md:text-[12px] text-[#0F5B54] font-black uppercase tracking-widest">Arsen</p>
           <h4 className="text-[#010B0A] text-[9px] md:text-[10px] font-bold uppercase italic">Work {index + 1}</h4>
        </div> */}
      </div>
    );
  };

  return (
    <section id="projects" className="py-12 md:py-20 bg-white overflow-hidden relative">
      {/* Header */}
      <div className="container mx-auto px-6 mb-8 md:mb-16 relative z-10 text-center">
          <span className="text-[#0F5B54] text-[10px] md:text-[12px] font-bold uppercase tracking-[0.3em] block mb-2">Projects</span>
          <h2 className="text-4xl md:text-6xl font-black text-[#010B0A] uppercase italic tracking-tighter">
            The <span className="text-transparent" style={{ WebkitTextStroke: '1.5px #0F5B54' }}>Gallery</span>
          </h2>
      </div>

      <div className="flex flex-col gap-4 md:gap-8">
        {/* Row 1 */}
        <div className="flex overflow-hidden group">
          <div className="flex gap-4 md:gap-6 animate-marquee whitespace-nowrap items-center py-4">
            {[...projectsRow1, ...projectsRow1].map((img, i) => <ProjectCard key={i} image={img} index={i} />)}
          </div>
          <div className="flex gap-4 md:gap-6 animate-marquee whitespace-nowrap items-center py-4" aria-hidden="true">
            {[...projectsRow1, ...projectsRow1].map((img, i) => <ProjectCard key={i+'c'} image={img} index={i} />)}
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex overflow-hidden group">
          <div className="flex gap-4 md:gap-6 animate-marquee-reverse whitespace-nowrap items-center py-4">
            {[...projectsRow2, ...projectsRow2].map((img, i) => <ProjectCard key={i} image={img} index={i} />)}
          </div>
          <div className="flex gap-4 md:gap-6 animate-marquee-reverse whitespace-nowrap items-center py-4" aria-hidden="true">
            {[...projectsRow2, ...projectsRow2].map((img, i) => <ProjectCard key={i+'c'} image={img} index={i} />)}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes marquee-reverse { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        
        .animate-marquee { animation: marquee 30s linear infinite; }
        .animate-marquee-reverse { animation: marquee-reverse 30s linear infinite; }
        
        /* Faster on mobile for better feel, slower on desktop */
        @media (min-width: 768px) {
          .animate-marquee { animation-duration: 45s; }
          .animate-marquee-reverse { animation-duration: 45s; }
        }

        .group:hover .animate-marquee, 
        .group:hover .animate-marquee-reverse { 
          animation-play-state: paused; 
        }
      `}} />
    </section>
  );
}