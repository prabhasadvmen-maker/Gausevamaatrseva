import React from 'react';
import DonationCard from '../components/DonationCard';
import SectionTitle from '../components/SectionTitle';
import StatsSection from '../components/StatsSection';
import { ShieldCheck, Heart, Award } from 'lucide-react';

const Donate = ({ showToast }) => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. Page Hero */}
      <section className="bg-gradient-to-b from-[#1E3F20] to-[#163319] text-white py-16 sm:py-24 relative overflow-hidden rounded-b-3xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest px-3.5 py-1.5 bg-white/10 rounded-full border border-[#D4AF37]/30">
            🙏 Online Donation Hub
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-heading text-white tracking-tight">
            Support Cow Welfare & Protection
          </h1>
          <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto font-sans">
            "Every dollar donated directly funds fresh fodder, emergency surgery, and lifelong sanctuary shelter for helpless cows."
          </p>
        </div>
      </section>

      {/* 2. Primary Donation Card */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <DonationCard showToast={showToast} />
      </section>

      {/* 3. Why Donate / Transparency Guarantee */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          tag="Donation Integrity"
          title="100% Transparency & Direct Impact"
          subtitle="Gouseva Maatra Seva upholds complete transparency and accountability for all contributions."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl card-shadow border border-[#D4AF37]/20 space-y-3 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#E06D27]/10 flex items-center justify-center text-[#E06D27] mx-auto">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-[#1E3F20] font-heading">100% Direct Utilization</h3>
            <p className="text-sm text-gray-600 font-sans">
              Your donations directly fund green fodder, grain feed, veterinary medicines, and sanctuary infrastructure.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl card-shadow border border-[#D4AF37]/20 space-y-3 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#1E3F20]/10 flex items-center justify-center text-[#1E3F20] mx-auto">
              <Heart className="w-7 h-7 text-[#D4AF37]" />
            </div>
            <h3 className="text-xl font-bold text-[#1E3F20] font-heading">Instant Receipt & Updates</h3>
            <p className="text-sm text-gray-600 font-sans">
              Digital receipts are issued upon receiving your donation, with regular feeding updates shared on WhatsApp.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl card-shadow border border-[#D4AF37]/20 space-y-3 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#FAF6F0] border border-[#D4AF37]/40 flex items-center justify-center text-[#E06D27] mx-auto">
              <Award className="w-7 h-7 text-[#E06D27]" />
            </div>
            <h3 className="text-xl font-bold text-[#1E3F20] font-heading">Profound Humanitarian Impact</h3>
            <p className="text-sm text-gray-600 font-sans">
              Sponsoring cow feeding on birthdays or anniversaries brings joy, peace, and fulfillment to your family.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Stats Impact */}
      <StatsSection />

    </div>
  );
};

export default Donate;
