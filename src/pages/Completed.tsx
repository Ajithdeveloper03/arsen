"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, LayoutGrid, ArrowUpRight } from "lucide-react";
import HeroResidential from '../assets/hero-residential.jpg';
// --- DATA CLEANING & CATEGORIZATION ---
const rawData = [
  "Capital Profit ( ERODE )", "World of Titan ( ERODE)", "JLR - Jaguar and Land Rover Show room ( JUBILEE HILLS , HYDERABAD )", "JLR - Jaguar and Land Rover Service Centre ( KOTHAGUDA , HYDERABAD )", "Crocs ( EXPRESS AVENUE , CHENNAI )", "World of Titan ( TIRUPPUR)", "Titan Eye Plus ( TIRUPPUR )", "Titan Eye Plus ( ERODE)", "Johnson Tiles ( KARUR )", "Aditya Birla - People ( PREMIER PLAZA , PIMPRI , PUNE )", "World of Titan ( PERAMBUR , CHENNAI )", "Titan Eye Plus ( PERAMBUR , CHENNAI )", "Odyssey ( TRICHY )", "Mr Venkatesh Residencial @ KK NAGAR", "Aditya Birla - People ( AMANORA MALL , PUNE )", "Aditya Birla - People ( KOLHAPUR , MAHARASTRA )", "Aditya Birla - People ( PREMIER PLAZA , PIMPRI , PUNE )", "Aditya Birla - People ( NASIK , MAHARASTRA )", "BVCPS - Bureau Veritas Consumer Product Service ( CHENNAI )", "Aditya Birla - People ( HASSAN , KARNATAKA )", "Titan Innovation Centre ( IITM , CHENNAI )", "BVCPS - Bureau Veritas Consumer Product Service ( CHENNAI )", "Titan Innovation Centre ( IITM , CHENNAI )", "Aditya Birla - People ( HUBLI , KARNATAKA )", "Aditya Birla - People ( NASIK , MAHARASTRA )", "Sargam Laboratory ( CHENNAI )", "Titan Innovation Centre ( IITM , CHENNAI )", "Aditya Birla - People ( INDRA NAGAR , BANGALORE )", "BVCPS - Bureau Veritas Consumer Product Service ( CHENNAI )", "Aditya Birla - People ( BRIGADE ROAD , BANGALORE )", "Aditya Birla - People ( JAYA NAGAR , BANGALORE )", "Asahi India ( SRIPERUMBUDUR , KANCHIPURAM )", "Fastrack ( ROYAPURAM , CHENNAI )", "Asahi India ( SRIPERUMBUPUR , KANCHIPURAM )", "Titan Industries - HELIOS ADNL ( CHENNAI )", "Titan Innovation Centre ( IITM - CHENNAI )", "Aditya birla - People ( JAYA NAGAR , BANGALORE )", "TAFE - Tractor and Form Equipments ( CHENNAI )", "Asahi India ( SRIPERUMPUDUR , KANCHIPURAM )", "Titan Area Office ( T.NAGAR )", "Titan Industries Limited ( TANISHQ , T.NAGAR )", "Aditya Birla Nuvo Ltd - People ( INDIRA NAGAR , BANGALORE )", "Aditya Birla Nuvo Ltd - People ( BRIGADE ROAD , BANGALORE )", "Aditya Birla - People ( CMH ROAD , BANGALORE )", "Titan Industries Limited ( AREA OFFICE , T.NAGAR )", "Fastrack ( CATHEDRAL ROAD , CHENNAI )", "Sargam Laboratory Pvt Ltd ( CHENNAI )", "Aditya Birla - People ( AUNDH , PUNE )", "Green Trends ( VELACHERRY , CHENNAI )", "Aditya Birla - People ( AUNDH , PUNE )", "Green Trends ( KOTTURPURAM , CHENNAI )", "Titan Industries Ltd - Area Office ( T.NAGAR )", "Aditya Birla - People ( HASSAN , KARNATAKA )", "Green Trends ( KOVILAMBAKKAM , CHENNAI )", "BVCPS - Bureau Veritas Consumer Products Services ( CHENNAI )", "Aditya Birla - People ( VIDYARANYAPURA , BANGALORE )", "Aditya Birla - People ( DAVANAGERE , BANGALORE )", "Green Trends ( R V ROAD , CHENNAI )", "Green Trends ( BANJARA HILLS , HYDERABAD )", "Aditya Birla - People ( BEL , KORAMANGALA , BANGALORE )", "Aditya Birla - People ( BANGALORE )", "Aditya Birla - People ( COMMERCIAL STREET-2 , BANGALORE )", "Fastrack ( R.K.SALAI , CHENNAI )", "Green Trends ( AOC , HYDERABAD )", "Aditya Birla - People ( WHITEFEILD , BANGALORE )", "Max Power Services ( CHENNAI )", "Green Trends ( SOUTH BOAG ROAD , CHENNAI )", "Limelite ( JAYANAGAR , BANGALORE )", "Aditya Birla - People ( GOPALAN INNOVATION MALL , BANGALORE )", "Aditya Birla - People ( J.P.NAGAR , MAINTENANCE , BANGALORE )", "Titan Company Limited ( TANISHQ GRANITE , T.NAGAR )", "Titan Company Limited ( CATHDERAL ROAD ))", "Aditya Birla - People ( FORUM VALUE MALL )", "World Of Titan ( ACS , PONDY BAZZAR - WOT )", "World Of Titan ( ACS , PONDY BAZZAR - WCC )", "World Of Titan - Electrical ( ACS , PONDY BAZZAR , WOT )", "World Of Titan - Electrical ( ACS , PONDY BAZZAR , WCC )", "Aditya Birla - People ( KORAMANGALA , BANGALORE )", "Limelite - Maintenance ( JAYANAGAR )", "Aditya Birla - People ( DAVANEGARE , BANGALORE )", "Fastrack ( TRICHY )", "Aditya Birla - People ( MG ROAD , BANGALORE )", "Green Trends ( ANNANAGAR , CHENNAI )", "World Of Titan ( PERAMBUR , CHENNAI )", "Green Trends ( PERUNGUDI , CHENNAI )", "Green Trends ( PERUMBAKKAM , CHENNAI )", "Titan Company Limited ( PONDYBAZAR , CHENNAI )", "Petrofac Engg Services (I) Pvt Ltd ( CHENNAI )", "Aditya Birla - People ( SKYWALK , CHENNAI )", "Green Trends ( ROYAPURAM , CHENNAI )", "Petrofac Engg Services (I) Pvt Ltd , 1 St Floor ( CHENNAI )", "Green Trend ( PALAKKAD , KERALA )", "Petrofac Engg Services (I) Pvt Ltd ( CHENNAI )", "Green Trends ( VIVEKANANDA NAGAR , HYDERABAD )", "Green Trends ( MOGALRAJPURAM , VIJAYAWADA )", "Green Trends ( VIVEKANANDA NAGAR , HYDERABAD )", "Green Trends ( LAKSHMI NAGAR , GUNTUR )", "Asahi India Glass Limited ( KANCHIPURAM )", "Aditya Birla - People ( YELAHANKA , BANGALORE )", "Green Trends ( SOUTH BOAG ROAD , CHENNAI )", "Aditya Birla - People ( YELAHANKA NEW TOWN , BANGALORE )", "New Designer Web Private Limited ( CHENNAI )", "Aditya Birla - People ( YELAHANKA NEW TOWN , BANGALORE )", "Fastrack ( TRICHY )", "Green Trends ( ATTAPUR , HYDERABAD )", "Dr Agarwal's Eye Hospital Ltd ( PORUR - CHENNAI )", "Dr Agarwal's Healthcare Ltd ( CHETPET , CHENNAI )", "Green Trends ( SINDHI COLONY , HYDERABAD )", "Petrofac Engg Services (I) Pvt Ltd ( CHENNAI )", "Aditya Birla - People ( INDIRANAGAR , BANGALORE )", "Dr Agarwal's Healthcare Limited ( TIRUNELVELI )", "Dr Agarwal's Eye Hospital Ltd ( CATHEDRAL ROAD , CHENNAI )", "Dr Agarwal's Healthcare Ltd ( BANNERGHATTA , BANGALORE )", "Green Trends ( KUKATPALLY , HYDERABAD )", "Dr Agarwals Healthcare Ltd ( ADAYAR )", "Green Trends ( BANASHANKARI , BANGALORE )", "Vinayaka Associates ( KOVILAMBAKKAM )", "TAFE - Tractors & Farm Equipment ( NUNGAMBAKKAM )", "Green Trends ( MANIGONDA , HYDERABAD )", "Green Trends ( KOVILAMBAKKAM , CHENNAI )", "Mr.Charls Pradeep Paul - Residential ( CHENNAI )", "Green Trends ( C.V.RAMAN NAGAR , CHENNAI )", "Green Trends ( D.D.COLONY , HYDERABAD )", "TAFE - Tractors & Farm Equipment ( R.K.SALAI )", "TAFE - Tractors & Farm Equipment ( NUNGAMBAKKAM )", "Dr Agarwal's Healthcare Ltd ( BANNERGHATTA , BANGALORE )", "Dr Agarwal's Healthcare Ltd ( ADYAR )", "Aditya Birla - People ( HASSAN )", "BVCPS - Bureau Veritas Consumer Products Services ( GUINDY , CHENNAI )", "Dr Agarwal's Healthcare Ltd ( TRIPLICANE )", "TAFE - Tractors & Farm Equipment ( NUNGAMBAKKAM )", "Green Trends ( BAGALUR ROAD , HOSUR )", "Aumento Ventures ( BANGALORE )", "I Gate Global Solutions Ltd ( CHENNAI )", "Dr Agarwal's Eye Hospital Ltd ( CHENNAI )", "Green Trends ( BANASHANKARI , BANGALORE )", "Dr Agarwal's Eye Hospital Ltd ( PORUR )", "Dr Agarwal's Eye Hospital Ltd ( ASHOKNAGAR )", "Green Trends ( KOVILAMBAKKAM , CHENNAI )", "TAFE - Tractors & Farm Equipment ( CHENNAI )", "Dr Agarwal's Eye Hospital Ltd ( ANNANAGAR )", "New Designer Web Pvt Ltd ( KRIZZ - BANGALORE )", "Trends Invogue Pvt Ltd ( HSR LAYOUT )", "New Designer Web Private Limited ( CHENNAI )", "Green Trends ( MADAMBAKKAM , CHENNAI )", "Dr Agarwal's Healthcare Ltd ( ADAYAR )", "Dr Agarwal's Eye Hospital Ltd ( PORUR )", "Dr Agarwal's Eye Institute ( BISHOP GARDEN , CHENNAI )", "Green Trends ( SINDHI COLONY , HYDERABAD )", "Green Trends (SOUTH BOAG ROAD , CHENNAI )", "Dr Agarwal's Healthcare Ltd ( WHITE FIELD , BANGALORE )", "Dr Agarwal Healthcare Ltd ( TRICHY )", "Limelite - Banashankari ( BANGALORE )", "BVCPS - Bureau Veritas Consumer Products Services ( CHENNAI )", "Aumento Ventures ( BANGALORE )", "New Designer Web Private Limited ( FISERVE - CHENNAI )", "Dr Agarwal's Eye Hospital Ltd ( GUINDY , CHENNAI )", "World Of Titan ( PERAMBUR , CHENNAI )", "TAFE - Tractors & Farm Equipment ( CHENNAI )", "Dr Agarwal's Eye Research Centre ( GREAMS ROAD , CHENNAI )", "Dr Agarwal's Eye Hospital Ltd ( PORUR )", "Trends Invogue Pvt Ltd ( JAYA NAGAR , BANGALORE )", "Vinayaka Associates ( KOVILABAKKAM & PERUMBAKKAM )", "New Designer Web Private Limited (FISERVE - CHENNAI )", "New Designer Web Private Limited ( FISERVE , MEETING TABLE - CHENNAI )", "TAFE - Tractors & Farm Equipment ( CHENNAI )", "Green Trends ( HBR LAYOUT , BANGALORE )", "Dr Agarwal's Eye Institute ( BISHOP GARDEN , CHENNAI )", "Dr Agarwal's Healthcare Ltd ( ADYAR )", "Dr Agarwal's Healthcare Ltd ( MOGAPAIR )", "Dr Agarwal's Eye Hospital Ltd ( MADURAI )", "Dr Agarwal's Healthcare Ltd ( KASBA , KOLKATA )", "Dr Agarwal's Healthcare Ltd ( WHITEFIELD , BANGALORE )", "Trends Invogue Pvt Ltd ( JEEVAN BHEEMA NAGAR )", "Opus Fashion Private Limited - Maybell ( EXPRESS AVENUE , CHENNAI )", "Dr Agarwal's Eye Insitute ( BOAT CLUB , ADYAR )", "Dr Agarwal's Eye Insitute ( POES GARDEN )", "Dr Agarwal's Eye Hospital Ltd ( ANNANAGAR )", "Green Trends ( VELLORE )", "Dr Agarwal's MD Residence ( POES GARDEN )", "Dr Agarwal's Eye Hospital Ltd ( PORUR )", "Dr Agarwal's Eye Hospital Ltd ( GREAMS ROAD , CHENNAI )", "Dr Agarwal's Eye Research Centre ( GREAMS ROAD , CHENNAI )", "Dr Agarwal's Healthcare Ltd ( INDIRANAGAR , BANGALORE )", "Opus Fashions Private Limited ( AMJIKARAI , CHENNAI )", "Nisa Enterprises ( TITAN - ROYAPURAM )", "Aditya Birla - People ( VIVERA MALL , CHENNAI )", "TAFE - Tractors & Farm Equipment ( CHENNAI )", "S S Enterprises ( KANURU , VIJAYAWADA )", "Aditya Birla - People ( VIVERA MALL , CHENNAI )", "Trends Invogue Pvt Ltd ( MURALI NAGAR , VIZAG )", "Aditya Birla - People ( VIVERA MALL , CHENNAI )", "Green Trends ( MURALI NAGAR , VIZAG )", "Oyster Projects ( CHENNAI )", "Aditya Birla - People ( VIVERA MALL - CHENNAI )", "Sai Shiva Enterprises ( GT - SARJAPUR ROAD , BANGALORE )", "Tractors & Farm Equipment ( CHENNAI )", "Cavinkare Pvt Ltd - Trends Division ( BHAVANIPURAM )", "Opus Fashions Pvt Ltd ( AMJIKARAI , CHENNAI )", "Aditya Birla - Planet Fashion ( NAVALUR , VIVERAMALL , CHENNAI )", "The Banyan (NGO) (CHENNAI)", "Aditya Birla - People ( VIVERA MALL , CHENNAI )", "Aditya Birla - People ( PHOENIX MALL , CHENNAI )", "TAFE - Tractors & Farm Equipment ( NUNGAMBAKKAM , CHENNAI )", "TAFE - Tractors & Farm Equioment ( PERAMBUR , SEMBIAM )", "Aditya Birla - People ( PHOENIX MALL , CHENNAI )", "Green Trends - Manipal County ( BANGALORE )", "Opus Fashions Private Limited ( KOVAI )", "Cavinkare Pvt Ltd - Green Trends ( VIJAYAWADA )", "Cavinkare Pvt Ltd - Green Trends ( PATTABIRAM , CHENNAI )", "Fitness One ( PATTABIRAM , CHENNAI )", "Intersteller Testing Centre Pvt Ltd ( PERUNGUDI , CHENNAI )", "Dr Agarwal's EYE Hospital Ltd ( GREAMS ROAD , CHENNAI )", "Green Trends ( SEMMANCHERY , CHENNAI )", "Green Trends ( PATTABIPURAM , GUNTUR )", "Fricon Engineers Pvt Ltd ( EKKADUTHANGAL )", "Dr Agarwal's Eye Hospital Ltd ( HOSUR )", "Dr Agarwal's Eye Hospital Ltd ( KRISHNAGIRI )", "Cavinkare Pvt Ltd - Trends Division ( LIMELITE - CHENNAI )", "Dr Agarwal's Eye Hospital Ltd ( CORPORATE OFFICE 3RD FLOOR - CHENNAI )", "Opus Fashions Private Limited ( VR MALL , CHENNAI )", "Green Trends ( PONDICHERRY )", "Green Trends ( MAMBAKKAM , CHENNAI )", "Dr Agarwal's Eye Hospital Ltd ( KORAMANGALA , BANGALORE )", "Green Trends - Renovation ( HARLUR , BANGALORE )", "Dr Agarwal's Eye Hospital Ltd ( ERODE )", "K Hotel ( PENUGONDA , ANDHRA PRADESH )", "Elixify ( Skin & hair Clinic )", "green trends (cheran ma nagar,coimbatore)", "Tafe Motors & Tractors Limited (BHOPAL)", "sundaram finance head office chennai", "Dr Aggarwal's Thanjavur", "green trends pollachi"
];

