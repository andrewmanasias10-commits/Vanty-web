'use client'

import { useState } from 'react'

// Marca Vanty (azulejo con degradado + V). Usa el SVG nuevo por defecto;
// si subes tu PNG oficial a /images/logos/vanty.png, cámbialo aquí.
const SOURCES = ['/images/logo.png', '/images/logos/vanty-mark.svg', '/images/logos/vanty.png']

export default function Logo({ height = 38 }: { height?: number }) {
  const [i, setI] = useState(0)
  return (
    <img
      src={SOURCES[i]}
      alt="Vanty"
      onError={() => setI(n => Math.min(n + 1, SOURCES.length - 1))}
      style={{ height, width: 'auto', display: 'block', borderRadius: height * 0.26 }}
    />
  )
}
