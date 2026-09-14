'use client'

import { ArrowRight, Home, MessageSquare } from 'lucide-react'
import SiteNav from '@/app/components/SiteNav'
import SiteFooter from '@/app/components/SiteFooter'
import { useT } from '@/app/components/LangProvider'

export default function NotFound() {
  const { t } = useT()
  return (
    <>
      <SiteNav />
      <header className="vt-hero vt-hero-light vt-rel" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
        <div className="vt-hero-grid" />
        <div className="vt-blob" style={{ width: 460, height: 460, top: '-10%', left: '-8%', background: 'rgba(22,166,255,.18)' }} />
        <div className="vt-arc" data-parallax="0.16" style={{ width: 280, height: 280, bottom: '6%', right: '6%', borderWidth: 2, borderColor: 'rgba(29,78,216,.16)' }} />
        <div className="vt-hero-inner vt-hero-center">
          <div className="vt-404">404</div>
          <h1 className="vt-h1" style={{ marginTop: 6 }}>{t('nf.title')}</h1>
          <p className="vt-lead">{t('nf.lead')}</p>
          <div className="vt-hero-btns">
            <a href="/" className="vt-btn vt-btn-primary"><Home size={16} /> {t('nf.home')}</a>
            <a href="/contacto" className="vt-btn vt-btn-ghost"><MessageSquare size={16} /> {t('nf.contact')} <ArrowRight size={16} /></a>
          </div>
        </div>
      </header>
      <SiteFooter />
    </>
  )
}
