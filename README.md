# Praktikum Pertemuan 5

Proyek e-commerce sederhana menggunakan React + Vite, dibuat untuk praktikum mata kuliah **Component-Based Software Engineering (CBSE)**.

## Teknologi

- **React** — framework UI
- **Vite 5** — build tool
- **Axios** — HTTP request ke API
- **React Router DOM** — navigasi antar halaman

## Fitur

- Menampilkan katalog produk dari [FakeStore API](https://fakestoreapi.com)
- Filter produk berdasarkan kategori
- Pencarian produk berdasarkan nama
- Halaman detail produk
- Keranjang belanja (tambah, hapus, update quantity)

## Struktur Folder

```
src/
├── components/
│   ├── Header.jsx
│   ├── ProductCard.jsx
│   ├── SearchBar.jsx
│   └── Loading.jsx
├── pages/
│   ├── Home.jsx
│   ├── ProductDetail.jsx
│   └── Cart.jsx
├── services/
│   └── api.js
├── context/
│   └── CartContext.jsx
├── App.jsx
└── main.jsx
```

## Cara Menjalankan

```bash
# Install dependencies
npm install
npm install axios react-router-dom

# Jalankan dev server
npm run dev
```

Buka `http://localhost:5173` di browser.
