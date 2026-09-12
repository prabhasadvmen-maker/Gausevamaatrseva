import React, { useState, useEffect } from 'react';
import { Phone, Lock, Heart, ArrowRight, CheckCircle2, RefreshCw, ShieldCheck, ArrowLeft } from 'lucide-react';
import { SITE_INFO } from '../data/content';
import { API_BASE_URL } from '../config/api';

const UserLogin = ({ onLoginSuccess, onBackToSite, showToast }) => {
  const [step, setStep] = useState(1); // 1: Enter Phone, 2: Enter OTP
  const [phone, setPhone] = useState('9876543210');
  const [otp, setOtp] = useState('');
  const [sessionId, setSessionId] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Resend Countdown Timer
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let interval = null;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Step 1: Request OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    if (!cleanPhone || cleanPhone.length !== 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleanPhone, country_code: '+91' })
      });

      const data = await res.json();
      if (data.success) {
        setSessionId(data.session_id);
        setStep(2);
        setTimer(30);
        setCanResend(false);
        if (showToast) showToast('OTP sent successfully to +91 ' + cleanPhone);
      } else {
        setErrorMessage(data.message || 'Failed to send OTP. Please try again.');
      }
    } catch (err) {
      setErrorMessage('Network error connecting to auth server.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!otp || otp.length < 4) {
      setErrorMessage('Please enter the valid OTP code.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          phone,
          country_code: '+91',
          otp
        })
      });

      const data = await res.json();
      if (data.success && data.token) {
        localStorage.setItem('donorToken', data.token);
        localStorage.setItem('donorUser', JSON.stringify(data.user));

        if (showToast) showToast(`Welcome back, ${data.user.name || 'Gousevak'}!`);
        onLoginSuccess(data.user, data.token);
      } else {
        setErrorMessage(data.message || 'Invalid OTP. Please check and try again.');
      }
    } catch (err) {
      setErrorMessage('Network error during verification.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;
    setErrorMessage('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/auth/resend-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId, channel: 'SMS' })
      });
      const data = await res.json();
      if (data.success) {
        setTimer(30);
        setCanResend(false);
        if (showToast) showToast('New OTP sent via SMS.');
      } else {
        setErrorMessage(data.message || 'Resend failed. Please wait a moment.');
      }
    } catch (err) {
      setErrorMessage('Failed to resend OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1C1917] flex flex-col justify-between font-sans selection:bg-[#E06D27]/20 relative overflow-hidden">
      
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#1E3F20]/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E06D27]/5 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none"></div>

      {/* Top Header Bar */}
      <header className="p-4 sm:p-6 flex items-center justify-between max-w-7xl mx-auto w-full relative z-10">
        <button
          onClick={onBackToSite}
          className="inline-flex items-center space-x-2 text-xs font-bold text-[#1E3F20] bg-white border border-gray-200 px-4 py-2 rounded-xl shadow-xs hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#1E3F20]" />
          <span>Back to Main Website</span>
        </button>

        <div className="flex items-center space-x-2">
          <img src={SITE_INFO.logoUrl} alt="Logo" className="w-8 h-8 object-contain" />
          <span className="font-bold text-sm text-[#1E3F20] font-heading hidden sm:inline">Gouseva Maatra Seva</span>
        </div>
      </header>

      {/* Main Login Card Container */}
      <main className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-xl border border-gray-200/80 space-y-6 animate-in fade-in duration-300">
          
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#EAF5EC] text-[#1E3F20] flex items-center justify-center mx-auto shadow-xs border border-[#1E3F20]/20">
              <Heart className="w-7 h-7 text-[#1E3F20] fill-[#1E3F20]/20" />
            </div>
            <h2 className="text-2xl font-extrabold text-[#1E3F20] font-heading">
              {step === 1 ? 'Donor Portal Login' : 'Verify Mobile OTP'}
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              {step === 1
                ? 'Enter your mobile number to access your donor account & 80G receipts'
                : `Enter the 6-digit OTP code sent to +91 ${phone}`}
            </p>
          </div>

          {errorMessage && (
            <div className="bg-red-50 text-red-700 text-xs font-semibold p-3.5 rounded-xl border border-red-200 text-center animate-in fade-in">
              {errorMessage}
            </div>
          )}

          {/* STEP 1: Phone Input */}
          {step === 1 && (
            <form onSubmit={handleSendOtp} className="space-y-5">
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-[#1E3F20] uppercase tracking-wider block">
                  Mobile Number
                </label>
                <div className="flex items-center rounded-xl border border-gray-300 overflow-hidden focus-within:border-[#1E3F20] focus-within:ring-2 focus-within:ring-[#1E3F20]/20 transition-all">
                  <span className="bg-gray-100 text-gray-700 text-sm font-bold px-3.5 py-3.5 border-r border-gray-200">
                    🇮🇳 +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-3.5 py-3.5 text-sm font-bold text-gray-900 outline-none tracking-wider"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1E3F20] hover:bg-[#163319] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer border border-[#D4AF37]/30"
              >
                <span>{loading ? 'Sending OTP...' : 'Send Verification OTP'}</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </button>

              <div className="flex items-center justify-center space-x-1.5 text-[11px] text-gray-500 font-medium pt-2 border-t border-gray-100">
                <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
                <span>Instant APITxT SMS Gateway Verification</span>
              </div>
            </form>
          )}

          {/* STEP 2: OTP Verification Input */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div className="space-y-1.5 text-left">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#1E3F20] uppercase tracking-wider block">
                    Enter 6-Digit OTP
                  </label>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-[11px] font-bold text-[#E06D27] hover:underline"
                  >
                    Change Number
                  </button>
                </div>

                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="w-full text-center tracking-widest text-2xl font-mono font-extrabold px-4 py-3.5 rounded-xl border border-gray-300 focus:border-[#1E3F20] focus:ring-2 focus:ring-[#1E3F20]/20 outline-none text-[#1E3F20]"
                />
                <span className="text-[11px] text-gray-400 block text-center mt-1">
                  Demo OTP for testing: <strong>123456</strong> or <strong>482910</strong>
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#1E3F20] to-[#2D5A30] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer border border-[#D4AF37]/30"
              >
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                <span>{loading ? 'Verifying OTP...' : 'Verify OTP & Access Portal'}</span>
              </button>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-100">
                <span className="text-gray-500 font-medium">Didn't get the SMS?</span>
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={loading}
                    className="font-bold text-[#1E3F20] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-[#E06D27]" />
                    <span>Resend OTP</span>
                  </button>
                ) : (
                  <span className="font-semibold text-gray-400">
                    Resend in <strong className="text-[#1E3F20]">{timer}s</strong>
                  </span>
                )}
              </div>
            </form>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-xs text-gray-500 font-medium relative z-10">
        © 2026 {SITE_INFO.name}. All Rights Reserved.
      </footer>

    </div>
  );
};

export default UserLogin;
