import React from 'react';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import { GeetaLogo } from './AdityaLogo';
import { COMPANY_INFO } from '../data/content';

interface FooterProps {
  onOpenQuote?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-[#0B1320] text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 4 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-slate-800/80">
          
          {/* Column 1: Company Logo & Description (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <GeetaLogo size="md" showTagline={false} theme="dark" />

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm font-normal">
              Authorised Solar Energy &amp; PM Surya Ghar Muft Bijli Yojana installation partner in Kothavalasa &amp; Vizianagaram. Delivering reliable solar panels, inverters, and battery storage for a sustainable tomorrow.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {/* Instagram */}
              <a
                href={COMPANY_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-red-950/60 border border-red-900/50 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition-all"
                aria-label="Instagram @geetasolars5"
                title="Follow @geetasolars5 on Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.13-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href={COMPANY_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-red-950/60 border border-red-900/50 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition-all"
                aria-label="Facebook Geetha Solars"
                title="Visit Geetha Solars on Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.69 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>

              {/* Justdial Profile Link */}
              <a
                href={COMPANY_INFO.socials.justdial}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 h-9 rounded-full bg-red-950/60 border border-red-900/50 hover:bg-red-600 text-slate-300 hover:text-white flex items-center gap-1.5 transition-all text-xs font-bold"
                aria-label="Justdial Listing"
                title="View on Justdial"
              >
                <span>Justdial</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="text-[11px] text-slate-400 pt-2 space-y-1 border-t border-slate-800/80 mt-3">
              <div><span className="text-slate-500 font-medium">Proprietor:</span> <span className="font-semibold text-slate-300">{COMPANY_INFO.proprietor}</span></div>
              <div><span className="text-slate-500 font-medium">GSTIN:</span> <span className="font-mono text-slate-300 font-semibold">{COMPANY_INFO.gstin}</span></div>
              <div className="text-slate-500 pt-0.5">Payment Accepted: UPI (GPay/PhonePe), Net Banking, Cash &amp; EMI</div>
            </div>
          </div>

          {/* Column 2: Quick Links (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="font-display font-extrabold text-white text-xs uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li><a href="#home" className="hover:text-red-400 transition-colors">Home</a></li>
              <li><a href="#solutions" className="hover:text-red-400 transition-colors">Our Solutions</a></li>
              <li><a href="#standards" className="hover:text-red-400 transition-colors">Why Choose Us</a></li>
              <li><a href="#case-studies" className="hover:text-red-400 transition-colors">Projects</a></li>
              <li><a href="#quote" className="hover:text-red-400 transition-colors">Get a Quote</a></li>
              <li><a href="/admin" className="hover:text-red-400 transition-colors text-slate-500 hover:underline">Admin Portal</a></li>
            </ul>
          </div>

          {/* Column 3: Our Offerings (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="font-display font-extrabold text-white text-xs uppercase tracking-wider">
              Our Offerings
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li><a href="#solutions" className="hover:text-red-400 transition-colors">PM Surya Ghar Rooftop (₹78k Subsidy)</a></li>
              <li><a href="#solutions" className="hover:text-red-400 transition-colors">Solar Home Lighting Systems</a></li>
              <li><a href="#solutions" className="hover:text-red-400 transition-colors">Commercial Solar Installations</a></li>
              <li><a href="#solutions" className="hover:text-red-400 transition-colors">Solar Inverters &amp; Tubular Batteries</a></li>
              <li><a href="#solutions" className="hover:text-red-400 transition-colors">Agricultural Solar Water Pumps</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Info (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="font-display font-extrabold text-white text-xs uppercase tracking-wider">
              Store &amp; Office
            </h4>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-400 leading-relaxed">
                  {COMPANY_INFO.address}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <a href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`} className="text-slate-200 hover:text-red-400 transition-colors font-semibold">
                    {COMPANY_INFO.phone} <span className="text-[10px] text-emerald-400 font-normal">(WhatsApp)</span>
                  </a>
                  {COMPANY_INFO.altPhone && (
                    <a href={`tel:${COMPANY_INFO.altPhone.replace(/\s+/g, '')}`} className="text-slate-400 hover:text-red-400 transition-colors">
                      {COMPANY_INFO.altPhone}
                    </a>
                  )}
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span className="text-slate-400">
                  {COMPANY_INFO.workingHours}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-red-500 flex-shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="text-slate-400 hover:text-red-400 transition-colors">
                  {COMPANY_INFO.email}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Website Development Partner (Left) & Copyright (Right) */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          
          {/* Left Side: Website Development Partner (Stacked: Text Up, Big Logo Image Down, Curved Edges + Clickable Link) */}
          <a
            href="https://www.katengers.in/"
            target="_blank"
            rel="noopener noreferrer"
            title="Visit Katengers Solutions (Website Development Partner)"
            className="group flex flex-col items-start gap-2.5 bg-slate-900/95 hover:bg-slate-800/95 border border-slate-800 hover:border-amber-400/50 rounded-2xl p-3.5 sm:p-4 shadow-xl hover:shadow-amber-500/10 transition-all duration-300 cursor-pointer w-fit min-w-[270px] sm:min-w-[310px]"
          >
            {/* Remaining Text Up: Large and Bold */}
            <div className="flex items-center justify-between w-full gap-2">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-amber-400">
                Website Development Partner
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>

            {/* Image Down: Big Full Katengers Logo with Big Text in White Curved Rectangle */}
            <div className="w-full h-14 sm:h-16 md:h-18 px-4 py-2 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center shadow-md border border-slate-700/40 group-hover:scale-[1.02] transition-transform duration-300">
              <img
                src="/images/katengers-logo.png"
                alt="Katengers Solutions"
                className="h-full w-auto max-w-full object-contain"
              />
            </div>
          </a>

          {/* Right Side: Copyright & Locations */}
          <div className="flex flex-col sm:flex-row items-center md:items-end gap-2 sm:gap-4 text-xs text-slate-400">
            <div>
              &copy; {new Date().getFullYear()} {COMPANY_INFO.name} ({COMPANY_INFO.altName}). All rights reserved.
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <span>Kothavalasa</span>
              <span>&bull;</span>
              <span>Vizianagaram</span>
              <span>&bull;</span>
              <span>Visakhapatnam</span>
              <span>&bull;</span>
              <span>Andhra Pradesh</span>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
};
