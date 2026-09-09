import React, { useState, useEffect } from 'react';
import { Menu, X, Heart, Phone, ChevronRight } from 'lucide-react';
import { SITE_INFO } from '../data/content';

const Header = ({ activePage, setActivePage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'seva', label: 'Our Seva' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'donate', label: 'Donate' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Notification / Info Strip */}
      <div className="bg-[#1E3F20] text-white text-xs py-2 px-4 border-b border-[#D4AF37]/20 font-sans hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4 lg:space-x-6">
            <span className="flex items-center text-[#FAF6F0]/90">
              <span className="w-2 h-2 rounded-full bg-[#E06D27] inline-block mr-2 animate-pulse"></span>
              {SITE_INFO.slogan}
            </span>
            <span className="text-[#D4AF37] hidden md:inline">|</span>
            <span className="text-[#FAF6F0]/80 hidden md:inline">Serving Cows is a Supreme Virtue</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href={`tel:${SITE_INFO.phone}`} className="flex items-center text-[#FAF6F0]/90 hover:text-[#D4AF37] transition-colors">
              <Phone className="w-3.5 h-3.5 mr-1.5 text-[#D4AF37]" />
              <span>{SITE_INFO.phone}</span>
            </a>
            <span className="text-[#D4AF37]/50">•</span>
            <span className="text-[#FAF6F0]/90 font-medium">{SITE_INFO.domain}</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-header py-2 sm:py-2.5 shadow-md border-b border-[#E06D27]/10'
            : 'bg-[#FDFBF7]/95 py-3 sm:py-3.5 border-b border-[#1E3F20]/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Left: Official Logo & Brand Name */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-2.5 sm:space-x-3 group text-left cursor-pointer focus:outline-none"
            aria-label="Gauseva Matr Seva Home"
          >
            <div className="relative overflow-hidden rounded-lg bg-white p-1 shadow-xs border border-[#D4AF37]/20 group-hover:border-[#E06D27]/40 transition-colors shrink-0">
              <img
                src={SITE_INFO.logoUrl}
                alt="Gauseva Matr Seva Logo"
                className="h-9 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg lg:text-xl font-bold tracking-tight text-[#1E3F20] font-heading leading-tight">
                {SITE_INFO.name}
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-[#E06D27] tracking-wider uppercase">
                {SITE_INFO.subTitle}
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 xl:px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#1E3F20] text-white shadow-sm'
                      : 'text-[#1C1917]/85 hover:text-[#1E3F20] hover:bg-[#1E3F20]/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Donate CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={() => handleNavClick('donate')}
              className="relative group overflow-hidden rounded-full bg-gradient-to-r from-[#E06D27] to-[#D95B16] px-5 py-2.5 text-sm font-bold text-white shadow-md hover:shadow-lg hover:from-[#d55f19] hover:to-[#c34e0f] transition-all duration-300 active:scale-95 cursor-pointer"
            >
              <span className="relative flex items-center space-x-2">
                <span>🙏</span>
                <span>Donate Now</span>
              </span>
            </button>
          </div>

          {/* Mobile Action Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3 lg:hidden">
            <button
              onClick={() => handleNavClick('donate')}
              className="bg-[#E06D27] text-white text-xs font-bold px-3 py-1.5 sm:py-2 rounded-full flex items-center space-x-1 shadow-xs active:scale-95"
            >
              <span>🙏</span>
              <span>Donate</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#1E3F20] hover:bg-[#1E3F20]/10 focus:outline-none transition-colors border border-gray-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[58px] sm:top-[65px] bg-[#FDFBF7] border-b border-[#D4AF37]/30 shadow-2xl z-50 animate-in slide-in-from-top duration-300 max-h-[85vh] overflow-y-auto">
            <div className="px-4 pt-3 pb-6 space-y-2">
              <div className="text-[11px] font-semibold text-[#E06D27] px-3 py-1.5 bg-[#FAF6F0] rounded-lg border border-[#E06D27]/10 mb-2">
                {SITE_INFO.slogan}
              </div>

              {navItems.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left font-semibold transition-all ${
                      isActive
                        ? 'bg-[#1E3F20] text-white shadow-sm'
                        : 'text-[#1C1917] hover:bg-[#FAF6F0]'
                    }`}
                  >
                    <span className="text-sm sm:text-base">{item.label}</span>
                    <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  </button>
                );
              })}

              <div className="pt-4 border-t border-gray-200 mt-2">
                <button
                  onClick={() => handleNavClick('donate')}
                  className="w-full bg-gradient-to-r from-[#E06D27] to-[#D95B16] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 shadow-md active:scale-98"
                >
                  <Heart className="w-5 h-5 fill-current text-white/90" />
                  <span>🙏 Donate Now</span>
                </button>
                <div className="mt-3 text-center text-xs text-gray-500 font-medium">
                  Helpline: {SITE_INFO.phone}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
