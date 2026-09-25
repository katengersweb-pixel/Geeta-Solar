import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { CASE_STUDIES } from '../data/content';

export const CaseStudies: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Selected image for Lightbox preview (pure photo viewing, NO quotation form)
  const [activeLightbox, setActiveLightbox] = useState<(typeof CASE_STUDIES)[0] | null>(null);

  // Auto-scroll & interaction state for mobile
  const isInteractingRef = useRef(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isMouseDown, setIsMouseDown] = useState(false);

  // Tripled array for seamless infinite looping
  const marqueeItems = [...CASE_STUDIES, ...CASE_STUDIES, ...CASE_STUDIES];

  // Continuous Auto-scroll effect (Smooth & Infinite)
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animId: number;
    let scrollPos = container.scrollLeft;
    const speed = 0.8; // Smooth scroll speed

    const autoScrollLoop = () => {
      if (!isInteractingRef.current && !isDraggingRef.current && container) {
        scrollPos += speed;
        container.scrollLeft = Math.round(scrollPos);

        // Loop seamlessly back when reached 1/3 of the tripled scroll width
        const oneThirdWidth = container.scrollWidth / 3;
        if (container.scrollLeft >= oneThirdWidth * 2) {
          scrollPos -= oneThirdWidth;
          container.scrollLeft = Math.round(scrollPos);
        }
      } else if (container) {
        scrollPos = container.scrollLeft;
      }
      animId = requestAnimationFrame(autoScrollLoop);
    };

    animId = requestAnimationFrame(autoScrollLoop);

    return () => {
      cancelAnimationFrame(animId);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const pauseAutoScroll = () => {
    isInteractingRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  };

  const scheduleResumeAutoScroll = (delay = 2000) => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, delay);
  };

  // --- Mouse Drag Handlers (Laptop/Desktop manual panning) ---
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDraggingRef.current = true;
    setIsMouseDown(true);
    pauseAutoScroll();
    startXRef.current = e.pageX - scrollRef.current.offsetLeft;
    startScrollLeftRef.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    scrollRef.current.scrollLeft = startScrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsMouseDown(false);
      scheduleResumeAutoScroll();
    }
  };

  // --- Touch Handlers (Mobile / Tablet) ---
  const handleTouchStart = () => {
    pauseAutoScroll();
  };

  const handleTouchEnd = () => {
    scheduleResumeAutoScroll();
  };

  // --- Desktop Navigation Controls ---
  const scrollNav = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    pauseAutoScroll();
    const amount = direction === 'left' ? -380 : 380;
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    scheduleResumeAutoScroll(3000);
  };

  return (
    <section id="case-studies" className="py-12 sm:py-16 lg:py-24 bg-[#FAF7F2]/40 text-slate-900 border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-bold uppercase tracking-wider text-red-700">
              <Sparkles className="w-3.5 h-3.5 text-red-600" />
              <span>VERIFIED ON-SITE INSTALLATIONS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              Real Customer <span className="text-red-600">Rooftops</span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-normal">
              Live installations completed across Kothavalasa, Vizianagaram &amp; Andhra Pradesh.
            </p>
          </div>

          {/* Navigation Controls (Desktop Manual Navigation) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollNav('left')}
              className="p-3 rounded-full bg-white border border-slate-200 shadow-sm text-slate-700 hover:border-red-500 hover:text-red-600 hover:shadow-md transition-all active:scale-95"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollNav('right')}
              className="p-3 rounded-full bg-white border border-slate-200 shadow-sm text-slate-700 hover:border-red-500 hover:text-red-600 hover:shadow-md transition-all active:scale-95"
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Showcase Ribbon Container */}
      <div className="relative w-full">
        {/* Left & Right Gradient Fade Masks */}
        <div className="absolute top-0 left-0 bottom-0 w-8 sm:w-24 bg-gradient-to-r from-[#FAF7F2] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-8 sm:w-24 bg-gradient-to-l from-[#FAF7F2] to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseEnter={pauseAutoScroll}
          onMouseLeave={() => {
            handleMouseUpOrLeave();
            scheduleResumeAutoScroll(1200);
          }}
          onMouseUp={handleMouseUpOrLeave}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className={`flex gap-5 sm:gap-6 overflow-x-auto px-4 sm:px-8 lg:px-12 py-3 select-none cursor-grab active:cursor-grabbing ${
            isMouseDown ? 'cursor-grabbing' : ''
          }`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {marqueeItems.map((cs, idx) => (
            <div
              key={`${cs.id}-${idx}`}
              onClick={() => setActiveLightbox(cs)}
              className="relative w-[320px] sm:w-[400px] md:w-[350px] lg:w-[380px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_12px_32px_-8px_rgba(45,35,20,0.12)] border-2 border-[#E7DFD3] bg-white group transition-all duration-300 hover:shadow-xl hover:border-red-500/60 hover:-translate-y-1 flex-shrink-0 cursor-pointer"
              title="Click to view photo"
            >
              {/* Pure Image Display Only - No Overlays, No Text, No Badges */}
              <div className="relative aspect-[1/1] overflow-hidden bg-slate-950">
                <img
                  src={cs.image}
                  alt={cs.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                />
                {/* Subtle Inner Glow Border */}
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 group-hover:ring-red-500/30 rounded-2xl sm:rounded-3xl transition-all pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pure High-Resolution Photo Lightbox Modal (Click to View Photo - ZERO Quote Form) */}
      {activeLightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveLightbox(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-white/20 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header: Pure Title and Close Button */}
            <div className="flex items-center justify-between p-4 sm:p-5 bg-slate-950 text-white border-b border-white/10">
              <span className="font-bold text-sm sm:text-base text-white">
                {activeLightbox.title}
              </span>
              <button
                onClick={() => setActiveLightbox(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-red-600 text-white transition-colors"
                aria-label="Close photo"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Pure Photo View */}
            <div className="relative aspect-[4/3] sm:aspect-[16/10] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeLightbox.image}
                alt={activeLightbox.title}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CaseStudies;
