# MarketΛNexus

Website portfolio trader — **React 19 + Vite**.
_Precision. Discipline. Profit._

## Menjalankan project

Butuh **Node.js 20.19+** (atau 22.12+) dan npm.

```bash
npm install        # sekali saja, install dependensi
npm run dev        # development server (http://localhost:5173)
npm run build      # build production → folder dist/
npm run preview    # coba hasil build secara lokal
```

## Struktur folder

```
marketnexus/
├─ index.html                  # entry HTML (font, favicon, #root)
├─ vite.config.js              # Vite + plugin React + alias "@" → src/
├─ jsconfig.json               # alias "@" untuk VS Code
├─ public/
│  └─ favicon.webp
└─ src/
   ├─ main.jsx                 # mount React
   ├─ App.jsx                  # urutan section halaman
   ├─ config.js                # ★ kontak, sosial media, profil (edit di sini)
   │
   ├─ components/
   │  ├─ layout/               # Navbar, Footer
   │  ├─ ui/                   # Icon, Brand, Socials (dipakai banyak section)
   │  └─ sections/
   │     ├─ Hero/
   │     ├─ Stats/
   │     ├─ Performance/       # Performance + CandleChart
   │     ├─ Strategy/
   │     ├─ Journal/           # section artikel: ArticleCard, ArticleModal, ArticleThumb
   │     ├─ About/
   │     └─ Contact/           # Contact, ContactCard, HfmCard, ContactForm, useContactForm
   │
   ├─ data/                    # konten: navigation, stats, markets, strategies, articles
   ├─ hooks/                   # useReveal, useActiveSection
   ├─ lib/                     # scroll, marketSimulation, candleChart, contactLinks
   ├─ assets/images/           # brand-mark.webp, hero-logo.webp
   └─ styles/                  # CSS per bagian; urutan import diatur di index.css
```

Setiap section adalah folder sendiri dengan `index.js`, jadi cukup
`import Contact from '@/components/sections/Contact'`. Alias `@` menunjuk ke `src/`.

## Mengubah isi

| Yang ingin diubah | File |
| --- | --- |
| Nomor WhatsApp, email, link grup WhatsApp, link HFM | `src/config.js` → `contact` |
| TikTok / sosial media lain (url kosong = otomatis disembunyikan) | `src/config.js` → `socials` |
| Nama profil, pengalaman, lokasi | `src/config.js` → `profile` |
| Statistik & angka Key Performance | `src/data/stats.js` |
| Pair di chart & rentang waktu | `src/data/markets.js` |
| Kartu strategi | `src/data/strategies.js` |
| Artikel Journal | `src/data/articles.js` |
| Menu navigasi | `src/data/navigation.js` |
| Warna & token desain | `src/styles/tokens.css` |

Nomor WhatsApp di `config.js` memakai format internasional tanpa `+` dan tanpa
angka 0 di depan (`085891275152` → `6285891275152`), sesuai format link `wa.me`.

### Menambah tombol di section Contact

Tambahkan satu `<ContactCard />` di `src/components/sections/Contact/Contact.jsx`
(lihat kartu TikTok sebagai contoh). Ikon baru ditambahkan di `src/components/ui/Icon.jsx`.

### Form "Write a Message"

Default-nya membuka aplikasi email pengunjung (`mailto:`), tidak ada pesan yang
dikirim dari server. Untuk mengirim langsung, isi `contact.formEndpoint` di
`config.js` dengan URL endpoint form (mis. Formspree); form akan mengirim JSON via POST.

## Catatan teknis

- **Urutan CSS penting.** `src/styles/index.css` mengimpor file CSS dalam urutan
  cascade yang sama seperti stylesheet aslinya. Jangan ubah urutannya tanpa mengecek tampilan.
- **Data chart adalah simulasi** (deterministik, bukan harga pasar asli). Chart digambar
  oleh renderer canvas ringan di `src/lib/candleChart.js`. Volume bar, crosshair, dan
  tooltip belum aktif di renderer ini. `CandleChart.jsx` sudah berisi konfigurasi untuk
  chart berfitur lengkap dan renderer meniru API library seperti lightweight-charts v4,
  jadi penggantian seharusnya cukup lewat satu import. Ini belum diuji.
- **Ikon** berupa SVG inline di `Icon.jsx`, tanpa dependensi tambahan.
- Konten artikel, statistik, dan profil adalah **contoh/placeholder**; ganti dengan data asli.
