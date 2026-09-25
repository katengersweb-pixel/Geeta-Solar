import React from 'react';
import { Star, Quote, Sparkles } from 'lucide-react';

export const CustomerReviews: React.FC = () => {
  const reviews = [
    {
      id: 'rev-1',
      name: 'Venkat Rao',
      location: 'Kakinada, AP',
      rating: 5,
      quote: 'The solar fencing and rooftop setup provided by Geeta Solars is very robust. It gives us great peace of mind for our agricultural land. Very prompt after-sales support.',
      timeAgo: '6 months ago',
      initial: 'V',
      tag: 'Agricultural & Rooftop'
    },
    {
      id: 'rev-2',
      name: 'Priya Sharma',
      location: 'Eluru, AP',
      rating: 5,
      quote: 'I was skeptical about solar initially, but the detailed explanation and ROI calculation convinced me. Best investment for our commercial building in Eluru.',
      timeAgo: '4 months ago',
      initial: 'P',
      tag: 'Commercial 15 kW'
    },
    {
      id: 'rev-3',
      name: 'Anand G',
      location: 'Tanuku, AP',
      rating: 5,
      quote: 'Great experience! The installation team was very polite and left the site spotless. The Tier-1 TopCon panels are performing even better than expected.',
      timeAgo: '6 months ago',
      initial: 'A',
      tag: 'Residential 5 kW'
    },
    {
      id: 'rev-4',
      name: 'Rajesh Kumar',
      location: 'Kothavalasa, Vizianagaram',
      rating: 5,
      quote: 'Installed a 5kW system for my home. The entire process was seamless, and the team at Geeta Solars is highly professional. My electricity bill is practically zero now!',
      timeAgo: '2 weeks ago',
      initial: 'R',
      tag: 'PM Surya Ghar 5 kW'
    },
    {
      id: 'rev-5',
      name: 'Sneha Reddy',
      location: 'Rajahmundry, AP',
      rating: 5,
      quote: 'Excellent service and top-notch quality! They guided me through the PM Surya Ghar subsidies perfectly. Highly recommend their rooftop panels and prompt liaisoning.',
      timeAgo: '1 month ago',
      initial: 'S',
      tag: 'Residential Rooftop'
    },
    {
      id: 'rev-6',
      name: 'S. Ramana Murthy',
      location: 'Mayuri Junction, Vizianagaram',
      rating: 5,
      quote: 'Completed our PM Surya Ghar setup in 4 days. The subsidy was credited directly to my bank account, and our monthly bill dropped from ₹4,500 to zero.',
      timeAgo: '3 weeks ago',
      initial: 'M',
      tag: 'PM Surya Ghar 3 kW'
    }
  ];

  // Duplicate for infinite seamless marquee loop
  const marqueeList = [...reviews, ...reviews];

  return (
    <section id="reviews" className="relative py-20 lg:py-28 bg-[#FFFFFF] text-slate-900 overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          {/* Mint Green / Warm Pill Badge */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-extrabold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>VERIFIED GOOGLE REVIEWS</span>
          </div>

          {/* Heading */}
          <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-slate-950">
            What Our Customers Say
          </h2>

          {/* Subtitle */}
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            Read real feedback from satisfied homeowners and commercial enterprise clients across Andhra Pradesh &amp; Telangana who made the switch to clean solar energy.
          </p>
        </div>
      </div>

      {/* Infinite Side-by-Side Scrolling Ribbon Container */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Left & Right Smooth Gradient Masks */}
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-20" />
        <div className="pointer-events-none absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-20" />

        {/* Moving Marquee Track */}
        <div className="flex animate-marquee gap-6 sm:gap-8 px-4">
          {marqueeList.map((rev, idx) => (
            <div
              key={`${rev.id}-${idx}`}
              className="w-[320px] sm:w-[380px] flex-shrink-0 bg-white border border-[#E7DFD3] rounded-3xl p-6 sm:p-7 shadow-[0_10px_30px_-5px_rgba(45,35,20,0.06)] hover:shadow-2xl hover:border-red-400 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* 5 Stars Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-200 group-hover:text-red-400 transition-colors" />
                </div>

                {/* Review Quote Text */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6 font-normal">
                  "{rev.quote}"
                </p>
              </div>

              {/* Reviewer Info Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-[#F0EAE1]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shadow-sm group-hover:bg-red-600 transition-colors">
                    {rev.initial}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-xs sm:text-sm">
                      {rev.name}
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      @ {rev.location}
                    </div>
                  </div>
                </div>

                {/* Google G Logo & Time */}
                <div className="flex flex-col items-end">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-4 h-4">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-0.5 font-medium">{rev.timeAgo}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Helper Hint */}
      <div className="text-center mt-6 text-xs text-slate-400 font-medium">
        Hover over any review card to pause the motion
      </div>
    </section>
  );
};

export default CustomerReviews;
