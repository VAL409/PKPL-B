import React from 'react';

export default function AccountNavTabs({ activeTab, onNavigateTab }) {
  const tabs = [
    { id: 'profile', label: 'Profil Saya' },
    { id: 'pesanan-saya', label: 'Pesanan Saya' },
    { id: 'tanaman-saya', label: 'Tanaman Saya' },
  ];

  return (
    <div className="flex items-center gap-1.5 mb-8 bg-stone-100/90 p-1.5 rounded-2xl max-w-md w-full">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              if (!isActive && onNavigateTab) {
                onNavigateTab(tab.id);
                if (window.scrollY > 100) {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }
            }}
            className={`flex-1 py-2 sm:py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer text-center ${
              isActive
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-500 hover:text-stone-800 hover:bg-stone-200/40'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
