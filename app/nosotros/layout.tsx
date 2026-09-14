import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nosotros — Quién es Vanty | Startup de tecnología en LATAM",
  description:
    "Vanty es una startup tecnológica que cierra la brecha entre las operaciones empresariales complejas y la tecnología de última generación. Un laboratorio de innovación y fábrica de software B2B SaaS.",
  keywords:
    "quiénes somos Vanty, startup tecnología LATAM, empresa de software Perú, laboratorio de innovación, fábrica de software B2B",
  alternates: { canonical: "/nosotros" },
  openGraph: {
    title: "Nosotros — Quién es Vanty",
    description:
      "Startup tecnológica que redefine el estándar del software B2B con IA nativa. Desde Perú para LATAM.",
    url: "https://vanty.xyz/nosotros",
    type: "website",
    locale: "es_PE",
    siteName: "Vanty",
  },
  robots: { index: true, follow: true },
}

export default function NosotrosLayout({ children }: { children: React.ReactNode }) {
  return children
}
