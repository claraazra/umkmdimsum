# Pojok Raja Dimsum

Website statis untuk Pojok Raja Dimsum: menu, minuman, galeri, dan pesan lewat WhatsApp.

## Menjalankan

Buka `index.html` di Chrome, Edge, atau Safari. Tidak perlu instalasi. Internet hanya dipakai saat membuka WhatsApp atau Instagram.

## Isi folder

- `index.html` - susunan halaman dan teks
- `style.css` - semua tampilan dan animasi CSS
- `script.js` - data menu dan minuman, filter, keranjang, pesan WhatsApp, galeri
- `motion.js` - animasi intro dan hero
- `navigation.js` - navbar, menu HP, dan penanda bagian aktif
- `fx.js` - efek gerak tambahan
- `polish.css` dan `polish.js` - loading, navbar, dan animasi tambahan (scroll halus, kursor, tombol ke atas, partikel hero, konfeti saat Tambah, kartu masuk bergantian, cahaya kursor di kartu)
- `assets/` - foto dan video (harus satu folder dengan `index.html`)

## Yang sering diubah

- Nomor WhatsApp: konstanta `PHONE` di `script.js`, lalu tautan `wa.me` di `index.html`.
- Menu dan harga dimsum: array `products` di `script.js`.
- Minuman dan harganya: array `drinks` di `script.js`.
- Video galeri: ganti `assets/video-1.mp4` sampai `video-3.mp4` (MP4, sebaiknya 9:16 dan di bawah 20 MB).

## Upload ke hosting

Upload semua isi folder ini. Pesanan hanya disimpan di browser pengunjung dan dikirim sebagai draf pesan WhatsApp, tidak ada pembayaran otomatis.

## Loading screen

Progres di layar loading mengikuti pemuatan aset asli (logo, foto, video hero). Minimum 1,9 detik supaya animasinya utuh, dan maksimal 7,5 detik bila koneksi lambat. Atur `MIN_LOAD` dan `MAX_LOAD` di `motion.js`.
