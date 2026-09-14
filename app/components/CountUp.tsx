'use client'

import { useEffect, useRef, useState } from 'react'

export default function CountUp({
  to,
  prefix = '',
  suffix = '',
  duration = 1700,
  decimals = 0,
}: {
  to: number
  prefix?: string
  suffix?: string
  duration?: number
  decimals?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [val, setVal] = useState(0)
  const done = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { setVal(to); return }

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting && !done.current) {
            done.current = true
            const start = performance.now()
            const tick = (t: number) => {
              const p = Math.min(1, (t - start) / duration)
              const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
              setVal(to * eased)
              if (p < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
            // Garantiza el valor final aunque rAF esté limitado (pestaña inactiva, etc.)
            setTimeout(() => setVal(to), duration + 120)
          }
        })
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [to, duration])

  return (
    <span ref={ref}>
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  )
}
