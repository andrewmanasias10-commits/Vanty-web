// Funciones de Vanty ABA con página dedicada (estilo producto)
export interface FeatureMeta {
  slug: string
  icon: 'bot' | 'chart' | 'calendar' | 'card' | 'stethoscope' | 'family' | 'chat' | 'video'
  accent: string
  img: string     // mockup del sistema
  photo: string   // foto de personas usándolo (reemplazable)
  photo2: string  // segunda foto de personas (reemplazable)
}

export const FEATURES: FeatureMeta[] = [
  { slug: 'aria',         icon: 'bot',        accent: '#1257e6', img: '/images/vanty-aba/aria.svg',             photo: '/images/feat/aria.png',         photo2: '/images/feat/aria-2.png' },
  { slug: 'analitica',    icon: 'chart',      accent: '#0891b2', img: '/images/vanty-aba/graficas.svg',         photo: '/images/feat/analitica.png',    photo2: '/images/feat/analitica-2.png' },
  { slug: 'agenda',       icon: 'calendar',   accent: '#16a6ff', img: '/images/vanty-aba/agenda.svg',           photo: '/images/feat/agenda.png',       photo2: '/images/feat/agenda-2.png' },
  { slug: 'pagos',        icon: 'card',       accent: '#0f766e', img: '/images/vanty-aba/pagos.svg',            photo: '/images/feat/pagos.png',        photo2: '/images/feat/pagos-2.png' },
  { slug: 'evaluaciones', icon: 'stethoscope',accent: '#e11d6b', img: '/images/vanty-aba/evaluaciones.svg',     photo: '/images/feat/evaluaciones.png', photo2: '/images/feat/evaluaciones-2.png' },
  { slug: 'portal',       icon: 'family',     accent: '#ea580c', img: '/images/vanty-aba/portal-familiar.svg',  photo: '/images/feat/portal.png',       photo2: '/images/feat/portal-2.png' },
]

export const FEATURE_SLUGS = FEATURES.map(f => f.slug)
