import React from 'react';
import { EXTENDED_SEVA } from '../data/content';
import SectionTitle from '../components/SectionTitle';
import * as Icons from 'lucide-react';

const OurSeva = ({ setActivePage }) => {
  const handleNav = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. Page Hero */}
      <section className="bg-gradient-to-b from-[#1E3F20] to-[#163319] text-white py-16 sm:py-24 relative overflow-hidden rounded-b-3xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest px-3 py-1 bg-white/10 rounded-full border border-[#D4AF37]/30">
            Our Initiatives • What We Do
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-heading text-white tracking-tight">
            Our Key Welfare Initiatives
          </h1>
          <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto font-sans">
            Comprehensive programs dedicated to cow nutrition, medical intervention, emergency rescue, and sanctuary protection.
          </p>
        </div>
      </section>

      {/* 2. Detailed Alternating Services Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
        {EXTENDED_SEVA.map((service, index) => {
          const IconComponent = Icons[service.icon] || Icons.Heart;
          const isEven = index % 2 === 0;

          return (
            <div
              key={service.id}
              id={service.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center bg-white rounded-3xl p-6 sm:p-10 card-shadow border border-[#D4AF37]/20 ${
                isEven ? '' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Image Column */}
              <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="relative rounded-2xl overflow-hidden card-shadow h-64 sm:h-80 border-2 border-[#FAF6F0]">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-[#1E3F20]/90 text-[#D4AF37] px-3 py-1 rounded-lg text-xs font-semibold backdrop-blur-xs border border-[#D4AF37]/40">
                    {service.englishTitle}
                  </div>
                </div>
              </div>

              {/* Content Column */}
              <div className={`lg:col-span-7 space-y-4 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF6F0] border border-[#E06D27]/30 flex items-center justify-center text-[#E06D27]">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-[#E06D27] font-bold uppercase tracking-wider">
                      Initiative Program #{index + 1}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#1E3F20] font-heading">
                      {service.title}
                    </h3>
                  </div>
                </div>

                <p className="text-base text-gray-700 font-sans leading-relaxed">
                  {service.fullDescription || service.description}
                </p>

                <div className="pt-2 flex items-center space-x-4">
                  <button
                    onClick={() => handleNav('donate')}
                    className="bg-[#E06D27] hover:bg-[#d55f19] text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all cursor-pointer flex items-center space-x-2 text-sm"
                  >
                    <span>🙏 Support This Initiative</span>
                  </button>

                  <span className="text-xs text-gray-500 font-medium hidden sm:inline">
                    • 100% Transparent Utilization
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* 3. Bottom Callout */}
      <section className="max-w-4xl mx-auto text-center px-4 pt-8 space-y-4">
        <h3 className="text-2xl font-bold text-[#1E3F20] font-heading">
          Would You Like to Sponsor Cow Care on Your Special Day?
        </h3>
        <p className="text-sm text-gray-600">
          Sponsor green fodder, medical treatment, or celebratory meals on birthdays, anniversaries, or in memory of loved ones.
        </p>
        <button
          onClick={() => handleNav('donate')}
          className="bg-[#1E3F20] hover:bg-[#163319] text-white font-bold px-8 py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
        >
          Sponsor a Special Care Drive →
        </button>
      </section>

    </div>
  );
};

export default OurSeva;
