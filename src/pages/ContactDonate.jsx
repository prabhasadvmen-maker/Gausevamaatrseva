import React from 'react';
import { SITE_INFO, BANK_DETAILS } from '../data/content';
import DonationCard from '../components/DonationCard';
import ContactForm from '../components/ContactForm';
import { Phone, Mail, MapPin, MessageSquare, Heart, Clock, ExternalLink } from 'lucide-react';

const ContactDonate = ({ showToast }) => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. Page Hero */}
      <section className="bg-gradient-to-b from-[#1E3F20] to-[#163319] text-white py-16 sm:py-24 relative overflow-hidden rounded-b-3xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest px-3 py-1 bg-white/10 rounded-full border border-[#D4AF37]/30">
            गौसेवा से जुड़ें • Support & Contact
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-heading text-white tracking-tight">
            गौसेवा से जुड़ें और सहयोग करें
          </h1>
          <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto font-sans">
            "आपका सहयोग गौसेवा को निरंतर आगे बढ़ाने में मदद करता है।"
          </p>
        </div>
      </section>

      {/* 2. PROMINENT DONATION SECTION */}
      <section id="donate-section" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <DonationCard showToast={showToast} />
      </section>

      {/* 3. CONTACT INFO & FORM SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Cards & WhatsApp CTA */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FAF6F0] rounded-3xl p-6 sm:p-8 border border-[#D4AF37]/30 space-y-6 card-shadow">
              <div>
                <span className="text-xs font-bold text-[#E06D27] uppercase tracking-wider">
                  संपर्क सूत्र • Contact Details
                </span>
                <h3 className="text-2xl font-bold text-[#1E3F20] font-heading mt-1">
                  Gauseva Matr Seva Dham
                </h3>
              </div>

              <div className="space-y-4 text-sm text-[#1C1917]">
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#E06D27]/30 flex items-center justify-center text-[#E06D27] shrink-0 mt-0.5 shadow-xs">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 font-semibold block">गौशाला पता (Address)</span>
                    <span className="font-medium text-gray-800">{SITE_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#D4AF37]/40 flex items-center justify-center text-[#1E3F20] shrink-0 shadow-xs">
                    <Phone className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 font-semibold block">हेल्पलाइन व सेवा फोन</span>
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
                    <span className="text-xs text-gray-500 font-semibold block">ईमेल (Official Email)</span>
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
                    <span className="text-xs text-gray-500 font-semibold block">गौशाला दर्शन समय</span>
                    <span className="font-medium text-gray-800">प्रातः 6:00 से सायं 7:00 बजे तक</span>
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
                  <span>WhatsApp पर संपर्क करें</span>
                </a>
              </div>
            </div>

            {/* Interactive Map Card Placeholder */}
            <div className="bg-white rounded-3xl p-4 card-shadow border border-gray-200 overflow-hidden">
              <div className="text-xs font-bold text-[#1E3F20] mb-2 px-2 flex items-center justify-between">
                <span>📍 Google Maps - Gau Seva Dham</span>
                <span className="text-gray-400">Vrindavan Mathura</span>
              </div>
              <div className="relative rounded-2xl overflow-hidden h-48 bg-gray-100 border border-gray-200 flex items-center justify-center text-center p-4">
                <img
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=600&q=80"
                  alt="Map Placeholder"
                  className="absolute inset-0 w-full h-full object-cover filter brightness-90"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="relative z-10 text-white space-y-2">
                  <MapPin className="w-8 h-8 text-[#E06D27] mx-auto animate-bounce" />
                  <div className="text-xs font-bold font-heading">Gauseva Matr Seva Dham Location</div>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-[11px] bg-white text-[#1E3F20] px-3 py-1 rounded-full font-bold shadow-sm"
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

export default ContactDonate;
