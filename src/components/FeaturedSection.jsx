import React from 'react';
import { ArrowRight, ShoppingBag, Eye, Sparkles } from 'lucide-react';
import { formatRupiah } from '../data/plants';

export default function FeaturedSection({
  featuredPlants,
  onAddToCart,
  onViewDetail,
  onPreviewImage,
  onViewAll,
}) {
  return (
    <section className="py-20 bg-[#fcfdfc]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/70 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Favorit Minggu Ini
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-stone-900 tracking-tight">
              Tanaman Pilihan Kami
            </h2>
            <p className="text-stone-500 mt-2 text-sm sm:text-base">
              Koleksi terpopuler yang paling banyak digemari dan dicari para pecinta tanaman hias.
            </p>
          </div>
          <button
            onClick={onViewAll}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 font-bold text-emerald-700 hover:text-emerald-800 text-sm group cursor-pointer"
          >
            Lihat Katalog Lengkap
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 3 Featured Plant Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPlants.map((plant) => (
            <div
              key={plant.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-stone-200/80 transition-all duration-300 flex flex-col group"
            >
              {/* Image Preview Container */}
              <div className="relative h-72 w-full overflow-hidden bg-stone-100">
                <img
                  src={plant.image}
                  alt={plant.name}
                  onClick={() => onViewDetail && onViewDetail(plant)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out cursor-pointer"
                />
                
                {/* Floating category badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                  {plant.categories.map((cat) => (
                    <span
                      key={cat}
                      className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-emerald-800 shadow-xs uppercase tracking-wider"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                {/* Quick zoom preview button */}
                <button
                  onClick={() => onPreviewImage(plant.image, plant.name)}
                  className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-emerald-700 shadow-md flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                  title="Lihat Foto Penuh"
                >
                  <Eye className="w-5 h-5" />
                </button>
              </div>

              {/* Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 
                    onClick={() => onViewDetail && onViewDetail(plant)}
                    className="font-heading font-bold text-xl text-stone-800 mb-2 group-hover:text-emerald-700 transition-colors cursor-pointer"
                  >
                    {plant.name}
                  </h3>
                  <p className="text-stone-500 text-sm line-clamp-2 leading-relaxed mb-4">
                    {plant.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-stone-600 block uppercase font-bold tracking-wider">
                      Harga
                    </span>
                    <span className="text-xl font-black text-emerald-700 font-heading">
                      {formatRupiah(plant.price)}
                    </span>
                  </div>

                  <button
                    onClick={() => onAddToCart(plant)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full font-bold text-xs bg-[#4caf50] hover:bg-emerald-600 text-white transition-all shadow-xs hover:shadow-emerald-500/20 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Pesan</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
