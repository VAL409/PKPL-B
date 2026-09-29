import React, { useState } from 'react';
import { Leaf, ShoppingBag, User, LogOut, Menu, X } from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  cartCount,
  setIsCartOpen,
  user,
  onNavigateToAuth,
  onLogout,
  onNavigateTab,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'katalog', label: 'Katalog' },
    { id: 'tentang', label: 'Tentang' },
    { id: 'kontak', label: 'Kontak' },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <button
            onClick={() => handleNavClick('beranda')}
            className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center transition-transform group-hover:scale-105">
              <Leaf className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <span className="font-heading font-black text-2xl text-[#2e6043] tracking-tight group-hover:text-emerald-700 transition-colors">
                GreenLeaf
              </span>
              <span className="block text-[11px] font-sans font-medium text-stone-600 uppercase tracking-widest -mt-1">
                Toko Tanaman Hias
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 shadow-xs'
                      : 'text-stone-600 hover:text-emerald-700 hover:bg-stone-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons: Cart & User/Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Cart Button with Count Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full text-stone-700 hover:text-emerald-700 hover:bg-emerald-50 transition-all cursor-pointer focus:outline-none"
              title="Keranjang Belanja"
              aria-label="Keranjang"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile Button: langsung ke halaman profil */}
            {user ? (
              <button
                type="button"
                onClick={() => {
                  onNavigateTab('profile');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`flex items-center gap-2 rounded-full pl-2 pr-3.5 py-1 text-xs font-bold transition-all cursor-pointer ${
                  ['profile', 'pesanan-saya', 'tanaman-saya'].includes(activeTab)
                    ? 'bg-[#2e6043] text-white shadow-xs ring-2 ring-emerald-600/30'
                    : 'bg-emerald-50/90 border border-emerald-200/80 text-emerald-900 hover:bg-emerald-100'
                }`}
                title="Halaman Profil Saya"
              >
                <div
                  className={`w-7 h-7 rounded-full font-bold text-xs flex items-center justify-center ${
                    ['profile', 'pesanan-saya', 'tanaman-saya'].includes(activeTab)
                      ? 'bg-emerald-800 text-white'
                      : 'bg-emerald-700 text-white'
                  }`}
                >
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className="hidden sm:inline max-w-[120px] truncate">
                  {user.name}
                </span>
              </button>
            ) : (
              /* User belum login: [ Login ] */
              <button
                onClick={onNavigateToAuth}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold bg-[#2e6043] text-white hover:bg-emerald-800 transition-all shadow-xs cursor-pointer"
              >
                <span>Login</span>
              </button>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-stone-100 flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-base font-semibold ${
                  activeTab === link.id
                    ? 'bg-emerald-50 text-emerald-800'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                {link.label}
              </button>
            ))}

            {user ? (
              <div className="pt-2 border-t border-stone-100 space-y-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigateTab('profile');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2.5 transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-emerald-50 text-emerald-800 font-bold'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <User className="w-4 h-4 text-emerald-700" />
                  <span>Profil Saya ({user.name})</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full text-left px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Keluar Akun</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateToAuth();
                }}
                className="mt-2 flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#2e6043] text-white font-bold text-sm"
              >
                <span>Login</span>
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
