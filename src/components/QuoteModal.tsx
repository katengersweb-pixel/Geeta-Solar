import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, PhoneCall, Sparkles, Send } from 'lucide-react';
import { LOCATIONS_LIST, COMPANY_INFO } from '../data/content';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialBill?: number;
  selectedProduct?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  initialBill = 3000,
  selectedProduct = '',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: LOCATIONS_LIST[0],
    monthlyBill: initialBill,
    service: selectedProduct || 'PM Surya Ghar Residential Rooftop (₹78k Subsidy)',
    roofType: 'Flat Concrete RCC Roof',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  // Sync initial props
  useEffect(() => {
    if (initialBill) setFormData((prev) => ({ ...prev, monthlyBill: initialBill }));
    if (selectedProduct) setFormData((prev) => ({ ...prev, service: selectedProduct }));
  }, [initialBill, selectedProduct]);

  // Lock background body scroll when open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const message = `*Geeta Solars - Free Solar Quote Request*%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Email:* ${formData.email || 'N/A'}%0A*Location:* ${formData.location}%0A*Service:* ${formData.service}%0A*Monthly Electricity Bill:* ₹${formData.monthlyBill}%0A*Roof Type:* ${formData.roofType}%0A*Notes:* ${formData.notes || 'None'}`;
    
    // Trigger WhatsApp in new tab
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div
        data-lenis-prevent="true"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        onClick={onClose}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          data-lenis-prevent="true"
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.22 }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6 sm:p-8 z-10 my-auto text-slate-900 border border-slate-200/90 max-h-[90vh] overflow-y-auto overscroll-contain"
        >
          {/* Top Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors shadow-sm"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display font-black text-2xl text-slate-900">
                Consultation Request Prepared!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                We have opened WhatsApp with your customized inquiry. Our senior solar engineer from Kothavalasa will connect with you shortly.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="btn-outline text-xs px-5 py-2.5 flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-red-600" />
                  <span>Call {COMPANY_INFO.phone}</span>
                </a>
                <button
                  onClick={onClose}
                  className="btn-red text-xs px-6 py-2.5"
                >
                  Back to Website
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Modal Header */}
              <div className="mb-5 space-y-1 pr-8">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-black uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-red-600 fill-red-600" />
                  <span>Geeta Solars &bull; Free Site Survey</span>
                </div>
                <h3 className="font-display font-black text-xl sm:text-2xl text-slate-900 tracking-tight">
                  Request Solar Consultation
                </h3>
                <p className="text-xs text-slate-500">
                  Fill in your details below for customized system size, ROI estimate, and PM Surya Ghar subsidy assistance.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. S. Ramana Murthy"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-red-600 focus:outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 82649 99691"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-red-600 focus:outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Location / Region
                    </label>
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-red-600 focus:outline-none text-sm bg-white"
                    >
                      {LOCATIONS_LIST.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Average Monthly Bill (₹)
                    </label>
                    <input
                      type="number"
                      step="500"
                      min="500"
                      value={formData.monthlyBill}
                      onChange={(e) => setFormData({ ...formData, monthlyBill: Number(e.target.value) })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-red-600 focus:outline-none text-sm font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Service / Product
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-red-600 focus:outline-none text-sm bg-white"
                    >
                      <option value="PM Surya Ghar Residential Rooftop (₹78k Subsidy)">PM Surya Ghar Rooftop (₹78k Subsidy)</option>
                      <option value="Commercial Complex Solar">Commercial Complex Solar</option>
                      <option value="Industrial Solar Power Plant">Industrial Solar Power Plant</option>
                      <option value="Solar Home Lighting & Inverter">Solar Home Lighting &amp; Inverter</option>
                      <option value="Solar Water Heater & Pumps">Solar Water Heater &amp; Pumps</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Roof Type
                    </label>
                    <select
                      value={formData.roofType}
                      onChange={(e) => setFormData({ ...formData, roofType: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-red-600 focus:outline-none text-sm bg-white"
                    >
                      <option value="Flat Concrete RCC Roof">Flat Concrete RCC Roof</option>
                      <option value="Slanted Metal / Tin Shed">Slanted Metal / Tin Shed</option>
                      <option value="Tiled / Slanted Roof">Tiled / Slanted Roof</option>
                      <option value="Open Ground / Farm">Open Ground / Farm</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Additional Notes / Queries (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tell us about your rooftop area, current sanction load, or preferred brand..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-red-600 focus:outline-none text-sm resize-none"
                  />
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    className="btn-red w-full py-3 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>Submit &amp; Open WhatsApp Proposal</span>
                    <Send className="w-4 h-4" />
                  </button>
                  <p className="text-center text-[10px] text-slate-400 mt-2">
                    Direct Contact: Near Old Railway Station, Opp Kothavalasa, Vizianagaram &bull; {COMPANY_INFO.phone}
                  </p>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default QuoteModal;
