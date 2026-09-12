import React, { useState, useEffect } from 'react';
import { CreditCard, CheckCircle2, Clock, Search, RefreshCw, Download, ShieldCheck } from 'lucide-react';
import { API_BASE_URL } from '../../config/api';

const PaymentsTab = () => {
  const [donations, setDonations] = useState([]);

  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/donations`);
      const data = await res.json();
      if (data.success && data.donations) {
        setDonations(data.donations);
      }
    } catch (err) {
      console.warn('Payments fetch notice:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const filteredPayments = donations.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.donor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.seva.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'ALL' ||
      item.status.toUpperCase() === statusFilter.toUpperCase();

    return matchesSearch && matchesStatus;
  });

  const exportCSV = () => {
    const headers = ["Order ID", "Donor Name", "Amount", "Seva Title", "Date", "Status", "Receipt"];
    const rows = filteredPayments.map(d => [d.id, d.donor, d.amount, d.seva, d.date, d.status, d.receipt]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `razorpay_payments_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E3F20] font-heading tracking-tight flex items-center gap-2">
            <CreditCard className="w-7 h-7 text-[#E06D27]" />
            <span>Razorpay Payment History & Orders</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
            Real-time transaction history of all Razorpay mobile and web donor orders (API-08/09/10).
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={fetchPayments}
            disabled={loading}
            className="inline-flex items-center space-x-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#1E3F20] ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Transactions</span>
          </button>

          <button
            onClick={exportCSV}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-white bg-[#1E3F20] px-4 py-2 rounded-xl shadow-xs hover:bg-[#163319] transition-colors cursor-pointer border border-[#D4AF37]/30"
          >
            <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-xs border border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Order ID, Donor Name, or Seva..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 text-xs font-medium outline-none focus:border-[#1E3F20]"
          />
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2 rounded-xl border border-gray-300 text-xs font-bold text-[#1E3F20] bg-gray-50 outline-none focus:border-[#1E3F20]"
          >
            <option value="ALL">All Status</option>
            <option value="COMPLETED">Completed</option>
            <option value="PENDING">Pending</option>
          </select>

          <div className="text-xs font-bold text-gray-500">
            Total: <span className="text-[#1E3F20] font-extrabold">{filteredPayments.length}</span> Records
          </div>
        </div>
      </div>

      {/* Payments History Table */}
      <div className="bg-white rounded-3xl shadow-xs border border-gray-200/80 p-6 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-700 font-sans">
            <thead className="bg-[#FAF6F0] text-xs font-bold uppercase text-[#1E3F20] tracking-wider border-b border-gray-200">
              <tr>
                <th className="py-3.5 px-4 rounded-l-xl">Razorpay Order ID</th>
                <th className="py-3.5 px-4">Donor Name</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Seva Category</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Receipt No.</th>
                <th className="py-3.5 px-4 rounded-r-xl text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-xs text-gray-400 font-medium">
                    No payment records match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredPayments.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-xs text-[#E06D27]">{item.id}</td>
                    <td className="py-3.5 px-4 font-bold text-gray-900">{item.donor}</td>
                    <td className="py-3.5 px-4 font-extrabold text-[#1E3F20]">{item.amount}</td>
                    <td className="py-3.5 px-4 font-medium text-gray-600">{item.seva}</td>
                    <td className="py-3.5 px-4 text-xs text-gray-500 font-medium">{item.date}</td>
                    <td className="py-3.5 px-4 font-mono text-xs text-gray-600">{item.receipt || 'N/A'}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-flex items-center space-x-1 text-xs font-bold px-2.5 py-1 rounded-full border ${
                        item.status === 'Completed' || item.status === 'COMPLETED'
                          ? 'bg-[#EAF5EC] text-[#2E7D32] border-[#2E7D32]/20'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {item.status === 'Completed' || item.status === 'COMPLETED' ? (
                          <CheckCircle2 className="w-3 h-3 text-[#2E7D32]" />
                        ) : (
                          <Clock className="w-3 h-3 text-amber-600" />
                        )}
                        <span>{item.status}</span>
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default PaymentsTab;
