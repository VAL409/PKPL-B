import React from 'react';
import { CheckCircle2, ArrowRight, Home, Package, Phone, CreditCard, MapPin } from 'lucide-react';
import { formatRupiah } from '../data/plants';

export default function OrderSuccessPage({
  order,
  onViewOrders,
  onBackToHome,
}) {
  if (!order) {
    return (
      <div className="py-20 text-center">
        <p className="text-stone-500 mb-4">Tidak ada data pesanan aktif.</p>
        <button
          onClick={onBackToHome}
          className="px-6 py-2.5 rounded-full bg-[#2e6043] text-white font-bold text-xs cursor-pointer"
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  const handleContactAdminWA = () => {
    const text = encodeURIComponent(
      `Halo GreenLeaf, saya baru saja membuat pesanan dengan nomor *#${order.id}* total ${formatRupiah(order.total)}. Mohon bantuan informasi pengirimannya ya. Terima kasih!`
    );
    window.open(`https://wa.me/628123456789?text=${text}`, '_blank');
  };

  return (
    <div className="py-14 sm:py-20 bg-[#f8faf8] min-h-screen flex items-center justify-center px-4 sm:px-6">
      <div className="max-w-xl w-full bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-stone-200/80 text-center">
        
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-5 shadow-sm">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-heading font-black text-stone-900 mb-2">
          Pesanan Berhasil Dibuat
        </h1>
        <p className="text-stone-500 text-xs sm:text-sm mb-8">
          Terima kasih telah berbelanja di GreenLeaf. Rincian pesanan Anda telah tersimpan dan siap dikirimkan ke alamat tujuan.
        </p>

        {/* Order Details Card */}
        <div className="bg-stone-50/80 rounded-2xl p-5 border border-stone-200/70 text-left space-y-3 mb-8 text-xs sm:text-sm">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200/60">
            <span className="text-stone-500 font-medium">Nomor Pesanan</span>
            <span className="font-heading font-bold text-stone-900 text-sm sm:text-base">
              #{order.id}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-stone-500 font-medium">Tanggal Pesanan</span>
            <span className="font-semibold text-stone-800">{order.date}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-stone-500 font-medium">Metode Pembayaran</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-100/70 text-emerald-900 font-bold text-xs">
              <CreditCard className="w-3.5 h-3.5 text-emerald-700" />
              {order.paymentMethod || 'Transfer Bank'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-stone-500 font-medium">Penerima</span>
            <span className="font-semibold text-stone-800">
              {order.shippingData?.recipientName} ({order.shippingData?.phone})
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
            <span className="text-stone-500 font-medium shrink-0">Alamat Pengiriman</span>
            <span className="font-semibold text-stone-800 text-right sm:max-w-xs">
              {order.shippingData?.address}
              {order.shippingData?.city ? `, ${order.shippingData.city}` : ''}
              {order.shippingData?.postalCode ? ` ${order.shippingData.postalCode}` : ''}
            </span>
          </div>

          <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-sm sm:text-base">
            <span className="font-heading font-bold text-stone-700">Total Pembayaran</span>
            <span className="font-heading font-black text-[#2e6043]">
              {formatRupiah(order.total)}
            </span>
          </div>
        </div>

        {/* Items Thumbnail Preview */}
        <div className="mb-8 text-left">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-2">
            Produk dalam Pesanan ({order.items?.length || 0})
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {order.items?.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-stone-50 p-2 rounded-xl border border-stone-200 shrink-0 text-xs"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div className="max-w-[120px] truncate">
                  <p className="font-bold text-stone-800 truncate">{item.name}</p>
                  <p className="text-[10px] text-stone-500">{item.quantity}x</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={onViewOrders}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-bold text-sm bg-[#2e6043] hover:bg-emerald-800 text-white transition-all shadow-md cursor-pointer"
          >
            <Package className="w-4 h-4" />
            <span>Lihat Pesanan Saya</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full font-semibold text-xs border border-stone-200 text-stone-700 hover:bg-stone-50 transition-all cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Kembali ke Beranda</span>
            </button>

            <button
              type="button"
              onClick={handleContactAdminWA}
              className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full font-semibold text-xs border border-emerald-300 text-emerald-800 hover:bg-emerald-50 transition-all cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Bantuan Pesanan</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
