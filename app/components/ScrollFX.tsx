'use client'

import { useEffect } from 'react'

/**
 * Parallax sutil en elementos con [data-parallax="0.15"].
 * Usa transform (GPU) y rAF. Solo aplíquese a elementos decorativos
 * SIN animación CSS de transform propia (p. ej. .vt-arc), para no chocar.
 */
export default function ScrollFX() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Barra de progreso de lectura (degradado de marca)
    const bar = document.createElement('div')
    bar.className = 'vt-progress'
    document.body.appendChild(bar)

    const els = reduce ? [] : Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'))

    let raf = 0
    const update = () => {
      raf = 0
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0
      bar.style.transform = `scaleX(${p})`

      if (!reduce) {
        const vh = window.innerHeight
        for (const el of els) {
          const speed = parseFloat(el.dataset.parallax || '0.15')
          const r = el.getBoundingClientRect()
          const center = r.top + r.height / 2 - vh / 2
          el.style.transform = `translate3d(0, ${(-center * speed).toFixed(1)}px, 0)`
        }
      }
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
      bar.remove()
    }
  }, [])

  return null
}
