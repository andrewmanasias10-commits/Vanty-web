'use client'

import { useState } from 'react'
import { ImageIcon } from 'lucide-react'

export default function Figure({
  src,
  alt,
  caption,
  light = false,
  frameless = false,
  portrait = false,
  blob,
  badge,
  ratio,
}: {
  src: string
  alt: string
  caption?: string
  light?: boolean
  frameless?: boolean
  portrait?: boolean
  blob?: string
  badge?: React.ReactNode
  ratio?: string
}) {
  const [err, setErr] = useState(false)

  // Imagen "libre": sin marco rígido, con sombra y forma orgánica detrás.
  if (frameless) {
    return (
      <div className={`vt-media-free${portrait ? ' portrait' : ''}`}>
        {blob && <span className="vt-media-blob" style={{ background: blob }} />}
        {!err ? (
          <img src={src} alt={alt} onError={() => setErr(true)} />
        ) : (
          <div className="vt-frame light" style={{ aspectRatio: portrait ? '4/5' : (ratio || '4/3') }}>
            <div className="vt-frame-ph"><ImageIcon size={30} strokeWidth={1.6} /><span>{caption || alt}</span></div>
          </div>
        )}
        {badge && <div className="vt-frame-badge">{badge}</div>}
      </div>
    )
  }

  return (
    <div className={`vt-frame${light ? ' light' : ''}`} style={ratio ? { aspectRatio: ratio } : undefined}>
      {!err && <img src={src} alt={alt} onError={() => setErr(true)} />}
      {err && (
        <div className="vt-frame-ph">
          <ImageIcon size={30} strokeWidth={1.6} />
          <span>{caption || alt}</span>
        </div>
      )}
      {badge && <div className="vt-frame-badge">{badge}</div>}
    </div>
  )
}
