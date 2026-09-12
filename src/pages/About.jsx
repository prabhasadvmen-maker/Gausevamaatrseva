import React from 'react';
import SectionTitle from '../components/SectionTitle';
import StatsSection from '../components/StatsSection';
import { SITE_INFO } from '../data/content';
import { ShieldCheck, Heart, Eye, Target, Sparkles, CheckCircle2, Users, Award } from 'lucide-react';

const About = ({ setActivePage, onDonateClick }) => {
  const handleNav = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const values = [
    { title: "Compassion & Empathy", desc: "Selfless care, love, and affection for every single animal." },
    { title: "100% Transparency", desc: "Every dollar donated goes directly into cow feed and medicine." },
    { title: "Duty of Service", desc: "Upholding cow protection as a supreme ethical responsibility." },
    { title: "Eco-Preservation", desc: "Indigenous breed conservation and organic bio-fertilizer production." }
  ];

  const team = [
    {
      name: "Swami Chidambaranand",
      role: "Founder & Spiritual Mentor",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
      desc: "Over 20 years of dedicated service in cow conservation and community empowerment."
    },
    {
      name: "Dr. Virendra Singh",
      role: "Head Veterinary Surgeon",
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80",
      desc: "Expert in emergency trauma care, bovine surgery, and rehabilitation."
    },
    {
      name: "Anand Sharma",
      role: "Operations Coordinator",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      desc: "Oversees daily fodder logistics, sanctuary sanitation, and volunteer coordination."
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. Page Hero */}
      <section className="bg-gradient-to-b from-[#1E3F20] to-[#163319] text-white py-16 sm:py-24 relative overflow-hidden rounded-b-3xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest px-3 py-1 bg-white/10 rounded-full border border-[#D4AF37]/30">
            About Our Sanctuary • About Us
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-heading text-white tracking-tight">
            Gouseva Maatra Seva Trust
          </h1>
          <p className="text-base sm:text-xl text-gray-200 max-w-2xl mx-auto font-sans">
            A non-profit organization dedicated to the care, rehabilitation, and protection of cows.
          </p>
        </div>
      </section>

      {/* 2. Main Story / About Organization */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <SectionTitle
              tag="Our Organization"
              title="Our Commitment to Cow Protection"
              centered={false}
            />
            <p className="text-base text-gray-700 leading-relaxed font-sans">
              <strong>Gouseva Maatra Seva</strong> was established with a singular noble goal: ensuring that no cow suffers from hunger, disease, abandonment, or traffic accidents. Over 500 sheltered cows reside safely in our sanctuary.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed font-sans">
              We believe that serving animals is a fundamental human duty. Within our grounds, we maintain high standards of cleanliness, medical care, and affectionate daily routine.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-[#FAF6F0] p-4 rounded-xl border border-[#D4AF37]/30">
                <div className="text-2xl font-bold text-[#E06D27] font-heading">500+</div>
                <div className="text-xs text-gray-600 font-medium">Sheltered & Rescued Cows</div>
              </div>
              <div className="bg-[#FAF6F0] p-4 rounded-xl border border-[#D4AF37]/30">
                <div className="text-2xl font-bold text-[#1E3F20] font-heading">24/7</div>
                <div className="text-xs text-gray-600 font-medium">Emergency Vet Ambulance</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1000&q=80"
                alt="Gaushala Sanctuary Environment"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission, Vision, Values Grid */}
      <section className="bg-[#FAF6F0] py-16 border-y border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            tag="Core Principles"
            title="Our Mission, Vision & Values"
            subtitle="Every action we take is driven by empathy, welfare, and sustainable sanctuary management."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Mission Card */}
            <div className="bg-white p-8 rounded-2xl card-shadow border border-[#D4AF37]/30 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#E06D27]/10 flex items-center justify-center text-[#E06D27]">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#1E3F20] font-heading">Our Mission</h3>
              <p className="text-sm text-gray-600 leading-relaxed font-sans">
                To provide immediate medical intervention, nutritious fodder, and lifelong dignified shelter to every abandoned, sick, or accident-injured cow.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-white p-8 rounded-2xl card-shadow border border-[#D4AF37]/30 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#1E3F20]/10 flex items-center justify-center text-[#1E3F20]">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#1E3F20] font-heading">Our Vision</h3>
              <p className="text-sm text-gray-600 leading-relaxed font-sans">
                A compassionate society where cows are treated with respect, protected from harm, and allowed to live peacefully in healthy natural environments.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="bg-white p-5 rounded-xl border border-gray-200">
                <div className="flex items-center space-x-2 text-[#E06D27] mb-2 font-bold text-sm font-heading">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{v.title}</span>
                </div>
                <p className="text-xs text-gray-600 font-sans">{v.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Why Gau Seva Matters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#1E3F20] to-[#264D29] rounded-3xl p-8 sm:p-12 text-white border-2 border-[#D4AF37] shadow-xl">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full">
              Ethical & Ecological Impact
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading">
              Why Cow Welfare Matters
            </h2>
            <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-sans">
              Cows play a vital role in organic agriculture, ecological balance, and humane ethical living. Serving and protecting them cultivates harmony, empathy, and sustainable environmental health.
            </p>
            <div className="pt-2">
              <button
                onClick={() => handleNav('donate')}
                className="bg-[#E06D27] hover:bg-[#d55f19] text-white font-bold text-sm px-6 py-3 rounded-xl transition-all cursor-pointer shadow-md"
              >
                🙏 Take the Pledge to Support
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Team / Volunteers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          tag="Our Leadership"
          title="Dedicated Team & Caregivers"
          subtitle="Meet the individuals driving daily medical care, sanctuary management, and volunteer programs."
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <div key={idx} className="bg-white rounded-2xl overflow-hidden card-shadow border border-gray-100 text-center p-6 space-y-4">
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-[#FAF6F0] shadow-md"
              />
              <div>
                <h4 className="text-lg font-bold text-[#1E3F20] font-heading">{member.name}</h4>
                <span className="text-xs text-[#E06D27] font-semibold block mt-0.5">{member.role}</span>
                <p className="text-xs text-gray-600 mt-2 font-sans">{member.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Stats Section */}
      <StatsSection />

      {/* 7. Final CTA */}
      <section className="max-w-4xl mx-auto text-center px-4 space-y-5">
        <h3 className="text-2xl sm:text-3xl font-bold text-[#1E3F20] font-heading">
          Every Step You Take Towards Cow Protection Is Priceless
        </h3>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => handleNav('donate')}
            className="bg-[#E06D27] text-white font-bold px-8 py-3.5 rounded-xl shadow-md hover:bg-[#d55f19] cursor-pointer"
          >
            Donate Online
          </button>
          <button
            onClick={() => handleNav('contact')}
            className="bg-[#1E3F20] text-white font-bold px-8 py-3.5 rounded-xl shadow-md hover:bg-[#163319] cursor-pointer"
          >
            Contact Us
          </button>
        </div>
      </section>

    </div>
  );
};

export default About;
