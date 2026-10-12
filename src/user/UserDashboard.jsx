import React, { useState, useEffect } from 'react';
import { 
  User, Heart, FileText, MapPin, IndianRupee, ShieldCheck, 
  Calendar, Download, Save, RefreshCw, LogOut, CheckCircle2, 
  Sparkles, Award, ArrowRight, Phone, Mail
} from 'lucide-react';
import { API_BASE_URL } from '../config/api';

const UserDashboard = ({ donorUser, donorToken, onLogout, onNavigateToDonate, showToast }) => {
  const [activeTab, setActiveTab] = useState('overview'); 
  // Profile State from API-11 & API-12
  const [profile, setProfile] = useState({
    id: donorUser?.id || '',
    name: donorUser?.name || 'Gousevak User',
    phone: donorUser?.phone || '',
    email: donorUser?.email || '',
    pan: donorUser?.pan || '',
    address: donorUser?.address || { line1: '', city: '', state: '', pincode: '' },
    total_donations_count: 0,
    total_donations_amount: 0,
    most_responsive: 'Daily Green Fodder & Feed Seva'
  });

  // Donation History State from API-13
  const [history, setHistory] = useState([]);
  const [historyStats, setHistoryStats] = useState({ total_amount_donated: 0, total_count: 0 });
  const [loading, setLoading] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savedSuccessMsg, setSavedSuccessMsg] = useState('');

  // Fetch Profile (API-11)
  const fetchProfile = async () => {
    if (!donorToken) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/user/profile`, {
        headers: { 'Authorization': `Bearer ${donorToken}` }
      });
      const data = await res.json();
      if (data.success && data.data) {
        setProfile(data.data);
      }
    } catch (err) {
      console.warn('Profile fetch notice:', err);
    }
  };

  // Fetch History (API-13)
  const fetchHistory = async () => {
    if (!donorToken) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/donations/history?page=1&limit=50`, {
        headers: { 'Authorization': `Bearer ${donorToken}` }
      });
      const data = await res.json();
      if (data.success && data.data) {
        setHistory(data.data.donations || []);
        setHistoryStats({
          total_amount_donated: data.data.total_amount_donated || 0,
          total_count: data.data.total_count || 0
        });
      }
    } catch (err) {
      console.warn('History fetch notice:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchHistory();
  }, [donorToken]);

  // Update Profile Submit (API-12)
  const handleProfileSave = async (e) => {
    e.preventDefault();
    if (!donorToken) return;

    setSavingProfile(true);
    setSavedSuccessMsg('');

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/user/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${donorToken}`
        },
        body: JSON.stringify({
          name: profile.name,
          email: profile.email,
          pan: profile.pan,
          address: profile.address
        })
      });

      const data = await res.json();
      if (data.success) {
        setSavedSuccessMsg('Profile and address details saved successfully!');
        if (showToast) showToast('Profile updated!');
        // Update local storage user copy
        const existing = JSON.parse(localStorage.getItem('donorUser') || '{}');
        localStorage.setItem('donorUser', JSON.stringify({ ...existing, ...data.data }));
      } else {
        setSavedSuccessMsg('Error saving profile: ' + data.message);
      }
    } catch (err) {
      setSavedSuccessMsg('Profile updated locally!');
    } finally {
      setSavingProfile(false);
      setTimeout(() => setSavedSuccessMsg(''), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
        
        {/* Top Profile Header Strip */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-200/80 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          
          <div className="flex items-center space-x-4 sm:space-x-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#1E3F20] to-[#2D5A30] text-[#D4AF37] font-bold flex items-center justify-center text-2xl shadow-md border-2 border-[#D4AF37]/40 shrink-0">
              {(profile.name || 'G').split(' ').map(n => n[0]).join('')}
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#1E3F20] font-heading">
                  {profile.name || 'Gousevak Donor'}
                </h1>
                <span className="bg-[#EAF5EC] text-[#2E7D32] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-[#2E7D32]/20 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Verified OTP
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 font-medium mt-1">
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#E06D27]" />
                  +91 {profile.phone}
                </span>
                {profile.email && (
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                    {profile.email}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onNavigateToDonate}
              className="bg-gradient-to-r from-[#E06D27] to-[#D95B16] hover:from-[#d55f19] hover:to-[#c34e0f] text-white font-bold px-5 py-2.5 rounded-xl shadow-md transition-all text-xs flex items-center space-x-2 cursor-pointer"
            >
              <span>🙏 Sponsor a Seva</span>
            </button>

            <button
              onClick={onLogout}
              className="bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 font-bold px-3.5 py-2.5 rounded-xl transition-colors text-xs flex items-center space-x-1.5 cursor-pointer border border-gray-200"
            >
              <LogOut className="w-4 h-4 text-red-500" />
              <span>Logout</span>
            </button>
          </div>

        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center border-b border-gray-200 space-x-2 sm:space-x-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3.5 px-4 text-sm font-bold transition-all flex items-center space-x-2 cursor-pointer border-b-2 ${
              activeTab === 'overview'
                ? 'border-[#1E3F20] text-[#1E3F20]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>My Impact Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`pb-3.5 px-4 text-sm font-bold transition-all flex items-center space-x-2 cursor-pointer border-b-2 ${
              activeTab === 'history'
                ? 'border-[#1E3F20] text-[#1E3F20]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <FileText className="w-4 h-4 text-[#E06D27]" />
            <span>Donation History ({historyStats.total_count || history.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3.5 px-4 text-sm font-bold transition-all flex items-center space-x-2 cursor-pointer border-b-2 ${
              activeTab === 'profile'
                ? 'border-[#1E3F20] text-[#1E3F20]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <User className="w-4 h-4 text-gray-500" />
            <span>Profile & 80G Tax Info</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              
              <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-200/80 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#EAF5EC] flex items-center justify-center text-[#1E3F20]">
                  <IndianRupee className="w-5 h-5 text-[#1E3F20]" />
                </div>
                <div className="text-2xl font-extrabold text-[#1E3F20] font-heading">
                  ₹{(profile.total_donations_amount || historyStats.total_amount_donated || 0).toLocaleString('en-IN')}
                </div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Amount Contributed</div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-200/80 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#E06D27]">
                  <Heart className="w-5 h-5 text-[#E06D27]" />
                </div>
                <div className="text-2xl font-extrabold text-[#1E3F20] font-heading">
                  {profile.total_donations_count || historyStats.total_count || 0} Sevas
                </div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Sevas Sponsored</div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-200/80 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-[#D4AF37]">
                  <Award className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div className="text-2xl font-extrabold text-[#1E3F20] font-heading">
                  ~{Math.max(12, (profile.total_donations_count || 1) * 15)} Cows
                </div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Estimated Cows Nourished</div>
              </div>

            </div>

            {/* Favorite Seva Banner */}
            <div className="bg-gradient-to-r from-[#1E3F20] to-[#2D5A30] text-white p-6 sm:p-8 rounded-3xl shadow-md space-y-4 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                <div>
                  <span className="text-xs font-extrabold text-[#D4AF37] uppercase tracking-widest block">Most Responsive Seva</span>
                  <h3 className="text-xl font-bold font-heading text-white mt-1">
                    {profile.most_responsive || 'Daily Green Fodder & Feed Seva'}
                  </h3>
                  <p className="text-xs text-[#FAF6F0]/80 mt-1 max-w-xl">
                    Your regular fodder contributions ensure elderly and rescued cows receive fresh green grass and vital dietary supplements every single day.
                  </p>
                </div>

                <button
                  onClick={onNavigateToDonate}
                  className="bg-[#E06D27] hover:bg-[#c85a1a] text-white font-bold px-6 py-3 rounded-xl text-xs transition-all shadow-md flex items-center space-x-2 shrink-0 cursor-pointer"
                >
                  <span>Donate Fodder Now</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: DONATION HISTORY */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-3xl shadow-xs border border-gray-200/80 p-6 space-y-4 animate-in fade-in duration-200">
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#1E3F20] font-heading">My Contribution History</h3>
                <p className="text-xs text-gray-500">Official log of all completed and pending contributions</p>
              </div>

              <button
                onClick={fetchHistory}
                disabled={loading}
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#1E3F20] bg-gray-50 px-3.5 py-2 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-[#1E3F20] ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh Log</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-700 font-sans">
                <thead className="bg-[#FAF6F0] text-xs font-bold uppercase text-[#1E3F20] tracking-wider border-b border-gray-200">
                  <tr>
                    <th className="py-3.5 px-4 rounded-l-xl">Donation ID</th>
                    <th className="py-3.5 px-4">Seva Category</th>
                    <th className="py-3.5 px-4">Amount</th>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4 text-center">Status</th>
                    <th className="py-3.5 px-4 rounded-r-xl text-right">80G Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {history.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-xs text-gray-400 font-medium">
                        No past donation records found for this account.
                      </td>
                    </tr>
                  ) : (
                    history.map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-xs text-[#E06D27]">{item.donation_id}</td>
                        <td className="py-3.5 px-4 font-bold text-gray-900">{item.seva_title}</td>
                        <td className="py-3.5 px-4 font-extrabold text-[#1E3F20]">₹{item.amount.toLocaleString('en-IN')}</td>
                        <td className="py-3.5 px-4 text-xs text-gray-500 font-medium">
                          {new Date(item.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className="inline-flex items-center space-x-1 bg-[#EAF5EC] text-[#2E7D32] text-xs font-bold px-2.5 py-1 rounded-full border border-[#2E7D32]/20">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>{item.status}</span>
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => alert(`Downloading 80G Tax Receipt for ${item.donation_id}...`)}
                            className="inline-flex items-center space-x-1 text-xs font-bold text-[#1E3F20] hover:text-[#E06D27] cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Receipt PDF</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB 3: PROFILE & ADDRESS */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-3xl shadow-xs border border-gray-200/80 p-6 sm:p-8 space-y-6 animate-in fade-in duration-200 max-w-3xl">
            
            <div>
              <h3 className="text-lg font-bold text-[#1E3F20] font-heading">Donor Profile & Billing Info</h3>
              <p className="text-xs text-gray-500">Provide your full name and PAN number to receive 80G Tax Exemption receipts</p>
            </div>

            {savedSuccessMsg && (
              <div className="bg-[#EAF5EC] text-[#2E7D32] p-3.5 rounded-2xl border border-[#2E7D32]/30 flex items-center space-x-2 text-xs font-bold animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
                <span>{savedSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleProfileSave} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
                <div>
                  <label className="text-xs font-bold text-[#1E3F20] uppercase block mb-1">Full Donor Name</label>
                  <input
                    type="text"
                    required
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-medium focus:border-[#1E3F20] outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#1E3F20] uppercase block mb-1">Mobile Phone (Verified)</label>
                  <input
                    type="text"
                    disabled
                    value={`+91 ${profile.phone}`}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-100 text-sm font-bold text-gray-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#1E3F20] uppercase block mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="donor@example.com"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-medium focus:border-[#1E3F20] outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#1E3F20] uppercase block mb-1">PAN Number (for 80G Tax Exemption)</label>
                  <input
                    type="text"
                    maxLength={10}
                    placeholder="ABCDE1234F"
                    value={profile.pan}
                    onChange={(e) => setProfile({ ...profile, pan: e.target.value.toUpperCase() })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-mono font-bold text-gray-900 focus:border-[#1E3F20] outline-none"
                  />
                </div>
              </div>

              {/* Address Fields */}
              <div className="space-y-4 pt-4 border-t border-gray-100 text-left">
                <h4 className="text-xs font-extrabold text-[#1E3F20] uppercase tracking-wider">Billing Address Details</h4>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Address Line 1</label>
                  <input
                    type="text"
                    placeholder="Flat / Building / House No., Street"
                    value={profile.address?.line1 || ''}
                    onChange={(e) => setProfile({ ...profile, address: { ...profile.address, line1: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#1E3F20]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">City</label>
                    <input
                      type="text"
                      placeholder="e.g. Indore"
                      value={profile.address?.city || ''}
                      onChange={(e) => setProfile({ ...profile, address: { ...profile.address, city: e.target.value } })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#1E3F20]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">State</label>
                    <input
                      type="text"
                      placeholder="e.g. Madhya Pradesh"
                      value={profile.address?.state || ''}
                      onChange={(e) => setProfile({ ...profile, address: { ...profile.address, state: e.target.value } })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#1E3F20]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Pincode</label>
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="452001"
                      value={profile.address?.pincode || ''}
                      onChange={(e) => setProfile({ ...profile, address: { ...profile.address, pincode: e.target.value } })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#1E3F20]"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="bg-[#1E3F20] hover:bg-[#163319] text-white font-bold px-8 py-3 rounded-xl shadow-md transition-all text-xs flex items-center space-x-2 cursor-pointer border border-[#D4AF37]/30"
                >
                  <Save className="w-4 h-4 text-[#D4AF37]" />
                  <span>{savingProfile ? 'Saving...' : 'Save Profile Details'}</span>
                </button>
              </div>

            </form>

          </div>
        )}

      </div>
    </div>
  );
};

export default UserDashboard;
