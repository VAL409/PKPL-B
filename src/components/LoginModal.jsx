import React, { useState } from 'react';
import { X, Lock, Mail, User, Sparkles } from 'lucide-react';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email) return;

    // Login simulation
    const userName = isRegister
      ? formData.name || formData.email.split('@')[0]
      : formData.email.split('@')[0];

    onLoginSuccess({
      name: userName.charAt(0).toUpperCase() + userName.slice(1),
      email: formData.email,
    });
    onClose();
  };

  const handleDemoLogin = () => {
    onLoginSuccess({
      name: 'Admin',
      email: 'Admin@mail.com',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-3">
            <Lock className="w-6 h-6 text-emerald-700" />
          </div>
          <h3 className="font-heading font-black text-2xl text-stone-900">
            {isRegister ? 'Daftar Akun Baru' : 'Selamat Datang Kembali'}
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            {isRegister
              ? 'Mulai simpan tanaman impian dan nikmati promo khusus'
              : 'Masuk untuk mengakses riwayat dan akun Anda'}
          </p>
        </div>

        {/* Demo Fast Login */}
        <button
          onClick={handleDemoLogin}
          className="w-full mb-5 py-2.5 px-4 rounded-xl border border-emerald-200 bg-emerald-50/80 hover:bg-emerald-100 text-emerald-900 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Masuk Cepat Demo (Sebagai Admin)</span>
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="h-px bg-stone-200 flex-1" />
          <span className="text-[11px] uppercase tracking-wider text-stone-600 font-bold">atau dengan email</span>
          <div className="h-px bg-stone-200 flex-1" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Nama Lengkap
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  required
                  placeholder="Nama Anda"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-emerald-600 bg-stone-50/50"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="email"
                required
                placeholder="email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-emerald-600 bg-stone-50/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
              Kata Sandi
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-emerald-600 bg-stone-50/50"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-[#2e6043] hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition-all cursor-pointer mt-2"
          >
            {isRegister ? 'Daftar Sekarang' : 'Masuk ke Akun'}
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="text-center mt-5 text-xs text-stone-500">
          {isRegister ? (
            <p>
              Sudah punya akun?{' '}
              <button
                onClick={() => setIsRegister(false)}
                className="font-bold text-emerald-700 hover:underline cursor-pointer"
              >
                Masuk di sini
              </button>
            </p>
          ) : (
            <p>
              Belum punya akun?{' '}
              <button
                onClick={() => setIsRegister(true)}
                className="font-bold text-emerald-700 hover:underline cursor-pointer"
              >
                Daftar sekarang
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
