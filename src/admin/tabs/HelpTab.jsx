import React, { useState } from 'react';
import { HelpCircle, PhoneCall, Mail, ShieldAlert, ChevronDown, ChevronUp, FileText, CheckCircle2 } from 'lucide-react';
import { SITE_INFO } from '../../data/content';

const HelpTab = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const faqs = [
    {
      question: "How do I manage daily green fodder & feeding targets?",
      answer: "Go to the Settings tab, under General Trust Information or System Parameters, edit the daily feed target value. The Overview KPI cards and statistics update automatically in real-time."
    },
    {
      question: "What should I do if a transaction does not appear in Overview?",
      answer: "Transactions sync automatically via the backend API. Click the 'Filter Transactions' or refresh icon on the Overview table. If the donor transferred manually, check the bank portal."
    },
    {
      question: "How do I enable 24/7 Emergency Ambulance SMS notification alerts?",
      answer: "In the Settings tab under 'System Alert Preferences', toggle '24/7 Emergency Ambulance Alerts' ON. Ensure your registered helpline number is active."
    },
    {
      question: "How do I add new admin users or volunteer accounts?",
      answer: "Go to the USERS section on the left sidebar navigation drawer to create staff roles and configure volunteer access parameters."
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-5xl">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E3F20] font-heading tracking-tight">
          Help & Support Center
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
          Documentation, operational guidelines, FAQs, and system diagnostics for Gouseva Maatra Seva Admins.
        </p>
      </div>

      {/* Emergency Tech Support Banner */}
      <div className="bg-gradient-to-r from-[#1E3F20] to-[#2D5A30] text-white p-6 sm:p-8 rounded-2xl shadow-md border border-[#D4AF37]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-[#D4AF37] border border-white/20">
            <PhoneCall className="w-3.5 h-3.5" />
            <span>24/7 Technical Helpline</span>
          </div>
          <h3 className="text-xl font-bold font-heading">Need Immediate Technical Assistance?</h3>
          <p className="text-sm text-gray-200">
            Our engineering team is available 24/7 for server maintenance, database synchronization, or urgent alerts.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <a
            href={`tel:${SITE_INFO.phone}`}
            className="bg-[#E06D27] hover:bg-[#c85a1a] text-white font-bold px-5 py-3 rounded-xl shadow-md transition-all text-sm flex items-center justify-center space-x-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call Support</span>
          </a>
          <a
            href={`mailto:support@${SITE_INFO.domain}`}
            className="bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-3 rounded-xl border border-white/20 transition-all text-sm flex items-center justify-center space-x-2"
          >
            <Mail className="w-4 h-4 text-[#D4AF37]" />
            <span>Email Tech Team</span>
          </a>
        </div>
      </div>

      {/* System Health Diagnostics */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-[#1E3F20] font-heading flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#2E7D32]" />
            <span>System Health & Status Diagnostics</span>
          </h3>
          <span className="text-xs font-bold bg-[#EAF5EC] text-[#2E7D32] px-3 py-1 rounded-full border border-[#2E7D32]/20">
            100% Operational
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium text-gray-600 pt-2">
          <div className="bg-[#FAF6F0] p-4 rounded-xl border border-[#D4AF37]/20">
            <div className="text-gray-400 font-bold uppercase tracking-wider mb-1">Backend API</div>
            <div className="text-sm font-bold text-[#1E3F20]">Connected (Node.js Port 5000)</div>
          </div>
          <div className="bg-[#FAF6F0] p-4 rounded-xl border border-[#D4AF37]/20">
            <div className="text-gray-400 font-bold uppercase tracking-wider mb-1">Database Sync</div>
            <div className="text-sm font-bold text-[#1E3F20]">Synchronized & Secured</div>
          </div>
          <div className="bg-[#FAF6F0] p-4 rounded-xl border border-[#D4AF37]/20">
            <div className="text-gray-400 font-bold uppercase tracking-wider mb-1">Security SSL</div>
            <div className="text-sm font-bold text-[#1E3F20]">256-bit TLS Encrypted</div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-4 text-left">
        <div className="flex items-center space-x-2 pb-2">
          <HelpCircle className="w-5 h-5 text-[#E06D27]" />
          <h3 className="text-lg font-bold text-[#1E3F20] font-heading">
            Admin Frequently Asked Questions
          </h3>
        </div>

        <div className="divide-y divide-gray-100">
          {faqs.map((faq, idx) => (
            <div key={idx} className="py-4 space-y-2">
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? -1 : idx)}
                className="w-full flex items-center justify-between text-left font-bold text-sm text-[#1E3F20] hover:text-[#E06D27] transition-colors focus:outline-none"
              >
                <span>{faq.question}</span>
                {openFaqIndex === idx ? (
                  <ChevronUp className="w-4 h-4 text-[#E06D27] shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                )}
              </button>

              {openFaqIndex === idx && (
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pt-1 pl-1">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default HelpTab;
