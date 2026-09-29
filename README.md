# GreenLeaf - Website Toko & Katalog Tanaman Hias (React + Tailwind CSS)

Proyek ini merupakan hasil migrasi dan modernisasi dari kode PHP & jQuery sebelumnya menjadi aplikasi modern berbasis **React (Vite) + Tailwind CSS**.

---

## 🚀 Fitur Unggulan

1. **Desain Modern & Responsif**: Dibangun dengan Tailwind CSS, tampilan elegan di perangkat ponsel (*mobile-friendly*) maupun komputer desktop.
2. **Navigasi SPA Tanpa Reload**: Pindah antar halaman (Beranda, Katalog, Kontak) berlangsung instan dan mulus tanpa berkedip.
3. **Katalog Interaktif Dinamis**:
   - Filter instan berdasarkan kategori (*Semua, Indoor, Outdoor, Sukulen, Unggulan, Unik*).
   - Fitur pencarian nama tanaman (*Instant Search*).
   - Indikator kebutuhan cahaya & frekuensi penyiraman pada setiap tanaman.
4. **Lightbox Modal (Pratinjau Foto)**: Klik pada gambar untuk melihat tanaman dalam resolusi penuh dengan animasi halus.
5. **Keranjang Belanja (*Shopping Cart Drawer*)**:
   - Menambah, mengurangi, dan menghapus tanaman.
   - Perhitungan subtotal harga otomatis dalam format Rupiah.
   - Tombol **"Pesan via WhatsApp"** yang otomatis merangkum daftar tanaman dan total harga ke chat WhatsApp admin.
6. **Simulasi Login & Profil Pengguna**:
   - Modal autentikasi dengan mode Masuk, Daftar, dan Demo Login Cepat (Reyvan).
   - Status login tersimpan di `localStorage` dan menampilkan badge nama pengguna di Navbar.
7. **Form Kontak Interaktif**:
   - Validasi data (nama, format email, pesan).
   - Notifikasi sukses/error tanpa perlu memuat ulang halaman.
8. **Newsletter**: Berlangganan tips perawatan tanaman dengan umpan balik instan.

---

## 📁 Struktur Folder

```text
tanaman-hias-react/
├── public/
│   └── images/              # Semua aset foto tanaman asli
├── src/
│   ├── data/
│   │   └── plants.js        # Data terpusat (kategori, harga, foto, deskripsi)
│   ├── components/
│   │   ├── Navbar.jsx       # Header, menu navigasi, status login, & ikon cart
│   │   ├── Hero.jsx         # Banner utama & highlight garansi kualitas
│   │   ├── AboutSection.jsx # Profil Tentang Kami & keunggulan florist
│   │   ├── FeaturedSection.jsx # Kartu tanaman pilihan minggu ini
│   │   ├── CatalogPage.jsx  # Halaman katalog dengan filter & pencarian
│   │   ├── ContactPage.jsx  # Formulir kontak & info alamat/WhatsApp
│   │   ├── CartDrawer.jsx   # Keranjang belanja & checkout WhatsApp
│   │   ├── LoginModal.jsx   # Modal masuk/daftar pengguna
│   │   ├── LightboxModal.jsx # Pratinjau foto resolusi penuh
│   │   └── Footer.jsx       # Newsletter, navigasi footer, & media sosial
│   ├── App.jsx              # Komponen utama & state management
│   ├── index.css            # Setup Tailwind CSS & styling font
│   └── main.jsx             # Entry point React
├── index.html
├── package.json
└── vite.config.js
```

---

## 💻 Cara Menjalankan Proyek

1. Buka terminal di folder `tanaman-hias-react`:
   ```bash
   cd tanaman-hias-react
   ```
2. Jalankan server lokal:
   ```bash
   npm run dev
   ```
3. Buka link di browser:
   ```
   http://localhost:5173/
   ```

---

## 📦 Cara Build untuk Deploy (Production)

Untuk menghasilkan file statis yang siap di-upload ke Vercel, Netlify, atau GitHub Pages:
```bash
npm run build
```
File hasil build akan berada di folder `dist/`.
