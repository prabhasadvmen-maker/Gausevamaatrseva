import React, { useState, useEffect } from 'react';
import { 
  Building2, Users, IndianRupee, Heart, RefreshCw, CheckCircle2, 
  TrendingUp, PlusCircle, Search, Download, Sparkles, X, Clock
} from 'lucide-react';
import { API_BASE_URL } from '../../config/api';

const OverviewTab = () => {
  const [stats, setStats] = useState({
    totalNgos: 1,
    totalUsers: 0,
    totalDonations: '₹0',
    activeVolunteers: 0,
    systemStatus: 'System Live and Synchronized',
    dateFormatted: new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  });

  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  
  // Modal State for Quick Add Donation
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDonationForm, setNewDonationForm] = useState({
    donor_name: '',
    amount: '',
    seva_title: 'Daily Green Fodder & Feed Seva',
    payment_mode: 'Cash/Direct'
  });
  const [addingDonation, setAddingDonation] = useState(false);

  // Fetch API data from backend
  const fetchData = async () => {
    setLoading(true);
    try {
      const statsRes = await fetch(`${API_BASE_URL}/api/admin/stats`);
      const statsData = await statsRes.json();
      if (statsData.success) {
        setStats(statsData.data);
      }

      const donRes = await fetch(`${API_BASE_URL}/api/admin/donations`);
      const donData = await donRes.json();
      if (donData.success && Array.isArray(donData.donations)) {
        setDonations(donData.donations);
      }
    } catch (err) {
      console.warn('Backend API fetch notice:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddDonationSubmit = async (e) => {
    e.preventDefault();
    if (!newDonationForm.amount || Number(newDonationForm.amount) <= 0) return;

    setAddingDonation(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/donations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDonationForm)
      });
      const data = await res.json();
      if (data.success) {
        setShowAddModal(false);
        setNewDonationForm({ donor_name: '', amount: '', seva_title: 'Daily Green Fodder & Feed Seva', payment_mode: 'Cash/Direct' });
        fetchData();
      }
    } catch (err) {
      console.error('Error adding donation:', err);
    } finally {
      setAddingDonation(false);
    }
  };

  // Filtered donations list
  const filteredDonations = donations.filter((txn) => {
    const matchesSearch = 
      (txn.id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (txn.donor || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (txn.seva || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = 
      filterStatus === 'ALL' || 
      (txn.status || '').toUpperCase() === filterStatus.toUpperCase();

    return matchesSearch && matchesStatus;
  });

  const exportCSV = () => {
    if (filteredDonations.length === 0) return;
    const headers = ["Transaction ID", "Donor Name", "Amount", "Seva Category", "Date", "Status"];
    const rows = filteredDonations.map(d => [d.id, d.donor, d.amount, d.seva, d.date, d.status]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `donations_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner & Action Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E3F20] font-heading tracking-tight flex items-center gap-2">
            <span>Overview & Real-time Analytics</span>
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            {stats.dateFormatted || 'Live Trust Administration Dashboard'}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Manual Refresh Button */}
          <button
            onClick={fetchData}
            disabled={loading}
            className="inline-flex items-center space-x-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
            title="Refresh Live Analytics"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#1E3F20] ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Refreshing...' : 'Refresh'}</span>
          </button>

          {/* Quick Add Donation Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center space-x-2 bg-[#1E3F20] hover:bg-[#163319] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer border border-[#D4AF37]/30"
          >
            <PlusCircle className="w-4 h-4 text-[#D4AF37]" />
            <span>Add Manual Donation</span>
          </button>

          {/* Live System Status Pill */}
          <div className="hidden md:inline-flex items-center space-x-2 bg-[#EAF5EC] border border-[#2E7D32]/20 px-3.5 py-2 rounded-full text-xs font-bold text-[#2E7D32] shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2E7D32] inline-block animate-pulse"></span>
            <span>{stats.systemStatus || 'System Live'}</span>
          </div>
        </div>
      </div>

      {/* 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Total NGOs / Gaushalas */}
        <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-200/80 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#EAF5EC] rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
          <div className="flex items-center justify-between mb-4 relative">
            <div className="w-12 h-12 rounded-xl bg-[#EAF5EC] flex items-center justify-center text-[#1E3F20] shadow-xs border border-[#1E3F20]/10">
              <Building2 className="w-6 h-6 text-[#1E3F20]" />
            </div>
            <span className="text-[10px] font-extrabold uppercase bg-[#1E3F20]/10 text-[#1E3F20] px-2 py-0.5 rounded-full">
              Trust HQ
            </span>
          </div>
          <div className="relative">
            <div className="text-3xl font-extrabold text-[#1E3F20] font-heading">{stats.totalNgos}</div>
            <div className="text-sm font-bold text-gray-800 mt-1">Total Trust Units</div>
            <div className="text-xs text-gray-500 font-medium">Registered Gaushalas</div>
          </div>
        </div>

        {/* Card 2: Registered Donors & Users */}
        <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-200/80 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
          <div className="flex items-center justify-between mb-4 relative">
            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-[#E06D27] shadow-xs border border-[#E06D27]/10">
              <Users className="w-6 h-6 text-[#E06D27]" />
            </div>
            <span className="text-[10px] font-extrabold uppercase bg-orange-100 text-[#E06D27] px-2 py-0.5 rounded-full">
              Live Users
            </span>
          </div>
          <div className="relative">
            <div className="text-3xl font-extrabold text-[#1E3F20] font-heading">{stats.totalUsers}</div>
            <div className="text-sm font-bold text-gray-800 mt-1">Registered Donors</div>
            <div className="text-xs text-gray-500 font-medium">Mobile OTP Accounts</div>
          </div>
        </div>

        {/* Card 3: Total Donations Collected */}
        <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-200/80 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#EAF5EC] rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
          <div className="flex items-center justify-between mb-4 relative">
            <div className="w-12 h-12 rounded-xl bg-[#EAF5EC] flex items-center justify-center text-[#1E3F20] shadow-xs border border-[#1E3F20]/10">
              <IndianRupee className="w-6 h-6 text-[#1E3F20]" />
            </div>
            <span className="text-[10px] font-extrabold uppercase bg-emerald-100 text-[#2E7D32] px-2 py-0.5 rounded-full flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Live
            </span>
          </div>
          <div className="relative">
            <div className="text-3xl font-extrabold text-[#1E3F20] font-heading">{stats.totalDonations}</div>
            <div className="text-sm font-bold text-gray-800 mt-1">Total Donations</div>
            <div className="text-xs text-gray-500 font-medium">Online & Direct Seva</div>
          </div>
        </div>

        {/* Card 4: Active Volunteers */}
        <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-200/80 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-sky-50 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
          <div className="flex items-center justify-between mb-4 relative">
            <div className="w-12 h-12 rounded-xl bg-[#EBF5FF] flex items-center justify-center text-[#0284C7] shadow-xs border border-[#0284C7]/10">
              <Heart className="w-6 h-6 text-[#0284C7]" />
            </div>
            <span className="text-[10px] font-extrabold uppercase bg-sky-100 text-[#0284C7] px-2 py-0.5 rounded-full">
              24/7 Field
            </span>
          </div>
          <div className="relative">
            <div className="text-3xl font-extrabold text-[#1E3F20] font-heading">{stats.activeVolunteers}</div>
            <div className="text-sm font-bold text-gray-800 mt-1">Active Volunteers</div>
            <div className="text-xs text-gray-500 font-medium">Rescue & Feed Drive</div>
          </div>
        </div>

      </div>

      {/* Recent Donations & Activity Log Table */}
      <div className="bg-white rounded-2xl shadow-xs border border-gray-200/80 p-6 space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-[#1E3F20] font-heading">Recent Donations & Transactions</h3>
            <p className="text-xs text-gray-500 font-medium">Real-time record of all digital and direct donor contributions</p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search TXN, Donor, Seva..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3.5 py-1.5 rounded-xl border border-gray-300 text-xs outline-none focus:border-[#1E3F20] w-48 sm:w-56"
              />
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-gray-300 text-xs font-bold text-[#1E3F20] bg-gray-50 outline-none focus:border-[#1E3F20]"
            >
              <option value="ALL">All Status</option>
              <option value="COMPLETED">Completed</option>
              <option value="PENDING">Pending</option>
            </select>

            {/* Export CSV */}
            <button
              onClick={exportCSV}
              disabled={filteredDonations.length === 0}
              className="inline-flex items-center space-x-1 text-xs font-bold text-[#1E3F20] bg-[#EAF5EC] px-3 py-1.5 rounded-xl border border-[#1E3F20]/20 hover:bg-[#1E3F20] hover:text-white transition-colors cursor-pointer disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-700 font-sans">
            <thead className="bg-[#FAF6F0] text-xs font-bold uppercase text-[#1E3F20] tracking-wider border-b border-gray-200">
              <tr>
                <th className="py-3.5 px-4 rounded-l-xl">TXN / Order ID</th>
                <th className="py-3.5 px-4">Donor Name</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Seva Category</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 rounded-r-xl text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredDonations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-xs text-gray-400 font-medium">
                    No transactions recorded yet in the database. Use 'Add Manual Donation' to record a new donation.
                  </td>
                </tr>
              ) : (
                filteredDonations.map((txn, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-xs text-[#E06D27]">{txn.id}</td>
                    <td className="py-3.5 px-4 font-semibold text-gray-900">{txn.donor}</td>
                    <td className="py-3.5 px-4 font-extrabold text-[#1E3F20]">{txn.amount}</td>
                    <td className="py-3.5 px-4 font-medium text-gray-600">{txn.seva}</td>
                    <td className="py-3.5 px-4 text-xs text-gray-500 font-medium">{txn.date}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-flex items-center space-x-1 text-xs font-bold px-2.5 py-1 rounded-full border ${
                        txn.status === 'Completed' || txn.status === 'COMPLETED'
                          ? 'bg-[#EAF5EC] text-[#2E7D32] border-[#2E7D32]/20'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {txn.status === 'Completed' || txn.status === 'COMPLETED' ? (
                          <CheckCircle2 className="w-3 h-3 text-[#2E7D32]" />
                        ) : (
                          <Clock className="w-3 h-3 text-amber-600" />
                        )}
                        <span>{txn.status}</span>
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Add Donation Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 border border-gray-100">
            
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <PlusCircle className="w-5 h-5 text-[#1E3F20]" />
                <h3 className="text-lg font-bold text-[#1E3F20] font-heading">Record Manual Donation</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddDonationSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#1E3F20] uppercase block mb-1">Donor Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={newDonationForm.donor_name}
                  onChange={(e) => setNewDonationForm({ ...newDonationForm, donor_name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#1E3F20] outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#1E3F20] uppercase block mb-1">Donation Amount (₹)</label>
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="e.g. 1100"
                  value={newDonationForm.amount}
                  onChange={(e) => setNewDonationForm({ ...newDonationForm, amount: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#1E3F20] outline-none font-bold text-[#1E3F20]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#1E3F20] uppercase block mb-1">Seva Category</label>
                <select
                  value={newDonationForm.seva_title}
                  onChange={(e) => setNewDonationForm({ ...newDonationForm, seva_title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#1E3F20] outline-none font-medium text-gray-700"
                >
                  <option value="Daily Green Fodder & Feed Seva">Daily Green Fodder & Feed Seva</option>
                  <option value="Emergency Medical & Ambulance Seva">Emergency Medical & Ambulance Seva</option>
                  <option value="Sanctuary Shed & Shelter Seva">Sanctuary Shed & Shelter Seva</option>
                  <option value="Elderly & Disabled Cow Protection">Elderly & Disabled Cow Protection</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#1E3F20] uppercase block mb-1">Payment Mode</label>
                <select
                  value={newDonationForm.payment_mode}
                  onChange={(e) => setNewDonationForm({ ...newDonationForm, payment_mode: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#1E3F20] outline-none font-medium text-gray-700"
                >
                  <option value="Cash/Direct">Cash / Direct</option>
                  <option value="Bank Transfer/NEFT">Bank Transfer / NEFT</option>
                  <option value="UPI QR">Direct UPI QR</option>
                  <option value="Cheque">Cheque</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-gray-300 text-xs font-bold text-gray-600 hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addingDonation}
                  className="px-5 py-2 rounded-xl bg-[#1E3F20] hover:bg-[#163319] text-white text-xs font-bold cursor-pointer shadow-md"
                >
                  {addingDonation ? 'Saving...' : 'Save Donation'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default OverviewTab;
