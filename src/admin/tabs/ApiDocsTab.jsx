import React, { useState } from 'react';
import { Code, CheckCircle2, Copy, Shield, Server, Smartphone, ExternalLink } from 'lucide-react';

const ApiDocsTab = () => {
  const [copiedId, setCopiedId] = useState(null);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const apiEndpoints = [
    {
      id: "api-01",
      ref: "API-01",
      name: "Send Mobile OTP",
      method: "POST",
      endpoint: "/api/v1/auth/send-otp",
      auth: "Public",
      desc: "Sends 6-digit OTP via APITxT SMS API gateway",
      sampleReq: `{
  "phone": "9876543210",
  "country_code": "+91"
}`,
      sampleRes: `{
  "success": true,
  "message": "OTP sent successfully",
  "session_id": "sess_otp_1789196854329_mpt3xz",
  "expires_in": 300
}`
    },
    {
      id: "api-02",
      ref: "API-02",
      name: "Verify OTP & Login",
      method: "POST",
      endpoint: "/api/v1/auth/verify-otp",
      auth: "Public",
      desc: "Validates session_id & OTP, creates user, issues 30-day JWT Bearer Token",
      sampleReq: `{
  "session_id": "sess_otp_...",
  "phone": "9876543210",
  "country_code": "+91",
  "otp": "482910"
}`,
      sampleRes: `{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1Ni...",
  "user": {
    "id": "usr_9876543210",
    "phone": "9876543210",
    "name": "Priya Sharma"
  }
}`
    },
    {
      id: "api-03",
      ref: "API-03",
      name: "Resend OTP",
      method: "POST",
      endpoint: "/api/v1/auth/resend-otp",
      auth: "Public",
      desc: "Rate-limited OTP resend (enforces 30s cooldown)",
      sampleReq: `{
  "session_id": "sess_otp_...",
  "channel": "SMS"
}`,
      sampleRes: `{
  "success": true,
  "message": "OTP sent successfully via SMS",
  "session_id": "sess_otp_...",
  "expires_in": 300
}`
    },
    {
      id: "api-04",
      ref: "API-04",
      name: "Get Home Dashboard & Banners",
      method: "GET",
      endpoint: "/api/v1/home/dashboard",
      auth: "Optional Auth (Bearer Token)",
      desc: "Powers Mobile Screen 2 (Hero banner, community impact stats, featured sevas)",
      sampleReq: "Headers: Authorization: Bearer <token>",
      sampleRes: `{
  "success": true,
  "data": {
    "hero_banner": { "title": "Protect & Feed Mother Cows Daily" },
    "all_time_community_impact": { "cows_fed": 18450 },
    "featured_sevas": [...]
  }
}`
    },
    {
      id: "api-06",
      ref: "API-06",
      name: "Get Seva Details & Preset Amounts",
      method: "GET",
      endpoint: "/api/v1/sevas/seva_gaush_bhojan",
      auth: "Public",
      desc: "Powers Screen 3 Donation Payment screen preset chips",
      sampleReq: "GET /api/v1/sevas/seva_gaush_bhojan",
      sampleRes: `{
  "success": true,
  "data": {
    "id": "seva_gaush_bhojan",
    "title": "Daily Green Fodder & Feed Seva",
    "default_amount": 1100,
    "preset_amounts": [100, 250, 500, 1100, 2100, 5100]
  }
}`
    },
    {
      id: "api-07",
      ref: "API-07",
      name: "Get Razorpay Gateway Config",
      method: "GET",
      endpoint: "/api/v1/payments/config",
      auth: "Public",
      desc: "Provides dynamic Razorpay Key ID and merchant branding",
      sampleReq: "GET /api/v1/payments/config",
      sampleRes: `{
  "success": true,
  "data": {
    "gateway": "razorpay",
    "key_id": "rzp_test_Gouseva2026Key",
    "merchant_name": "Gouseva Maatra Seva"
  }
}`
    },
    {
      id: "api-08",
      ref: "API-08",
      name: "Create Razorpay Donation Order",
      method: "POST",
      endpoint: "/api/v1/donations/create-order",
      auth: "Optional Auth",
      desc: "Creates pending donation record & Razorpay order ID",
      sampleReq: `{
  "seva_id": "seva_gaush_bhojan",
  "amount": 1100,
  "donor_name": "Priya Sharma",
  "donor_phone": "+919876543210"
}`,
      sampleRes: `{
  "success": true,
  "data": {
    "donation_id": "don_1789196855786",
    "razorpay_order_id": "order_T36WZ2FAI7",
    "amount": 1100,
    "key_id": "rzp_test_Gouseva2026Key"
  }
}`
    },
    {
      id: "api-09",
      ref: "API-09",
      name: "Verify Razorpay Payment Signature",
      method: "POST",
      endpoint: "/api/v1/donations/verify-payment",
      auth: "Optional Auth",
      desc: "Verifies HMAC signature, marks status COMPLETED, generates receipt",
      sampleReq: `{
  "donation_id": "don_...",
  "razorpay_order_id": "order_...",
  "razorpay_payment_id": "pay_...",
  "razorpay_signature": "..."
}`,
      sampleRes: `{
  "success": true,
  "message": "Donation marked successful",
  "data": {
    "donation_id": "don_...",
    "status": "COMPLETED",
    "receipt_number": "GMS-2026-0004"
  }
}`
    },
    {
      id: "api-11",
      ref: "API-11",
      name: "Get User Profile",
      method: "GET",
      endpoint: "/api/v1/user/profile",
      auth: "Private (Bearer Token)",
      desc: "Loads basic user details and total donation metrics",
      sampleReq: "Headers: Authorization: Bearer <token>",
      sampleRes: `{
  "success": true,
  "data": {
    "name": "Priya Sharma",
    "phone": "9876543210",
    "total_donations_count": 4,
    "total_donations_amount": 5400
  }
}`
    },
    {
      id: "api-12",
      ref: "API-12",
      name: "Update User Profile Details",
      method: "PUT",
      endpoint: "/api/v1/user/profile",
      auth: "Private (Bearer Token)",
      desc: "Saves donor full name, email, and billing address details",
      sampleReq: `{
  "name": "Priya Sharma",
  "email": "priya.sharma@example.com",
  "address": { "line1": "Flat 402", "city": "Indore" }
}`,
      sampleRes: `{
  "success": true,
  "message": "Profile updated successfully"
}`
    },
    {
      id: "api-13",
      ref: "API-13",
      name: "Get User Donation History",
      method: "GET",
      endpoint: "/api/v1/donations/history",
      auth: "Private (Bearer Token)",
      desc: "Paginated past completed & pending donations log",
      sampleReq: "GET /api/v1/donations/history?page=1&limit=20",
      sampleRes: `{
  "success": true,
  "data": {
    "count": 4,
    "total_amount_donated": 5400,
    "donations": [...]
  }
}`
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-6xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E3F20] font-heading tracking-tight flex items-center gap-2">
            <Smartphone className="w-7 h-7 text-[#E06D27]" />
            <span>Android & Mobile REST API Suite</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
            Complete production specification for mobile application developers integrating Gouseva Maatra Seva backend APIs.
          </p>
        </div>

        <div className="inline-flex items-center space-x-2 bg-[#1E3F20] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs">
          <Server className="w-4 h-4 text-[#D4AF37]" />
          <span>Base URL: http://localhost:5000</span>
        </div>
      </div>

      {/* Endpoints List */}
      <div className="space-y-6">
        {apiEndpoints.map((api) => (
          <div key={api.id} className="bg-white rounded-2xl p-6 shadow-xs border border-gray-200/80 space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <span className="font-extrabold text-xs text-[#E06D27] font-mono bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200">
                  {api.ref}
                </span>
                <span className={`text-xs font-extrabold px-2.5 py-1 rounded-lg uppercase ${
                  api.method === 'POST' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                  api.method === 'PUT' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                  'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}>
                  {api.method}
                </span>
                <h3 className="text-base font-bold text-[#1E3F20] font-heading">{api.name}</h3>
              </div>

              <div className="flex items-center space-x-3 text-xs">
                <span className="text-gray-500 font-medium">Auth: <strong className="text-gray-800">{api.auth}</strong></span>
              </div>
            </div>

            <div className="flex items-center justify-between bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-200 font-mono text-xs font-bold text-gray-800">
              <span>{api.endpoint}</span>
              <button
                onClick={() => copyToClipboard(api.endpoint, api.id)}
                className="text-gray-500 hover:text-[#1E3F20] flex items-center space-x-1 cursor-pointer"
              >
                {copiedId === api.id ? (
                  <span className="text-emerald-600 font-sans text-[11px] font-bold">Copied!</span>
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            <p className="text-xs text-gray-600 font-medium">{api.desc}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Request Summary / Body</span>
                <pre className="bg-[#1C1917] text-emerald-400 p-3.5 rounded-xl text-[11px] font-mono overflow-x-auto leading-relaxed max-h-40">
                  {api.sampleReq}
                </pre>
              </div>

              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Sample Success Response</span>
                <pre className="bg-[#1C1917] text-amber-300 p-3.5 rounded-xl text-[11px] font-mono overflow-x-auto leading-relaxed max-h-40">
                  {api.sampleRes}
                </pre>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default ApiDocsTab;
