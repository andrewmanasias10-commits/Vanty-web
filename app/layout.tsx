import type { Metadata, Viewport } from "next"
import "./globals.css"
import { LangProvider } from "@/app/components/LangProvider"
import ImageGuard from "@/app/components/ImageGuard"
import ScrollFX from "@/app/components/ScrollFX"
import { FB_URL, IG_URL, TIKTOK_URL, EMAIL } from "@/app/lib/site"

export const viewport: Viewport = {
  themeColor: "#070d23",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL("https://vanty.xyz"),
  title: "Vanty — Software e IA que resuelve problemas reales",
  description: "Vanty es una empresa de tecnología que diseña software inteligente e IA para sectores con impacto: salud, educación y bienestar. Creamos soluciones a medida y productos propios como Vanty ABA. Desde Perú para toda América Latina.",
  keywords: "Vanty, empresa de tecnología LATAM, software a medida, inteligencia artificial empresas, desarrollo de software Perú, productos SaaS, soluciones tecnológicas salud educación",
  authors: [{ name: "Vanty" }],
  
  // El bloque "icons" se elimina por completo para evitar conflictos
  
  openGraph: {
    title: "Vanty — Software e IA que resuelve problemas reales",
    description: "Empresa de tecnología que crea software inteligente e IA para sectores con impacto. Soluciones a medida y productos propios como Vanty ABA. Desde Perú para toda América Latina.",
    type: "website",
    locale: "es_PE",
    siteName: "Vanty",
    url: "https://vanty.xyz",
    images: [{ url: "/images/logo.png", width: 1254, height: 1254, alt: "Vanty" }],
  },
  twitter: {
    card: "summary",
    title: "Vanty — Software e IA que resuelve problemas reales",
    description: "Software inteligente e IA para sectores con impacto. Productos propios como Vanty ABA.",
    images: ["/images/logo.png"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
}

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Vanty",
  legalName: "Vanty",
  url: "https://vanty.xyz",
  logo: "https://vanty.xyz/images/logo.png",
  image: "https://vanty.xyz/images/logo.png",
  description:
    "Empresa de tecnología que diseña software inteligente e IA para sectores con impacto: salud, educación y bienestar. Productos propios como Vanty ABA. Desde Perú para toda América Latina.",
  email: EMAIL,
  foundingLocation: { "@type": "Place", name: "Perú" },
  areaServed: "Latin America",
  sameAs: [FB_URL, IG_URL, TIKTOK_URL],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <ImageGuard /><ScrollFX /><LangProvider>{children}</LangProvider>
      </body>
    </html>
  )
}
