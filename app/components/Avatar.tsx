'use client'

import { useState } from 'react'
import { ShieldCheck } from 'lucide-react'

export default function Avatar({ src, alt }: { src: string; alt: string }) {
  const [err, setErr] = useState(false)
  return (
    <span className="vt-credential-av">
      {err ? <ShieldCheck size={22} /> : <img src={src} alt={alt} onError={() => setErr(true)} />}
    </span>
  )
}
