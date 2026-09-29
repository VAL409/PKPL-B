import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Truck } from 'lucide-react';

export default function Hero({ onExploreCatalog, onContactUs }) {
  return (
    <div className="relative">
      {/* Background Image with Ambient Overlay */}
      <div 
        className="relative min-h-[560px] md:min-h-[640px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(15, 28, 20, 0.65), rgba(15, 28, 20, 0.75)), url('/images/banner.jpg')`,
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-16">
          
          {/* Top Tagline */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-emerald-200 text-xs md:text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>Koleksi Tanaman Hias Alami & Estetis</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-heading tracking-tight leading-tight mb-6 drop-shadow-md">
            Bawa Nuansa Alam <br className="hidden sm:inline" />
            ke Dalam Rumah Anda
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-stone-200 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Temukan koleksi tanaman hias terbaik yang dirawat dengan penuh cinta untuk menyegarkan udara, menjernihkan pikiran, dan mempercantik setiap sudut ruangan Anda.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onExploreCatalog}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-base bg-[#4caf50] hover:bg-emerald-600 text-white transition-all shadow-lg hover:shadow-emerald-500/25 cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>Lihat Katalog</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={onContactUs}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full font-bold text-base bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm transition-all cursor-pointer"
            >
              Hubungi Kami
            </button>
          </div>
        </div>
      </div>

      {/* Feature Highlights Bar */}
      <div className="max-w-5xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white rounded-2xl shadow-xl border border-stone-100 p-4 sm:p-6">
          <div className="flex items-center gap-4 p-2">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-stone-800 text-base">Kualitas Terjamin</h3>
              <p className="text-xs text-stone-500 mt-0.5">Semua tanaman sehat & bebas dari hama penyakit.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-2 border-t md:border-t-0 md:border-l border-stone-100">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-stone-800 text-base">Pengiriman Aman</h3>
              <p className="text-xs text-stone-500 mt-0.5">Packing kardus tebal dan pot kokoh bergaransi.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-2 border-t md:border-t-0 md:border-l border-stone-100">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-stone-800 text-base">Konsultasi Perawatan</h3>
              <p className="text-xs text-stone-500 mt-0.5">Panduan tips rawat tanaman dari florist kami.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
