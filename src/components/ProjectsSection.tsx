import React from 'react';

const projectsRow1 = ['https://cdn.pixabay.com/photo/2013/11/28/09/58/ceiling-219835_1280.jpg', 'https://cdn.pixabay.com/photo/2015/08/26/06/00/architecture-908142_1280.jpg', 'https://cdn.pixabay.com/photo/2021/04/18/14/35/business-6188579_1280.jpg', 'https://cdn.pixabay.com/photo/2023/11/09/04/06/architectural-design-8376206_1280.jpg', 'https://cdn.pixabay.com/photo/2024/10/19/06/34/futuristic-9132027_1280.jpg'];
const projectsRow2 = ['https://cdn.pixabay.com/photo/2015/04/20/06/46/office-730681_1280.jpg', 'https://cdn.pixabay.com/photo/2016/09/19/17/20/home-1680800_1280.jpg', 'https://cdn.pixabay.com/photo/2020/03/23/07/59/office-4959782_1280.jpg', 'https://cdn.pixabay.com/photo/2015/04/10/17/03/pots-716579_1280.jpg', 'https://cdn.pixabay.com/photo/2024/07/25/23/56/interior-design-8922413_1280.jpg'];

export default function CompactProjectsSection() {
  
  const ProjectCard = ({ image, index }) => {
    const isLarge = index % 2 === 0;
    return (
      <div className={`
          flex-shrink-0 rounded-[1.5rem] overflow-hidden transition-all duration-700 group relative
          ${isLarge ? 'w-[280px] h-[320px]' : 'w-[200px] h-[240px]'} 
          bg-white shadow-md hover:shadow-xl border border-gray-100 self-center
        `}>
        <img src={image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" alt="Arsen Project" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all">
           <p className="text-[12px] text-[#0F5B54] font-black uppercase tracking-widest">Arsen</p>
           <h4 className="text-[#010B0A] text-[10px] font-bold uppercase italic">Work {index + 1}</h4>
        </div>
      </div>
    );
  };

  return (
    <section id="projects" className="py-16 bg-white overflow-hidden relative">
      {/* Minimized Header */}
      <div className="container mx-auto px-6 mb-12 relative z-10 text-center">
          <span className="text-[#0F5B54] text-[12px] font-bold uppercase tracking-[0.3em] block mb-2">Projects</span>
          <h2 className="text-4xl md:text-6xl font-black text-[#010B0A] uppercase italic tracking-tighter">
            The <span className="text-transparent" style={{ WebkitTextStroke: '2px #0F5B54' }}>Gallery</span>
          </h2>
      </div>

      <div className="space-y-6">
        {/* Row 1 */}
        <div className="flex overflow-hidden group">
          <div className="flex gap-6 animate-marquee whitespace-nowrap items-center">
            {[...projectsRow1, ...projectsRow1].map((img, i) => <ProjectCard key={i} image={img} index={i} />)}
          </div>
          <div className="flex gap-6 animate-marquee whitespace-nowrap items-center" aria-hidden="true">
            {[...projectsRow1, ...projectsRow1].map((img, i) => <ProjectCard key={i+'c'} image={img} index={i} />)}
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex overflow-hidden group">
          <div className="flex gap-6 animate-marquee-reverse whitespace-nowrap items-center">
            {[...projectsRow2, ...projectsRow2].map((img, i) => <ProjectCard key={i} image={img} index={i} />)}
          </div>
          <div className="flex gap-6 animate-marquee-reverse whitespace-nowrap items-center" aria-hidden="true">
            {[...projectsRow2, ...projectsRow2].map((img, i) => <ProjectCard key={i+'c'} image={img} index={i} />)}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes marquee-reverse { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        .animate-marquee { animation: marquee 40s linear infinite; }
        .animate-marquee-reverse { animation: marquee-reverse 40s linear infinite; }
        .group:hover .animate-marquee, .group:hover .animate-marquee-reverse { animation-play-state: paused; }
      `}} />
    </section>
  );
}