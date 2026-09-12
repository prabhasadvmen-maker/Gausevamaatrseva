import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { SITE_INFO } from '../data/content';
import { API_BASE_URL } from '../config/api';

const AdminLogin = ({ onLoginSuccess, onBackToSite }) => {
  const [email, setEmail] = useState('superadmin@gousevamaatraseva.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      // Try connecting to backend API using dynamic environment API_BASE_URL
      const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem('adminToken', data.token || 'demo-admin-token-2026');
        localStorage.setItem('adminUser', JSON.stringify(data.user || { email, role: 'Super Admin' }));
        onLoginSuccess(data.user || { email, role: 'Super Admin' });
      } else {
        setErrorMessage(data.message || 'Invalid admin credentials');
      }
    } catch (err) {
      console.warn('Backend API connection failed, using fallback authentication:', err);
      // Fallback local auth if backend API is restarting
      if (
        (email === 'superadmin@gousevamaatraseva.com' || email === 'superadmin@gmail.com' || email === 'admin@gousevamaatraseva.com') &&
        password === 'admin123'
      ) {
        const fallbackUser = { email, role: 'Super Admin', name: 'Super Admin' };
        localStorage.setItem('adminToken', 'fallback-demo-token-2026');
        localStorage.setItem('adminUser', JSON.stringify(fallbackUser));
        onLoginSuccess(fallbackUser);
      } else {
        setErrorMessage('Invalid credentials. Use superadmin@gousevamaatraseva.com / admin123');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#163319] via-[#1E3F20] to-[#0D2411] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      
      {/* Background Glow Decorations */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#E06D27]/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Left Navigation Back Button */}
      <button
        onClick={onBackToSite}
        className="absolute top-6 left-6 z-20 flex items-center space-x-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-semibold border border-white/15 transition-all cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
        <span>Back to Main Website</span>
      </button>

      {/* Login Card Container */}
      <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#D4AF37]/30 relative z-10 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FAF6F0] rounded-2xl border-2 border-[#D4AF37]/40 shadow-sm p-2 mb-2">
            <img src={SITE_INFO.logoUrl} alt="Logo" className="w-full h-full object-contain" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#1E3F20] tracking-tight">
            Admin Portal Login
          </h2>

          <p className="text-xs sm:text-sm text-gray-500 font-sans font-medium">
            {SITE_INFO.name} • Trust Management System
          </p>
        </div>

        {/* Demo Hint Banner */}
        <div className="bg-[#FAF6F0] p-3.5 rounded-2xl border border-[#D4AF37]/30 text-xs text-[#1E3F20] flex items-start space-x-2.5">
          <ShieldCheck className="w-4 h-4 text-[#E06D27] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block text-[#E06D27]">Demo Admin Credentials:</span>
            <span className="font-mono text-gray-700">Email: superadmin@gousevamaatraseva.com</span><br/>
            <span className="font-mono text-gray-700">Password: admin123</span>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="bg-red-50 text-red-700 text-xs p-3.5 rounded-xl border border-red-200 animate-in fade-in">
            {errorMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* Email Field */}
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-bold text-[#1E3F20] uppercase tracking-wider block">
              Admin Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="superadmin@gousevamaatraseva.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-[#1E3F20] focus:ring-2 focus:ring-[#1E3F20]/20 text-sm font-medium text-gray-800 outline-none transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-bold text-[#1E3F20] uppercase tracking-wider block">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-300 focus:border-[#1E3F20] focus:ring-2 focus:ring-[#1E3F20]/20 text-sm font-medium text-gray-800 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#1E3F20] to-[#2D5A30] hover:from-[#163319] hover:to-[#224525] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-98 flex items-center justify-center space-x-2 cursor-pointer border border-[#D4AF37]/40"
          >
            {loading ? (
              <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
            ) : (
              <>
                <span>Login to Dashboard</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </>
            )}
          </button>

        </form>

        {/* Footer info */}
        <div className="pt-2 text-center text-xs text-gray-400 border-t border-gray-100">
          Gouseva Maatra Seva © 2026 • Secured Admin Access
        </div>

      </div>

    </div>
  );
};

export default AdminLogin;
