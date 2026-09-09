import React, { useState } from 'react';
import { BANK_DETAILS, DONATION_PRESETS } from '../data/content';
import { Copy, Check, QrCode, CreditCard, Building, Heart } from 'lucide-react';

const DonationCard = ({ showToast }) => {
  const [selectedPreset, setSelectedPreset] = useState(1100);
  const [copiedField, setCopiedField] = useState('');
  const [activeTab, setActiveTab] = useState('upi'); // 'upi' | 'bank' | 'qr'

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    if (showToast) {
      showToast(`${fieldName} copied to clipboard!`);
    }
    setTimeout(() => {
      setCopiedField('');
    }, 2000);
  };

  return (
    <div className="bg-white rounded-3xl card-shadow border border-[#D4AF37]/30 p-5 sm:p-8 lg:p-10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#E06D27]/5 to-transparent rounded-bl-full pointer-events-none"></div>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
        <span className="inline-block bg-[#FAF6F0] text-[#E06D27] text-[11px] sm:text-xs font-bold px-3 py-1 sm:py-1.5 rounded-full border border-[#D4AF37]/30 uppercase tracking-wide">
          🙏 Direct Online Donation
        </span>
        <h3 className="text-xl sm:text-3xl font-bold text-[#1E3F20] font-heading mt-2.5 sm:mt-3">
          Make a Noble Contribution for Cow Welfare
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 mt-2 font-sans">
          "Your support empowers us to continuously feed, treat, and shelter rescued cows."
        </p>
      </div>

      {/* Quick Amount Selector Presets */}
      <div className="mb-6 sm:mb-8">
        <label className="block text-xs font-bold text-[#1E3F20] uppercase tracking-wider mb-2.5 text-center sm:text-left">
          Select Donation Preset Amount:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
          {DONATION_PRESETS.map((preset) => (
            <button
              key={preset.amount}
              onClick={() => setSelectedPreset(preset.amount)}
              className={`p-3 sm:p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                selectedPreset === preset.amount
                  ? 'bg-[#1E3F20] text-white border-[#1E3F20] shadow-md scale-102 font-bold'
                  : 'bg-[#FDFBF7] text-[#1C1917] border-gray-200 hover:border-[#E06D27]/50 hover:bg-[#FAF6F0]'
              }`}
            >
              <div className="text-base sm:text-lg font-bold font-heading">{preset.label}</div>
              <div className={`text-[10px] sm:text-[11px] mt-1 ${selectedPreset === preset.amount ? 'text-[#D4AF37]' : 'text-gray-500'}`}>
                {preset.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Payment Channels Tabs */}
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('upi')}
          className={`flex-1 py-2.5 sm:py-3 text-center font-bold text-xs sm:text-sm border-b-2 transition-colors cursor-pointer flex items-center justify-center space-x-1.5 sm:space-x-2 whitespace-nowrap px-3 ${
            activeTab === 'upi'
              ? 'border-[#E06D27] text-[#E06D27]'
              : 'border-transparent text-gray-500 hover:text-[#1E3F20]'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>UPI / GPay / PhonePe</span>
        </button>

        <button
          onClick={() => setActiveTab('bank')}
          className={`flex-1 py-2.5 sm:py-3 text-center font-bold text-xs sm:text-sm border-b-2 transition-colors cursor-pointer flex items-center justify-center space-x-1.5 sm:space-x-2 whitespace-nowrap px-3 ${
            activeTab === 'bank'
              ? 'border-[#E06D27] text-[#E06D27]'
              : 'border-transparent text-gray-500 hover:text-[#1E3F20]'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>Bank Wire Transfer</span>
        </button>

        <button
          onClick={() => setActiveTab('qr')}
          className={`flex-1 py-2.5 sm:py-3 text-center font-bold text-xs sm:text-sm border-b-2 transition-colors cursor-pointer flex items-center justify-center space-x-1.5 sm:space-x-2 whitespace-nowrap px-3 ${
            activeTab === 'qr'
              ? 'border-[#E06D27] text-[#E06D27]'
              : 'border-transparent text-gray-500 hover:text-[#1E3F20]'
          }`}
        >
          <QrCode className="w-4 h-4" />
          <span>QR Code Scanner</span>
        </button>
      </div>

      {/* Tab Content 1: UPI */}
      {activeTab === 'upi' && (
        <div className="bg-[#FAF6F0] rounded-2xl p-4 sm:p-6 border border-[#D4AF37]/30 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-xl border border-gray-200">
            <div>
              <span className="text-[11px] text-gray-500 font-medium block">Official UPI ID</span>
              <span className="text-base sm:text-lg font-extrabold text-[#1E3F20] font-mono tracking-wide break-all">
                {BANK_DETAILS.upiId}
              </span>
            </div>
            <button
              onClick={() => copyToClipboard(BANK_DETAILS.upiId, 'UPI ID')}
              className="w-full sm:w-auto bg-[#E06D27] hover:bg-[#d55f19] text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-xs active:scale-98"
            >
              {copiedField === 'UPI ID' ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy UPI ID</span>
                </>
              )}
            </button>
          </div>
          <div className="text-[11px] sm:text-xs text-center text-gray-500">
            Scan and pay directly using Google Pay, PhonePe, Paytm, BHIM, or any UPI App.
          </div>
        </div>
      )}

      {/* Tab Content 2: BANK DETAILS */}
      {activeTab === 'bank' && (
        <div className="bg-[#FAF6F0] rounded-2xl p-4 sm:p-6 border border-[#D4AF37]/30 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="bg-white p-3 rounded-xl border border-gray-200">
              <span className="text-[10px] text-gray-400 block font-medium">Bank Name</span>
              <span className="font-bold text-[#1E3F20]">{BANK_DETAILS.bankName}</span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-gray-200">
              <span className="text-[10px] text-gray-400 block font-medium">Account Name</span>
              <span className="font-bold text-[#1E3F20]">{BANK_DETAILS.accountName}</span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-gray-200 flex justify-between items-center">
              <div>
                <span className="text-[10px] text-gray-400 block font-medium">Account Number</span>
                <span className="font-bold font-mono text-[#1E3F20] text-xs sm:text-sm">{BANK_DETAILS.accountNumber}</span>
              </div>
              <button
                onClick={() => copyToClipboard(BANK_DETAILS.accountNumber, 'Account Number')}
                className="text-xs text-[#E06D27] hover:underline p-1 cursor-pointer font-bold"
              >
                Copy
              </button>
            </div>

            <div className="bg-white p-3 rounded-xl border border-gray-200 flex justify-between items-center">
              <div>
                <span className="text-[10px] text-gray-400 block font-medium">IFSC Code</span>
                <span className="font-bold font-mono text-[#1E3F20] text-xs sm:text-sm">{BANK_DETAILS.ifsc}</span>
              </div>
              <button
                onClick={() => copyToClipboard(BANK_DETAILS.ifsc, 'IFSC Code')}
                className="text-xs text-[#E06D27] hover:underline p-1 cursor-pointer font-bold"
              >
                Copy
              </button>
            </div>
          </div>
          <div className="text-[11px] text-gray-500 text-center pt-1">
            Branch: {BANK_DETAILS.branch} | Wire / NEFT / RTGS / IMPS accepted
          </div>
        </div>
      )}

      {/* Tab Content 3: QR CODE */}
      {activeTab === 'qr' && (
        <div className="bg-[#FAF6F0] rounded-2xl p-4 sm:p-6 border border-[#D4AF37]/30 flex flex-col items-center justify-center text-center">
          <div className="bg-white p-3 sm:p-4 rounded-2xl border-2 border-[#D4AF37] shadow-md inline-block relative">
            <svg
              className="w-36 h-36 sm:w-44 sm:h-44 text-[#1E3F20]"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              <rect x="0" y="0" width="100" height="100" fill="#FFFFFF" />
              <rect x="5" y="5" width="30" height="30" fill="#1E3F20" />
              <rect x="10" y="10" width="20" height="20" fill="#FFFFFF" />
              <rect x="15" y="15" width="10" height="10" fill="#E06D27" />

              <rect x="65" y="5" width="30" height="30" fill="#1E3F20" />
              <rect x="70" y="10" width="20" height="20" fill="#FFFFFF" />
              <rect x="75" y="15" width="10" height="10" fill="#E06D27" />

              <rect x="5" y="65" width="30" height="30" fill="#1E3F20" />
              <rect x="10" y="70" width="20" height="20" fill="#FFFFFF" />
              <rect x="15" y="75" width="10" height="10" fill="#E06D27" />

              <rect x="40" y="10" width="15" height="15" fill="#1E3F20" />
              <rect x="45" y="30" width="20" height="10" fill="#1E3F20" />
              <rect x="10" y="40" width="25" height="15" fill="#1E3F20" />
              <rect x="45" y="45" width="15" height="15" fill="#E06D27" />
              <rect x="65" y="40" width="25" height="10" fill="#1E3F20" />
              <rect x="40" y="65" width="20" height="20" fill="#1E3F20" />
              <rect x="65" y="65" width="25" height="25" fill="#1E3F20" />
              <rect x="70" y="70" width="15" height="15" fill="#FFFFFF" />
            </svg>
            <div className="mt-2 text-[10px] sm:text-[11px] font-bold text-[#E06D27]">Gauseva Matr Seva QR</div>
          </div>
          <p className="text-[11px] sm:text-xs text-gray-600 mt-3 max-w-sm">
            {BANK_DETAILS.qrPlaceholderNote}
          </p>
        </div>
      )}

      {/* Note & Security Badge */}
      <div className="mt-6 pt-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-gray-500 gap-2.5 text-center sm:text-left">
        <div className="flex items-center space-x-2">
          <Heart className="w-4 h-4 text-[#E06D27] fill-current shrink-0" />
          <span>Your contribution is 100% transparent and directly utilized for cow care.</span>
        </div>
        <div className="font-semibold text-[#1E3F20]">
          Helpline (WhatsApp): +91 98765 43210
        </div>
      </div>
    </div>
  );
};

export default DonationCard;
