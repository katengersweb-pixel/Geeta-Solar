import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { COMPANY_INFO } from '../data/content';

export const FloatingActions: React.FC = () => {
  return (
    <aside aria-label="Quick Contact Options" className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      {/* Blue Phone Call Button */}
      <motion.a
        href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-2xl flex items-center justify-center p-3.5 transition-all duration-300 group relative border-2 border-white/80"
        aria-label="Direct Phone Helpline"
      >
        <Phone className="w-6 h-6 animate-pulse" />
        {/* Tooltip on left */}
        <span className="absolute right-full mr-3 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg pointer-events-none">
          Call: {COMPANY_INFO.phone}
        </span>
      </motion.a>

      {/* Green WhatsApp Button */}
      <motion.a
        href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hello%20Geeta%20Solars,%20I%20would%20like%20to%20know%20more%20about%20your%20solar%20products%20and%20subsidy.`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.1, type: 'spring' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-2xl flex items-center justify-center p-3.5 transition-all duration-300 group relative border-2 border-white/80"
        aria-label="WhatsApp Solar Inquiry"
      >
        <MessageCircle className="w-6 h-6" />
        {/* Tooltip on left */}
        <span className="absolute right-full mr-3 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg pointer-events-none">
          Chat on WhatsApp
        </span>
      </motion.a>
    </aside>
  );
};
