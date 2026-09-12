import React from 'react';
import { Clock, Sparkles, ArrowLeft, Shield } from 'lucide-react';

const ComingSoonTab = ({ title = "Module", onGoToOverview }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center space-y-6 animate-in fade-in duration-300">
      
      {/* Icon Badge */}
      <div className="relative">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#FAF6F0] to-[#EAF5EC] border-2 border-[#D4AF37]/40 flex items-center justify-center shadow-md">
          <Clock className="w-10 h-10 text-[#E06D27] animate-pulse" />
        </div>
        <div className="absolute -top-2 -right-2 bg-[#1E3F20] text-[#D4AF37] p-1.5 rounded-full shadow-sm border border-white">
          <Sparkles className="w-4 h-4" />
        </div>
      </div>

      {/* Title & Subtitle */}
      <div className="space-y-2 max-w-md">
        <div className="inline-flex items-center space-x-2 bg-[#EAF5EC] text-[#1E3F20] px-3.5 py-1 rounded-full text-xs font-bold border border-[#1E3F20]/15">
          <Shield className="w-3.5 h-3.5 text-[#2E7D32]" />
          <span>Under Active Development</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E3F20] font-heading tracking-tight pt-1">
          {title}
        </h2>

        <p className="text-sm text-gray-600 font-sans leading-relaxed">
          The <strong>{title}</strong> section for Gouseva Maatra Seva is currently being configured. Feature updates will be deployed in the upcoming system release.
        </p>
      </div>

      {/* Quick Action Button */}
      {onGoToOverview && (
        <button
          onClick={onGoToOverview}
          className="inline-flex items-center space-x-2 bg-[#1E3F20] hover:bg-[#163319] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer border border-[#D4AF37]/30"
        >
          <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
          <span>Back to Overview Dashboard</span>
        </button>
      )}

    </div>
  );
};

export default ComingSoonTab;
