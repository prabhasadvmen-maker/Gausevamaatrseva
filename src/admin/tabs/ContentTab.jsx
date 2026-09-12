import React, { useState, useEffect } from 'react';
import { Sliders, Image, Sparkles, Eye, CheckCircle2 } from 'lucide-react';
import { API_BASE_URL } from '../../config/api';

const ContentTab = () => {
  const [dashboardContent, setDashboardContent] = useState({
    hero_banner: {
      title: "Protect & Feed Mother Cows Daily",
      subtitle: "Join over 25,000+ daily Gousevaks across India providing nutritious fodder and medical care.",
      image_url: "https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=1200&q=80",
      button_text: "Donate Fodder Now"
    }
  });

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/v1/home/dashboard`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setDashboardContent(data.data);
        }
      })
      .catch((err) => console.warn('Content fetch notice:', err));
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E3F20] font-heading tracking-tight flex items-center gap-2">
            <Sliders className="w-7 h-7 text-[#E06D27]" />
            <span>Home Banners & Mobile Content (API-04)</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
            Dynamic Hero Banner, secondary promotional sliders, and community impact metrics for mobile screens.
          </p>
        </div>
      </div>

      {/* Hero Banner Preview Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-200/80 space-y-6">
        <div className="flex items-center space-x-2 text-xs font-bold text-[#E06D27] uppercase tracking-widest">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>Active Mobile Hero Banner</span>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-md">
          <img
            src={dashboardContent.hero_banner?.image_url}
            alt="Hero Banner"
            className="w-full h-48 sm:h-64 object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 flex flex-col justify-end text-white">
            <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-white">{dashboardContent.hero_banner?.title}</h3>
            <p className="text-xs text-gray-200 mt-1 max-w-xl">{dashboardContent.hero_banner?.subtitle}</p>
            <div className="mt-4">
              <span className="bg-[#E06D27] text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs">
                {dashboardContent.hero_banner?.button_text || 'Donate Fodder Now'}
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ContentTab;
