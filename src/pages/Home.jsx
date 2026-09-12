import React from 'react';
import { SITE_INFO, SERVICES, GALLERY_ITEMS, TESTIMONIALS } from '../data/content';
import SectionTitle from '../components/SectionTitle';
import ServiceCard from '../components/ServiceCard';
import StatsSection from '../components/StatsSection';
import { Heart, ArrowRight, ShieldCheck, Award, Sparkles, CheckCircle2, ChevronRight, PhoneCall } from 'lucide-react';

const Home = ({ setActivePage, onOpenLightbox }) => {
  const handleNav = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-12">
      
      {/* 1. HERO SECTION (100% Bright, Sharp & Clear Image with Zero Blurriness or Overlay) */}
      <section className="relative min-h-[85vh] flex items-center justify-start bg-gray-900 text-white overflow-hidden rounded-b-3xl sm:rounded-b-[2.5rem]">
        {/* Original Crisp Image - 100% Brightness & Zero Darkness */}
        <div className="absolute inset-0 z-0">
          <img
            src={SITE_INFO.heroImage}
            alt="Gouseva Maatra Seva Gaushala Hero"
            className="w-full h-full object-cover object-center filter-none"
          />
        </div>

        {/* Hero Content (Left Aligned with High Contrast Shadows) */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-left space-y-6 flex flex-col items-start justify-center w-full">
          
          {/* Small Label */}
          <div className="inline-flex items-center space-x-2 bg-[#1E3F20]/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#D4AF37] text-[#D4AF37] text-xs sm:text-sm font-bold tracking-wide uppercase shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E06D27] animate-pulse"></span>
            <span>{SITE_INFO.slogan}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-tight sm:leading-tight max-w-3xl text-left drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
            {SITE_INFO.heroHeading}
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-xl text-white font-sans font-semibold max-w-2xl text-left leading-relaxed drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
            {SITE_INFO.heroSubtitle}
          </p>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4 w-full sm:w-auto">
            <button
              onClick={() => handleNav('donate')}
              className="bg-gradient-to-r from-[#E06D27] to-[#D95B16] hover:from-[#d55f19] hover:to-[#c34e0f] text-white font-bold text-base px-8 py-4 rounded-2xl shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center space-x-2"
            >
              <span>🙏 Donate Now / Support Seva</span>
            </button>

            <button
              onClick={() => handleNav('about')}
              className="bg-[#1E3F20]/90 hover:bg-[#1E3F20] backdrop-blur-md text-white font-bold text-base px-7 py-4 rounded-2xl border border-[#D4AF37]/60 shadow-2xl transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2"
            >
              <span>About Our Mission</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="pt-6 flex flex-wrap items-center justify-start gap-4 text-xs sm:text-sm text-white border-t border-white/30 mt-6 w-full max-w-2xl">
            <div className="flex items-center space-x-2 bg-[#1E3F20]/80 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-white/20 shadow-md">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span className="font-bold">100% Transparent Trust</span>
            </div>
            <div className="flex items-center space-x-2 bg-[#1E3F20]/80 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-white/20 shadow-md">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span className="font-bold">24/7 Veterinary ICU</span>
            </div>
            <div className="flex items-center space-x-2 bg-[#1E3F20]/80 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-white/20 shadow-md">
              <Award className="w-4 h-4 text-[#D4AF37]" />
              <span className="font-bold">Sacred Sanctuary</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. ABOUT SECTION (Split Layout) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Image Card with Badge */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="/images/gau_aahar_feeding.png"
                alt="Gouseva Maatra Seva Gaushala Care"
                className="w-full h-[380px] sm:h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>

            {/* Floating Highlight Card */}
            <div className="absolute -bottom-6 -right-2 sm:bottom-6 sm:right-6 bg-white p-5 rounded-2xl card-shadow border border-[#D4AF37]/30 max-w-xs hidden xs:block">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#E06D27]/10 flex items-center justify-center text-[#E06D27]">
                  <Heart className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#1E3F20]">Pledge for Cow Protection</div>
                  <div className="text-xs text-gray-500">Continuous Love & Care</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-[#FAF6F0] px-3.5 py-1.5 rounded-full border border-[#D4AF37]/30 text-xs font-semibold text-[#E06D27] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#E06D27]"></span>
              <span>Our Mission & Purpose</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold text-[#1E3F20] font-heading leading-tight">
              A Sacred Endeavor Dedicated to Serving and Protecting Cows
            </h2>

            <p className="text-base text-gray-600 font-sans leading-relaxed">
              <strong>Gouseva Maatra Seva</strong> is a non-profit welfare trust committed to providing shelter, nutrition, and free veterinary medical care to stray, sick, elderly, and accident-injured cows.
            </p>

            <ul className="space-y-3 text-sm text-[#1C1917]">
              {[
                "Daily distribution of fresh green fodder, bran, and mineral feed",
                "24/7 emergency veterinary ambulance and surgical care",
                "Rehabilitation and lifelong sanctuary for injured & elderly cows",
                "Indigenous breed preservation & bio-organic farming initiatives"
              ].map((point, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-[#E06D27] shrink-0 mt-0.5" />
                  <span className="font-medium">{point}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <button
                onClick={() => handleNav('about')}
                className="inline-flex items-center space-x-2 bg-[#1E3F20] hover:bg-[#163319] text-white font-bold px-6 py-3.5 rounded-xl shadow-md transition-all cursor-pointer hover:shadow-lg"
              >
                <span>Read About Our Work</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 3. SEVA SECTION (6 Services Grid) */}
      <section className="bg-[#FAF6F0] py-16 sm:py-20 border-y border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            tag="Our Core Services"
            title="Comprehensive Cow Welfare Initiatives"
            subtitle="We care for every aspect of cow well-being through specialized dedicated programs."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onSelect={() => handleNav('seva')}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => handleNav('seva')}
              className="inline-flex items-center space-x-2 bg-white text-[#1E3F20] hover:bg-[#1E3F20] hover:text-white font-bold px-8 py-3.5 rounded-xl border border-[#1E3F20]/20 shadow-sm transition-all duration-300 cursor-pointer"
            >
              <span>Explore All Initiatives</span>
              <ChevronRight className="w-4 h-4 text-[#E06D27]" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. IMPACT STATS SECTION */}
      <StatsSection />

      {/* 5. DONATION CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#1E3F20] via-[#264D29] to-[#1E3F20] text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl border-2 border-[#D4AF37]">
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <span className="inline-block bg-[#E06D27] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
              🙏 Sacred Opportunity to Give
            </span>

            <h2 className="text-2xl sm:text-4xl font-bold font-heading leading-tight">
              "Your small gesture of kindness provides immense relief and life to a helpless cow."
            </h2>

            <p className="text-base sm:text-lg text-gray-200 font-sans max-w-xl mx-auto">
              Join our cow protection drive today. Your donation directly funds green fodder, medicines, and sanctuary care.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => handleNav('donate')}
                className="w-full sm:w-auto bg-[#E06D27] hover:bg-[#d55f19] text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>🙏 Donate Online</span>
              </button>

              <button
                onClick={() => handleNav('donate')}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold px-7 py-4 rounded-xl border border-white/20 transition-all cursor-pointer flex items-center justify-center space-x-2"
              >
                <PhoneCall className="w-4 h-4 text-[#D4AF37]" />
                <span>View Bank Transfer Info</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. GALLERY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          tag="Photo Gallery"
          title="Daily Activities & Sanctuary Moments"
          subtitle="Glimpses of selfless daily feeding, medical care, and peaceful moments at our Gaushala."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.slice(0, 6).map((item, idx) => (
            <div
              key={item.id}
              onClick={() => onOpenLightbox(item, idx)}
              className="group relative h-64 rounded-2xl overflow-hidden card-shadow cursor-pointer border border-gray-100"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-bold text-[#D4AF37] uppercase bg-black/40 px-2 py-0.5 rounded border border-[#D4AF37]/30">
                  {item.category}
                </span>
                <h4 className="text-base font-bold font-heading mt-1 group-hover:text-[#D4AF37] transition-colors">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => handleNav('gallery')}
            className="inline-flex items-center space-x-2 text-[#E06D27] hover:text-[#1E3F20] font-bold text-sm transition-colors cursor-pointer"
          >
            <span>View Full Photo Gallery →</span>
          </button>
        </div>
      </section>

      {/* 7. TESTIMONIALS SECTION */}
      <section className="bg-[#FAF6F0] py-16 sm:py-20 border-y border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            tag="Testimonials"
            title="What Our Donors & Supporters Say"
            subtitle="Genuine words of appreciation from well-wishers and animal welfare advocates."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="bg-white p-6 sm:p-8 rounded-2xl card-shadow border border-[#D4AF37]/20 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="text-[#E06D27] text-2xl font-serif">“</div>
                  <p className="text-sm text-gray-700 leading-relaxed font-sans italic">
                    {t.quote}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center space-x-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#D4AF37]"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#1E3F20]">{t.name}</h4>
                    <span className="text-xs text-gray-500">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="max-w-5xl mx-auto px-4 text-center space-y-6 pt-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3F20] font-heading">
          Be a Part of This Sacred Cow Protection Mission
        </h2>
        <p className="text-base text-gray-600 max-w-xl mx-auto">
          Your kindness brings peace, health, and comfort to vulnerable animals. Join us today.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => handleNav('donate')}
            className="w-full sm:w-auto bg-[#E06D27] hover:bg-[#d55f19] text-white font-bold px-8 py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
          >
            Donate Online
          </button>
          <button
            onClick={() => handleNav('contact')}
            className="w-full sm:w-auto bg-[#1E3F20] hover:bg-[#163319] text-white font-bold px-8 py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
          >
            Contact Us
          </button>
        </div>
      </section>

    </div>
  );
};

export default Home;
