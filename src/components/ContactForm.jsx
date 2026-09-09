import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

const ContactForm = ({ showToast }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      if (showToast) showToast('Please enter your Name and Phone Number.');
      return;
    }

    setIsSubmitted(true);
    if (showToast) {
      showToast('Your message has been received successfully! We will get in touch soon.');
    }

    setTimeout(() => {
      setFormData({ name: '', phone: '', email: '', message: '' });
      setIsSubmitted(false);
    }, 4000);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 card-shadow border border-[#D4AF37]/20">
      <h3 className="text-xl sm:text-2xl font-bold text-[#1E3F20] font-heading mb-2">
        Send Us a Message
      </h3>
      <p className="text-xs sm:text-sm text-gray-600 mb-6">
        Fill out the form below for donation inquiries, receipt requests, or sanctuary visit planning.
      </p>

      {isSubmitted ? (
        <div className="bg-[#FAF6F0] p-8 rounded-2xl border border-[#D4AF37]/40 text-center space-y-3 animate-in fade-in duration-300">
          <CheckCircle className="w-12 h-12 text-[#1E3F20] mx-auto" />
          <h4 className="text-lg font-bold text-[#1E3F20] font-heading">Thank You!</h4>
          <p className="text-sm text-gray-600">
            Your message has been delivered to the Gauseva Matr Seva team.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#1E3F20] uppercase tracking-wider mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your Name (e.g. Rajesh Kumar)"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#E06D27] focus:ring-2 focus:ring-[#E06D27]/20 outline-none text-sm font-sans transition-all bg-[#FDFBF7]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#1E3F20] uppercase tracking-wider mb-1">
                Phone / WhatsApp Number *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 00000"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#E06D27] focus:ring-2 focus:ring-[#E06D27]/20 outline-none text-sm font-sans transition-all bg-[#FDFBF7]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1E3F20] uppercase tracking-wider mb-1">
                Email Address (Optional)
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#E06D27] focus:ring-2 focus:ring-[#E06D27]/20 outline-none text-sm font-sans transition-all bg-[#FDFBF7]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1E3F20] uppercase tracking-wider mb-1">
              Your Message or Inquiry
            </label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Fodder sponsorship, birthday celebration seva, or general inquiries..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#E06D27] focus:ring-2 focus:ring-[#E06D27]/20 outline-none text-sm font-sans transition-all bg-[#FDFBF7] resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-[#1E3F20] hover:bg-[#163319] text-white font-bold py-3.5 px-6 rounded-xl shadow-md flex items-center justify-center space-x-2 transition-all cursor-pointer hover:shadow-lg active:scale-98"
          >
            <Send className="w-4 h-4 text-[#D4AF37]" />
            <span>Send Message</span>
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
