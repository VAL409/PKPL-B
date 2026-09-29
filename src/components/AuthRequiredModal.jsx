import React from 'react';
import { X, Lock, ArrowRight, UserPlus, LogIn } from 'lucide-react';

export default function AuthRequiredModal({
  isOpen,
  onClose,
  onChooseLogin,
  onChooseRegister,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-sm w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-100 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-4">
          <Lock className="w-6 h-6 text-emerald-700" />
        </div>

        <h3 className="font-heading font-black text-xl text-stone-900 mb-2">
          Masuk untuk Melanjutkan
        </h3>
        <p className="text-xs text-stone-500 mb-6 leading-relaxed">
          Silakan masuk ke akun Anda atau daftar baru untuk menyimpan data pengiriman dan memantau status pesanan tanaman.
        </p>

        <div className="space-y-2.5">
          <button
            type="button"
            onClick={onChooseLogin}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full font-bold text-xs sm:text-sm bg-[#2e6043] hover:bg-emerald-800 text-white shadow-sm transition-all cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>Masuk ke Akun</span>
          </button>

          <button
            type="button"
            onClick={onChooseRegister}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full font-bold text-xs sm:text-sm border border-stone-200 text-stone-700 hover:bg-stone-50 transition-all cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Daftar Akun Baru</span>
          </button>
        </div>

        <p className="text-[11px] text-stone-400 mt-4">
          Belanja aman & terpercaya bersama GreenLeaf
        </p>
      </div>
    </div>
  );
}
