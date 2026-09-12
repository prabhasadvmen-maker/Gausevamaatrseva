import React from 'react';
import { Phone, Mail, MapPin, Heart, ChevronRight, MessageSquare } from 'lucide-react';
import { SITE_INFO } from '../data/content';

const Footer = ({ setActivePage, onAdminClick }) => {
  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1E3F20] text-[#FAF6F0] pt-16 pb-8 border-t-4 border-[#D4AF37]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: Organization & Logo */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-xl border border-white/10 w-fit">
              <img
                src={SITE_INFO.logoUrl}
                alt="Gouseva Maatra Seva Logo"
                className="h-12 w-auto bg-white p-1 rounded object-contain"
              />
              <div>
                <h3 className="font-bold font-heading text-lg text-white leading-tight">
                  {SITE_INFO.name}
                </h3>
                <span className="text-xs text-[#D4AF37] font-medium block">
                  {SITE_INFO.subTitle}
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed font-sans">
              Dedicated to the noble service, veterinary care, nutrition, shelter, and protection of cows. Your participation gives stray and injured cows a renewed, dignified life.
            </p>

            <div className="pt-2">
              <button
                onClick={() => handleNavClick('donate')}
                className="bg-[#E06D27] hover:bg-[#d55f19] text-white text-sm font-bold py-2.5 px-5 rounded-lg shadow-md flex items-center space-x-2 transition-all cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-current text-white/90" />
                <span>🙏 Donate Now / Support Seva</span>
              </button>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-bold font-heading text-[#D4AF37] mb-4 pb-2 border-b border-white/10 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { id: 'home', label: 'Home Page' },
                { id: 'about', label: 'About Us' },
                { id: 'seva', label: 'Our Seva' },
                { id: 'gallery', label: 'Photo Gallery' },
                { id: 'donate', label: 'Online Donation' },
                { id: 'contact', label: 'Contact Us' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNavClick(link.id)}
                    className="flex items-center text-gray-300 hover:text-[#D4AF37] transition-colors group cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5 mr-2 text-[#E06D27] group-hover:translate-x-1 transition-transform" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Major Seva */}
          <div>
            <h4 className="text-lg font-bold font-heading text-[#D4AF37] mb-4 pb-2 border-b border-white/10 inline-block">
              Our Key Services
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E06D27] mr-2"></span>
                <span>Nutritional Feed & Green Fodder</span>
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E06D27] mr-2"></span>
                <span>24/7 Veterinary Care & Ambulance</span>
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E06D27] mr-2"></span>
                <span>Emergency Rescue & Rehab</span>
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E06D27] mr-2"></span>
                <span>Pristine Gaushala Sanctuary Shelter</span>
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E06D27] mr-2"></span>
                <span>Indigenous Breed Preservation</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info & Socials */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold font-heading text-[#D4AF37] mb-4 pb-2 border-b border-white/10 inline-block">
              Contact Information
            </h4>

            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#E06D27] shrink-0 mt-0.5" />
                <span>{SITE_INFO.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href={`tel:${SITE_INFO.phone}`} className="hover:text-white transition-colors">
                  {SITE_INFO.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href={`mailto:${SITE_INFO.email}`} className="hover:text-white transition-colors">
                  {SITE_INFO.email}
                </a>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="pt-2">
              <span className="text-xs text-gray-400 block mb-2 font-medium">Follow Our Activities:</span>
              <div className="flex space-x-3">
                <a
                  href={`https://wa.me/${SITE_INFO.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white p-2 rounded-full transition-all duration-300 flex items-center justify-center"
                  aria-label="WhatsApp"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>

                {/* Facebook SVG */}
                <a
                  href="#"
                  className="bg-white/10 text-white hover:bg-[#E06D27] p-2 rounded-full transition-all duration-300 flex items-center justify-center"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* Instagram SVG */}
                <a
                  href="#"
                  className="bg-white/10 text-white hover:bg-[#E06D27] p-2 rounded-full transition-all duration-300 flex items-center justify-center"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* Youtube SVG */}
                <a
                  href="#"
                  className="bg-white/10 text-white hover:bg-[#FF0000] p-2 rounded-full transition-all duration-300 flex items-center justify-center"
                  aria-label="YouTube"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 space-y-4 md:space-y-0">
          <div>
            © 2026 {SITE_INFO.name}. All Rights Reserved. | <span className="text-[#D4AF37]">{SITE_INFO.domain}</span>
          </div>
          <div className="flex space-x-6">
            <button onClick={() => handleNavClick('about')} className="hover:text-gray-200">About Us</button>
            <button onClick={() => handleNavClick('seva')} className="hover:text-gray-200">Our Services</button>
            <button onClick={() => handleNavClick('contact')} className="hover:text-gray-200">Contact Us</button>
            <button onClick={onAdminClick} className="text-[#D4AF37] font-bold hover:text-white">🔑 Admin Login</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
