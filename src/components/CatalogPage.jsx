import React, { useState, useMemo } from 'react';
import { Search, ShoppingBag, Eye, Sun, Droplets, Sparkles, ArrowUpDown, Info } from 'lucide-react';
import { categories, formatRupiah } from '../data/plants';

export default function CatalogPage({
  plants,
  onAddToCart,
  onViewDetail,
  onPreviewImage,
  selectedCategory,
  setSelectedCategory,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default'); // 'default' | 'price-asc' | 'price-desc' | 'name-asc'

  // Filter & Sort logic
  const filteredPlants = useMemo(() => {
    let result = plants.filter((plant) => {
      const matchCategory =
        selectedCategory === 'all' || plant.categories.includes(selectedCategory);
      const matchSearch =
        plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    });

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [plants, selectedCategory, searchTerm, sortBy]);

  return (
    <div className="py-12 bg-[#fcfdfc] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/70 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Koleksi Lengkap
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-black text-stone-900 tracking-tight">
            Katalog Tanaman Hias
          </h1>
          <p className="text-stone-500 mt-2 text-sm sm:text-base">
            Pilih dan temukan tanaman hias favorit Anda berdasarkan kategori dan ruang peletakan.
          </p>
        </div>

        {/* Search Bar & Filter Controls */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-stone-200/80 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-[#2e6043] text-white shadow-sm'
                        : 'bg-stone-100 text-stone-600 hover:bg-emerald-50 hover:text-emerald-700'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Instant Search Bar */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Cari nama tanaman..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all bg-stone-50/50"
              />
            </div>
          </div>

          {/* Sub-bar: Results Counter & Sorting Dropdown */}
          <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="text-stone-500 font-semibold w-full sm:w-auto text-left">
              Menampilkan <strong className="text-stone-900">{filteredPlants.length}</strong> tanaman
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="ml-2 font-bold text-emerald-700 hover:underline cursor-pointer"
                >
                  (Hapus filter pencarian)
                </button>
              )}
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
              <span className="text-stone-500 font-medium">Urutkan:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="py-1 px-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-700 font-bold focus:outline-none focus:border-emerald-600 cursor-pointer"
              >
                <option value="default">Rekomendasi</option>
                <option value="price-asc">Harga: Rendah ke Tinggi</option>
                <option value="price-desc">Harga: Tinggi ke Rendah</option>
                <option value="name-asc">Nama: A - Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Plant Grid */}
        {filteredPlants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPlants.map((plant) => (
              <div
                key={plant.id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-stone-200/80 transition-all duration-300 flex flex-col group"
              >
                {/* Image Container with Zoom Trigger */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-100">
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out cursor-pointer"
                    onClick={() => onViewDetail ? onViewDetail(plant) : onPreviewImage(plant.image, plant.name)}
                  />

                  {/* Category Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                    {plant.categories.map((cat) => (
                      <span
                        key={cat}
                        className="px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-sm text-[10px] font-bold text-emerald-800 shadow-xs uppercase tracking-wider"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* Stock Status Badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-xs ${
                      plant.stockCount === 0 || plant.stockStatus === 'Habis Terjual'
                        ? 'bg-stone-800 text-white'
                        : 'bg-emerald-700/90 text-white'
                    }`}>
                      {plant.stockCount === 0 || plant.stockStatus === 'Habis Terjual' ? 'Stok Habis' : (plant.stockStatus || 'Tersedia')}
                    </span>
                  </div>

                  {/* Quick View Lightbox Button */}
                  <button
                    onClick={() => onPreviewImage(plant.image, plant.name)}
                    className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-emerald-700 shadow-md flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                    title="Perbesar Foto"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Details */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 
                      onClick={() => onViewDetail && onViewDetail(plant)}
                      className="font-heading font-bold text-lg text-stone-800 mb-1.5 group-hover:text-emerald-700 transition-colors cursor-pointer"
                    >
                      {plant.name}
                    </h3>
                    <p className="text-stone-500 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
                      {plant.description}
                    </p>

                    {/* Quick Care Indicator Badges */}
                    <div className="flex items-center gap-3 py-2 px-3 rounded-xl bg-stone-50 border border-stone-100 mb-4 text-[11px] text-stone-600">
                      <div className="flex items-center gap-1.5 truncate">
                        <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="truncate">{plant.light}</span>
                      </div>
                      <div className="w-px h-3 bg-stone-200 shrink-0" />
                      <div className="flex items-center gap-1.5 truncate">
                        <Droplets className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <span className="truncate">{plant.water}</span>
                      </div>
                    </div>
                  </div>

                  {/* Price & Action Buttons */}
                  <div className="pt-3 border-t border-stone-100">
                    <div className="flex items-baseline justify-between mb-3">
                      <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">
                        Harga Satuan
                      </span>
                      <span className="text-lg font-black text-emerald-800 font-heading">
                        {formatRupiah(plant.price)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => onViewDetail && onViewDetail(plant)}
                        className="py-2.5 px-3 rounded-full border border-stone-200 hover:border-emerald-600 text-stone-700 hover:text-emerald-800 font-bold text-xs transition-colors cursor-pointer text-center"
                      >
                        Lihat Detail
                      </button>

                      {plant.stockCount === 0 || plant.stockStatus === 'Habis Terjual' ? (
                        <button
                          type="button"
                          disabled
                          className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full font-bold text-xs bg-stone-100 text-stone-400 border border-stone-200 cursor-not-allowed text-center"
                        >
                          <span>Habis</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onAddToCart(plant)}
                          className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full font-bold text-xs bg-[#4caf50] hover:bg-emerald-600 text-white transition-all shadow-xs cursor-pointer text-center"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>+ Keranjang</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 p-8">
            <p className="text-stone-500 text-base font-medium">
              Tidak ada tanaman yang sesuai dengan pencarian "{searchTerm}".
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSortBy('default');
              }}
              className="mt-4 px-6 py-2.5 rounded-full bg-[#2e6043] text-white text-xs font-bold cursor-pointer"
            >
              Reset Filter & Pencarian
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
