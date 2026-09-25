import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2, ArrowRight, ArrowLeft, RotateCcw } from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '../data/content';

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNextStep = () => {
    setActiveStep((prev) => (prev + 1) % HOW_IT_WORKS_STEPS.length);
  };

  const handlePrevStep = () => {
    setActiveStep((prev) => Math.max(0, prev - 1));
  };

  const currentStepData = HOW_IT_WORKS_STEPS[activeStep] || HOW_IT_WORKS_STEPS[0];

  return (
    <section id="how-it-works" className="relative py-14 sm:py-20 lg:py-28 bg-[#FAF7F2]/50 text-slate-900 overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-16">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-bold uppercase tracking-wider text-red-700">
              <Sparkles className="w-3.5 h-3.5 text-red-600" />
              <span>4-STEP WORKFLOW</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-slate-950">
              Solar Made <span className="text-red-600">Effortless.</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-600 max-w-md font-normal leading-relaxed">
            From initial shadow assessment to APEPDCL net-meter grid synchronization, our end-to-end process ensures complete peace of mind.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 1. DESKTOP INTERFACE (hidden on mobile, visible md+) - 100% UNCHANGED     */}
        {/* ========================================================================= */}
        <div className="hidden md:block">
          {/* Process Steps Connected Line (Desktop & Tablet) */}
          <div className="relative mb-10 sm:mb-14">
            {/* Background Connecting Line */}
            <div className="absolute top-6 left-8 right-8 h-[2px] bg-slate-200 hidden sm:block z-0" />
            
            {/* Active Animated Red Progress Line */}
            <motion.div
              className="absolute top-6 left-8 h-[2px] bg-red-600 hidden sm:block z-0 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: activeStep / (HOW_IT_WORKS_STEPS.length - 1) }}
              transition={{ duration: 0.4 }}
              style={{ width: 'calc(100% - 4rem)' }}
            />

            {/* 4 Step Number Circles + Labels */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 relative z-10">
              {HOW_IT_WORKS_STEPS.map((step, idx) => {
                const isActive = activeStep === idx;
                const isPast = activeStep >= idx;

                return (
                  <button
                    key={step.step}
                    onClick={() => setActiveStep(idx)}
                    className="flex flex-col items-center text-center group cursor-pointer p-2 focus:outline-none transition-transform"
                  >
                    <div
                      className={`w-12 h-12 sm:w-13 sm:h-13 rounded-full flex items-center justify-center font-display font-black text-sm transition-all duration-300 border-2 ${
                        isActive
                          ? 'bg-red-600 text-white border-red-600 scale-110 shadow-lg shadow-red-600/30'
                          : isPast
                          ? 'bg-red-50 text-red-600 border-red-200'
                          : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {step.step}
                    </div>
                    <span
                      className={`text-[11px] sm:text-xs font-bold uppercase tracking-wider mt-3 leading-tight transition-colors ${
                        isActive ? 'text-red-600' : 'text-slate-600 group-hover:text-slate-900'
                      }`}
                    >
                      {step.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Step Detail Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200/90 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.07)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Step Content & Information */}
              <div className="lg:col-span-6 space-y-5">
                <div className="flex items-center gap-3">
                  <span className="font-display text-3xl sm:text-4xl font-black text-red-600">
                    Step {currentStepData.step}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-950 tracking-tight">
                  {currentStepData.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  {currentStepData.description}
                </p>

                {/* Callout Box with Checkmark */}
                <div className="p-4 rounded-2xl bg-red-50/70 border border-red-100 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-slate-800 font-medium">
                    {currentStepData.detail}
                  </p>
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center gap-3 pt-3">
                  <button
                    disabled={activeStep === 0}
                    onClick={handlePrevStep}
                    className="px-5 py-2.5 rounded-full border border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </button>

                  <button
                    onClick={handleNextStep}
                    className="btn-red px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md"
                  >
                    <span>{activeStep === HOW_IT_WORKS_STEPS.length - 1 ? 'Start Over' : 'Next Step'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Column: Step Image Showcase */}
              <div className="lg:col-span-6 relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35 }}
                    className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/10] shadow-xl bg-slate-900 border border-slate-100"
                  >
                    <img
                      src={currentStepData.image}
                      alt={currentStepData.title}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-semibold px-3.5 py-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 w-fit">
                      Verified Execution Standard
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. MOBILE SINGLE-STEP INTERFACE (visible ONLY on mobile <768px)           */}
        {/* Shows Step 1 with Next button to advance: Step 1 -> Step 2 -> 3 -> 4       */}
        {/* ========================================================================= */}
        <div className="block md:hidden">
          {/* Step Progress Pill Indicator Bar */}
          <div className="flex items-center justify-between gap-2 mb-4 bg-white/80 backdrop-blur-sm border border-[#E7DFD3] rounded-2xl p-3 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full uppercase tracking-wider">
                STEP {currentStepData.step} of 04
              </span>
            </div>
            
            {/* 4 Step Dots / Progress Bars */}
            <div className="flex items-center gap-1.5">
              {HOW_IT_WORKS_STEPS.map((s, idx) => (
                <button
                  key={s.step}
                  onClick={() => setActiveStep(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeStep === idx
                      ? 'w-6 bg-red-600'
                      : activeStep > idx
                      ? 'w-2 bg-red-300'
                      : 'w-2 bg-slate-200'
                  }`}
                  aria-label={`Go to step ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Current Step Card */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E7DFD3] shadow-[0_15px_35px_-10px_rgba(45,35,20,0.1)] space-y-4">
            
            {/* Step Title Header */}
            <div>
              <h3 className="font-display font-black text-lg text-slate-950 tracking-tight leading-snug">
                {currentStepData.title}
              </h3>
            </div>

            {/* Step Image */}
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-900 shadow-md border border-slate-100">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeStep}
                  src={currentStepData.image}
                  alt={currentStepData.title}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="w-full h-full object-cover object-center"
                />
              </AnimatePresence>
              <div className="absolute bottom-2.5 left-2.5 text-[10px] font-bold text-white px-2.5 py-0.5 rounded-lg bg-black/65 backdrop-blur-md border border-white/10">
                Verified Standard
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {currentStepData.description}
            </p>

            {/* Callout Detail Box */}
            <div className="p-3.5 rounded-2xl bg-red-50/70 border border-red-100 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-slate-800 font-semibold leading-snug">
                {currentStepData.detail}
              </p>
            </div>

            {/* Mobile Next / Previous Action Buttons */}
            <div className="flex items-center gap-2.5 pt-2">
              {activeStep > 0 && (
                <button
                  onClick={handlePrevStep}
                  className="px-4 py-3 rounded-full border border-slate-200 bg-slate-50 text-slate-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all active:scale-95"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Prev</span>
                </button>
              )}

              <button
                onClick={handleNextStep}
                className="btn-red flex-1 py-3 px-5 rounded-full text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-red-600/25 active:scale-95 transition-all"
              >
                {activeStep === HOW_IT_WORKS_STEPS.length - 1 ? (
                  <>
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restart (Step 01)</span>
                  </>
                ) : (
                  <>
                    <span>Next: Step 0{activeStep + 2}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
