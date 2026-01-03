import { motion } from "framer-motion";

interface Props {
  badge: string;
  title: string;
  subtitle: string;
  image: string;
}

export default function PageHero({ badge, title, subtitle, image }: Props) {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="absolute inset-0">
        <img src={image} className="w-full h-full object-cover opacity-20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-28">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[#0F766E] font-semibold uppercase tracking-widest"
        >
          {badge}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-[#0B3C5D] mt-4"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-600 max-w-2xl mt-6 text-lg"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
}
