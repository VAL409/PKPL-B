import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  LogOut,
  Save,
  CheckCircle2,
  AlertCircle,
  Bell,
  Check,
} from 'lucide-react';
import AccountNavTabs from './AccountNavTabs';

export default function ProfilePage({
  user,
  onUpdateUser,
  onLogout,
  onNavigateTab,
}) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    postalCode: user?.postalCode || '',
  });

  const [newsletterSubscribed, setNewsletterSubscribed] = useState(
    user?.newsletterSubscribed !== undefined ? user.newsletterSubscribed : true
  );

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [newsletterSavedSuccess, setNewsletterSavedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Sync form state when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        postalCode: user.postalCode || '',
      });
      if (user.newsletterSubscribed !== undefined) {
        setNewsletterSubscribed(user.newsletterSubscribed);
      }
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrorMessage('');
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim()) {
      setErrorMessage('Nama lengkap wajib diisi.');
      return;
    }

    if (!formData.email.trim()) {
      setErrorMessage('Alamat email wajib diisi.');
      return;
    }

    // Check if new email is already taken by another account
    try {
      const usersDB = JSON.parse(localStorage.getItem('greenleaf_users_db') || '[]');
      const newEmailClean = formData.email.trim().toLowerCase();
      const currentEmailClean = (user?.email || '').trim().toLowerCase();

      const isTaken = usersDB.some(
        (u) =>
          u.email?.trim().toLowerCase() === newEmailClean &&
          u.email?.trim().toLowerCase() !== currentEmailClean
      );

      if (isTaken) {
        setErrorMessage('Alamat email tersebut sudah digunakan oleh akun lain.');
        return;
      }
    } catch (err) {
      console.error(err);
    }

    const prevEmail = user?.email;
    onUpdateUser(
      {
        ...user,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        postalCode: formData.postalCode.trim(),
        newsletterSubscribed,
      },
      prevEmail
    );

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const handleSaveNewsletter = (e) => {
    e.preventDefault();

    // Update user in state & storage
    onUpdateUser(
      {
        ...user,
        newsletterSubscribed,
      },
      user?.email
    );

    // Sync to greenleaf_newsletter_emails list
    try {
      const saved = JSON.parse(localStorage.getItem('greenleaf_newsletter_emails') || '[]');
      const userEmail = (user?.email || formData.email || '').trim().toLowerCase();
      if (userEmail) {
        let updatedList;
        if (newsletterSubscribed) {
          updatedList = Array.from(new Set([...saved, userEmail]));
        } else {
          updatedList = saved.filter((em) => em !== userEmail);
        }
        localStorage.setItem('greenleaf_newsletter_emails', JSON.stringify(updatedList));
      }
    } catch (err) {
      console.error(err);
    }

    setNewsletterSavedSuccess(true);
    setTimeout(() => setNewsletterSavedSuccess(false), 3500);
  };

  return (
    <div className="py-12 sm:py-16 bg-[#f8faf8] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Tabs between Profile / Orders / My Plants */}
        <AccountNavTabs activeTab="profile" onNavigateTab={onNavigateTab} />

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-stone-900 tracking-tight">
            Profil Saya
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Kelola informasi akun, kontak, alamat pengiriman, dan preferensi akun Anda.
          </p>
        </div>

        <div className="space-y-8">
          
          {/* 1. INFORMASI AKUN CARD */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-stone-200/80">
            {/* Header Avatar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-stone-100">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#2e6043] text-white flex items-center justify-center font-heading font-black text-2xl shadow-sm shrink-0">
                  {formData.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <h2 className="font-heading font-bold text-xl sm:text-2xl text-stone-900">
                    {formData.name || 'Pengguna GreenLeaf'}
                  </h2>
                  <p className="text-xs text-stone-500">{formData.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] text-stone-400">
                      Kelengkapan Akun:{' '}
                      <strong className={formData.address && formData.phone ? 'text-emerald-700' : 'text-amber-600'}>
                        {formData.address && formData.phone ? 'Lengkap' : 'Belum Lengkap'}
                      </strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Saved feedback */}
            {savedSuccess && (
              <div className="my-5 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Perubahan data profil berhasil disimpan!</span>
              </div>
            )}

            {/* Error feedback */}
            {errorMessage && (
              <div className="my-5 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Profile Form */}
            <form onSubmit={handleSaveProfile} className="pt-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Nama lengkap Anda"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/15 bg-stone-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    Alamat Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="nama@email.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/15 bg-stone-50/50"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Nomor Telepon / WhatsApp
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Contoh: 0812-xxxx-xxxx"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/15 bg-stone-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Alamat Pengiriman Lengkap
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
                  <textarea
                    rows="2"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan, dan kecamatan"
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/15 bg-stone-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    Kota / Kabupaten
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Contoh: Bandung"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/15 bg-stone-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    Kode Pos
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="Contoh: 40135"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/15 bg-stone-50/50"
                  />
                </div>
              </div>

              {/* Submit Profile */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-end">
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-6 rounded-full font-bold text-xs sm:text-sm bg-[#2e6043] hover:bg-emerald-800 text-white transition-all shadow-sm cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan Akun</span>
                </button>
              </div>
            </form>
          </div>

          {/* 2. PREFERENSI NEWSLETTER CARD */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200/80">
            <div className="flex items-center gap-3 pb-4 mb-4 border-b border-stone-100">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Bell className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-stone-900">
                  Preferensi Newsletter
                </h3>
                <p className="text-xs text-stone-500">
                  Atur pengiriman informasi dan kabar terbaru dari GreenLeaf.
                </p>
              </div>
            </div>

            {newsletterSavedSuccess && (
              <div className="mb-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Preferensi newsletter berhasil disimpan!</span>
              </div>
            )}

            <form onSubmit={handleSaveNewsletter} className="space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-stone-50/80 border border-stone-200/80">
                <input
                  type="checkbox"
                  id="newsletterToggle"
                  checked={newsletterSubscribed}
                  onChange={(e) => setNewsletterSubscribed(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-stone-300 text-emerald-700 focus:ring-emerald-500 cursor-pointer"
                />
                <label htmlFor="newsletterToggle" className="cursor-pointer">
                  <span className="font-bold text-xs sm:text-sm text-stone-800 block">
                    Berlangganan Newsletter GreenLeaf
                  </span>
                  <span className="text-xs text-stone-500 block mt-0.5">
                    Dapatkan informasi tentang tanaman baru, tips perawatan, dan promo GreenLeaf.
                  </span>
                </label>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-6 rounded-full font-bold text-xs sm:text-sm bg-stone-800 hover:bg-stone-900 text-white transition-all shadow-xs cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Simpan Preferensi</span>
                </button>
              </div>
            </form>
          </div>

          {/* 3. LOGOUT CARD / BUTTON */}
          <div className="flex justify-between items-center bg-stone-50/60 rounded-3xl p-6 border border-stone-200/70">
            <div>
              <h4 className="font-bold text-stone-800 text-sm">Keluar dari Akun</h4>
              <p className="text-xs text-stone-500">Anda dapat login kembali kapan saja dengan email terdaftar.</p>
            </div>
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-2 py-2.5 px-5 rounded-full font-semibold text-xs text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer border border-red-200 shrink-0"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
