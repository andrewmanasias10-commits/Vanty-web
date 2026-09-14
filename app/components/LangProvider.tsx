'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { DICT, langFromCountry, langFromNavigator, type Lang } from '@/app/lib/dict'
import { MORE } from '@/app/lib/dict-more'
import { FEAT } from '@/app/lib/dict-feat'

type Ctx = {
  lang: Lang
  setLang: (l: Lang) => void
  t: (path: string) => string
  tr: <T = any>(path: string) => T
}
const LangContext = createContext<Ctx>({ lang: 'es', setLang: () => {}, t: (p) => p, tr: (() => undefined) as any })

function resolve(obj: any, path: string): any {
  return path.split('.').reduce((a, k) => (a == null ? a : a[k]), obj)
}

const merged = (lang: Lang) => ({ ...DICT[lang], ...MORE[lang], ...FEAT[lang] })
const mergedEs = { ...DICT.es, ...MORE.es, ...FEAT.es }

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('es')

  useEffect(() => {
    const saved = localStorage.getItem('vanty-lang') as Lang | null
    if (saved && DICT[saved]) { setLangState(saved); document.documentElement.lang = saved; return }
    let cancelled = false
    fetch('/api/geo')
      .then(r => r.json())
      .then(d => { if (!cancelled) { const l = langFromCountry(d?.country); setLangState(l); document.documentElement.lang = l } })
      .catch(() => { if (!cancelled) { const l = langFromNavigator(navigator.language); setLangState(l); document.documentElement.lang = l } })
    return () => { cancelled = true }
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    document.documentElement.lang = l
    try { localStorage.setItem('vanty-lang', l) } catch {}
  }

  const t = (path: string) => {
    const v = resolve(merged(lang), path)
    return (typeof v === 'string' ? v : resolve(mergedEs, path)) ?? path
  }

  const tr = <T = any,>(path: string): T => {
    const v = resolve(merged(lang), path)
    return (v != null ? v : resolve(mergedEs, path)) as T
  }

  return <LangContext.Provider value={{ lang, setLang, t, tr }}>{children}</LangContext.Provider>
}

export const useT = () => useContext(LangContext)
