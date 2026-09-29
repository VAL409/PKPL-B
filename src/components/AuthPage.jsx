import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, Eye, EyeOff, ShieldCheck, ArrowLeft, ArrowRight, Leaf, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import initialUsers from '../data/users.json';

// Helper function to manage registered users database in localStorage & local file
const getRegisteredUsersDB = () => {
  try {
    const saved = localStorage.getItem('greenleaf_users_db');
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error(e);
  }
  const fallback = Array.isArray(initialUsers) && initialUsers.length > 0 ? initialUsers : [
    {
      name: 'Reyvan Maulana',
      email: 'reyvan@example.com',
      phone: '0812-3456-7890',
      address: 'Jl. Dago Asri No. 12, Bandung, Jawa Barat 40135',
      password: 'password123',
      createdAt: '2026-09-01T00:00:00.000Z',
    },
  ];
  try {
    localStorage.setItem('greenleaf_users_db', JSON.stringify(fallback));
  } catch (e) {}
  return fallback;
};

export default function AuthPage({ onLoginSuccess, onCancel }) {
  // 'login' | 'register'
  const [authMode, setAuthMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    emailOrPhone: '',
    password: '',
    confirmPassword: '',
    termsAgreed: false,
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Sync latest users from src/data/users.json file on disk
  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          localStorage.setItem('greenleaf_users_db', JSON.stringify(data));
        }
      })
      .catch(() => {});
  }, []);

  // Reset notifications on mode switch
  useEffect(() => {
    setErrorMsg('');
    setSuccessMsg('');
  }, [authMode]);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
    setErrorMsg('');
  };

  // Real Authentication logic
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);

    const usersDB = getRegisteredUsersDB();
    const identifier = formData.emailOrPhone.trim().toLowerCase();

    if (authMode === 'login') {
      // 1. Validation for Login
      if (!identifier) {
        setErrorMsg('Email atau nomor telepon wajib diisi.');
        setIsLoading(false);
        return;
      }
      if (!formData.password) {
        setErrorMsg('Kata sandi wajib diisi.');
        setIsLoading(false);
        return;
      }

      // 2. Check credentials in database
      const existingUser = usersDB.find(
        (u) =>
          u.email.toLowerCase() === identifier ||
          (u.phone && u.phone.replace(/[^0-9]/g, '') === identifier.replace(/[^0-9]/g, ''))
      );

      if (!existingUser) {
        setErrorMsg('Akun tidak ditemukan. Periksa kembali email Anda atau lakukan pendaftaran akun baru.');
        setIsLoading(false);
        return;
      }

      if (existingUser.password !== formData.password) {
        setErrorMsg('Kata sandi yang Anda masukkan salah. Silakan coba lagi.');
        setIsLoading(false);
        return;
      }

      // Login Successful
      setTimeout(() => {
        setIsLoading(false);
        onLoginSuccess({
          name: existingUser.name,
          email: existingUser.email,
          phone: existingUser.phone || '',
          address: existingUser.address || '',
        });
      }, 500);

    } else {
      // Register Mode
      // 1. Validations
      if (!formData.name.trim()) {
        setErrorMsg('Nama lengkap wajib diisi.');
        setIsLoading(false);
        return;
      }
      if (!identifier) {
        setErrorMsg('Email atau nomor telepon wajib diisi.');
        setIsLoading(false);
        return;
      }
      if (formData.password.length < 8) {
        setErrorMsg('Kata sandi minimal 8 karakter.');
        setIsLoading(false);
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setErrorMsg('Konfirmasi kata sandi tidak cocok.');
        setIsLoading(false);
        return;
      }
      if (!formData.termsAgreed) {
        setErrorMsg('Anda harus menyetujui Syarat & Ketentuan dan Kebijakan Privasi.');
        setIsLoading(false);
        return;
      }

      // 2. Check for duplicate email in database
      const isDuplicate = usersDB.some(
        (u) => u.email.toLowerCase() === identifier
      );

      if (isDuplicate) {
        setErrorMsg('Alamat email ini sudah terdaftar. Silakan Masuk ke akun Anda.');
        setIsLoading(false);
        return;
      }

      // 3. Save new user to database with empty phone and address
      const newUser = {
        name: formData.name.trim(),
        email: identifier,
        phone: '',
        address: '',
        password: formData.password,
        createdAt: new Date().toISOString(),
      };

      const updatedDB = [...usersDB, newUser];
      try {
        localStorage.setItem('greenleaf_users_db', JSON.stringify(updatedDB));
      } catch (err) {
        console.error(err);
      }

      // Persist to src/data/users.json file directly on disk via local API
      try {
        fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedDB),
        }).catch(() => {});
      } catch (e) {}

      setTimeout(() => {
        setIsLoading(false);
        setSuccessMsg('Akun berhasil didaftarkan! Mengalihkan...');
        setTimeout(() => {
          onLoginSuccess({
            name: newUser.name,
            email: newUser.email,
            phone: '',
            address: '',
          });
        }, 800);
      }, 600);
    }
  };

  // Google Social Button Click (Informative notice per user request)
  const handleGoogleClick = () => {
    alert(
      'Integrasi Google OAuth resmi memerlukan Google Client ID di Google Cloud Console. Untuk pengujian saat ini belum dapat digunakan.'
    );
  };

  return (
    <div className="py-8 sm:py-14 bg-[#edf2ee] min-h-[calc(100vh-80px)] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      
      {/* Outer Card Container */}
      <div className="max-w-[1020px] w-full bg-white rounded-[28px] sm:rounded-[32px] shadow-2xl border border-stone-200/60 overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all">
        
        {/* ================= LEFT COLUMN: Fixed High-Res Plant Photo Showcase ================= */}
        <div className="lg:col-span-5 relative min-h-[340px] lg:min-h-[660px] overflow-hidden flex flex-col justify-between p-6 sm:p-8">
          
          {/* User uploaded plant photo preserved across views */}
          <img
            src="/images/auth-banner.jpg"
            alt="Monstera dan Fiddle Leaf Fig GreenLeaf"
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="eager"
          />

          {/* Consistent dark overlay for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/35 pointer-events-none" />

          {/* Top Logo Overlay */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-sm shrink-0">
              <Leaf className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <span className="font-serif font-black text-2xl tracking-tight text-white block drop-shadow-sm">
                GreenLeaf
              </span>
              <span className="text-[10px] font-sans font-bold text-stone-200 tracking-[0.2em] uppercase block -mt-1 drop-shadow-sm">
                TOKO TANAMAN HIAS
              </span>
            </div>
          </div>

          {/* Bottom quote note */}
          <div className="relative z-10 hidden lg:block text-white/95 text-xs backdrop-blur-xs bg-black/30 p-3.5 rounded-xl border border-white/15">
            <p className="font-serif italic text-stone-100 text-xs leading-relaxed">
              "Menghadirkan keindahan dan kesegaran alam langsung ke ruang hunian Anda."
            </p>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: Form Panel ================= */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-11 flex flex-col justify-between bg-white">
          
          <div>
            {/* Top Navigation Bar: Back & SSL Secure */}
            <div className="flex items-center justify-between mb-6 pb-2">
              <button
                type="button"
                onClick={onCancel}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Kembali ke Beranda</span>
              </button>
            </div>

            {/* Headings */}
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
                {authMode === 'login' ? 'Selamat Datang Kembali' : 'Buat Akun GreenLeaf'}
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 mt-1.5 leading-relaxed">
                {authMode === 'login'
                  ? 'Masuk untuk melanjutkan ke akun GreenLeaf.'
                  : 'Daftar untuk mulai berbelanja tanaman hias dengan lebih mudah.'}
              </p>
            </div>

            {/* Alerts: Error or Success */}
            {errorMsg && (
              <div className="mb-4 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="mb-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Main Form (Email & Password Primary Authentication) */}
            <form onSubmit={handleAuthSubmit} className={authMode === 'login' ? 'space-y-4' : 'space-y-3'}>
              
              {/* Register ONLY: Full Name */}
              {authMode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Nama lengkap Anda"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/15 transition-all bg-white"
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    name="emailOrPhone"
                    required
                    placeholder="nama@email.com"
                    value={formData.emailOrPhone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/15 transition-all bg-white"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-stone-700">
                    Kata Sandi <span className="text-red-500">*</span>
                  </label>
                  {authMode === 'login' && (
                    <button
                      type="button"
                      onClick={() => alert('Demo Reset Sandi: Silakan gunakan akun demo reyvan@example.com dengan sandi: password123')}
                      className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline cursor-pointer"
                    >
                      Lupa kata sandi?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    placeholder={authMode === 'login' ? '••••••••••••' : 'Masukkan kata sandi'}
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/15 transition-all bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                    title={showPassword ? 'Sembunyikan sandi' : 'Tampilkan sandi'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {authMode === 'register' && (
                  <p className="text-[11px] text-stone-400 mt-1">Minimal 8 karakter</p>
                )}
              </div>

              {/* Register ONLY: Confirm Password */}
              {authMode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Konfirmasi Kata Sandi <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      required
                      placeholder="Ulangi kata sandi"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/15 transition-all bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                      title={showConfirmPassword ? 'Sembunyikan sandi' : 'Tampilkan sandi'}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Checkbox Options */}
              {authMode === 'login' ? (
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-700 focus:ring-emerald-500 border-stone-300 cursor-pointer accent-emerald-800"
                  />
                  <label htmlFor="rememberMe" className="text-xs text-stone-600 cursor-pointer">
                    Ingat saya di perangkat ini
                  </label>
                </div>
              ) : (
                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="termsAgreed"
                    name="termsAgreed"
                    checked={formData.termsAgreed}
                    onChange={handleChange}
                    className="w-4 h-4 rounded text-emerald-700 focus:ring-emerald-500 border-stone-300 cursor-pointer accent-emerald-800 mt-0.5"
                  />
                  <label htmlFor="termsAgreed" className="text-xs text-stone-600 cursor-pointer leading-snug">
                    Saya menyetujui <span className="font-bold text-stone-700">Syarat & Ketentuan</span> dan <span className="font-bold text-stone-700">Kebijakan Privasi</span>.
                  </label>
                </div>
              )}

              {/* Main Submit Action Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-3 py-3 px-6 rounded-full font-bold text-sm bg-[#155a30] hover:bg-[#0f4424] text-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                <span>{isLoading ? 'Memproses...' : authMode === 'login' ? 'Masuk ke Akun' : 'Buat Akun'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Divider: Standard Login Form Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="h-px bg-stone-200 flex-1" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                ATAU
              </span>
              <div className="h-px bg-stone-200 flex-1" />
            </div>

            {/* Google Social Button (Secondary Option / Pajangan di Bawah) */}
            <div>
              <button
                type="button"
                onClick={handleGoogleClick}
                className="w-full py-2.5 px-4 rounded-full border border-stone-200 hover:bg-stone-50 text-stone-700 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all shadow-xs cursor-pointer"
                title="Masuk dengan Google"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>{authMode === 'login' ? 'Masuk dengan Google' : 'Daftar dengan Google'}</span>
              </button>
            </div>

            {/* Hint for Testing / Examination */}
            {authMode === 'login' && (
              <div className="mt-3 p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center gap-2 text-[11px] text-stone-500">
                <Info className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Akun demo tersimpan: <strong>Admin@mail.com</strong> (Sandi: <strong>password123</strong>)</span>
              </div>
            )}
          </div>

          {/* Bottom Switch Link & Legal Footer */}
          <div className="pt-6 mt-5 border-t border-stone-100 text-center space-y-2.5">
            {authMode === 'login' ? (
              <p className="text-xs text-stone-600">
                Belum punya akun GreenLeaf?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('register')}
                  className="font-bold text-emerald-800 hover:text-emerald-950 underline underline-offset-2 cursor-pointer"
                >
                  Daftar Sekarang
                </button>
              </p>
            ) : (
              <p className="text-xs text-stone-600">
                Sudah punya akun GreenLeaf?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="font-bold text-emerald-800 hover:text-emerald-950 underline underline-offset-2 cursor-pointer"
                >
                  Masuk Sekarang
                </button>
              </p>
            )}

            <div className="flex items-center justify-center gap-2 text-[11px] text-stone-400">
              <a href="#" className="hover:text-stone-600 transition-colors">Bantuan Pelanggan</a>
              <span>•</span>
              <a href="#" className="hover:text-stone-600 transition-colors">Kebijakan Privasi</a>
              <span>•</span>
              <a href="#" className="hover:text-stone-600 transition-colors">Syarat & Ketentuan</a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
