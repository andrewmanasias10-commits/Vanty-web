'use client'

import { useEffect } from 'react'

/**
 * Disuade la descarga casual de imágenes:
 *  - Bloquea el clic derecho sobre <img> y elementos con fondo protegido.
 *  - Bloquea arrastrar imágenes (drag & drop al escritorio).
 *  - Bloquea el guardado por teclado (Ctrl/Cmd+S) cuando el foco no es un input.
 *
 * Nota: ninguna técnica web impide capturas de pantalla ni DevTools;
 * esto solo frena al usuario promedio.
 */
export default function ImageGuard() {
  useEffect(() => {
    const isImage = (el: EventTarget | null) =>
      el instanceof Element && (el.tagName === 'IMG' || el.tagName === 'SVG' || el.closest('img,svg,.vt-guard') != null)

    const onContext = (e: MouseEvent) => {
      if (isImage(e.target)) e.preventDefault()
    }
    const onDragStart = (e: DragEvent) => {
      if (isImage(e.target)) e.preventDefault()
    }
    const onKey = (e: KeyboardEvent) => {
      const tag = (document.activeElement?.tagName || '').toLowerCase()
      const typing = tag === 'input' || tag === 'textarea' || (document.activeElement as HTMLElement)?.isContentEditable
      if (!typing && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') e.preventDefault()
    }

    document.addEventListener('contextmenu', onContext)
    document.addEventListener('dragstart', onDragStart)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('contextmenu', onContext)
      document.removeEventListener('dragstart', onDragStart)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  return null
}
