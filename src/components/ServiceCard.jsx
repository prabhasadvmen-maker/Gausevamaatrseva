import React from 'react';
import * as Icons from 'lucide-react';

const ServiceCard = ({ service, onSelect, showImage = true }) => {
  // Dynamically retrieve Lucide Icon or fallback to HeartHandshake
  const IconComponent = Icons[service.icon] || Icons.HeartHandshake;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden card-shadow card-shadow-hover border border-[#D4AF37]/20 flex flex-col h-full">
      {showImage && service.image && (
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-100">
          <img
            src={service.image}
            alt={service.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#1E3F20]/90 backdrop-blur-xs border border-[#D4AF37]/40 text-[#D4AF37]">
              {service.englishTitle}
            </span>
          </div>
        </div>
      )}

      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] border border-[#E06D27]/20 flex items-center justify-center text-[#E06D27] group-hover:bg-[#E06D27] group-hover:text-white transition-all duration-300">
              <IconComponent className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-[#1E3F20] font-heading group-hover:text-[#E06D27] transition-colors">
              {service.title}
            </h3>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed font-sans line-clamp-3">
            {service.description}
          </p>
        </div>

        <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
          <button
            onClick={() => onSelect && onSelect(service)}
            className="inline-flex items-center text-xs font-bold text-[#E06D27] hover:text-[#1E3F20] transition-colors cursor-pointer"
          >
            <span>Learn More & Support</span>
            <Icons.ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </button>

          <span className="text-[11px] text-gray-400 font-medium">
            Gauseva Matr Seva
          </span>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
