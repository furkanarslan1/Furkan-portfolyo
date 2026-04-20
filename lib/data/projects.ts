export type Project = {
  id: number
  slug: string
  title: { tr: string; en: string }
  shortDescription: { tr: string; en: string }
  description: { tr: string; en: string }
  coverImage: string
  images: string[]
  tags: string[]
  githubUrl?: string
  liveUrl?: string
}

export const projects: Project[] = [
  {
    id: 1,
    slug: 'qr-menu',
    title: { tr: 'QR Menü Uygulaması', en: 'QR Menu Application' },
    shortDescription: {
      tr: 'Restoranlar için QR kod tabanlı dijital menü sistemi.',
      en: 'QR code based digital menu system for restaurants.',
    },
    description: {
      tr: 'Restoranlar için geliştirilmiş, QR kod ile erişilebilen modern bir dijital menü uygulaması. Next.js ve Supabase kullanılarak oluşturuldu. Kategorilere göre filtreleme, çoklu dil desteği ve admin paneli içermektedir. Masaüstü ve mobil uyumlu tasarımıyla her cihazda sorunsuz çalışır.',
      en: 'A modern digital menu application for restaurants, accessible via QR code. Built with Next.js and Supabase. Includes category filtering, multi-language support and an admin panel. Works seamlessly on all devices with its desktop and mobile compatible design.',
    },
    coverImage: 'https://placehold.co/800x500/1a1a2e/a78bfa?text=QR+Menu',
    images: [
      'https://placehold.co/800x500/1a1a2e/a78bfa?text=QR+Menu+1',
      'https://placehold.co/800x500/16213e/818cf8?text=QR+Menu+2',
      'https://placehold.co/800x500/0f3460/6d28d9?text=QR+Menu+3',
    ],
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    githubUrl: 'https://github.com/furkanarslan1',
    liveUrl: '#',
  },
  {
    id: 2,
    slug: 'portfolio',
    title: { tr: 'Kişisel Portfolyo', en: 'Personal Portfolio' },
    shortDescription: {
      tr: 'Next.js ile geliştirilmiş çok dilli kişisel portfolyo sitesi.',
      en: 'Multilingual personal portfolio site built with Next.js.',
    },
    description: {
      tr: 'Next.js 16, Tailwind CSS ve Neon veritabanı kullanılarak geliştirilmiş kişisel portfolyo sitem. Türkçe ve İngilizce dil desteği, admin paneli üzerinden içerik yönetimi, Cloudinary ile görsel depolama gibi özellikler içermektedir.',
      en: 'My personal portfolio site built with Next.js 16, Tailwind CSS and Neon database. Features Turkish and English language support, content management through an admin panel, and image storage with Cloudinary.',
    },
    coverImage: 'https://placehold.co/800x500/0a0a1a/38bdf8?text=Portfolio',
    images: [
      'https://placehold.co/800x500/0a0a1a/38bdf8?text=Portfolio+1',
      'https://placehold.co/800x500/0a0a2a/61dafb?text=Portfolio+2',
      'https://placehold.co/800x500/0a0a1a/a78bfa?text=Portfolio+3',
    ],
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Neon', 'Cloudinary'],
    githubUrl: 'https://github.com/furkanarslan1',
  },
  {
    id: 3,
    slug: 'e-commerce',
    title: { tr: 'E-Ticaret Uygulaması', en: 'E-Commerce Application' },
    shortDescription: {
      tr: 'React ve Redux Toolkit ile geliştirilmiş modern alışveriş deneyimi.',
      en: 'Modern shopping experience built with React and Redux Toolkit.',
    },
    description: {
      tr: 'React, Redux Toolkit ve React Hook Form kullanılarak geliştirilmiş tam özellikli bir e-ticaret uygulaması. Ürün listeleme, filtreleme, sepet yönetimi ve ödeme akışı içermektedir. Responsive tasarımı ile tüm ekran boyutlarında mükemmel görünür.',
      en: 'A full-featured e-commerce application built with React, Redux Toolkit and React Hook Form. Includes product listing, filtering, cart management and checkout flow. Looks great on all screen sizes with its responsive design.',
    },
    coverImage: 'https://placehold.co/800x500/1a0a1a/ec5990?text=E-Commerce',
    images: [
      'https://placehold.co/800x500/1a0a1a/ec5990?text=E-Commerce+1',
      'https://placehold.co/800x500/2a0a2a/f472b6?text=E-Commerce+2',
      'https://placehold.co/800x500/1a0a1a/a78bfa?text=E-Commerce+3',
    ],
    tags: ['React', 'Redux Toolkit', 'TypeScript', 'Tailwind CSS'],
    githubUrl: 'https://github.com/furkanarslan1',
    liveUrl: '#',
  },
  {
    id: 4,
    slug: 'task-manager',
    title: { tr: 'Görev Yöneticisi', en: 'Task Manager' },
    shortDescription: {
      tr: 'Zustand ile state yönetimli drag & drop görev uygulaması.',
      en: 'Drag & drop task application with Zustand state management.',
    },
    description: {
      tr: 'Zustand state yönetimi ve drag & drop özelliği olan modern bir görev yönetim uygulaması. Görevleri farklı durumlara (Bekliyor, Devam Ediyor, Tamamlandı) taşıyabilir, etiketleyebilir ve öncelik atayabilirsiniz.',
      en: 'A modern task management application with Zustand state management and drag & drop functionality. You can move tasks to different states (Pending, In Progress, Completed), label them and assign priorities.',
    },
    coverImage: 'https://placehold.co/800x500/0a1a1a/34d399?text=Task+Manager',
    images: [
      'https://placehold.co/800x500/0a1a1a/34d399?text=Task+Manager+1',
      'https://placehold.co/800x500/0a2a1a/6ee7b7?text=Task+Manager+2',
    ],
    tags: ['React', 'Zustand', 'TypeScript', 'Tailwind CSS'],
    githubUrl: 'https://github.com/furkanarslan1',
  },
]