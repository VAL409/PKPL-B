import React, { useState } from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  Truck,
  MapPin,
  Phone,
  User,
  FileText,
  Lock,
  Building2,
  CreditCard,
  Smartphone,
  Banknote,
  ShoppingBag,
} from 'lucide-react';
import { formatRupiah } from '../data/plants';

export default function CheckoutPage({
  cart,
  user,
  onConfirmOrder,
  onBackToCart,
}) {
  const [shippingData, setShippingData] = useState({
    recipientName: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    postalCode: user?.postalCode || '',
    notes: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('Transfer Bank');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = subtotal >= 250000 ? 0 : 25000;
  const total = subtotal + shippingFee;

  const handleChange = (e) => {
    setShippingData({
      ...shippingData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handlePaymentSelect = (method) => {
    setPaymentMethod(method);
    if (errors.paymentMethod) {
      setErrors({ ...errors, paymentMethod: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!shippingData.recipientName.trim()) {
      newErrors.recipientName = 'Nama penerima wajib diisi.';
    }
    if (!shippingData.phone.trim()) {
      newErrors.phone = 'Nomor telepon penerima wajib diisi.';
    }
    if (!shippingData.address.trim()) {
      newErrors.address = 'Alamat lengkap pengiriman wajib diisi.';
    }
    if (!shippingData.city.trim()) {
      newErrors.city = 'Kota / Kabupaten pengiriman wajib diisi.';
    }
    if (!shippingData.postalCode.trim()) {
      newErrors.postalCode = 'Kode pos pengiriman wajib diisi.';
    }
    if (!paymentMethod) {
      newErrors.paymentMethod = 'Silakan pilih metode pembayaran.';
    }

    if (!cart || cart.length === 0) {
      newErrors.cart = 'Keranjang belanja Anda kosong.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate order placement
    setTimeout(() => {
      const orderId = `GL-${Math.floor(10000 + Math.random() * 90000)}`;
      const newOrder = {
        id: orderId,
        date: new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
        createdAt: new Date().toISOString(),
        items: [...cart],
        subtotal,
        shippingFee,
        total,
        paymentMethod,
        shippingData,
      };

      onConfirmOrder(newOrder);
      setIsSubmitting(false);
    }, 600);
  };

  // If cart is empty
  if (!cart || cart.length === 0) {
    return (
      <div className="py-20 bg-[#f8faf8] min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-stone-200/80 shadow-xs text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-heading font-black text-xl text-stone-900 mb-2">
            Keranjang Belanja Kosong
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mb-6">
            Pilih tanaman hias favorit Anda terlebih dahulu sebelum melanjutkan ke checkout.
          </p>
          <button
            onClick={onBackToCart}
            className="w-full py-3 rounded-full bg-[#2e6043] hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm transition-all shadow-sm cursor-pointer"
          >
            Lihat Keranjang
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 sm:py-14 bg-[#f8faf8] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Step Indicator */}
        <div className="max-w-md mx-auto mb-10">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-stone-200 -translate-y-1/2 z-0" />
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                ✓
              </div>
              <span className="text-[11px] font-bold text-emerald-800 mt-1.5">Keranjang</span>
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#2e6043] text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-emerald-100">
                2
              </div>
              <span className="text-[11px] font-bold text-stone-900 mt-1.5">Checkout</span>
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-white border-2 border-stone-300 text-stone-400 flex items-center justify-center text-xs font-bold">
                3
              </div>
              <span className="text-[11px] font-semibold text-stone-400 mt-1.5">Pesanan Berhasil</span>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="mb-6">
          <button
            onClick={onBackToCart}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-stone-600 hover:text-emerald-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Keranjang</span>
          </button>
        </div>

        {/* Checkout Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= LEFT COLUMN: INFORMASI PENGIRIMAN & METODE PEMBAYARAN ================= */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. INFORMASI PENGIRIMAN */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200/80">
              <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-stone-100">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Truck className="w-4 h-4 text-emerald-700" />
                </div>
                <div>
                  <h2 className="font-heading font-bold text-lg text-stone-900">
                    Informasi Pengiriman
                  </h2>
                  <p className="text-xs text-stone-500">
                    Lengkapi alamat tujuan pengiriman tanaman Anda dengan benar.
                  </p>
                </div>
              </div>

              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                {/* Nama Penerima */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Nama Penerima <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="text"
                      name="recipientName"
                      placeholder="Contoh: Reyvan Maulana"
                      value={shippingData.recipientName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/15 bg-stone-50/50"
                    />
                  </div>
                  {errors.recipientName && (
                    <p className="text-[11px] text-red-600 font-semibold mt-1">{errors.recipientName}</p>
                  )}
                </div>

                {/* Nomor Telepon */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Nomor Telepon / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="0812-xxxx-xxxx"
                      value={shippingData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/15 bg-stone-50/50"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-[11px] text-red-600 font-semibold mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Alamat Lengkap */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Alamat Lengkap Pengiriman <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
                    <textarea
                      rows="3"
                      name="address"
                      placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan, dan kecamatan"
                      value={shippingData.address}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/15 bg-stone-50/50"
                    ></textarea>
                  </div>
                  {errors.address && (
                    <p className="text-[11px] text-red-600 font-semibold mt-1">{errors.address}</p>
                  )}
                </div>

                {/* Kota / Kabupaten & Kode Pos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      Kota / Kabupaten <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                      <input
                        type="text"
                        name="city"
                        placeholder="Contoh: Bandung"
                        value={shippingData.city}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/15 bg-stone-50/50"
                      />
                    </div>
                    {errors.city && (
                      <p className="text-[11px] text-red-600 font-semibold mt-1">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      Kode Pos <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      placeholder="Contoh: 40135"
                      value={shippingData.postalCode}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/15 bg-stone-50/50"
                    />
                    {errors.postalCode && (
                      <p className="text-[11px] text-red-600 font-semibold mt-1">{errors.postalCode}</p>
                    )}
                  </div>
                </div>

                {/* Catatan Pesanan */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Catatan Pesanan <span className="text-stone-400 font-normal">(opsional)</span>
                  </label>
                  <div className="relative">
                    <FileText className="w-4 h-4 absolute left-3.5 top-3 text-stone-400" />
                    <input
                      type="text"
                      name="notes"
                      placeholder="Contoh: Titipkan di satpam, bungkus untuk hadiah"
                      value={shippingData.notes}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/15 bg-stone-50/50"
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* 2. PILIHAN METODE PEMBAYARAN */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200/80">
              <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-stone-100">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-emerald-700" />
                </div>
                <div>
                  <h2 className="font-heading font-bold text-lg text-stone-900">
                    Metode Pembayaran
                  </h2>
                  <p className="text-xs text-stone-500">
                    Pilih salah satu metode pembayaran yang Anda inginkan.
                  </p>
                </div>
              </div>

              {errors.paymentMethod && (
                <p className="text-xs text-red-600 font-semibold mb-3">{errors.paymentMethod}</p>
              )}

              <div className="space-y-3">
                {/* Transfer Bank */}
                <label
                  onClick={() => handlePaymentSelect('Transfer Bank')}
                  className={`flex items-start gap-3.5 p-4 rounded-2xl border transition-all cursor-pointer ${
                    paymentMethod === 'Transfer Bank'
                      ? 'border-[#2e6043] bg-emerald-50/50 shadow-xs ring-1 ring-[#2e6043]'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Transfer Bank"
                    checked={paymentMethod === 'Transfer Bank'}
                    onChange={() => handlePaymentSelect('Transfer Bank')}
                    className="mt-1 text-emerald-700 focus:ring-emerald-500 h-4 w-4"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-emerald-800" />
                      <span className="font-bold text-xs sm:text-sm text-stone-900">
                        Transfer Bank
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5">
                      BCA, Mandiri, BRI, BNI (Konfirmasi langsung tanpa ribet)
                    </p>
                  </div>
                </label>

                {/* E-Wallet */}
                <label
                  onClick={() => handlePaymentSelect('E-Wallet')}
                  className={`flex items-start gap-3.5 p-4 rounded-2xl border transition-all cursor-pointer ${
                    paymentMethod === 'E-Wallet'
                      ? 'border-[#2e6043] bg-emerald-50/50 shadow-xs ring-1 ring-[#2e6043]'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="E-Wallet"
                    checked={paymentMethod === 'E-Wallet'}
                    onChange={() => handlePaymentSelect('E-Wallet')}
                    className="mt-1 text-emerald-700 focus:ring-emerald-500 h-4 w-4"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-emerald-800" />
                      <span className="font-bold text-xs sm:text-sm text-stone-900">
                        E-Wallet
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5">
                      GoPay, OVO, DANA, ShopeePay (Pembayaran instan)
                    </p>
                  </div>
                </label>

                {/* COD */}
                <label
                  onClick={() => handlePaymentSelect('COD')}
                  className={`flex items-start gap-3.5 p-4 rounded-2xl border transition-all cursor-pointer ${
                    paymentMethod === 'COD'
                      ? 'border-[#2e6043] bg-emerald-50/50 shadow-xs ring-1 ring-[#2e6043]'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={paymentMethod === 'COD'}
                    onChange={() => handlePaymentSelect('COD')}
                    className="mt-1 text-emerald-700 focus:ring-emerald-500 h-4 w-4"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Banknote className="w-4 h-4 text-emerald-800" />
                      <span className="font-bold text-xs sm:text-sm text-stone-900">
                        COD (Bayar di Tempat)
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Bayar tunai kepada kurir saat tanaman sampai di alamat Anda
                    </p>
                  </div>
                </label>
              </div>

              <div className="mt-5 p-3 rounded-2xl bg-stone-50 border border-stone-200 flex items-center gap-2.5 text-xs text-stone-600">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Seluruh metode pembayaran terlindungi dengan enkripsi keamanan transaksi.</span>
              </div>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: RINGKASAN PESANAN ================= */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200/80 sticky top-28">
            <h2 className="font-heading font-bold text-lg text-stone-900 pb-4 mb-4 border-b border-stone-100">
              Ringkasan Pesanan
            </h2>

            {/* Item list */}
            <div className="space-y-3.5 max-h-72 overflow-y-auto pr-1 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3.5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover shrink-0 border border-stone-200"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-stone-800 truncate">
                      {item.name}
                    </h4>
                    <span className="text-[11px] text-stone-500">
                      {item.quantity} × {formatRupiah(item.price)}
                    </span>
                  </div>
                  <span className="font-heading font-bold text-xs sm:text-sm text-stone-800 shrink-0">
                    {formatRupiah(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="pt-4 border-t border-stone-100 space-y-2.5 text-xs sm:text-sm">
              <div className="flex items-center justify-between text-stone-600">
                <span>Subtotal Produk</span>
                <span className="font-semibold text-stone-800">{formatRupiah(subtotal)}</span>
              </div>

              <div className="flex items-center justify-between text-stone-600">
                <span>Biaya Pengiriman</span>
                <span className="font-semibold text-stone-800">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700 font-bold">GRATIS (Promo)</span>
                  ) : (
                    formatRupiah(shippingFee)
                  )}
                </span>
              </div>

              {subtotal < 250000 && (
                <p className="text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                  💡 Tambah {formatRupiah(250000 - subtotal)} lagi untuk dapat <strong>Gratis Ongkir</strong>!
                </p>
              )}

              <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-base">
                <span className="font-heading font-black text-stone-900">Total Pembayaran</span>
                <span className="font-heading font-black text-xl text-[#2e6043]">
                  {formatRupiah(total)}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              form="checkout-form"
              disabled={isSubmitting}
              className="w-full mt-6 py-3.5 px-6 rounded-full font-bold text-sm bg-[#2e6043] hover:bg-emerald-800 text-white transition-all shadow-md hover:shadow-emerald-950/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
            >
              <Lock className="w-4 h-4" />
              <span>{isSubmitting ? 'Memproses Pesanan...' : 'Konfirmasi & Buat Pesanan'}</span>
            </button>

            <p className="text-center text-[11px] text-stone-400 mt-3">
              🔒 Transaksi aman & terjamin oleh GreenLeaf Toko Tanaman
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
