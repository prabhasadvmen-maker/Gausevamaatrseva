import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/content';
import SectionTitle from '../components/SectionTitle';
import { Play, Eye } from 'lucide-react';

const Gallery = ({ onOpenLightbox }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'gauseva', label: 'Cow Welfare' },
    { id: 'gaushala', label: 'Sanctuary' },
    { id: 'medical', label: 'Medical Care' },
    { id: 'activities', label: 'Daily Activities' },
    { id: 'volunteers', label: 'Volunteers' },
  ];

  const filteredItems = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.categoryKey === activeCategory);

  return (
    <div className="space-y-12 sm:space-y-20 pb-16">
      
      {/* 1. Page Hero */}
      <section className="bg-gradient-to-b from-[#1E3F20] to-[#163319] text-white py-14 sm:py-24 relative overflow-hidden rounded-b-3xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-3 sm:space-y-4">
          <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest px-3 py-1 bg-white/10 rounded-full border border-[#D4AF37]/30">
            Sanctuary Visuals • Photo Gallery
          </span>
          <h1 className="text-2xl sm:text-5xl font-bold font-heading text-white tracking-tight">
            Photo & Video Gallery
          </h1>
          <p className="text-sm sm:text-lg text-gray-200 max-w-2xl mx-auto font-sans">
            Authentic photographs capturing daily feeding, medical care, and peaceful sanctuary moments.
          </p>
        </div>
      </section>

      {/* 2. Category Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-3 pt-1 no-scrollbar">
          <div className="bg-[#FAF6F0] p-1.5 rounded-2xl border border-[#D4AF37]/30 flex space-x-1 sm:space-x-2 shrink-0">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#1E3F20] text-white shadow-sm'
                      : 'text-[#1C1917] hover:bg-white/60'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mt-6 sm:mt-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => onOpenLightbox(item, index)}
              className="group relative rounded-2xl overflow-hidden card-shadow cursor-pointer bg-white border border-gray-100 h-64 sm:h-72"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-70 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-4">
                <div className="flex justify-end">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-[#D4AF37] uppercase bg-black/50 px-2 py-0.5 rounded border border-[#D4AF37]/30">
                    {item.category}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white font-heading mt-1 group-hover:text-[#D4AF37] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-300 mt-1 line-clamp-2 font-sans">
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Video Showcase Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          tag="Video Showcase"
          title="Sanctuary Documentaries & Film"
          subtitle="Witness how your generosity provides hope and health to rescued cows."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Video Card 1 */}
          <div className="relative rounded-3xl overflow-hidden card-shadow bg-gray-900 h-60 sm:h-80 border-2 border-[#D4AF37]/30 group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1546445317-29f454587d23?auto=format&fit=crop&w=800&q=80"
              alt="Daily Gaushala Feeding Video"
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-4 sm:p-6 space-y-2 sm:space-y-3">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#E06D27] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-current ml-1" />
              </div>
              <h4 className="text-base sm:text-xl font-bold font-heading text-white">Daily Fodder Distribution & Morning Routine</h4>
              <span className="text-xs text-[#D4AF37] font-semibold">Gouseva Maatra Seva Official Film</span>
            </div>
          </div>

          {/* Video Card 2 */}
          <div className="relative rounded-3xl overflow-hidden card-shadow bg-gray-900 h-60 sm:h-80 border-2 border-[#D4AF37]/30 group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1570042707288-03823467c699?auto=format&fit=crop&w=800&q=80"
              alt="Medical Rescue Video"
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-4 sm:p-6 space-y-2 sm:space-y-3">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#1E3F20] text-[#D4AF37] border-2 border-[#D4AF37] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-current ml-1" />
              </div>
              <h4 className="text-base sm:text-xl font-bold font-heading text-white">24/7 Medical Ambulance & Emergency Rescue</h4>
              <span className="text-xs text-[#D4AF37] font-semibold">Medical Care Documentary</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Gallery;
