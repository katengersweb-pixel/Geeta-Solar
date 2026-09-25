import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowUpRight, Zap } from 'lucide-react';

interface ExecutionStandardsProps {
  onOpenQuote?: () => void;
}

export const ExecutionStandards: React.FC<ExecutionStandardsProps> = ({ onOpenQuote }) => {
  return (
    <section id="government-initiative" className="py-16 lg:py-24 bg-white text-slate-900 overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Government Initiative Typography & Checklist */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7">
            
            {/* Red Pill Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-extrabold uppercase tracking-wider"
            >
              <Zap className="w-3.5 h-3.5 text-red-600 fill-red-600 flex-shrink-0" />
              <span>GOVERNMENT INITIATIVE</span>
            </motion.div>

            {/* Main Heading: PM Surya Ghar (dark) + Muft Bijli Yojana (Red 600) */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-tight flex flex-col gap-1"
            >
              <span className="block">PM Surya Ghar</span>
              <span className="block text-red-600">Muft Bijli Yojana</span>
            </motion.h2>

            {/* Supporting Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-xl"
            >
              Empower your home with free electricity through the Prime Minister's flagship solar scheme. Get significant subsidies and reduce your electricity bill to zero.
            </motion.p>

            {/* 3 Checklist Items with Red Circular Checkmarks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-3.5 pt-1"
            >
              {/* Item 1 */}
              <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-800">
                <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Up to 300 units of free electricity per month</span>
              </div>

              {/* Item 2 */}
              <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-800">
                <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Massive government subsidies up to ₹78,000</span>
              </div>

              {/* Item 3 */}
              <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-800">
                <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Easy application and approval process</span>
              </div>
            </motion.div>

            {/* Signature Red Pill Action Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-2 flex flex-wrap items-center gap-4"
            >
              <a
                href="https://pmsuryaghar.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-red text-xs font-bold uppercase tracking-wider px-8 py-4 flex items-center gap-2 shadow-lg shadow-red-600/20 hover:bg-red-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>VIEW OFFICIAL PORTAL</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              {onOpenQuote && (
                <button
                  type="button"
                  onClick={onOpenQuote}
                  className="btn-outline text-xs px-7 py-3.5 font-bold"
                >
                  Apply via Geeta Solars
                </button>
              )}
            </motion.div>

          </div>

          {/* Right Column: PM Surya Ghar Poster Graphic Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] sm:aspect-[1/1] bg-slate-900 border border-slate-100 flex flex-col justify-between group">
              
              {/* User-Uploaded PM Narendra Modi Solar Photo */}
              <img
                src="/pm-modi-solar.jpg"
                alt="PM Narendra Modi - PM Surya Ghar Muft Bijli Yojana"
                className="absolute inset-0 w-full h-full object-cover object-top sm:object-center group-hover:scale-105 transition-transform duration-700"
              />

              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-slate-950/10" />

              {/* Top Row: Official Subsidy Badge */}
              <div className="relative z-10 p-4 sm:p-6 flex items-start justify-end">
                
                {/* Official Subsidy Badge Card with Red Highlight */}
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 shadow-xl border border-red-100 text-center space-y-0.5 max-w-[170px]">
                  <div className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-red-700 leading-tight">
                    PM SURYA GHAR MUFT BIJLI YOJANA
                  </div>
                  <div className="text-[9px] font-extrabold uppercase text-slate-500 pt-0.5">
                    GET UPTO
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-red-600 font-display tracking-tight leading-none my-0.5">
                    ₹78,000
                  </div>
                  <div className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-slate-900">
                    SUBSIDY*
                  </div>
                </div>

              </div>

              {/* Bottom Dark Banner Overlay */}
              <div className="relative z-10 p-5 sm:p-6 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent text-white space-y-1">
                <h4 className="font-display font-black text-lg sm:text-xl text-white tracking-tight">
                  Join 1 Crore+ Households
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                  Benefiting from sustainable solar energy and massive government subsidies.
                </p>
                <div className="text-[11px] font-bold text-red-400 uppercase tracking-wider pt-0.5">
                  Under PM Surya Ghar Muft Bijli Yojana
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ExecutionStandards;
