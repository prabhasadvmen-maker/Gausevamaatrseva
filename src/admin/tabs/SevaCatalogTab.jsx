import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, PlusCircle, X, CheckCircle2, IndianRupee } from 'lucide-react';
import { API_BASE_URL } from '../../config/api';

const SevaCatalogTab = () => {
  const [sevas, setSevas] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [adding, setAdding] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const [newSevaForm, setNewSevaForm] = useState({
    title: '',
    description: '',
    default_amount: '',
    preset_amounts_str: '100, 250, 500, 1100, 2100, 5100',
    duration_label: 'Per Cow / Per Day',
    recommended: false
  });

  const fetchSevas = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/sevas`);
      const data = await res.json();
      if (data.success && data.data) {
        setSevas(data.data);
      }
    } catch (err) {
      console.warn('Sevas catalog fetch notice:', err);
    }
  };

  useEffect(() => {
    fetchSevas();
  }, []);

  const handleAddSevaSubmit = async (e) => {
    e.preventDefault();
    if (!newSevaForm.title || !newSevaForm.default_amount) return;

    setAdding(true);
    setSuccessMsg('');

    try {
      const presetArr = newSevaForm.preset_amounts_str
        .split(',')
        .map(s => parseInt(s.trim()))
        .filter(n => !isNaN(n) && n > 0);

      const res = await fetch(`${API_BASE_URL}/api/admin/sevas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newSevaForm.title,
          description: newSevaForm.description,
          default_amount: Number(newSevaForm.default_amount),
          preset_amounts: presetArr,
          duration_label: newSevaForm.duration_label,
          recommended: newSevaForm.recommended
        })
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMsg('New Seva package created successfully!');
        setShowAddModal(false);
        setNewSevaForm({
          title: '',
          description: '',
          default_amount: '',
          preset_amounts_str: '100, 250, 500, 1100, 2100, 5100',
          duration_label: 'Per Cow / Per Day',
          recommended: false
        });
        fetchSevas();
      }
    } catch (err) {
      console.error('Error adding seva package:', err);
    } finally {
      setAdding(false);
      setTimeout(() => setSuccessMsg(''), 4000);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E3F20] font-heading tracking-tight flex items-center gap-2">
            <Heart className="w-7 h-7 text-[#E06D27]" />
            <span>Seva Catalog & Preset Amounts</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
            Configured Seva packages, preset donation chips, default amounts, and mobile catalog responses (API-06).
          </p>
        </div>

        {/* Add New Seva Package Button */}
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center space-x-2 bg-[#1E3F20] hover:bg-[#163319] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer border border-[#D4AF37]/30"
        >
          <PlusCircle className="w-4 h-4 text-[#D4AF37]" />
          <span>Add New Seva Package</span>
        </button>
      </div>

      {successMsg && (
        <div className="bg-[#EAF5EC] text-[#2E7D32] p-4 rounded-2xl border border-[#2E7D32]/30 flex items-center space-x-2 font-bold text-xs animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Sevas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sevas.map((seva) => (
          <div key={seva.id} className="bg-white rounded-2xl p-6 shadow-xs border border-gray-200/80 space-y-4 hover:shadow-md transition-shadow relative">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#E06D27] bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200">
                {seva.id}
              </span>
              {seva.recommended && (
                <span className="text-[10px] font-extrabold bg-[#EAF5EC] text-[#2E7D32] px-2.5 py-1 rounded-full border border-[#2E7D32]/20 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                  Recommended Seva
                </span>
              )}
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#1E3F20] font-heading">{seva.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{seva.description}</p>
            </div>

            <div className="pt-2 border-t border-gray-100 space-y-2">
              <span className="text-[10px] font-bold uppercase text-gray-400">Preset Donation Chips (₹)</span>
              <div className="flex flex-wrap gap-2">
                {seva.preset_amounts?.map((amt, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1 rounded-xl text-xs font-bold ${
                      amt === seva.default_amount
                        ? 'bg-[#1E3F20] text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    ₹{amt.toLocaleString('en-IN')} {amt === seva.default_amount && '(Default)'}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Seva Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5 border border-gray-100 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-[#E06D27]" />
                <h3 className="text-lg font-bold text-[#1E3F20] font-heading">Add New Seva Package</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSevaSubmit} className="space-y-4 text-left">
              <div>
                <label className="text-xs font-bold text-[#1E3F20] uppercase block mb-1">Seva Package Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pure Drinking Water Drive"
                  value={newSevaForm.title}
                  onChange={(e) => setNewSevaForm({ ...newSevaForm, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-medium focus:border-[#1E3F20] outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#1E3F20] uppercase block mb-1">Seva Description</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Provide clean drinking water troughs and tanker supply for rescued cows"
                  value={newSevaForm.description}
                  onChange={(e) => setNewSevaForm({ ...newSevaForm, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#1E3F20]"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#1E3F20] uppercase block mb-1">Default Amount (₹)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="1100"
                    value={newSevaForm.default_amount}
                    onChange={(e) => setNewSevaForm({ ...newSevaForm, default_amount: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-bold text-[#1E3F20] outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#1E3F20] uppercase block mb-1">Duration Label</label>
                  <input
                    type="text"
                    placeholder="Per Cow / Per Day"
                    value={newSevaForm.duration_label}
                    onChange={(e) => setNewSevaForm({ ...newSevaForm, duration_label: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#1E3F20] uppercase block mb-1">Preset Amount Chips (Comma Separated)</label>
                <input
                  type="text"
                  placeholder="100, 250, 500, 1100, 2100, 5100"
                  value={newSevaForm.preset_amounts_str}
                  onChange={(e) => setNewSevaForm({ ...newSevaForm, preset_amounts_str: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs font-mono font-bold text-gray-800 outline-none"
                />
              </div>

              <label className="flex items-center space-x-2 p-3 bg-[#FAF6F0] rounded-xl border border-[#D4AF37]/20 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newSevaForm.recommended}
                  onChange={(e) => setNewSevaForm({ ...newSevaForm, recommended: e.target.checked })}
                  className="w-4 h-4 text-[#1E3F20] rounded border-gray-300 focus:ring-[#1E3F20]"
                />
                <span className="text-xs font-bold text-[#1E3F20]">Mark as Recommended Seva Package</span>
              </label>

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
                  disabled={adding}
                  className="px-6 py-2 rounded-xl bg-[#1E3F20] hover:bg-[#163319] text-white text-xs font-bold cursor-pointer shadow-md"
                >
                  {adding ? 'Creating...' : 'Create Seva Package'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default SevaCatalogTab;
