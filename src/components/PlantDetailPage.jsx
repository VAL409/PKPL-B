import React, { useState } from 'react';
import { ArrowLeft, ShoppingBag, Sun, Droplets, Wind, Plus, Minus, Eye, Sparkles } from 'lucide-react';
import { formatRupiah } from '../data/plants';

export default function PlantDetailPage({
  plant,
  onAddToCart,
  onBackToCatalog,
  onPreviewImage,
}) {
  const [quantity, setQuantity] = useState(1);

  if (!plant) {
    return (
      <div className="py-20 text-center">
        <p className="text-stone-500 mb-4">Tanaman tidak ditemukan.</p>
        <button
          onClick={onBackToCatalog}
          className="px-6 py-2.5 rounded-full bg-[#2e6043] text-white text-xs font-bold"
        >
          Kembali ke Katalog
        </button>
      </div>
    );
  }

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity < (plant.stockCount || 20)) setQuantity(quantity + 1);
  };

  const handleAddWithQuantity = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(plant);
    }
  };

  return (
    <div className="py-10 sm:py-16 bg-[#fcfdfc] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-500 mb-8">
          <button
            onClick={onBackToCatalog}
            className="hover:text-emerald-800 transition-colors flex items-center gap-1 font-semibold cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Katalog Tanaman</span>
          </button>
          <span>/</span>
          <span className="text-stone-800 font-bold truncate max-w-xs">{plant.name}</span>
        </div>

        {/* Main Product Layout */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-stone-200/80 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: Product Image Showcase */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="relative rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 aspect-4/5 group">
              <img
                src={plant.image}
                alt={plant.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out cursor-pointer"
                onClick={() => onPreviewImage(plant.image, plant.name)}
              />

              {/* Floating badges */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                {plant.categories?.map((cat) => (
                  <span
                    key={cat}
                    className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[11px] font-bold text-emerald-800 shadow-xs uppercase tracking-wider"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              {/* Zoom Trigger Button */}
              <button
                type="button"
                onClick={() => onPreviewImage(plant.image, plant.name)}
                className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-emerald-700 shadow-md flex items-center justify-center transition-all cursor-pointer"
                title="Perbesar Foto"
              >
                <Eye className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Column: Details & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Stock Status Badge */}
              {plant.stockCount === 0 || plant.stockStatus === 'Habis Terjual' ? (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-bold mb-3">
                  <span className="w-2 h-2 rounded-full bg-stone-400" />
                  <span>Stok Habis Terjual</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold mb-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{plant.stockStatus || 'Tersedia - Siap Kirim'}</span>
                  {plant.stockCount && (
                    <span className="text-stone-400 font-normal">| Sisa {plant.stockCount} pot</span>
                  )}
                </div>
              )}

              {/* Title & Price */}
              <h1 className="text-3xl sm:text-4xl font-heading font-black text-stone-900 tracking-tight leading-tight mb-3">
                {plant.name}
              </h1>

              <div className="text-2xl sm:text-3xl font-heading font-black text-[#2e6043] mb-5">
                {formatRupiah(plant.price)}
              </div>

              {/* Short Description */}
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-6">
                {plant.description}
              </p>

              {/* Plant Size Info */}
              {plant.size && (
                <div className="mb-6 p-3.5 rounded-2xl bg-stone-50/80 border border-stone-200/60 flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-bold text-stone-700">Dimensi & Pot:</span>
                  <span className="text-stone-600 font-medium">{plant.size}</span>
                </div>
              )}

              {/* Care Indicators Grid */}
              <div className="mb-8">
                <h3 className="font-heading font-bold text-sm text-stone-800 mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Panduan Perawatan Cepat</span>
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-2xl bg-amber-50/50 border border-amber-100 flex items-start gap-2.5">
                    <Sun className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[11px] font-bold text-stone-500 uppercase">Cahaya</span>
                      <span className="text-xs font-semibold text-stone-800">{plant.light}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-blue-50/50 border border-blue-100 flex items-start gap-2.5">
                    <Droplets className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[11px] font-bold text-stone-500 uppercase">Penyiraman</span>
                      <span className="text-xs font-semibold text-stone-800">{plant.water}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex items-start gap-2.5">
                    <Wind className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[11px] font-bold text-stone-500 uppercase">Kelembapan</span>
                      <span className="text-xs font-semibold text-stone-800">{plant.humidity || 'Sedang (50-60%)'}</span>
                    </div>
                  </div>
                </div>

                {plant.careTips && (
                  <p className="text-xs text-stone-500 italic mt-2.5 pl-1">
                    💡 <strong>Tips Florist:</strong> {plant.careTips}
                  </p>
                )}
              </div>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="pt-6 border-t border-stone-100 space-y-4">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-stone-50/80 border border-stone-200/60">
                {/* Quantity Controls */}
                <div className="flex items-center justify-between sm:justify-start gap-4">
                  <span className="text-xs font-bold text-stone-600 uppercase tracking-wider">Jumlah:</span>
                  <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-full p-1 shadow-2xs">
                    <button
                      type="button"
                      onClick={handleDecrease}
                      disabled={quantity <= 1}
                      className="w-7 h-7 rounded-full bg-stone-50 hover:bg-stone-100 flex items-center justify-center text-stone-700 disabled:opacity-30 cursor-pointer transition-colors"
                      aria-label="Kurangi Jumlah"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-heading font-black text-stone-900 text-sm sm:text-base w-7 text-center">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={handleIncrease}
                      disabled={quantity >= (plant.stockCount || 20)}
                      className="w-7 h-7 rounded-full bg-stone-50 hover:bg-stone-100 flex items-center justify-center text-stone-700 disabled:opacity-30 cursor-pointer transition-colors"
                      aria-label="Tambah Jumlah"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Subtotal Preview */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-2 sm:pt-0 border-stone-200/50">
                  <span className="text-[11px] text-stone-500 uppercase font-bold tracking-wider block">Total Harga:</span>
                  <span className="font-heading font-black text-xl text-[#2e6043]">
                    {formatRupiah(plant.price * quantity)}
                  </span>
                </div>
              </div>

              {/* Action Button: Add to Cart (Disabled when out of stock) */}
              {plant.stockCount === 0 || plant.stockStatus === 'Habis Terjual' ? (
                <button
                  type="button"
                  disabled
                  className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-8 rounded-full font-bold text-sm sm:text-base bg-stone-200 text-stone-500 cursor-not-allowed"
                >
                  <span>Stok Habis Terjual</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleAddWithQuantity}
                  className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-8 rounded-full font-bold text-sm sm:text-base bg-[#2e6043] hover:bg-emerald-800 text-white transition-all shadow-md hover:shadow-emerald-950/20 active:scale-[0.99] cursor-pointer"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Tambah ke Keranjang</span>
                </button>
              )}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
