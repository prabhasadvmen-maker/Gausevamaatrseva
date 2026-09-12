import React, { useState, useEffect } from 'react';
import { Phone, Lock, X, CheckCircle2, ArrowRight, RefreshCw, ShieldCheck, Heart } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

const UserLoginModal = ({ isOpen, onClose, onLoginSuccess, showToast }) => {
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

  if (!isOpen) return null;

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
        onClose();
      } else {
        setErrorMessage(data.message || 'Invalid OTP. Please check and try again.');
      }
    } catch (err) {
      setErrorMessage('Network error during verification.');
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP handler
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
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-6 relative border border-gray-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#EAF5EC] text-[#1E3F20] flex items-center justify-center mx-auto shadow-xs border border-[#1E3F20]/20">
            <Heart className="w-6 h-6 text-[#1E3F20] fill-[#1E3F20]/20" />
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#1E3F20] font-heading">
            {step === 1 ? 'Donor Mobile Login' : 'Verify Mobile OTP'}
          </h2>
          <p className="text-xs text-gray-500 font-medium">
            {step === 1
              ? 'Enter your registered mobile number to receive a 6-digit OTP'
              : `Enter the code sent to +91 ${phone}`}
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="bg-red-50 text-red-700 text-xs font-semibold p-3 rounded-xl border border-red-200 text-center animate-in fade-in">
            {errorMessage}
          </div>
        )}

        {/* STEP 1: Phone Form */}
        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-5">
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-bold text-[#1E3F20] uppercase tracking-wider block">
                Mobile Number
              </label>
              <div className="flex items-center rounded-xl border border-gray-300 overflow-hidden focus-within:border-[#1E3F20] focus-within:ring-2 focus-within:ring-[#1E3F20]/20 transition-all">
                <span className="bg-gray-100 text-gray-700 text-sm font-bold px-3.5 py-3 border-r border-gray-200">
                  🇮🇳 +91
                </span>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-3.5 py-3 text-sm font-bold text-gray-900 outline-none tracking-wider"
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

            <div className="flex items-center justify-center space-x-1.5 text-[11px] text-gray-500 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" />
              <span>Instant 256-bit Secure OTP Verification</span>
            </div>
          </form>
        )}

        {/* STEP 2: OTP Verification Form */}
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
                className="w-full text-center tracking-widest text-2xl font-mono font-extrabold px-4 py-3 rounded-xl border border-gray-300 focus:border-[#1E3F20] focus:ring-2 focus:ring-[#1E3F20]/20 outline-none text-[#1E3F20]"
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
              <span>{loading ? 'Verifying OTP...' : 'Verify OTP & Access Dashboard'}</span>
            </button>

            {/* Resend Controls */}
            <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-100">
              <span className="text-gray-500 font-medium">Didn't get the SMS?</span>
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={loading}
                  className="font-bold text-[#1E3F20] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3 text-[#E06D27]" />
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
    </div>
  );
};

export default UserLoginModal;
