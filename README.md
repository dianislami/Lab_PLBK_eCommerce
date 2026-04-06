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

---

## Praktikum Pertemuan 6

Pada pertemuan ini, saya menambahkan beberapa fitur dan konfigurasi ke proyek e-commerce:

### 1. Install 6 Dependency Berbeda

Diinstall 6 dependency yang terdiri dari campuran `dependencies` dan `devDependencies`:

**`dependencies`** (dibutuhkan saat production):
- **dayjs** `^1.11.20` — Library untuk formatting dan manipulasi tanggal
- **zod** `^4.3.6` — Library untuk validasi form schema-first
- **clsx** `^2.1.1` — Utility untuk conditional CSS classes
- **react-hot-toast** `^2.6.0` — Library untuk notification/toast
- **uuid** `^13.0.0` — Library untuk generate unique ID

**`devDependencies`** (hanya untuk development):
- **prettier** `^3.8.1` — Code formatter

Lihat `package.json` untuk daftar lengkap dependencies.

### 2. Dayjs untuk Format Tanggal Order

Dayjs digunakan untuk menampilkan tanggal pada setiap order yang berhasil dibuat.

**File:** `src/components/CheckoutForm.jsx`

```javascript
import dayjs from "dayjs";

// Format: "06 April 2026 pukul 13:30:21"
const orderDate = dayjs().format("DD MMMM YYYY [pukul] HH:mm:ss");
```

Tanggal ditampilkan di modal pop-up setelah checkout berhasil.

### 3. Zod untuk Validasi Form Checkout

Form checkout menggunakan Zod untuk validasi input pengguna dengan 3 field:

**File:** `src/components/CheckoutForm.jsx`

```javascript
import { z } from "zod";

const checkoutSchema = z.object({
  nama: z
    .string()
    .min(3, "Nama harus minimal 3 karakter")
    .max(50, "Nama maksimal 50 karakter")
    .regex(/^[a-zA-Z\s]+$/, "Nama hanya boleh berisi huruf dan spasi"),
  alamat: z
    .string()
    .min(10, "Alamat harus minimal 10 karakter")
    .max(200, "Alamat maksimal 200 karakter"),
  nomorTelepon: z
    .string()
    .regex(
      /^(\+62|0)[0-9]{9,12}$/,
      "Nomor telepon tidak valid (contoh: 081234567890 atau +6281234567890)"
    ),
});
```

**Validasi meliputi:**
- **Nama:** 3-50 karakter, hanya huruf dan spasi
- **Alamat:** minimal 10 karakter, maksimal 200 karakter
- **Nomor Telepon:** format Indonesia (081234567890 atau +6281234567890)

### 4. Custom NPM Script

Custom script ditambahkan ke `package.json` untuk formatting code:

```json
"scripts": {
  "format": "prettier --write \"src/**/*.{jsx,js,css}\""
}
```

**Cara menggunakan:**
```bash
npm run format
```

Perintah ini akan format semua file JSX, JS, dan CSS di folder `src/` menggunakan Prettier.

### 5. Output npm list dan npm outdated

**npm list --depth=0** (20 packages terpasang):
```
ecommerce-app@0.0.0
├── axios@1.13.6
├── clsx@2.1.1
├── dayjs@1.11.20
├── react@18.3.1
├── react-dom@18.3.1
├── react-hot-toast@2.6.0
├── react-router-dom@7.13.1
├── uuid@13.0.0
└── zod@4.3.6
```

**npm outdated** (13 packages dengan update tersedia):
- axios, eslint, react, react-dom, react-router-dom, vite, dan lainnya memiliki versi update yang lebih baru

### Fitur Tambahan: Modal Pop-up Checkout

Setelah form checkout berhasil divalidasi dan disubmit:
- Modal pop-up muncul menampilkan:
  - Status ("Pesanan Berhasil Dikonfirmasi!")
  - Nomor pesanan (auto-generated dengan UUID)
  - Tanggal dan waktu order (menggunakan Dayjs)
  - Detail customer (nama, alamat, nomor telepon)
  - Total pembayaran
- 2 tombol aksi:
  - **"Buat Pesanan Lagi"** — Reset form dan modal
  - **"Kembali ke Beranda"** — Navigasi ke halaman utama dan kosongkan keranjang

Buka `http://localhost:5173` di browser.
