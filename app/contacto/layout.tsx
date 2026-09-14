import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contacto — Habla con Vanty | Software e IA para tu empresa",
  description:
    "¿Quieres resolver un problema con software o IA? Cuéntanos qué necesitas y te respondemos con honestidad y cercanía. Contacta con Vanty por WhatsApp o correo.",
  keywords:
    "contacto Vanty, contactar empresa de software, cotizar software a medida, soporte Vanty",
  alternates: { canonical: "/contacto" },
  openGraph: {
    title: "Contacto — Habla con Vanty",
    description:
      "Cuéntanos qué quieres resolver. Te respondemos con honestidad y cercanía.",
    url: "https://vanty.xyz/contacto",
    type: "website",
    locale: "es_PE",
    siteName: "Vanty",
  },
  robots: { index: true, follow: true },
}

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return children
}
