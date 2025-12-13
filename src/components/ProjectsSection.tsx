import React, { useEffect, useRef } from 'react';

const projectsRow1 = [
  'https://cdn.pixabay.com/photo/2013/11/28/09/58/ceiling-219835_1280.jpg',
  'https://cdn.pixabay.com/photo/2015/08/26/06/00/architecture-908142_1280.jpg',
  'https://cdn.pixabay.com/photo/2021/04/18/14/35/business-6188579_1280.jpg',
  'https://cdn.pixabay.com/photo/2023/11/09/04/06/architectural-design-8376206_1280.jpg',
  'https://cdn.pixabay.com/photo/2024/10/19/06/34/futuristic-9132027_1280.jpg',
  'https://cdn.pixabay.com/photo/2023/08/21/09/18/commercial-architect-designers-8204037_1280.jpg'
];

const projectsRow2 = [
  'https://cdn.pixabay.com/photo/2015/04/20/06/46/office-730681_1280.jpg',
  'https://cdn.pixabay.com/photo/2016/09/19/17/20/home-1680800_1280.jpg',
  'https://cdn.pixabay.com/photo/2020/03/23/07/59/office-4959782_1280.jpg',
  'https://cdn.pixabay.com/photo/2015/04/10/17/03/pots-716579_1280.jpg',
  'https://cdn.pixabay.com/photo/2024/07/25/23/56/interior-design-8922413_1280.jpg',
  'https://cdn.pixabay.com/photo/2016/11/18/22/21/restaurant-1837150_1280.jpg',
  'https://cdn.pixabay.com/photo/2020/07/24/09/49/books-5433432_1280.jpg',
  'https://cdn.pixabay.com/photo/2013/02/26/01/10/auditorium-86197_1280.jpg',
  'https://cdn.pixabay.com/photo/2014/08/11/21/36/room-416050_1280.jpg',
  'https://cdn.pixabay.com/photo/2019/03/08/20/17/beauty-salon-4043096_1280.jpg',
  'https://cdn.pixabay.com/photo/2014/08/11/21/39/wall-416060_1280.jpg'
];

export default function ProjectsSection() {
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  useEffect(() => {
    const row1 = row1Ref.current;
    const row2 = row2Ref.current;

    if (!row1 || !row2) return;

    // Independent counters for each row
    let pos1 = 0;
    let pos2 = 0;
    const speed = 0.5;

    const animate = () => {
      // --- Row 1 (Moving Left) ---
      const width1 = row1.scrollWidth / 2;
      pos1 += speed;

      // Reset when we've scrolled past the first set of images
      if (pos1 >= width1) {
        pos1 = 0;
      }
      row1.style.transform = `translateX(-${pos1}px)`;

      // --- Row 2 (Moving Right) ---
      const width2 = row2.scrollWidth / 2;
      pos2 += speed;

      // Reset when we've scrolled past the width
      if (pos2 >= width2) {
        pos2 = 0;
      }

      // Start at -width (showing the second set) and move towards 0
      const currentPos2 = -width2 + pos2;
      row2.style.transform = `translateX(${currentPos2}px)`;

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, []);

  // Helper component to render the card to keep code clean
  const ProjectCard = ({ image, index }) => {
    // ODD Index = Large (Big Size)
    // EVEN Index = Small (Current Size)
    const isLarge = index % 2 !== 0;

    return (
      <div
        className={`
          flex-shrink-0 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group relative
          ${isLarge ? 'w-[400px] h-[350px]' : 'w-[300px] h-[220px]'} 
        `}
      >
        <img
          src={image}
          alt={`Project ${index}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {/* Optional Overlay on Hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    );
  };

  return (
    <section id="projects" className="py-24 bg-gray-50 mb-12 overflow-hidden">
      <div className="container mx-auto px-6 mb-20">
        <h2 className="text-5xl font-bold text-[#16697A] text-center mb-4">
          Our Projects
        </h2>
        <p className="text-xl text-gray-600 text-center font-semibold">
          Explore Our Premium Interior Design Portfolio
        </p>
      </div>

      <div className="space-y-12">
        {/* Row 1 */}
        <div className="overflow-hidden">
          {/* "items-center" aligns the different heights perfectly in the center */}
          <div ref={row1Ref} className="flex gap-8 items-end" style={{ width: 'fit-content' }}>
            {[...projectsRow1, ...projectsRow1].map((image, index) => (
              <ProjectCard key={`r1-${index}`} image={image} index={index} />
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div className="overflow-hidden">
           {/* "items-center" aligns the different heights perfectly in the center */}
          <div ref={row2Ref} className="flex gap-8 items-start" style={{ width: 'fit-content' }}>
            {[...projectsRow2, ...projectsRow2].map((image, index) => (
              <ProjectCard key={`r2-${index}`} image={image} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}