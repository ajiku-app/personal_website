# Website Personal — Menulis, Portofolio, Jurnal

MVP website personal branding: Astro + Tailwind CSS + Decap CMS (panel admin git-based).

## 1. Menjalankan di komputer sendiri

Butuh [Node.js](https://nodejs.org) versi 18 ke atas.

```bash
# masuk ke folder project
cd personal-website

# install dependency
npm install

# jalankan mode development
npm run dev
```

Buka `http://localhost:4321` di browser.

## 2. Struktur proyek

```
src/
  content/
    config.ts        # skema data (schema) untuk blog, jurnal, portofolio
    blog/             # file markdown tulisan
    journal/          # file markdown jurnal
    portfolio/        # file markdown portofolio
  layouts/
    BaseLayout.astro  # kerangka halaman (head, header, footer)
  components/
    Header.astro
    Footer.astro
    PostCard.astro       # kartu untuk daftar tulisan/jurnal
    PortfolioCard.astro  # kartu untuk grid portofolio
  pages/
    index.astro         # beranda
    tulisan/             # daftar & detail blog
    jurnal/               # daftar & detail jurnal
    portofolio/           # grid & detail portofolio
    tentang.astro
    kontak.astro
public/
  admin/               # panel admin (Decap CMS)
  images/uploads/      # tempat gambar yang diupload lewat admin
```

## 3. Menambah/mengubah konten

**Cara 1 — lewat panel admin (setelah deploy, lihat langkah 5):**
Buka `namadomain.com/admin`, login, lalu isi form. Setiap kali submit,
otomatis dibuat file markdown baru dan situs re-build sendiri.

**Cara 2 — manual, langsung edit file markdown:**
Tambah file baru di `src/content/blog/`, `src/content/journal/`, atau
`src/content/portfolio/` mengikuti format contoh yang sudah ada (lihat
bagian atas file `.md`, di antara `---`, itu namanya frontmatter).

## 4. Mapping fitur → kode

| Fitur PRD                    | Lokasi kode                                              |
|-------------------------------|-----------------------------------------------------------|
| Beranda + highlight            | `src/pages/index.astro`                                   |
| Menulis (blog)                 | `src/pages/tulisan/`, `src/content/blog/`                 |
| Jurnal publik                  | `src/pages/jurnal/`, `src/content/journal/`                |
| Portofolio                     | `src/pages/portofolio/`, `src/content/portfolio/`          |
| Panel admin (CRUD konten)      | `public/admin/config.yml`, `public/admin/index.html`       |
| Tentang & Kontak               | `src/pages/tentang.astro`, `src/pages/kontak.astro`         |
| Desain (warna, tipografi)      | `tailwind.config.mjs`, `src/styles/global.css`             |

## 5. Deploy ke Netlify (direkomendasikan, gratis)

1. Push folder ini ke repo GitHub baru.
2. Buka [netlify.com](https://netlify.com) → **Add new site → Import an existing project**.
3. Hubungkan ke repo GitHub kamu. Build command: `npm run build`, publish directory: `dist`.
4. Setelah deploy pertama sukses, buka **Site settings → Identity → Enable Identity**.
5. Di halaman Identity, klik **Enable Git Gateway**.
6. Di tab **Identity**, klik **Invite users** dan undang emailmu sendiri sebagai admin.
7. Buka `namadomain.netlify.app/admin`, login pakai email yang diundang — panel admin siap dipakai.

## 6. Form kontak

Form di `/kontak` sudah disiapkan untuk **Netlify Forms** (otomatis aktif begitu
di-deploy ke Netlify, tanpa setup tambahan).

Kalau kamu deploy ke Vercel/GitHub Pages (bukan Netlify), ganti dengan
[Formspree](https://formspree.io): daftar akun, ganti atribut `action` pada
tag `<form>` di `src/pages/kontak.astro` dengan endpoint Formspree kamu, dan
hapus atribut `data-netlify` serta `netlify-honeypot`.

## 7. Mengganti identitas & warna

- **Foto profil di hero Beranda**: taruh file fotomu (format `.jpg`) di `public/images/profile.jpg`
  (nama file harus persis sama). Kalau file belum ada, otomatis muncul placeholder silhouette
  supaya halaman tidak rusak tampilannya. Foto persegi/portrait dengan wajah di tengah hasilnya
  paling bagus karena dipotong bulat (`rounded-full`).
- **Kartu info & keahlian di halaman Tentang**: edit array `quickFacts` dan `skills` di bagian
  atas file `src/pages/tentang.astro`.
- **Proyek unggulan di Portofolio**: set `featured: true` di frontmatter file markdown proyek
  (lewat panel admin atau manual) — proyek itu otomatis tampil besar di paling atas halaman
  `/portofolio`. Kalau tidak ada yang ditandai `featured`, proyek terbaru dipakai secara otomatis.
- **Link media sosial** (LinkedIn/GitHub/Email) di hero Beranda: cari tag `<svg` di
  `src/pages/index.astro`, ganti atribut `href` pada tiap `<a>` di sekitarnya.

- Ganti nama "Nama Kamu" di `src/components/Header.astro`, `src/layouts/BaseLayout.astro`,
  `src/pages/index.astro`, dan `src/pages/kontak.astro`.
- Ganti isi halaman `src/pages/tentang.astro` dengan cerita aslimu.
- Warna & font ada di `tailwind.config.mjs`. Token warna: `navy` (dasar putih hangat `#F7F5F1`),
  `ink` (teks nyaris-hitam `#1B1720`), `orange` (aksen biru elektrik `#2E4CF0`, dipakai untuk
  link & CTA — namanya "orange" tapi nilainya biru, sisa penamaan dari draf sebelumnya),
  `honey` (aksen kuning madu `#F5A623`, dipakai untuk highlight/tag), `surface`/`surface2`
  (permukaan kartu), dan `line` (border tipis). Font diatur di `src/styles/global.css`
  (import Google Fonts Fraunces + Inter).

## 8. Rencana pengembangan lanjutan (di luar MVP ini)

- Halaman kategori/tag untuk tulisan
- Pencarian konten
- Mode gelap
- RSS feed
- Komentar pembaca (misalnya lewat Giscus)
