import React, { useState } from 'react';
import { Leaf, Sun, Droplets, Wind, Sparkles, MessageCircle, ArrowRight, X, Calendar, BookOpen } from 'lucide-react';
import AccountNavTabs from './AccountNavTabs';

export default function MyPlantsPage({
  myPlants,
  onExploreCatalog,
  onNavigateTab,
}) {
  const [selectedGuidePlant, setSelectedGuidePlant] = useState(null);

  const handleAskFloristWA = (plantName) => {
    const text = encodeURIComponent(
      `Halo Tim Botanis GreenLeaf, saya ingin berkonsultasi mengenai perawatan tanaman *${plantName}* yang telah saya beli. Bagaimana tips agar daunnya tetap sehat dan subur?`
    );
    window.open(`https://wa.me/628123456789?text=${text}`, '_blank');
  };

  return (
    <div className="py-12 sm:py-16 bg-[#f8faf8] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Tabs between Profile / Orders / My Plants */}
        <AccountNavTabs activeTab="tanaman-saya" onNavigateTab={onNavigateTab} />

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-stone-900 tracking-tight">
            Tanaman Saya
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Pantau koleksi tanaman Anda dan panduan perawatannya agar tetap subur.
          </p>
        </div>

        {/* Plant Cards Grid */}
        {!myPlants || myPlants.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 sm:p-14 text-center border border-stone-200/80 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-8 h-8 opacity-70" />
            </div>
            <h3 className="font-heading font-bold text-stone-800 text-lg mb-1">
              Belum Ada Tanaman
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto mb-6">
              Tanaman yang Anda beli akan otomatis tercatat di sini lengkap dengan panduan jadwal perawatannya.
            </p>
            <button
              onClick={onExploreCatalog}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2e6043] text-white font-bold text-xs sm:text-sm shadow-md hover:bg-emerald-800 transition-all cursor-pointer"
            >
              <span>Jelajahi Katalog Tanaman</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {myPlants.map((plant, index) => (
              <div
                key={plant.id ? `${plant.id}-${index}` : index}
                className="bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-xs hover:shadow-md transition-all flex flex-col group"
              >
                <div className="relative h-56 bg-stone-100 overflow-hidden">
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[10px] font-bold text-emerald-800 shadow-xs uppercase tracking-wider">
                    {plant.categories?.[0] || 'Koleksi'}
                  </div>
                </div>

                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-lg text-stone-800 mb-1">
                      {plant.name}
                    </h3>
                    
                    <div className="flex items-center gap-1.5 text-[11px] text-stone-500 mb-4">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{plant.purchaseDate || 'Diadopsi baru-baru ini'}</span>
                    </div>

                    {/* Quick indicator badges */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] mb-4">
                      <div className="p-2 rounded-xl bg-amber-50 text-amber-900 border border-amber-100 flex items-center gap-1.5">
                        <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="truncate">{plant.light || 'Cahaya Sedang'}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-blue-50 text-blue-900 border border-blue-100 flex items-center gap-1.5">
                        <Droplets className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <span className="truncate">{plant.water || '1-2x Seminggu'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedGuidePlant(plant)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full bg-[#2e6043] hover:bg-emerald-800 text-white font-bold text-xs transition-all cursor-pointer shadow-xs"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Panduan Perawatan</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAskFloristWA(plant.name)}
                      className="p-2.5 rounded-full border border-stone-200 hover:border-emerald-500 text-stone-600 hover:text-emerald-700 transition-colors cursor-pointer"
                      title="Tanya Florist via WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal: Panduan Perawatan Detail */}
        {selectedGuidePlant && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
            onClick={() => setSelectedGuidePlant(null)}
          >
            <div
              className="relative max-w-lg w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-100 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedGuidePlant(null)}
                className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3.5 mb-6">
                <img
                  src={selectedGuidePlant.image}
                  alt={selectedGuidePlant.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-stone-200"
                />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                    Panduan Lengkap
                  </span>
                  <h3 className="font-heading font-black text-xl text-stone-900">
                    {selectedGuidePlant.name}
                  </h3>
                </div>
              </div>

              {/* Care Specs Grid */}
              <div className="space-y-3.5 mb-6 text-xs sm:text-sm">
                <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-100 flex items-start gap-3">
                  <Sun className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-800 text-xs font-bold uppercase">Kebutuhan Cahaya:</strong>
                    <p className="text-stone-600 mt-0.5">{selectedGuidePlant.light}</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-start gap-3">
                  <Droplets className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-800 text-xs font-bold uppercase">Frekuensi Penyiraman:</strong>
                    <p className="text-stone-600 mt-0.5">{selectedGuidePlant.water}</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-start gap-3">
                  <Wind className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-800 text-xs font-bold uppercase">Kelembapan Ruangan:</strong>
                    <p className="text-stone-600 mt-0.5">{selectedGuidePlant.humidity || 'Sedang (50-60%)'}</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-800 text-xs font-bold uppercase">Tips Khusus Florist:</strong>
                    <p className="text-stone-600 mt-0.5">{selectedGuidePlant.careTips || 'Jaga sirkulasi udara di sekitar pot dan bersihkan daun secara berkala.'}</p>
                  </div>
                </div>
              </div>

              {/* Button WhatsApp Consultation */}
              <button
                type="button"
                onClick={() => handleAskFloristWA(selectedGuidePlant.name)}
                className="w-full py-3 px-6 rounded-full font-bold text-xs sm:text-sm bg-emerald-700 hover:bg-emerald-800 text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Konsultasi Perawatan via WhatsApp</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
