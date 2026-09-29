import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    pesan: '',
  });

  const [status, setStatus] = useState({
    type: null, // 'success' | 'error' | null
    message: '',
    details: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { nama, email, pesan } = formData;

    // Validation
    const errors = [];
    if (!nama.trim()) errors.push('Nama wajib diisi');
    if (!email.trim()) errors.push('Email wajib diisi');
    else if (!/\S+@\S+\.\S+/.test(email)) errors.push('Format email tidak valid');
    if (!pesan.trim()) errors.push('Pesan wajib diisi');

    if (errors.length > 0) {
      setStatus({
        type: 'error',
        message: 'Mohon lengkapi formulir dengan benar:',
        details: errors,
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate sending (client-side processing)
    setTimeout(() => {
      setStatus({
        type: 'success',
        message: `Terima kasih, ${nama}!`,
        details: [
          `Pesan Anda telah kami terima dengan baik. Tim florist GreenLeaf akan membalas ke email ${email} dalam waktu 1x24 jam.`,
          `Isi Pesan: "${pesan}"`,
        ],
      });
      setFormData({ nama: '', email: '', pesan: '' });
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="py-16 bg-[#fcfdfc] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/70 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            Bantuan & Pesanan
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-black text-stone-900 tracking-tight">
            Hubungi Tim GreenLeaf
          </h1>
          <p className="text-stone-500 mt-2 text-sm sm:text-base">
            Ada pertanyaan tentang perawatan tanaman atau ingin memesan khusus? Kami siap membantu.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200/80">
              <h2 className="font-heading font-bold text-xl text-stone-800 mb-6">
                Informasi Kontak
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-600 block">WhatsApp / Telp</span>
                    <a href="https://wa.me/628123456789" target="_blank" rel="noreferrer" className="text-stone-800 font-semibold hover:text-emerald-700 transition-colors">
                      +62 812-3456-7890
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-600 block">Email Pelanggan</span>
                    <a href="mailto:kontak@greenleaf.id" className="text-stone-800 font-semibold hover:text-emerald-700 transition-colors">
                      kontak@greenleaf.id
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-600 block">Kebun & Toko Fisik</span>
                    <p className="text-stone-700 font-medium text-sm">
                      Jl. Kebun Hijau No. 88, Bandung, Jawa Barat
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-600 block">Jam Operasional</span>
                    <p className="text-stone-700 font-medium text-sm">
                      Senin - Minggu: 08.00 - 17.00 WIB
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp banner */}
            <div className="bg-gradient-to-br from-[#2e6043] to-emerald-900 text-white rounded-3xl p-6 sm:p-7 shadow-lg">
              <h3 className="font-heading font-bold text-lg mb-2">Ingin Respon Lebih Cepat?</h3>
              <p className="text-emerald-100 text-xs sm:text-sm mb-4 leading-relaxed">
                Kirim chat langsung ke nomor WhatsApp kami untuk konsultasi tanaman secara real-time.
              </p>
              <a
                href="https://wa.me/628123456789?text=Halo%20GreenLeaf,%20saya%20ingin%20tanya%20tentang%20tanaman%20hias"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-md transition-all"
              >
                <Phone className="w-3.5 h-3.5" /> Chat WhatsApp Sekarang
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200/80">
              
              <h2 className="font-heading font-bold text-xl text-stone-800 mb-2">
                Kirimkan Pesan
              </h2>
              <p className="text-stone-500 text-sm mb-6">
                Silakan isi data diri Anda di bawah ini, kami akan merespons secepat mungkin.
              </p>

              {/* Status Alert Box */}
              {status.type === 'error' && (
                <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-sm flex gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">{status.message}</strong>
                    <ul className="list-disc list-inside mt-1 text-xs space-y-0.5">
                      {status.details?.map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {status.type === 'success' && (
                <div className="mb-6 p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm flex gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold text-base mb-1">{status.message}</strong>
                    {status.details?.map((msg, i) => (
                      <p key={i} className="text-xs text-emerald-800 mb-1 last:mb-0">
                        {msg}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Form Element */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="nama" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="nama"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    placeholder="Contoh: Reyvan"
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all bg-stone-50/50"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    Alamat Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nama@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all bg-stone-50/50"
                  />
                </div>

                <div>
                  <label htmlFor="pesan" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    Pesan atau Pertanyaan <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="pesan"
                    name="pesan"
                    rows="5"
                    value={formData.pesan}
                    onChange={handleChange}
                    placeholder="Tuliskan pesan, pertanyaan perawatan tanaman, atau pesanan khusus Anda di sini..."
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all bg-stone-50/50 resize-y"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm bg-[#2e6043] hover:bg-emerald-800 text-white transition-all shadow-md cursor-pointer disabled:opacity-70"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Mengirim...' : 'Kirim Pesan Sekarang'}</span>
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
