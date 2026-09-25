import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Send, CheckCircle2, Lock } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

export const ModernizeCTA: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: '',
    location: '',
    source: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const msg = `*Geeta Solars - New Website Enquiry*%0A%0A*Name:* ${formData.fullName}%0A*Phone:* ${formData.phone}%0A*Email:* ${formData.email || 'N/A'}%0A*Service:* ${formData.service || 'General Solar Enquiry'}%0A*Location:* ${formData.location || 'N/A'}%0A*Source:* ${formData.source || 'Website'}%0A*Message:* ${formData.message || 'Interested in solar installation'}`;
    
    // Open WhatsApp in new tab
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${msg}`, '_blank');
  };

  return (
    <section id="quote" className="relative py-16 lg:py-24 bg-gradient-to-r from-[#991B1B] via-[#B91C1C] to-[#7F1D1D] text-white overflow-hidden">
      
      {/* Subtle Grid Lines Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading, Subtitle & Checklist */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-red-200 font-bold text-xs uppercase tracking-widest">
              &bull; GET STARTED WITH GEETA SOLARS
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.12]">
              Ready to Slash Your <br />
              Electricity Bills with Solar?
            </h2>

            <p className="text-red-100/90 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
              Visit our store near Old Railway Station, Kothavalasa or request a free on-site roof survey. Get customized solar design and direct government subsidy processing under PM Surya Ghar.
            </p>

            {/* Checklist */}
            <div className="space-y-3 pt-2">
              {['Free On-Site Rooftop Feasibility Survey', 'Direct ₹78,000 Central Govt Subsidy Support', 'Authorised Tier-1 Modules & 25-Yr Linear Warranty'].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-white">
                  <div className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Send an Enquiry Card (Red Theme) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-900 border border-slate-100"
          >
            <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-950 mb-5 tracking-tight">
              Send an Enquiry
            </h3>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-slate-900 text-base">
                  Thank You for Your Enquiry!
                </h4>
                <p className="text-xs text-slate-600">
                  Our solar engineering team in Kothavalasa will connect with you on WhatsApp shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="btn-red text-xs py-2.5 px-6 mt-2 shadow-md"
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Row 1: Full Name & Phone Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-red-600 focus:bg-white transition-all placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 82649 99691"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-red-600 focus:bg-white transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Row 2: Email Address & Service of Interest */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="yourname@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-red-600 focus:bg-white transition-all placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Service of Interest
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-red-600 focus:bg-white transition-all"
                    >
                      <option value="">Select a service...</option>
                      <option value="Residential Rooftop Solar (PM Surya Ghar)">Residential Rooftop Solar (PM Surya Ghar)</option>
                      <option value="Commercial & Institutional Solar">Commercial &amp; Institutional Solar</option>
                      <option value="Solar Home Lighting & Inverter Systems">Solar Home Lighting &amp; Inverter Systems</option>
                      <option value="Industrial Solar & Agro Solutions">Industrial Solar &amp; Agro Solutions</option>
                      <option value="Solar Water Heater & Pumps">Solar Water Heater &amp; Pumps</option>
                      <option value="Solar Panel Cleaning & Maintenance">Solar Panel Cleaning &amp; Maintenance</option>
                    </select>
                  </div>
                </div>

                {/* Row 3: Location & How did you hear about us? */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="Your City/Area"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-red-600 focus:bg-white transition-all placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      How did you hear about us?
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Google, Friend, Social M"
                      value={formData.source}
                      onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-red-600 focus:bg-white transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Row 4: Message */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={3}
                    placeholder="How can we help you with solar?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-red-600 focus:bg-white transition-all placeholder:text-slate-400 resize-none"
                  />
                </div>

                {/* Submit Button (Signature Red Theme) */}
                <button
                  type="submit"
                  className="btn-red w-full py-3.5 px-6 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-red-600/25 hover:bg-red-700 transition-all hover:scale-[1.01] active:scale-[0.99] mt-2"
                >
                  <span>SUBMIT ENQUIRY</span>
                  <Send className="w-4 h-4" />
                </button>

                {/* Privacy note */}
                <div className="text-center text-[10px] text-slate-400 pt-1 flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3 text-slate-400" />
                  <span>Your information is safe with us &bull; Instant WhatsApp proposal</span>
                </div>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ModernizeCTA;
