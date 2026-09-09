import React from 'react';
import { SITE_INFO } from '../data/content';
import ContactForm from '../components/ContactForm';
import { Phone, Mail, MapPin, MessageSquare, Clock, ExternalLink } from 'lucide-react';

const Contact = ({ showToast }) => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. Page Hero */}
      <section className="bg-gradient-to-b from-[#1E3F20] to-[#163319] text-white py-16 sm:py-24 relative overflow-hidden rounded-b-3xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest px-3.5 py-1.5 bg-white/10 rounded-full border border-[#D4AF37]/30">
            Contact & Location • Reach Us
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-heading text-white tracking-tight">
            Contact Gauseva Matr Seva
          </h1>
          <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto font-sans">
            Reach out for sanctuary visits, feeding sponsorship, emergency cow rescue, or general inquiries.
          </p>
        </div>
      </section>

      {/* 2. Main Contact Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Information Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FAF6F0] rounded-3xl p-6 sm:p-8 border border-[#D4AF37]/30 space-y-6 card-shadow">
              <div>
                <span className="text-xs font-bold text-[#E06D27] uppercase tracking-wider">
                  Sanctuary & Office Address
                </span>
                <h3 className="text-2xl font-bold text-[#1E3F20] font-heading mt-1">
                  Gurugram Headquarters
                </h3>
              </div>

              <div className="space-y-4 text-sm text-[#1C1917]">
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#E06D27]/30 flex items-center justify-center text-[#E06D27] shrink-0 mt-0.5 shadow-xs">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 font-semibold block">Official Address</span>
                    <span className="font-bold text-[#1E3F20] block">{SITE_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#D4AF37]/40 flex items-center justify-center text-[#1E3F20] shrink-0 shadow-xs">
                    <Phone className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 font-semibold block">Helpline & Rescue Phone</span>
                    <a href={`tel:${SITE_INFO.phone}`} className="font-bold text-[#1E3F20] hover:text-[#E06D27] transition-colors">
                      {SITE_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-[#1E3F20] shrink-0 shadow-xs">
                    <Mail className="w-5 h-5 text-[#1E3F20]" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 font-semibold block">Official Email</span>
                    <a href={`mailto:${SITE_INFO.email}`} className="font-medium text-gray-800 hover:text-[#E06D27]">
                      {SITE_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 shrink-0 shadow-xs">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 font-semibold block">Visiting Hours</span>
                    <span className="font-medium text-gray-800">6:00 AM – 7:00 PM Daily</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp CTA Button */}
              <div className="pt-2 border-t border-gray-200">
                <a
                  href={`https://wa.me/${SITE_INFO.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center space-x-2 shadow-md transition-all cursor-pointer"
                >
                  <MessageSquare className="w-5 h-5 fill-current" />
                  <span>Connect via WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Google Map Card */}
            <div className="bg-white rounded-3xl p-4 card-shadow border border-gray-200 overflow-hidden">
              <div className="text-xs font-bold text-[#1E3F20] mb-2 px-2 flex items-center justify-between">
                <span>📍 Google Maps - Orchid Center Gurugram</span>
                <span className="text-gray-500 font-medium">Golf Course Road, SEC-53</span>
              </div>
              <div className="relative rounded-2xl overflow-hidden h-52 bg-gray-100 border border-gray-200 flex items-center justify-center text-center p-4">
                <img
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=600&q=80"
                  alt="Map Placeholder"
                  className="absolute inset-0 w-full h-full object-cover filter brightness-90"
                />
                <div className="absolute inset-0 bg-black/45"></div>
                <div className="relative z-10 text-white space-y-2 max-w-xs">
                  <MapPin className="w-8 h-8 text-[#E06D27] mx-auto animate-bounce" />
                  <div className="text-xs font-bold font-heading text-white">
                    Orchid Center, 3rd Floor, Golf Course Road, SEC-53, Gurugram
                  </div>
                  <a
                    href="https://maps.google.com/?q=Orchid+Center+Golf+Course+Road+SEC-53+Gurugram"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-[11px] bg-[#E06D27] text-white hover:bg-[#d55f19] px-3.5 py-1.5 rounded-full font-bold shadow-md transition-all"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm showToast={showToast} />
          </div>

        </div>
      </section>

    </div>
  );
};

export default Contact;
