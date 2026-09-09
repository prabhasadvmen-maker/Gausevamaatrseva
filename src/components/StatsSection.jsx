import React from 'react';
import { STATS } from '../data/content';
import { Heart, Users, Wheat, Activity } from 'lucide-react';

const icons = [Heart, Users, Wheat, Activity];

const StatsSection = () => {
  return (
    <section className="relative py-16 bg-[#1E3F20] text-white overflow-hidden">
      {/* Decorative ambient circles */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#E06D27]/10 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] px-3 py-1 bg-white/10 rounded-full border border-[#D4AF37]/30">
            Our Impact & Dedication
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading mt-3 text-white">
            Making a Real Difference Every Single Day
          </h2>
          <p className="text-sm text-gray-300 mt-2">
            Thanks to our nationwide community of donors and volunteers, hundreds of cows receive food, care, and protection.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {STATS.map((stat, idx) => {
            const IconComponent = icons[idx % icons.length];
            return (
              <div
                key={idx}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center hover:border-[#D4AF37]/50 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="w-12 h-12 mx-auto rounded-full bg-[#E06D27]/20 border border-[#E06D27]/40 flex items-center justify-center text-[#E06D27] group-hover:scale-110 transition-transform mb-4">
                  <IconComponent className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#D4AF37] font-heading tracking-tight">
                  {stat.value}
                </div>
                <div className="text-base font-bold text-white mt-1">
                  {stat.label}
                </div>
                <div className="text-xs text-gray-300 mt-1">
                  {stat.detail}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
