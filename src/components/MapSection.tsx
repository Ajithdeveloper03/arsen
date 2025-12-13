import React from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import map from "../assets/map.png"; 

export default function MapSection() {
  const mapImg = map;

  // Coordinates calibrated for a standard India map aspect ratio.
  // These ensure relative positions (North/South/East/West) are correct.
  const locations = [
    { name: "Chandigarh", top: "13%", left: "33%" }, 
    { name: "Delhi", top: "20%", left: "34%" },      
    { name: "Jaipur", top: "29%", left: "28%" },     
    { name: "Ahmedabad", top: "43%", left: "20%" },  
    { name: "Mumbai", top: "58%", left: "23%" },     
    { name: "Pune", top: "62%", left: "26%" },       
    { name: "Hyderabad", top: "60%", left: "45%" },  
    { name: "Bangalore", top: "71%", left: "43%" },  
    { name: "Chennai", top: "78%", left: "43%" },    
    { name: "Kolkata", top: "42%", left: "72%" },    
  ];

  return (
    <section className="py-24 bg-[#16697A] overflow-hidden relative">
      {/* Background subtle gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#135b69] to-[#16697A] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-36 items-center relative z-10">
        
        {/* LEFT: MAP CONTAINER */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative flex justify-center items-center"
        >
          <div className="relative w-full max-w-[550px] aspect-[0.85]"> 
            {/* MAP IMAGE */}
            <img
              src={mapImg}
              alt="India Map"
              className="w-full h-full object-contain opacity-90 drop-shadow-2xl"
            />

            {/* PINS */}
            {locations.map((loc, i) => (
              <motion.div
                key={i}
                className="absolute group"
                style={{ top: loc.top, left: loc.left }}
                initial={{ scale: 0, opacity: 0, y: 20 }}
                whileInView={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.3 + (i * 0.15), // Sequential delay for "pop-up" effect
                  type: "spring",
                  stiffness: 300,
                  damping: 15
                }}
                viewport={{ once: true }}
              >
                {/* Interactive Area Wrapper */}
                <div className="relative -translate-x-1/2 -translate-y-1/2 mt-4 bottom-0 cursor-pointer">
                  
                  {/* Pulsing Ring Effect */}
                  <div className="absolute inset-0 bg-[#FFA62B] rounded-full animate-ping opacity-20 delay-75" />
                  
                  {/* The Pin Icon */}
                  <MapPin 
                    className="w-6 h-6 md:w-8 md:h-8 text-[#FFA62B] drop-shadow-lg transition-transform duration-300 group-hover:-translate-y-2" 
                    fill="#16697A" 
                  />

                  {/* Floating Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 pointer-events-none z-20">
                    <div className="bg-white text-[#16697A] text-xs md:text-sm font-bold py-1.5 px-4 rounded-lg shadow-xl whitespace-nowrap relative border border-gray-100">
                      {loc.name}
                      {/* Triangle Arrow */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT: TEXT CONTENT */}
        <motion.div 
          className="text-center md:text-left text-white space-y-8"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div>
            <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
              Our Presence
            </h2>
            <div className="h-1.5 w-24 bg-[#FFA62B] rounded-full mx-auto md:mx-0" />
          </div>
          
          <div className="space-y-4">
            <p className="text-2xl text-white/95 font-semibold">
              Serving <span className="text-[#FFA62B]">10+ States</span> Across India
            </p>
            <p className="text-lg text-white/80 font-medium leading-relaxed max-w-md mx-auto md:mx-0">
              Delivering excellence across the nation with a robust network that ensures quality execution in every major hub.
            </p>
          </div>

          {/* Quick Stats Badges */}
          <div className="grid grid-cols-2 gap-4 pt-4 max-w-md mx-auto md:mx-0">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl">
              <h4 className="text-3xl font-bold text-[#FFA62B]">15+</h4>
              <p className="text-sm text-white/80 font-medium">Active Cities</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl">
              <h4 className="text-3xl font-bold text-[#FFA62B]">500+</h4>
              <p className="text-sm text-white/80 font-medium">Projects Done</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}