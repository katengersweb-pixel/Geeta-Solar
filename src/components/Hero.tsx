import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Zap } from 'lucide-react';
import { HERO_DATA } from '../data/content';

interface HeroProps {
  onOpenQuote: () => void;
  onExploreSolutions?: () => void;
  heroImage?: string;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote, onExploreSolutions, heroImage }) => {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const activeImage = heroImage || HERO_DATA.featuredCard.image;

  return (
    <section id="home" className="relative pt-12 pb-16 lg:pt-16 lg:pb-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column: Typography & Actions */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7">
            
            {/* Red Pill Badge: Clean Zap Icon + Text */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold"
            >
              <Zap className="w-3.5 h-3.5 text-red-600 fill-red-600 flex-shrink-0" />
              <span>{HERO_DATA.badge}</span>
            </motion.div>

            {/* Main Heading: Equal spacing between lines */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl xl:text-6xl font-black text-slate-950 tracking-tight leading-tight flex flex-col gap-1.5 sm:gap-2.5"
            >
              <span className="block">Powering</span>
              <span className="block text-red-600">Andhra Pradesh &amp; Telangana</span>
              <span className="block">with Clean Solar Energy</span>
            </motion.h1>

            {/* Supporting Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl font-normal pt-1"
            >
              {HERO_DATA.paragraph}
            </motion.p>

            {/* Action Buttons Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-1"
            >
              {/* Solid Red Pill Button */}
              <button
                onClick={onOpenQuote}
                className="btn-red text-xs sm:text-sm font-bold uppercase tracking-wider px-7 py-3.5 flex items-center gap-2 shadow-lg shadow-red-600/20 hover:bg-red-700 transition-colors"
              >
                <span>Get Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* White Outline Button */}
              <button
                onClick={onExploreSolutions || (() => handleScrollTo('solutions'))}
                className="btn-outline text-xs sm:text-sm font-bold px-7 py-3.5"
              >
                Explore Solutions
              </button>
            </motion.div>

            {/* 3 Checklist Items below buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-6 pt-3 text-xs sm:text-sm font-bold text-slate-700"
            >
              {HERO_DATA.checkpoints.map((cp) => (
                <div key={cp} className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>{cp}</span>
                </div>
              ))}
            </motion.div>

          </div>

          {/* Right Hero Column: Large Photography Card with Bottom Overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] sm:aspect-[16/11] bg-slate-900 group">
              {/* Photography Image */}
              <img
                src={activeImage}
                alt="Geeta Solars Rooftop System"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />

              {/* Bottom Gradient Overlay Box */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white flex items-end justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-display font-black text-lg sm:text-2xl text-white leading-snug">
                    {HERO_DATA.featuredCard.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-medium">
                    {HERO_DATA.featuredCard.tags}
                  </p>
                </div>

                {/* Round White Arrow Button */}
                <button
                  onClick={onOpenQuote}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white text-slate-900 hover:bg-red-600 hover:text-white flex items-center justify-center transition-all flex-shrink-0 shadow-lg"
                  aria-label="View Solutions"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
