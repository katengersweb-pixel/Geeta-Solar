import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ShieldCheck, ArrowRight, PhoneCall, MessageCircle, Sparkles } from 'lucide-react';
import type { PortfolioProduct } from '../types';
import { COMPANY_INFO } from '../data/content';

interface ProductModalProps {
  product: PortfolioProduct | null;
  onClose: () => void;
  onRequestQuote: (productName: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onRequestQuote,
}) => {
  // Lock background scroll when modal is open and restore on close
  useEffect(() => {
    if (product) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [product]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const handleWhatsApp = () => {
    const msg = `*Inquiry regarding ${product.title}*%0A%0AHello Geeta Solars, I would like more information and pricing for ${product.title} (${product.subtitle}).`;
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${msg}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div
        data-lenis-prevent="true"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
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
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.22 }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-white rounded-3xl shadow-2xl max-w-2xl sm:max-w-3xl w-full z-10 my-auto text-slate-900 border border-slate-200/90 flex flex-col max-h-[88vh] overflow-hidden"
        >
          {/* Top Header Bar */}
          <div className="p-4 sm:p-5 pb-3 sm:pb-4 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/70">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                {product.subsidyEligible ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-100/90 border border-red-200 text-red-700 text-[11px] font-extrabold uppercase tracking-wider">
                    <Sparkles className="w-3 h-3 text-red-600 fill-red-600" />
                    PM Surya Ghar ₹78,000 Subsidy
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-200/90 text-slate-700 text-[11px] font-bold uppercase tracking-wider">
                    {product.category} Solar Architecture
                  </span>
                )}
              </div>

              <h3 className="font-display font-black text-xl sm:text-2xl text-slate-950 tracking-tight leading-snug">
                {product.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                {product.subtitle}
              </p>
            </div>

            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-300/80 text-slate-700 hover:text-slate-900 flex items-center justify-center transition-colors flex-shrink-0"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Body - Smooth Scroll Container with data-lenis-prevent */}
          <div
            data-lenis-prevent="true"
            className="p-4 sm:p-6 space-y-5 overflow-y-auto overscroll-contain flex-1 touch-pan-y"
          >
            {/* Top Section: Compact Scaled Image + Summary Description */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-slate-50/80 p-3.5 sm:p-4 rounded-2xl border border-slate-200/70">
              {/* Compact Image Card */}
              <div className="relative w-full sm:w-48 md:w-56 h-32 sm:h-36 rounded-xl overflow-hidden shadow-sm border border-slate-200 flex-shrink-0 bg-slate-100">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Description Content */}
              <div className="flex-1 space-y-1.5">
                <h4 className="font-display font-bold text-[11px] uppercase tracking-wider text-slate-800">
                  Overview &amp; Implementation
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {product.fullDesc}
                </p>
              </div>
            </div>

            {/* Key Features & Engineering Highlights */}
            <div className="space-y-2.5">
              <h4 className="font-display font-extrabold text-xs uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-red-600" />
                Key Features &amp; Engineering Highlights
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-2 rounded-xl bg-slate-50/80 border border-slate-200/60 text-xs text-slate-700"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="font-medium leading-snug">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="space-y-2.5">
              <h4 className="font-display font-extrabold text-xs uppercase tracking-wider text-slate-900">
                Technical Specifications
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {product.specifications.map((spec, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center sm:text-left">
                    <div className="text-[10px] uppercase font-bold text-slate-500">
                      {spec.label}
                    </div>
                    <div className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5">
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Applications */}
            <div className="space-y-2">
              <h4 className="font-display font-extrabold text-xs uppercase tracking-wider text-slate-900">
                Recommended Applications
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {product.applications.map((app, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-red-50 text-red-900 border border-red-200/70 text-xs font-semibold"
                  >
                    {app}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer CTA */}
          <div className="p-3.5 sm:p-4 bg-slate-50/90 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
              <PhoneCall className="w-3.5 h-3.5 text-red-600" />
              <span>Support: {COMPANY_INFO.phone}</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleWhatsApp}
                className="btn-outline text-xs px-4 py-2 flex items-center justify-center gap-1.5 border-emerald-500 text-emerald-700 hover:bg-emerald-50 w-full sm:w-auto font-bold"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onRequestQuote(product.title);
                }}
                className="btn-red text-xs px-5 py-2 flex items-center justify-center gap-1.5 w-full sm:w-auto shadow-md font-bold"
              >
                <span>Request Detailed Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProductModal;
