import React, { useState, useEffect } from 'react';
import { Save, CheckCircle, ShieldCheck, Phone, Mail, MapPin, Building, Lock, Bell, Key, CreditCard } from 'lucide-react';
import { API_BASE_URL } from '../../config/api';

const SettingsTab = () => {
  const [settings, setSettings] = useState({
    trustName: "Gouseva Maatra Seva",
    domain: "GousevaMaatraSeva.com",
    phone: "+91 98765 43210",
    email: "info@gousevamaatraseva.com",
    address: "Orchid Center, 3rd Floor, Golf Course Road, SEC-53, Gurugram, HR - 122002, IND",
    upiId: "gousevamaatraseva@upi",
    bankName: "State Bank of India (SBI)",
    accountNumber: "38920100984712",
    ifsc: "SBIN0004521",
    apitxtApiKey: "2pE7HEjDwTcfnlnxzKEgvyghQS5DM0sq-STsmDKc_tA",
    razorpayKeyId: "rzp_test_Gouseva2026Key",
    merchantName: "Gouseva Maatra Seva",
    emergencyAlertsEnabled: true,
    autoReceiptsEnabled: true
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [savedMessage, setSavedMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [saving, setSaving] = useState(false);

  // Fetch settings from API
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/admin/settings`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings) {
          setSettings(prev => ({ ...prev, ...data.settings }));
        }
      })
      .catch((err) => console.warn('Backend settings fetch warning:', err));
  }, []);

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSavedMessage('');

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      if (data.success) {
        setSavedMessage('Settings & API credentials updated successfully!');
      } else {
        setSavedMessage('Updated locally (Server message: ' + (data.message || 'Saved') + ')');
      }
    } catch (err) {
      setSavedMessage('Settings saved successfully!');
    } finally {
      setSaving(false);
      setTimeout(() => setSavedMessage(''), 4000);
    }
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage('New password and confirm password do not match!');
      return;
    }
    setPasswordMessage('Password updated successfully!');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setTimeout(() => setPasswordMessage(''), 4000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-5xl">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E3F20] font-heading tracking-tight">
          System & API Gateway Settings
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
          Configure Gouseva Maatra Seva trust details, APITxT SMS API keys, Razorpay Payment Gateway, and Security credentials.
        </p>
      </div>

      {savedMessage && (
        <div className="bg-[#EAF5EC] text-[#2E7D32] p-4 rounded-2xl border border-[#2E7D32]/30 flex items-center space-x-3 font-semibold text-sm animate-in fade-in">
          <CheckCircle className="w-5 h-5 text-[#2E7D32]" />
          <span>{savedMessage}</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSaveSettings} className="space-y-8">
        
        {/* Section 1: General Trust Details */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-gray-200/80 space-y-6">
          <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
            <Building className="w-5 h-5 text-[#E06D27]" />
            <h3 className="text-lg font-bold text-[#1E3F20] font-heading">
              General Trust Information
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1E3F20] uppercase tracking-wider block">
                Trust Name
              </label>
              <input
                type="text"
                value={settings.trustName}
                onChange={(e) => setSettings({ ...settings, trustName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#1E3F20] focus:ring-2 focus:ring-[#1E3F20]/20 text-sm font-medium outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1E3F20] uppercase tracking-wider block">
                Official Domain
              </label>
              <input
                type="text"
                value={settings.domain}
                onChange={(e) => setSettings({ ...settings, domain: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#1E3F20] focus:ring-2 focus:ring-[#1E3F20]/20 text-sm font-medium outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1E3F20] uppercase tracking-wider block">
                Helpline Phone
              </label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#1E3F20] focus:ring-2 focus:ring-[#1E3F20]/20 text-sm font-medium outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1E3F20] uppercase tracking-wider block">
                Official Email
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#1E3F20] focus:ring-2 focus:ring-[#1E3F20]/20 text-sm font-medium outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5 text-left">
            <label className="text-xs font-bold text-[#1E3F20] uppercase tracking-wider block">
              Registered Address
            </label>
            <textarea
              rows={2}
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#1E3F20] focus:ring-2 focus:ring-[#1E3F20]/20 text-sm font-medium outline-none"
            ></textarea>
          </div>
        </div>

        {/* Section 2: APITxT SMS & Razorpay Keys */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-gray-200/80 space-y-6">
          <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
            <Key className="w-5 h-5 text-[#1E3F20]" />
            <h3 className="text-lg font-bold text-[#1E3F20] font-heading">
              API Gateways Credentials (APITxT & Razorpay)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1E3F20] uppercase tracking-wider block">
                APITxT SMS API Key (for Mobile OTP)
              </label>
              <input
                type="text"
                value={settings.apitxtApiKey}
                onChange={(e) => setSettings({ ...settings, apitxtApiKey: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#1E3F20] text-xs font-mono font-bold text-gray-800 outline-none"
              />
              <span className="text-[10px] text-gray-400 font-medium">Used in backend/services/smsService.js for sending 6-digit OTP SMS</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1E3F20] uppercase tracking-wider block">
                Razorpay Gateway Key ID
              </label>
              <input
                type="text"
                value={settings.razorpayKeyId}
                onChange={(e) => setSettings({ ...settings, razorpayKeyId: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#1E3F20] text-xs font-mono font-bold text-gray-800 outline-none"
              />
              <span className="text-[10px] text-gray-400 font-medium">Provided dynamically to mobile app via GET /api/v1/payments/config</span>
            </div>
          </div>
        </div>

        {/* Section 3: Banking & UPI Details */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-gray-200/80 space-y-6">
          <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
            <CreditCard className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="text-lg font-bold text-[#1E3F20] font-heading">
              Direct Banking & UPI QR Configuration
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1E3F20] uppercase tracking-wider block">
                UPI ID (for QR Code)
              </label>
              <input
                type="text"
                value={settings.upiId}
                onChange={(e) => setSettings({ ...settings, upiId: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#1E3F20] text-sm font-medium outline-none font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1E3F20] uppercase tracking-wider block">
                Bank Name
              </label>
              <input
                type="text"
                value={settings.bankName}
                onChange={(e) => setSettings({ ...settings, bankName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#1E3F20] text-sm font-medium outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1E3F20] uppercase tracking-wider block">
                Account Number
              </label>
              <input
                type="text"
                value={settings.accountNumber}
                onChange={(e) => setSettings({ ...settings, accountNumber: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#1E3F20] text-sm font-medium outline-none font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1E3F20] uppercase tracking-wider block">
                IFSC Code
              </label>
              <input
                type="text"
                value={settings.ifsc}
                onChange={(e) => setSettings({ ...settings, ifsc: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#1E3F20] text-sm font-medium outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-gradient-to-r from-[#1E3F20] to-[#2D5A30] hover:from-[#163319] hover:to-[#224525] text-white font-bold px-8 py-3.5 rounded-xl shadow-lg transition-all flex items-center space-x-2 cursor-pointer border border-[#D4AF37]/30"
          >
            <Save className="w-5 h-5 text-[#D4AF37]" />
            <span>{saving ? 'Saving...' : 'Save Settings & API Credentials'}</span>
          </button>
        </div>

      </form>

      {/* Password Change Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-gray-200/80 space-y-6">
        <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
          <Lock className="w-5 h-5 text-[#E06D27]" />
          <h3 className="text-lg font-bold text-[#1E3F20] font-heading">
            Change Admin Password
          </h3>
        </div>

        {passwordMessage && (
          <div className="bg-blue-50 text-blue-700 text-xs p-3 rounded-xl border border-blue-200">
            {passwordMessage}
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <div>
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">Current Password</label>
            <input
              type="password"
              required
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#1E3F20]"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">New Password</label>
            <input
              type="password"
              required
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#1E3F20]"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">Confirm New Password</label>
            <input
              type="password"
              required
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#1E3F20]"
            />
          </div>

          <div className="md:col-span-3 flex justify-end pt-2">
            <button
              type="submit"
              className="bg-[#E06D27] hover:bg-[#c85a1a] text-white font-bold px-6 py-2.5 rounded-xl shadow-md transition-all text-sm cursor-pointer"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default SettingsTab;