const CATEGORIES = ["All", "Residential", "Commercial", "Hospitality", "Luxe Detail"];

// Generate final clean objects
const ALL_PROJECTS = rawData.map((rawTitle, i) => {
  const cleanTitle = rawTitle.replace(/^\d+/, "").trim(); // Removes leading numbers
  
  // Dynamic Categorization
  let category = "Commercial";
  const lower = cleanTitle.toLowerCase();
  if (lower.includes("residencial") || lower.includes("residence") || lower.includes("house")) category = "Residential";
  else if (lower.includes("green trends") || lower.includes("hotel") || lower.includes("limelite") || lower.includes("crocs")) category = "Hospitality";
  else if (lower.includes("dr agarwal") || lower.includes("laboratory") || lower.includes("innovation")) category = "Luxe Detail";

  // Verified Image Selection (using keyword-based unique randoms to ensure functionality)
  const keywords = ["architecture", "interior", "office", "retail", "modern-building"];
  const keyword = keywords[i % keywords.length];
  const image = `https://images.unsplash.com/photo-${[
    "1486406146926-c627a92ad1ab", "1497366216548-37526070297c", "1497366811353-6870744d04b2", 
    "1504384308090-c894fdcc538d", "1541829070764-84a7d30dd3f3", "1582407947304-fd86f028f716",
    "1497215728101-856f4ea42174", "1512917774080-9991f1c4c750", "1556761175-4b46a572b786"
  ][i % 9]}?auto=format&fit=crop&q=60&w=800&sig=${i}`;

  return { id: i, title: cleanTitle, category, image, isLarge: i % 10 === 0 };
});

