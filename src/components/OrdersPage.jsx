import React, { useState } from 'react';
import { Package, Calendar, MapPin, ChevronDown, ChevronUp, MessageCircle, ArrowRight, CreditCard } from 'lucide-react';
import { formatRupiah } from '../data/plants';
import AccountNavTabs from './AccountNavTabs';

export default function OrdersPage({
  orders,
  onExploreCatalog,
  onNavigateTab,
}) {
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  const handleHelpWA = (orderId) => {
    const text = encodeURIComponent(
      `Halo GreenLeaf Support, saya ingin bertanya seputar pesanan saya dengan nomor #${orderId}. Mohon informasinya ya. Terima kasih!`
    );
    window.open(`https://wa.me/628123456789?text=${text}`, '_blank');
  };

  return (
    <div className="py-12 sm:py-16 bg-[#f8faf8] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Tabs between Profile / Orders / My Plants */}
        <AccountNavTabs activeTab="pesanan-saya" onNavigateTab={onNavigateTab} />

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-stone-900 tracking-tight">
            Pesanan Saya
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Daftar riwayat pesanan dan pembelian tanaman hias Anda di GreenLeaf.
          </p>
        </div>

        {/* Orders List */}
        {!orders || orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 sm:p-14 text-center border border-stone-200/80 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 opacity-70" />
            </div>
            <h3 className="font-heading font-bold text-stone-800 text-lg mb-1">
              Belum Ada Pesanan
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto mb-6">
              Anda belum melakukan pemesanan tanaman. Temukan aneka koleksi tanaman hijau segar di katalog kami!
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
          <div className="space-y-5">
            {orders.map((order) => {
              const isExpanded = expandedOrderId === order.id;

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl p-5 sm:p-7 border border-stone-200/80 shadow-xs hover:shadow-md transition-all"
                >
                  {/* Order Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                        <Package className="w-5 h-5 text-emerald-700" />
                      </div>
                      <div>
                        <span className="font-heading font-black text-stone-900 text-sm sm:text-base">
                          Pesanan #{order.id}
                        </span>
                        <div className="flex items-center gap-2 text-[11px] text-stone-500">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{order.date}</span>
                        </div>
                      </div>
                    </div>

                    {/* Payment Method Badge */}
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-stone-100 text-stone-700 border border-stone-200">
                        <CreditCard className="w-3 h-3 text-stone-500" />
                        <span>{order.paymentMethod || 'Transfer Bank'}</span>
                      </span>
                    </div>
                  </div>

                  {/* Order Items Preview */}
                  <div className="py-4 space-y-3">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded-xl object-cover border border-stone-200 shrink-0"
                          />
                          <div className="min-w-0">
                            <h4 className="font-bold text-xs sm:text-sm text-stone-800 truncate">
                              {item.name}
                            </h4>
                            <span className="text-[11px] text-stone-500">
                              {item.quantity} barang × {formatRupiah(item.price)}
                            </span>
                          </div>
                        </div>
                        <span className="font-heading font-bold text-xs sm:text-sm text-stone-800 shrink-0">
                          {formatRupiah(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Order Summary & Actions */}
                  <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[11px] text-stone-500 uppercase font-bold block">
                        Total Pesanan
                      </span>
                      <span className="font-heading font-black text-lg text-[#2e6043]">
                        {formatRupiah(order.total)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => handleHelpWA(order.id)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-emerald-300 text-emerald-800 hover:bg-emerald-50 text-xs font-bold transition-all cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Bantuan Pesanan</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleExpand(order.id)}
                        className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-all cursor-pointer"
                      >
                        <span>{isExpanded ? 'Tutup Detail' : 'Lihat Detail'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Expandable Details Box */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-stone-100 bg-stone-50/60 p-4 rounded-2xl space-y-3 text-xs">
                      <div>
                        <span className="font-bold text-stone-700 flex items-center gap-1.5 mb-1">
                          <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Alamat Pengiriman:</span>
                        </span>
                        <p className="text-stone-600 pl-5">
                          <strong>{order.shippingData?.recipientName}</strong> ({order.shippingData?.phone})
                          <br />
                          {order.shippingData?.address}
                          {order.shippingData?.city ? `, ${order.shippingData.city}` : ''}
                          {order.shippingData?.postalCode ? ` ${order.shippingData.postalCode}` : ''}
                        </p>
                      </div>

                      <div className="pl-5">
                        <span className="font-bold text-stone-700">Metode Pembayaran:</span>{' '}
                        <span className="text-stone-600">{order.paymentMethod || 'Transfer Bank'}</span>
                      </div>

                      {order.shippingData?.notes && (
                        <div className="pl-5">
                          <span className="font-bold text-stone-700">Catatan Pesanan:</span>{' '}
                          <span className="text-stone-600 italic">"{order.shippingData.notes}"</span>
                        </div>
                      )}

                      <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-[11px] text-stone-500">
                        <span>Biaya Pengiriman: <strong>{order.shippingFee === 0 ? 'Gratis' : formatRupiah(order.shippingFee)}</strong></span>
                        <span>Subtotal: <strong>{formatRupiah(order.subtotal || order.total)}</strong></span>
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
