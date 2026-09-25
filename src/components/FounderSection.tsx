import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Sparkles, CheckCircle2, PhoneCall, Quote } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

interface FounderSectionProps {
  onOpenQuote?: () => void;
}

export const FounderSection: React.FC<FounderSectionProps> = ({ onOpenQuote }) => {
  return (
    <section id="leadership" className="py-20 lg:py-28 bg-[#FAF7F2] text-slate-900 overflow-hidden border-b border-[#E7DFD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200 text-xs font-bold uppercase tracking-wider text-red-700">
            <Sparkles className="w-3.5 h-3.5 text-red-600" />
            <span>LEADERSHIP &amp; VISION</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Meet Our <span className="text-red-600">Founder &amp; CEO</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed max-w-2xl mx-auto">
            Pioneering reliable, institutional-grade solar rooftop installations and PM Surya Ghar subsidies across Andhra Pradesh &amp; Telangana.
          </p>
        </div>

        {/* Executive Profile Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#E7DFD3] shadow-[0_20px_50px_-15px_rgba(45,35,20,0.08)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Founder Photo Frame (Small & Round) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-4 flex flex-col items-center justify-center text-center space-y-4"
            >
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-white shadow-2xl ring-4 ring-red-500/20 bg-slate-900 group flex-shrink-0 mx-auto">
                {/* Founder Image */}
                <img
                  src="/images/founder.jpg"
                  onError={(e) => {
                    // Fallback to high quality portrait if local file isn't placed yet
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop';
                  }}
                  alt="Founder & CEO - Geeta Solars"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Leadership Badge beneath circular avatar */}
              <div className="space-y-1 max-w-xs">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-red-700 uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-red-600" />
                  <span>Founder &amp; MD</span>
                </div>
                <h3 className="font-display font-black text-xl text-slate-950">
                  {COMPANY_INFO.name} Leadership
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  12+ Years Solar Engineering Mastery
                </p>
              </div>

              {/* Decorative Red Glow */}
              <div className="absolute w-32 h-32 bg-red-600/10 rounded-full -z-10 blur-xl pointer-events-none" />
            </motion.div>

            {/* Right Column: Founder Story & Credentials */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Quote Box - Hidden on mobile, visible on laptop (md+) */}
              <div className="hidden md:block relative p-6 sm:p-7 rounded-3xl bg-[#FAF7F2] border border-[#E7DFD3] space-y-3">
                <Quote className="w-8 h-8 text-red-600/30 -mb-2" />
                <p className="text-slate-800 text-sm sm:text-base sm:leading-relaxed font-semibold italic">
                  "Our core mission at Geeta Solars is to make clean, abundant solar electricity affordable and hassle-free for every family and commercial business across Andhra Pradesh &amp; Telangana. We treat every rooftop with institutional engineering precision, zero shortcuts, and a 25-year commitment."
                </p>
                <div className="pt-2 flex items-center justify-between">
                  <div className="text-xs font-extrabold text-red-600 uppercase tracking-widest">
                    — Founder's Commitment
                  </div>
                  <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Direct Executive Oversight</span>
                  </div>
                </div>
              </div>

              {/* 4 Pillars of Leadership */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="p-4 rounded-2xl bg-white border border-[#E7DFD3] flex items-start gap-3.5 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0 font-bold">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                      12+ Years Industry Experience
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                      Extensive field expertise across thousands of KW installations.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#E7DFD3] flex items-start gap-3.5 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0 font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                      PM Surya Ghar Partner
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                      Guaranteed ₹78,000 DBT direct central subsidy processing.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#E7DFD3] flex items-start gap-3.5 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0 font-bold">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                      Cyclone-Proof Engineering
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                      Heavy-duty hot-dip galvanized mounting built for coastal winds.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#E7DFD3] flex items-start gap-3.5 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0 font-bold">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                      Dedicated Local AMC Team
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                      Fast on-site service support in Kothavalasa &amp; Vizianagaram.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Row */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onOpenQuote}
                  className="btn-red px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg shadow-red-600/20 flex items-center gap-2 hover:bg-red-700 transition-colors"
                >
                  <span>Request Founder Consultation</span>
                  <PhoneCall className="w-4 h-4" />
                </button>

                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="px-6 py-3.5 rounded-full border border-[#E7DFD3] bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex items-center gap-2"
                >
                  <span>Direct Call: {COMPANY_INFO.phone}</span>
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default FounderSection;