export default function ArsenArchive() {
  const [filter, setFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(20);

  const filtered = useMemo(() => 
    ALL_PROJECTS.filter(p => filter === "All" || p.category === filter),
    [filter]
  );

  const displayedProjects = filtered.slice(0, visibleCount);

  return (
    <div className="bg-[#050707] min-h-screen text-white font-sans selection:bg-[#F28C28] overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[65vh] md:h-[80vh] w-full flex items-center justify-center overflow-hidden border-b border-white/5 px-6">
        <div className="absolute inset-0 z-0">
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
            className="w-full h-full"
          >
            <img 
              src={HeroResidential} 
              alt="Arsen Heritage"
              className="w-full h-full object-cover opacity-40"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050707] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 text-center w-full max-w-5xl">
          <motion.span 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] md:text-[12px] font-black tracking-[0.4em] text-[#F28C28] uppercase block"
          >
            Project Heritage Archive
          </motion.span>
          <h1 className="text-[11vw] md:text-[9vw] font-black leading-[0.9] tracking-tighter mt-6 uppercase">
            Completed <br /> 
            <span className="text-outline text-transparent italic" style={{ WebkitTextStroke: '1.5px #fff' }}>
              Masterpieces
            </span>
          </h1>
        </div>
      </section>

      {/* 2. FILTER NAVIGATION */}
      <nav className="sticky top-0 z-[100] bg-[#050707]/90 backdrop-blur-xl border-b border-white/5 py-6">
        <div className="max-w-[1600px] mx-auto px-4 md:px-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="w-full md:w-auto overflow-x-auto no-scrollbar">
            <div className="flex gap-2 p-1 bg-white/5 rounded-full border border-white/10 w-max">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setFilter(cat); setVisibleCount(20); }}
                  className={`px-6 py-2 rounded-full text-[14px] font-black uppercase tracking-widest transition-all ${
                    filter === cat ? "bg-[#F28C28] text-black" : "text-white/40 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 text-[14px] font-bold uppercase tracking-[0.2em] text-white/30">
            <LayoutGrid size={14} /> 
            <span>{filtered.length} Projects Loaded</span>
          </div>
        </div>
      </nav>

      {/* 3. GRID MATRIX */}
      <section className="max-w-[1600px] mx-auto px-4 md:px-10 py-12 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[400px]">
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`group relative rounded-3xl overflow-hidden bg-[#0F1111] border border-white/5 ${
                  project.isLarge ? "lg:col-span-2" : ""
                }`}
              >
                <div className="absolute top-6 right-6 z-20 p-2 rounded-full bg-black/50 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={18} />
                </div>

                <div className="h-[55%] w-full overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=60&w=800"; }}
                  />
                </div>

                <div className="p-8 h-[45%] flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-black text-[#F28C28] tracking-[0.2em] uppercase">
                      Archive #{project.id + 1}
                    </span>
                    <h3 className="text-lg font-bold uppercase tracking-tight mt-1 line-clamp-2">
                      {project.title}
                    </h3>
                  </div>
                  <div className="text-[10px] font-bold text-white/30 my-3 uppercase tracking-[0.3em]">
                    {project.category}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 4. LOAD MORE */}
        {visibleCount < filtered.length && (
          <div className="mt-20 flex justify-center">
            <button 
              onClick={() => setVisibleCount(prev => prev + 24)}
              className="group flex items-center gap-6 px-12 py-6 rounded-full bg-white text-black font-black uppercase tracking-[0.3em] transition-all hover:bg-[#F28C28]"
            >
              Load More Projects
              <Plus size={20} className="group-hover:rotate-90 transition-transform" />
            </button>
          </div>
        )}
      </section>

      <style jsx>{`
        .text-outline { -webkit-text-stroke: 1px rgba(255,255,255,0.3); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}