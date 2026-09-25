import React from 'react';
import { motion } from 'framer-motion';
import { STATS_STRIP } from '../data/content';

export const Stats: React.FC = () => {
  return (
    <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 mb-14 lg:mb-20">
      {/* 4 Separate Dark Rounded Cards with Theme Red Numbers (Matching Reference Design 2) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {STATS_STRIP.map((stat, idx) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="group relative bg-[#0B1120] border border-slate-800/90 hover:border-red-500/50 rounded-2xl sm:rounded-3xl py-7 sm:py-9 px-4 sm:px-6 flex flex-col items-center justify-center text-center shadow-[0_15px_35px_-8px_rgba(11,17,32,0.35)] transition-all duration-300 overflow-hidden"
          >
            {/* Subtle top red highlight line on hover */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-red-600/0 group-hover:bg-red-600 rounded-full transition-all duration-300" />

            {/* Big Bold Red Metric */}
            <div className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-red-500 tracking-tight leading-none mb-2 sm:mb-2.5">
              {stat.value}
            </div>

            {/* Uppercase White/Slate Subtitle */}
            <div className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-slate-300 group-hover:text-white transition-colors">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};


