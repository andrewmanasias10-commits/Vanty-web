import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Vanty ABA — Plataforma ABA Multi-Rol en LATAM",
  description: "La primera plataforma ABA multi-rol en América Latina. Conecta dirección, especialistas, secretaría y familias en una sola plataforma. Multilingüe, con IA clínica integrada (ARIA).",
  keywords: "plataforma ABA LATAM, software terapia conductual, ABA software español, gestión terapeutas ABA, plataforma neurodivergencia, ARIA IA clínica",
  authors: [{ name: "Vanty" }],
  alternates: { canonical: "/vanty-aba" },
  openGraph: {
    title: "Vanty ABA — Plataforma ABA Multi-Rol en LATAM",
    description: "La primera plataforma ABA multi-rol en América Latina. Con IA clínica integrada (ARIA), portal familiar y multilingüe.",
    type: "website",
    locale: "es_PE",
    siteName: "Vanty",
    url: "https://vanty.xyz/vanty-aba",
  },
  robots: { index: true, follow: true },
}

const abaJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Vanty ABA",
  applicationCategory: "HealthApplication",
  operatingSystem: "Web",
  url: "https://vanty.xyz/vanty-aba",
  description:
    "La primera plataforma ABA multi-rol en América Latina. Conecta dirección, especialistas, secretaría y familias en una sola plataforma, con IA clínica integrada (ARIA), facturación y portal familiar.",
  inLanguage: ["es", "en", "pt", "fr"],
  publisher: {
    "@type": "Organization",
    name: "Vanty",
    url: "https://vanty.xyz",
  },
}

export default function VantyAbaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(abaJsonLd) }}
      />
      {children}
    </>
  )
}
