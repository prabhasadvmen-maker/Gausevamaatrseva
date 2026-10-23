import React, { useState } from 'react';
import { SITE_INFO } from '../data/content';
import { Trash2, Mail, Phone, ShieldCheck } from 'lucide-react';

const DeleteAccount = () => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Account Deletion Request - ${phone}`);
    const body = encodeURIComponent(
      `Hello ${SITE_INFO.name} team,\n\nPlease delete my account and associated data.\n\nName: ${name}\nRegistered mobile number: ${phone}\nReason (optional): ${reason}\n`
    );
    window.location.href = `mailto:${SITE_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      <header className="space-y-3">
        <div className="flex items-center gap-2 text-[#E06D27]">
          <Trash2 className="w-6 h-6" />
          <span className="text-xs font-semibold uppercase tracking-widest">Account Deletion</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-heading text-[#1E3F20]">
          Delete your {SITE_INFO.name} account
        </h1>
        <p className="text-gray-700">
          This page explains how to request deletion of your {SITE_INFO.name} app account and the
          data associated with it.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#1E3F20]">Steps to request deletion</h2>
        <ol className="list-decimal pl-6 space-y-2 text-gray-700">
          <li>Fill in the form below with your name and the mobile number registered in the app.</li>
          <li>
            Press <strong>Send deletion request</strong>. Your email app opens with a pre-filled
            message to <a className="underline" href={`mailto:${SITE_INFO.email}`}>{SITE_INFO.email}</a>;
            send it. You can also email us directly from your registered address.
          </li>
          <li>We verify the request against your registered mobile number and confirm by reply.</li>
          <li>Your account and personal data are deleted within 30 days of verification.</li>
        </ol>
      </section>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm">
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="del-name">Full name</label>
          <input
            id="del-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E06D27]/40"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="del-phone">Registered mobile number</label>
          <input
            id="del-phone"
            required
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 XXXXX XXXXX"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E06D27]/40"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="del-reason">Reason (optional)</label>
          <textarea
            id="del-reason"
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E06D27]/40"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-[#E06D27] hover:bg-[#c85f20] text-white font-semibold px-5 py-2.5 rounded-lg transition-colors"
        >
          <Mail className="w-4 h-4" /> Send deletion request
        </button>
      </form>

      <section className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1E3F20]">Data that is deleted</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Name and mobile number</li>
            <li>Email address</li>
            <li>PAN and postal address saved in your profile</li>
            <li>Login/OTP session data</li>
          </ul>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1E3F20]">Data that is kept</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>
              Donation and payment records (amount, date, receipt number), retained for up to 8 years
              to meet Indian tax and trust-accounting requirements. These are de-linked from your
              profile details where the law permits.
            </li>
          </ul>
        </div>
      </section>

      <section className="flex items-start gap-3 text-sm text-gray-600 bg-[#FDFBF7] border border-gray-200 rounded-xl p-4">
        <ShieldCheck className="w-5 h-5 text-[#1E3F20] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p>Questions? Contact {SITE_INFO.name}:</p>
          <p className="flex items-center gap-2"><Mail className="w-4 h-4" /> {SITE_INFO.email}</p>
          <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> {SITE_INFO.phone}</p>
        </div>
      </section>
    </div>
  );
};

export default DeleteAccount;
