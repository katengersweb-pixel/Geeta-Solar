import React, { useState, useRef, useEffect } from 'react';
import { Home, Building2, Factory, BatteryCharging, ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { SOLUTIONS_GRID, PORTFOLIO_PRODUCTS } from '../data/content';
import type { PortfolioProduct } from '../types';

interface SolutionsProps {
  onSelectProduct: (product: PortfolioProduct) => void;
}

export const Solutions: React.FC<SolutionsProps> = ({ onSelectProduct }) => {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    home: Home,
    building: Building2,
    factory: Factory,
    battery: BatteryCharging,
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  const isInteractingRef = useRef(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isMouseDown, setIsMouseDown] = useState(false);

  // Pure unique solutions - ZERO duplicate cards or images
  const marqueeItems = SOLUTIONS_GRID;

  // Smooth Auto-Scroll Engine for Unique Solutions (Glides gracefully with pause at edges)
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animId: number;
    let scrollPos = container.scrollLeft;
    let direction = 1; // 1 = forward (left to right), -1 = backward
    let isPausedAtEdge = false;
    let edgeTimer: ReturnType<typeof setTimeout> | null = null;
    const speed = 0.75; // Smooth reading speed

    const autoScrollLoop = () => {
      if (
        !isInteractingRef.current &&
        !isDraggingRef.current &&
        !isPausedAtEdge &&
        container
      ) {
        const maxScroll = Math.max(0, container.scrollWidth - container.clientWidth);

        if (maxScroll > 15) {
          scrollPos += speed * direction;

          // Reached the rightmost card
          if (scrollPos >= maxScroll) {
            scrollPos = maxScroll;
            container.scrollLeft = Math.round(scrollPos);
            isPausedAtEdge = true;
            edgeTimer = setTimeout(() => {
              direction = -1; // Reverse smoothly
              isPausedAtEdge = false;
            }, 2500); // 2.5s pause to read last solution card
          }
          // Reached the leftmost card
          else if (scrollPos <= 0) {
            scrollPos = 0;
            container.scrollLeft = 0;
            isPausedAtEdge = true;
            edgeTimer = setTimeout(() => {
              direction = 1; // Reverse forward
              isPausedAtEdge = false;
            }, 2000); // 2s pause at start
          } else {
            container.scrollLeft = Math.round(scrollPos);
          }
        }
      } else if (container) {
        // Sync scrollPos with user touch / drag
        scrollPos = container.scrollLeft;
      }
      animId = requestAnimationFrame(autoScrollLoop);
    };

    animId = requestAnimationFrame(autoScrollLoop);

    return () => {
      cancelAnimationFrame(animId);
      if (edgeTimer) clearTimeout(edgeTimer);
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

  // --- Mouse Drag Handlers (Laptop / Desktop) ---
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
      scheduleResumeAutoScroll(1500);
    }
  };

  // --- Touch Handlers (Mobile / Tablet) ---
  const handleTouchStart = () => {
    pauseAutoScroll();
  };

  const handleTouchEnd = () => {
    scheduleResumeAutoScroll(2000);
  };

  // --- Manual Navigation Arrow Controls ---
  const scrollNav = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    pauseAutoScroll();
    const amount = direction === 'left' ? -380 : 380;
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    scheduleResumeAutoScroll(3000);
  };

  return (
    <section id="solutions" className="py-16 lg:py-24 bg-[#FAF7F2]/60 text-slate-900 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            {/* Red Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-bold uppercase tracking-wider text-red-700">
              <Sparkles className="w-3.5 h-3.5 text-red-600" />
              <span>OUR SOLUTIONS</span>
            </div>

            {/* Heading */}
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              Tailored Solar Architectures for <span className="text-red-600">Every Scale</span>
            </h2>

            {/* Subtitle */}
            <p className="text-slate-600 text-sm sm:text-base font-normal">
              From residential rooftops to large industrial projects, explore our turnkey solar systems.
            </p>
          </div>

          {/* Navigation Controls (Arrows for manual navigation) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollNav('left')}
              className="p-3 rounded-full bg-white border border-slate-300 hover:border-red-500 hover:text-red-600 text-slate-700 transition-all shadow-sm active:scale-95"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollNav('right')}
              className="p-3 rounded-full bg-white border border-slate-300 hover:border-red-500 hover:text-red-600 text-slate-700 transition-all shadow-sm active:scale-95"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* --- Unified Showcase Ribbon Container: Continuous Auto-Scroll Like Down Project --- */}
      <div className="relative w-full">
        {/* Left & Right Gradient Fade Masks */}
        <div className="absolute top-0 left-0 bottom-0 w-8 sm:w-20 bg-gradient-to-r from-[#FAF7F2] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-8 sm:w-20 bg-gradient-to-l from-[#FAF7F2] to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={() => {
            handleMouseUpOrLeave();
            scheduleResumeAutoScroll(1200);
          }}
          onMouseEnter={pauseAutoScroll}
          onMouseUp={handleMouseUpOrLeave}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className={`flex gap-5 sm:gap-6 overflow-x-auto px-4 sm:px-8 lg:px-12 py-4 select-none cursor-grab active:cursor-grabbing ${
            isMouseDown ? 'cursor-grabbing' : ''
          }`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {marqueeItems.map((sol) => {
            const IconComp = iconMap[sol.icon] || Home;
            const fullProd = PORTFOLIO_PRODUCTS.find((p) => p.id === sol.id) || PORTFOLIO_PRODUCTS[0];

            return (
              <div
                key={sol.id}
                onClick={() => onSelectProduct(fullProd)}
                className="w-[280px] sm:w-[340px] lg:w-[360px] bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-red-400 transition-all duration-300 flex flex-col justify-between group cursor-pointer flex-shrink-0"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={sol.image}
                    alt={sol.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                    loading="lazy"
                  />
                  <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-white/60 text-[10px] sm:text-[11px] font-extrabold text-slate-800 shadow-sm">
                    {sol.id.toUpperCase()}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-3.5">
                  <div className="space-y-2.5">
                    {/* Icon + Title */}
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                        <IconComp className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                      </div>
                      <h3 className="font-display font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-red-600 transition-colors leading-snug line-clamp-1">
                        {sol.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-600 leading-relaxed font-normal line-clamp-2">
                      {sol.description}
                    </p>
                  </div>

                  {/* Red Action Link */}
                  <div className="pt-1 text-xs font-extrabold text-red-600 group-hover:text-red-700 inline-flex items-center gap-1.5 transition-all">
                    <span>{sol.linkText || 'Learn More'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
