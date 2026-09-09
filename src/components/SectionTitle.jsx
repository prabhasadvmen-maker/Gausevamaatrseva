import React from 'react';

const SectionTitle = ({ tag, title, subtitle, centered = true, light = false }) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : 'text-left'} max-w-3xl ${centered ? 'mx-auto' : ''}`}>
      {tag && (
        <div className="inline-flex items-center space-x-2 bg-[#FAF6F0] px-3.5 py-1.5 rounded-full border border-[#D4AF37]/30 mb-3 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#E06D27]"></span>
          <span className="text-xs font-semibold tracking-wide text-[#E06D27] uppercase">
            {tag}
          </span>
        </div>
      )}
      <h2
        className={`text-2xl sm:text-3xl lg:text-4xl font-bold font-heading tracking-tight ${
          light ? 'text-white' : 'text-[#1E3F20]'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 text-base sm:text-lg leading-relaxed ${
            light ? 'text-gray-200' : 'text-gray-600 font-sans'
          }`}
        >
          {subtitle}
        </p>
      )}
      <div
        className={`mt-4 h-1 w-20 bg-gradient-to-r from-[#E06D27] to-[#D4AF37] rounded-full ${
          centered ? 'mx-auto' : ''
        }`}
      ></div>
    </div>
  );
};

export default SectionTitle;
