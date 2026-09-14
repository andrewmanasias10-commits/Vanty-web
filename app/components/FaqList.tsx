'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function FaqList({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="vt-faq">
      {items.map((f, i) => (
        <div key={i} className={`vt-faq-item${open === i ? ' open' : ''}`}>
          <button className="vt-faq-q" onClick={() => setOpen(open === i ? null : i)}>
            {f.q} <ChevronDown size={19} />
          </button>
          {open === i && <div className="vt-faq-a">{f.a}</div>}
        </div>
      ))}
    </div>
  )
}
