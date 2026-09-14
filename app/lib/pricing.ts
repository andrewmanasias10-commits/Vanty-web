// ════════════════════════════════════════════════
//  Precios de Vanty ABA por región (continente)
// ════════════════════════════════════════════════

export type RegionKey = 'sudamerica' | 'norteamerica' | 'europa'

export const REGIONS: Record<RegionKey, { label: string; short: string; flag: string; cur: string; code: string }> = {
  sudamerica:   { label: 'Sudamérica',   short: 'Sudamérica',   flag: '🌎', cur: '$', code: 'USD' },
  norteamerica: { label: 'Norteamérica', short: 'Norteamérica', flag: '🦅', cur: '$', code: 'USD' },
  europa:       { label: 'Europa',       short: 'Europa',       flag: '🇪🇺', cur: '€', code: 'EUR' },
}

export const REGION_ORDER: RegionKey[] = ['sudamerica', 'norteamerica', 'europa']

export interface Plan {
  id: string
  group: 'Personal' | 'Vanty Empresa'
  name: string
  pacientes: string
  desc: string
  // mensual / anual por región (null = "Consultar")
  m: Record<RegionKey, number | null>
  y: Record<RegionKey, number | null>
  features: string[]
  featured?: boolean
}

export const PLANS: Plan[] = [
  {
    id: 'basic', group: 'Personal', name: 'Basic', pacientes: '1 – 15 pacientes',
    desc: 'Para empezar tu operación clínica con lo esencial.',
    m: { sudamerica: 74, norteamerica: 199, europa: 119 },
    y: { sudamerica: 814, norteamerica: 2189, europa: 1309 },
    features: ['Agenda básica', 'Programas ABA, evaluaciones e historial', 'Reporte y análisis básico', '1 administrador · hasta 15 padres', 'ARIA · uso de IA bajo', 'Soporte en horario hábil'],
  },
  {
    id: 'plus', group: 'Personal', name: 'Plus', pacientes: '16 – 50 pacientes', featured: true,
    desc: 'El más elegido: IA clínica completa y equipo multi-rol.',
    m: { sudamerica: 200, norteamerica: 400, europa: 289 },
    y: { sudamerica: 2200, norteamerica: 4400, europa: 3179 },
    features: ['Agenda con Google y Outlook', 'Evaluación inicial con IA · fichas editables', 'Predicciones IA · patrones · objetivos', 'CIE-11 / ICD-10 · pagos · recursos', 'Hasta 2 admin · 1 secretaría · 5 especialistas · 40 padres', 'ARIA · uso de IA medio'],
  },
  {
    id: 'pro', group: 'Personal', name: 'Pro', pacientes: '51 – 100 pacientes',
    desc: 'Para centros en crecimiento, con más equipo y volumen.',
    m: { sudamerica: 360, norteamerica: 800, europa: 499 },
    y: { sudamerica: 3960, norteamerica: 8800, europa: 5489 },
    features: ['Todo lo de Plus', 'Agenda vinculada + link para separar', 'Hasta 5 admin · 3 secretaría · 15 especialistas · 100 padres', 'ARIA · uso de IA alto', 'Soporte prioritario'],
  },
  {
    id: 'mini', group: 'Vanty Empresa', name: 'Mini Enterprise', pacientes: 'hasta 200',
    desc: 'Para redes y multi-sede que necesitan todo, sin límites.',
    m: { sudamerica: 600, norteamerica: 1500, europa: 899 },
    y: { sudamerica: 6600, norteamerica: 16500, europa: 9889 },
    features: ['Todo lo de Pro', 'Funciones personalizadas', 'HIPAA / cumplimiento de datos clínicos', 'Integraciones (facturación / seguros) + API', 'White-label · multi-clínica / multi-sede', '10 admin · 6 secretaría · 30 especialistas · 200 padres', 'ARIA ilimitado (uso justo) · soporte 24/7'],
  },
  {
    id: 'enterprise', group: 'Vanty Empresa', name: 'Enterprise', pacientes: '200 +',
    desc: 'A medida para grandes organizaciones. Lo cotizamos contigo.',
    m: { sudamerica: null, norteamerica: null, europa: null },
    y: { sudamerica: null, norteamerica: null, europa: null },
    features: ['Todo ilimitado', 'Despliegue y SLA dedicados', 'Onboarding y soporte VIP', 'Cotización personalizada'],
  },
]

const NORTH_AMERICA = ['US', 'CA', 'MX']
const EUROPE = ['ES', 'PT', 'FR', 'DE', 'IT', 'GB', 'IE', 'NL', 'BE', 'LU', 'CH', 'AT', 'DK', 'SE', 'NO', 'FI', 'IS', 'PL', 'CZ', 'SK', 'HU', 'RO', 'BG', 'GR', 'HR', 'SI', 'EE', 'LV', 'LT', 'UA', 'RS', 'BA', 'AL', 'MK', 'ME', 'MD', 'BY', 'MT', 'CY']

export function countryToRegion(country?: string | null): RegionKey {
  if (!country) return 'sudamerica'
  const c = country.toUpperCase()
  if (EUROPE.includes(c)) return 'europa'
  if (NORTH_AMERICA.includes(c)) return 'norteamerica'
  return 'sudamerica' // Sudamérica + Centroamérica + Caribe + resto
}

export function regionFromLanguage(lang?: string): RegionKey {
  const l = (lang || '').toLowerCase()
  if (l === 'en-us' || l === 'en-ca' || l === 'es-mx') return 'norteamerica'
  if (l === 'es-es' || /^(fr|de|it|pt-pt|nl|pl|sv|da|fi|nb|no|el|cs|hu|ro)/.test(l)) return 'europa'
  return 'sudamerica'
}
