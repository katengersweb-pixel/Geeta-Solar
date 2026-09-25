import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, ShieldCheck } from 'lucide-react';
import { calculateSolarSavings } from '../data/content';

interface SolarSavingsCalculatorProps {
  onClaimQuote?: (bill: number) => void;
}

export const SolarSavingsCalculator: React.FC<SolarSavingsCalculatorProps> = ({ onClaimQuote }) => {
  const [propertyType, setPropertyType] = useState<'Residential' | 'Commercial' | 'Industrial'>('Residential');
  const [monthlyBill, setMonthlyBill] = useState<number>(2000);

  const result = calculateSolarSavings({
    monthlyBill,
    propertyType,
  });

  const billPresets = [
    { label: '₹1,500', value: 1500 },
    { label: '₹2,000', value: 2000 },
    { label: '₹3,500', value: 3500 },
    { label: '₹5,000', value: 5000 },
    { label: '₹8,000', value: 8000 },
    { label: '₹12,000', value: 12000 },
  ];

  return (
    <section id="calculator" className="py-16 lg:py-24 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="text-red-600 font-bold text-xs uppercase tracking-widest">
            &bull; PLAN YOUR INVESTMENT
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
            Instantiate Solar Generation &amp; Annual ROI
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-normal max-w-2xl mx-auto leading-relaxed">
            Estimate your required solar system capacity, automatically calculated rooftop area, annual savings, and government subsidy benefits.
          </p>
        </div>

        {/* 2-Column Calculator Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Input Card (lg:col-span-6) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 flex flex-col justify-between"
          >
            <div className="space-y-6">
              {/* Property Tabs */}
              <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-xl">
                {(['Residential', 'Commercial', 'Industrial'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setPropertyType(t)}
                    className={`py-2 text-xs font-bold rounded-lg transition-all ${
                      propertyType === t
                        ? 'bg-red-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Monthly Electricity Bill Input */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                  <span>Monthly Electricity Bill</span>
                  <span className="text-slate-400 font-normal">/ month</span>
                </div>
                
                <div className="relative rounded-xl border border-slate-200 bg-slate-50/70 flex items-center px-4 py-3.5 focus-within:border-red-600 focus-within:bg-white transition-all">
                  <span className="text-slate-900 font-bold text-lg mr-2">₹</span>
                  <input
                    type="number"
                    value={monthlyBill}
                    onChange={(e) => setMonthlyBill(Number(e.target.value) || 0)}
                    className="w-full bg-transparent text-slate-900 font-extrabold text-xl focus:outline-none"
                    min="500"
                    step="500"
                  />
                </div>

                <input
                  type="range"
                  min="1000"
                  max="50000"
                  step="500"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(Number(e.target.value))}
                  className="w-full accent-red-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />

                {/* Quick Selection Buttons */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {billPresets.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setMonthlyBill(preset.value)}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all ${
                        monthlyBill === preset.value
                          ? 'bg-red-50 border-red-500 text-red-700 font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Red Calculate Savings Button */}
            <button
              type="button"
              onClick={() => onClaimQuote?.(monthlyBill)}
              className="btn-red w-full mt-8 py-3.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:bg-red-700 transition-colors"
            >
              <span>Calculate Savings &amp; Get Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Right Results Card (lg:col-span-6) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 flex flex-col justify-between space-y-6"
          >
            <div>
              {/* Top Row: Estimated Results */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <div className="flex items-center gap-1.5 text-xs font-bold text-red-600">
                  <Clock className="w-4 h-4" />
                  <span>Estimated Results</span>
                </div>
              </div>

              {/* Big Highlight: Estimated Annual Savings */}
              <div className="py-6 space-y-1">
                <div className="font-display font-black text-4xl sm:text-5xl text-red-600 tracking-tight">
                  ₹ {result.annualSavings.toLocaleString('en-IN')}
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Estimated Annual Savings
                </div>
              </div>

              {/* 4 Sub-Metrics Grid */}
              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                <div>
                  <div className="font-display font-black text-2xl sm:text-3xl text-slate-900">
                    {result.systemSizeKw} kW
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">
                    Recommended System Size
                  </div>
                </div>

                <div>
                  <div className="font-display font-black text-2xl sm:text-3xl text-slate-900">
                    {result.annualGenerationKwh.toLocaleString('en-IN')} units
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">
                    Estimated Annual Generation
                  </div>
                </div>

                <div>
                  <div className="font-display font-black text-2xl sm:text-3xl text-slate-900">
                    ~{result.requiredRoofAreaSqFt} sq ft
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">
                    Required Shadow-Free Roof
                  </div>
                </div>

                <div>
                  <div className="font-display font-black text-2xl sm:text-3xl text-slate-900">
                    {result.paybackYears} - {Math.round((result.paybackYears + 1) * 10) / 10} yrs
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">
                    Estimated Payback Period
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-red-50 text-red-800 text-xs flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span>Includes 25-year tier-1 module linear performance warranty &amp; PM Surya Ghar ₹78,000 subsidy eligibility.</span>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
