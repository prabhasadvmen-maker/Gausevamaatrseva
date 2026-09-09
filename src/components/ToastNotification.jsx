import React from 'react';
import { CheckCircle2, X } from 'lucide-react';

const ToastNotification = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-[#1E3F20] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-[#D4AF37]/40 flex items-center space-x-3 animate-in slide-in-from-bottom duration-300 max-w-sm">
      <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" />
      <span className="text-sm font-medium">{message}</span>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-white transition-colors p-1 cursor-pointer"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ToastNotification;
