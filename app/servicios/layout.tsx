import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Servicios de Vanty — Software a medida e IA para tu empresa",
  description:
    "Software B2B SaaS de alto rendimiento con IA nativa: aplicaciones a medida, automatización, integraciones y productos propios como Vanty ABA. Ingeniería sólida desde Perú para LATAM.",
  keywords:
    "servicios de software Vanty, desarrollo a medida LATAM, software B2B SaaS, automatización con IA, integraciones empresariales",
  alternates: { canonical: "/servicios" },
  openGraph: {
    title: "Servicios de Vanty — Software a medida e IA",
    description:
      "Aplicaciones B2B SaaS con IA nativa, automatización y productos propios como Vanty ABA.",
    url: "https://vanty.xyz/servicios",
    type: "website",
    locale: "es_PE",
    siteName: "Vanty",
  },
  robots: { index: true, follow: true },
}

export default function ServiciosLayout({ children }: { children: React.ReactNode }) {
  return children
}
