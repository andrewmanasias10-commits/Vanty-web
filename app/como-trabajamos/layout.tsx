import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cómo trabajamos — El proceso de Vanty | Del código a la solución",
  description:
    "Combinamos la agilidad de una startup con el rigor de la ingeniería de sistemas para transformar ideas complejas en plataformas elegantes. Conoce el proceso de trabajo de Vanty.",
  keywords:
    "cómo trabaja Vanty, proceso de desarrollo de software, metodología ágil, ingeniería de software LATAM",
  alternates: { canonical: "/como-trabajamos" },
  openGraph: {
    title: "Cómo trabajamos — El proceso de Vanty",
    description:
      "Del código a la solución: agilidad de startup con rigor de ingeniería de sistemas.",
    url: "https://vanty.xyz/como-trabajamos",
    type: "website",
    locale: "es_PE",
    siteName: "Vanty",
  },
  robots: { index: true, follow: true },
}

export default function ComoTrabajamosLayout({ children }: { children: React.ReactNode }) {
  return children
}
