import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Clock, ShieldCheck, Leaf } from 'lucide-react';
import { WHY_CHOOSE_US } from '../data/content';

export const WhyChooseUs: React.FC = () => {
  const iconMap = {
    document: FileText,
    clock: Clock,
    shield: ShieldCheck,
    leaf: Leaf,
  };

  return (
    <section id="why-choose-us" className="py-16 lg:py-24 bg-white text-slate-900 border-b border-slate-100 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="space-y-3 mb-12 sm:mb-16">
          <div className="text-red-600 font-bold text-xs uppercase tracking-widest flex items-center gap-1.5">
            <span>—</span>
            <span>WHY CHOOSE US</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Institutional Confidence &amp; Flawless Execution
          </h2>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((item, idx) => {
            const IconComp = iconMap[item.icon as keyof typeof iconMap] || FileText;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-lg hover:border-red-200 transition-all duration-300 space-y-4"
              >
                {/* Light Red Round Icon Container */}
                <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
                  <IconComp className="w-6 h-6" />
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-display font-black text-base sm:text-lg text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
