'use client'

import { useState } from 'react'

export default function ClientChip({
  src,
  name,
  alt,
}: {
  src: string
  name: React.ReactNode
  alt?: string
}) {
  const [err, setErr] = useState(false)
  return (
    <span className="vt-logo-chip">
      {!err && <img src={src} alt={alt || (typeof name === 'string' ? name : 'logo')} onError={() => setErr(true)} />}
      {name}
    </span>
  )
}
