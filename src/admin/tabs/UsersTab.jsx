import React, { useState, useEffect } from 'react';
import { Users, Phone, Mail, MapPin, Calendar, Search, RefreshCw, ShieldCheck, Heart } from 'lucide-react';
import { API_BASE_URL } from '../../config/api';

const UsersTab = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/users`);
      const data = await res.json();
      if (data.success && data.users) {
        setUsers(data.users);
      }
    } catch (err) {
      console.warn('Backend users fetch notice:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(u => 
    (u.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.phone || '').includes(searchTerm) ||
    (u.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E3F20] font-heading tracking-tight">
            User & Donor Management
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            Registered Mobile App Donors, Authentication Sessions, and Contribution Histories
          </p>
        </div>

        <button
          onClick={fetchUsers}
          disabled={loading}
          className="inline-flex items-center space-x-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-[#1E3F20] ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Users</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-xs border border-gray-200/80 flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search user by name, phone, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 text-xs font-medium outline-none focus:border-[#1E3F20]"
          />
        </div>

        <div className="text-xs font-bold text-gray-500">
          Showing <span className="text-[#1E3F20] font-extrabold">{filteredUsers.length}</span> Users
        </div>
      </div>

      {/* Users Table */}
      {filteredUsers.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-200/80 space-y-3">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto text-gray-400">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-gray-700">No Registered Users Found</h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            Users who log in via Mobile OTP will automatically appear here with their donation activity.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xs border border-gray-200/80 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Total Donated</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Donations</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-[#1E3F20] text-[#D4AF37] font-bold flex items-center justify-center text-sm shadow-xs border border-[#D4AF37]/30">
                          {(user.name || 'U').split(' ').map(n => n[0]).join('') || 'U'}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#1E3F20]">{user.name || 'Gousevak User'}</p>
                          <p className="text-[10px] font-mono text-gray-400">{user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-700">
                        <Phone className="w-3.5 h-3.5 text-[#E06D27]" />
                        <span className="font-semibold">{user.country_code || '+91'} {user.phone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Mail className="w-3.5 h-3.5 text-gray-400" />
                        <span className="truncate">{user.email || '-'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        <span>
                          {user.address?.city && user.address?.state 
                            ? `${user.address.city}, ${user.address.state}` 
                            : '-'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-extrabold text-[#1E3F20]">
                        ₹{(user.total_donations_amount || 0).toLocaleString('en-IN')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-gray-800">
                        {user.total_donations_count || 0} Sevas
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center space-x-1 bg-[#EAF5EC] text-[#2E7D32] text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-[#2E7D32]/20">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Verified OTP</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};

export default UsersTab;
