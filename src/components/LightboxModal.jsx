import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const LightboxModal = ({ item, onClose, onNext, onPrev, totalCount, currentIndex }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/20 hover:bg-white/30 text-white p-2.5 rounded-full transition-colors z-50 cursor-pointer shadow-lg"
        aria-label="Close Lightbox"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Navigation Buttons */}
      {onPrev && (
        <button
          onClick={onPrev}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2.5 sm:p-3 rounded-full transition-colors z-50 cursor-pointer shadow-lg"
          aria-label="Previous Image"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}

      {onNext && (
        <button
          onClick={onNext}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2.5 sm:p-3 rounded-full transition-colors z-50 cursor-pointer shadow-lg"
          aria-label="Next Image"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}

      {/* Main Image Container */}
      <div className="max-w-4xl max-h-[85vh] flex flex-col items-center justify-center space-y-3 sm:space-y-4 px-2">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 max-h-[65vh] sm:max-h-[70vh]">
          <img
            src={item.image}
            alt={item.title}
            className="w-auto h-auto max-h-[65vh] sm:max-h-[70vh] object-contain rounded-2xl"
          />
        </div>

        {/* Caption Info */}
        <div className="text-center text-white max-w-xl px-2">
          <div className="text-[10px] sm:text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-0.5">
            {item.category} {currentIndex !== undefined && `(${currentIndex + 1} / ${totalCount})`}
          </div>
          <h4 className="text-base sm:text-lg font-bold font-heading text-white">{item.title}</h4>
          {item.caption && (
            <p className="text-xs sm:text-sm text-gray-300 mt-1 font-sans">{item.caption}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LightboxModal;
