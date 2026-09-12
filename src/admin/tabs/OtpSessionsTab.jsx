import React from 'react';
import { Smartphone, ShieldCheck, Key, RefreshCw, Send, CheckCircle2 } from 'lucide-react';
import { API_BASE_URL } from '../../config/api';

const OtpSessionsTab = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E3F20] font-heading tracking-tight flex items-center gap-2">
            <Smartphone className="w-7 h-7 text-[#E06D27]" />
            <span>Mobile OTP & APITxT SMS Sessions</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
            Real-time status of APITxT SMS Gateway integration, active OTP login sessions, and rate-limit tracking.
          </p>
        </div>

        <div className="inline-flex items-center space-x-2 bg-[#EAF5EC] border border-[#2E7D32]/20 px-3.5 py-2 rounded-full text-xs font-bold text-[#2E7D32]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#2E7D32] inline-block animate-pulse"></span>
          <span>APITxT Gateway Connected</span>
        </div>
      </div>

      {/* Gateway Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-200/80 space-y-2">
          <span className="text-[10px] font-extrabold uppercase bg-emerald-50 text-[#2E7D32] px-2.5 py-1 rounded-full border border-emerald-200">
            SMS Gateway
          </span>
          <div className="text-2xl font-extrabold text-[#1E3F20] font-heading">APITxT API</div>
          <p className="text-xs text-gray-500 font-medium">https://apitxt.com/api/sendOTP</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-200/80 space-y-2">
          <span className="text-[10px] font-extrabold uppercase bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full border border-blue-200">
            OTP Security
          </span>
          <div className="text-2xl font-extrabold text-[#1E3F20] font-heading">6-Digit SMS</div>
          <p className="text-xs text-gray-500 font-medium">5 Minutes Expiry & 30s Resend Cooldown</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-200/80 space-y-2">
          <span className="text-[10px] font-extrabold uppercase bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full border border-amber-200">
            Rate Limiting
          </span>
          <div className="text-2xl font-extrabold text-[#1E3F20] font-heading">Max 3 / 10 Min</div>
          <p className="text-xs text-gray-500 font-medium">Enforces 429 TOO_MANY_REQUESTS</p>
        </div>
      </div>

      {/* Active APIs Reference */}
      <div className="bg-white rounded-2xl p-6 shadow-xs border border-gray-200/80 space-y-4">
        <h3 className="text-lg font-bold text-[#1E3F20] font-heading">OTP Service Endpoints</h3>
        <div className="space-y-3 font-mono text-xs">
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
            <span className="font-bold text-blue-700">POST /api/v1/auth/send-otp</span>
            <span className="font-sans text-gray-500 text-[11px]">API-01: Generates 6-digit OTP & sends SMS</span>
          </div>

          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
            <span className="font-bold text-emerald-700">POST /api/v1/auth/verify-otp</span>
            <span className="font-sans text-gray-500 text-[11px]">API-02: Verifies OTP & returns 30-day JWT</span>
          </div>

          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
            <span className="font-bold text-amber-700">POST /api/v1/auth/resend-otp</span>
            <span className="font-sans text-gray-500 text-[11px]">API-03: Resends fresh OTP after cooldown</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default OtpSessionsTab;
