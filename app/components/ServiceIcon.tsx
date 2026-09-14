'use client'

import { useState } from 'react'
import { Brain, GraduationCap } from 'lucide-react'
import type { IconKey } from '@/app/lib/site'

const ICONS: Record<IconKey, any> = { brain: Brain, school: GraduationCap }

export default function ServiceIcon({
  iconKey,
  logo,
  accent,
  size = 24,
  variant = 'tile',
}: {
  iconKey: IconKey
  logo?: string
  accent: string
  size?: number
  variant?: 'tile' | 'mega'
}) {
  const [err, setErr] = useState(false)
  const Icon = ICONS[iconKey]

  if (logo && !err) {
    return (
      <span className={variant === 'mega' ? 'vt-mega-logo' : 'vt-logo-tile'}>
        <img src={logo} alt="" onError={() => setErr(true)} />
      </span>
    )
  }
  if (variant === 'mega') {
    return <span className="vt-mega-ico" style={{ background: accent }}><Icon size={20} /></span>
  }
  return <span className="vt-ico" style={{ background: accent }}><Icon size={size} /></span>
}
