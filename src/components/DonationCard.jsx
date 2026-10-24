import React, { useState, useEffect } from 'react';
import { DONATION_PRESETS } from '../data/content';
import { CreditCard, Loader } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

const DonationCard = ({ showToast }) => {
  const [selectedPreset, setSelectedPreset] = useState(1100);
  const [customAmount, setCustomAmount] = useState('');
  const [razorpayConfig, setRazorpayConfig] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRazorpayConfig();
  }, []);

  const fetchRazorpayConfig = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/payments/config`);
      const data = await response.json();
      if (data.success) {
        setRazorpayConfig(data.data);
      }
    } catch (error) {
      console.error('Error fetching Razorpay config:', error);
    }
  };

  const finalAmount = customAmount ? parseInt(customAmount) : selectedPreset;

  const handleRazorpayPayment = async () => {
    if (!razorpayConfig) {
      showToast('Payment gateway not available');
      return;
    }

    if (finalAmount < 10) {
      showToast('Minimum donation amount is ₹10');
      return;
    }

    setLoading(true);
    try {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        const options = {
          key: razorpayConfig.key_id,
          amount: finalAmount * 100,
          currency: 'INR',
          name: razorpayConfig.merchant_name,
          description: `Donation for Cow Welfare - ₹${finalAmount}`,
          image: razorpayConfig.merchant_logo,
          handler: function (response) {
            showToast('Payment successful! Thank you for your donation.');
            console.log('Payment Response:', response);
            setCustomAmount('');
          },
          prefill: {
            name: 'Donor',
            email: 'donor@gousevamaatraseva.com',
            contact: '9876543210'
          },
          theme: {
            color: razorpayConfig.theme.color
          },
          modal: {
            ondismiss: function () {
              showToast('Payment cancelled');
              setLoading(false);
            }
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
        setLoading(false);
      };
      document.body.appendChild(script);
    } catch (error) {
      console.error('Error initiating payment:', error);
      showToast('Error initiating payment');
      setLoading(false);
    }
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
      <div className="mb-6">
        <label className="block text-xs font-bold text-[#1E3F20] uppercase tracking-wider mb-2.5 text-center sm:text-left">
          Select Donation Preset Amount:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
          {DONATION_PRESETS.map((preset) => (
            <button
              key={preset.amount}
              onClick={() => {
                setSelectedPreset(preset.amount);
                setCustomAmount('');
              }}
              className={`p-3 sm:p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                !customAmount && selectedPreset === preset.amount
                  ? 'bg-[#1E3F20] text-white border-[#1E3F20] shadow-md scale-102 font-bold'
                  : 'bg-[#FDFBF7] text-[#1C1917] border-gray-200 hover:border-[#E06D27]/50 hover:bg-[#FAF6F0]'
              }`}
            >
              <div className="text-base sm:text-lg font-bold font-heading">{preset.label}</div>
              <div className={`text-[10px] sm:text-[11px] mt-1 ${!customAmount && selectedPreset === preset.amount ? 'text-[#D4AF37]' : 'text-gray-500'}`}>
                {preset.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Amount Input */}
      <div className="mb-8">
        <label className="block text-xs font-bold text-[#1E3F20] uppercase tracking-wider mb-2.5 text-center sm:text-left">
          Or Enter Custom Amount:
        </label>
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#1E3F20] font-bold text-lg">₹</span>
            <input
              type="number"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder="Enter amount (min ₹10)"
              className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#E06D27] focus:outline-none text-[#1E3F20] font-bold text-lg"
            />
          </div>
        </div>
      </div>

      {/* Razorpay Payment Section */}
      <div className="bg-[#FAF6F0] rounded-2xl p-4 sm:p-6 border border-[#D4AF37]/30 space-y-4">
        <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 text-center space-y-3">
          <div className="text-sm text-gray-600">
            <p className="font-semibold text-[#1E3F20] mb-2">Donation Amount: <span className="text-lg text-[#E06D27]">₹{finalAmount}</span></p>
            <p className="text-xs text-gray-500">Secure payment via Razorpay</p>
          </div>
          <button
            onClick={handleRazorpayPayment}
            disabled={loading}
            className="w-full bg-[#E06D27] hover:bg-[#d55f19] disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md active:scale-98"
          >
            {loading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4" />
                <span>Donate ₹{finalAmount} Now</span>
              </>
            )}
          </button>
        </div>
        <div className="text-[11px] sm:text-xs text-center text-gray-500 space-y-1">
          <p>✓ Secure & encrypted payment</p>
          <p>✓ Instant receipt & confirmation</p>
          <p>✓ All major cards & digital wallets accepted</p>
        </div>
      </div>

      {/* Note & Security Badge */}
      <div className="mt-6 pt-5 border-t border-gray-100 text-center text-[11px] sm:text-xs text-gray-500">
        <p className="font-semibold text-[#1E3F20]">
          Your contribution is 100% transparent and directly utilized for cow care.
        </p>
        <p className="mt-2">Helpline (WhatsApp): +91 98765 43210</p>
      </div>
    </div>
  );
};

export default DonationCard;
