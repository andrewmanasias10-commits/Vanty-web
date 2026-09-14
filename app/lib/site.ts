// ════════════════════════════════════════════════
//  Datos compartidos del sitio Vanty
// ════════════════════════════════════════════════

export const WA_NUM = '51994196916'
export const EMAIL = 'vantysupport@gmail.com'
export const WA_MSG = encodeURIComponent('Hola, vi la página de Vanty y quiero conocer más sobre lo que hacen.')
export const WA_URL = `https://wa.me/${WA_NUM}?text=${WA_MSG}`

// Enlace de WhatsApp con un mensaje personalizado
export const waLink = (msg: string) => `https://wa.me/${WA_NUM}?text=${encodeURIComponent(msg)}`
export const FB_URL = 'https://www.facebook.com/61587764677406'
export const IG_URL = 'https://www.instagram.com/vantyaba/'
export const TIKTOK_URL = 'https://www.tiktok.com/@vantyaba'

export type IconKey = 'brain' | 'school'

export interface Service {
  slug: string
  href: string
  icon: IconKey
  logo?: string
  name: string
  tagline: string
  desc: string
  badge: string
  accent: string
  tags: string[]
  soon?: boolean
}

export const SERVICES: Service[] = [
  {
    slug: 'vanty-aba',
    href: '/vanty-aba',
    icon: 'brain',
    logo: '/images/logos/vanty-aba.png',
    name: 'Vanty ABA',
    tagline: 'Plataforma clínica ABA con IA',
    desc: 'La primera plataforma ABA multi-rol de LATAM: dirección, especialistas, secretaría y familias en un solo lugar, con IA clínica, facturación y portal familiar.',
    badge: 'Producto estrella',
    accent: '#1D4ED8',
    tags: ['Hub de IA clínica', 'Multi-rol nativo', 'Facturación', 'Portal familiar'],
  },
  {
    slug: 'vanty-school',
    href: '#',
    icon: 'school',
    logo: '/images/logos/vanty-school.png',
    name: 'Vanty School',
    tagline: 'Gestión educativa inteligente',
    desc: 'La plataforma que llevará la inteligencia de Vanty a la gestión de colegios e instituciones educativas. En desarrollo.',
    badge: 'Próximamente',
    accent: '#64748B',
    tags: ['Educación', 'En desarrollo'],
    soon: true,
  },
]

export const NAV_LINKS = [
  { label: 'Inicio', href: '/' },
  { label: 'Servicios', href: '/servicios', dropdown: true },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Cómo trabajamos', href: '/como-trabajamos' },
  { label: 'Contacto', href: '/contacto' },
] as const
