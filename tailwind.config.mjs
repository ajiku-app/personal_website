/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // dasar putih hangat netral
        navy: '#F7F5F1',
        // permukaan kartu (putih bersih, kontras lembut dgn bg cream)
        surface: '#FFFFFF',
        surface2: '#EFEBE3',
        // teks utama nyaris-hitam
        ink: '#1B1720',
        // teks sekunder/muted
        muted: '#6E6874',
        // aksen utama: biru elektrik (link, CTA)
        orange: '#2E4CF0',
        orangeLight: '#4C63F5',
        // aksen kedua: kuning madu (highlight/tag)
        honey: '#F5A623',
        // border/garis tipis
        line: '#E4E0D8',
      },
      fontFamily: {
        display: ['"Indie Flower"', 'cursive'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        prose: '68ch',
      },
    },
  },
  plugins: [],
};
