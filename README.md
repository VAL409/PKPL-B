# GreenLeaf - Website Toko & Katalog Tanaman Hias 

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

1. Buka terminal di folder `tanaman-hias`:
   ```bash
   cd tanaman-hias
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

## 📦 Cara Build untuk Deploy

Untuk menghasilkan file statis yang siap di-upload ke Vercel, Netlify, atau GitHub Pages:
```bash
npm run build
```
File hasil build akan berada di folder `dist/`.
