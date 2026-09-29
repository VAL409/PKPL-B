import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { formatRupiah } from '../data/plants';

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onGoToCatalog,
  onProceedToCheckout,
}) {
  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-stone-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-stone-900">
                  Keranjang Belanja
                </h3>
                <span className="text-xs text-stone-500">
                  {cart.length} jenis tanaman dipilih
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-20 px-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <h4 className="font-heading font-bold text-stone-800 text-base mb-1">
                  Keranjang Anda masih kosong
                </h4>
                <p className="text-xs text-stone-500 mb-6 max-w-xs mx-auto leading-relaxed">
                  Jelajahi tanaman dan temukan tanaman favorit Anda.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onGoToCatalog();
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#2e6043] text-white font-bold text-xs shadow-sm hover:bg-emerald-800 transition-all cursor-pointer"
                >
                  Tampilkan Katalog
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3.5 rounded-2xl border border-stone-100 bg-stone-50/50 hover:bg-stone-50 transition-colors"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover shrink-0 border border-stone-200"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-stone-800 text-sm">
                          {item.name}
                        </h4>
                        <span className="text-xs font-bold text-emerald-700">
                          {formatRupiah(item.price)}
                        </span>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-stone-400 hover:text-red-500 p-1 transition-colors cursor-pointer"
                        title="Hapus Tanaman"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 bg-white rounded-lg border border-stone-200 px-2 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="text-stone-500 hover:text-stone-800 cursor-pointer p-0.5"
                          aria-label="Kurangi"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-stone-800 w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="text-stone-500 hover:text-stone-800 cursor-pointer p-0.5"
                          aria-label="Tambah"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-extrabold text-stone-700">
                        {formatRupiah(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-stone-100 bg-stone-50/50 space-y-4">
              <div className="space-y-1.5 text-xs sm:text-sm">
                <div className="flex items-center justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-800">{formatRupiah(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-stone-200/60">
                  <span className="font-heading font-black text-stone-900 text-base">Total</span>
                  <span className="font-heading font-black text-xl text-[#2e6043]">
                    {formatRupiah(subtotal)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onProceedToCheckout();
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-bold text-sm bg-[#2e6043] hover:bg-emerald-800 text-white shadow-md hover:shadow-emerald-950/20 transition-all cursor-pointer"
                >
                  <span>Lanjut ke Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onClearCart}
                  className="w-full text-center text-xs font-bold text-stone-400 hover:text-red-500 transition-colors py-1 cursor-pointer"
                >
                  Kosongkan Keranjang
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
