'use client'

import { ArrowRight, Bot, Database, Boxes, Phone, Layers, Sparkles, Rocket } from 'lucide-react'
import SiteNav from '@/app/components/SiteNav'
import SiteFooter from '@/app/components/SiteFooter'
import Reveal from '@/app/components/Reveal'
import Wave from '@/app/components/Wave'
import ServiceIcon from '@/app/components/ServiceIcon'
import { useT } from '@/app/components/LangProvider'
import { SERVICES, WA_URL } from '@/app/lib/site'

const PILLAR_ICONS = [
  { icon: Bot, c: '#1D4ED8', bg: '#e6efff' },
  { icon: Database, c: '#0f766e', bg: '#ddf7ef' },
  { icon: Boxes, c: '#16a6ff', bg: '#e3f3ff' },
]

const svcKey = (slug: string) => (slug === 'vanty-aba' ? 'aba' : 'school')

export default function ServiciosPage() {
  const { t, tr } = useT()
  const pils = tr<{ t: string; d: string }[]>('servicios.pils') || []
  return (
    <>
      <SiteNav />

      <header className="vt-hero vt-hero-light vt-rel">
        <div className="vt-hero-grid" />
        <div className="vt-blob" style={{ width: 420, height: 420, top: '-14%', right: '-6%', background: 'rgba(37,99,235,.16)' }} />
        <div className="vt-arc" data-parallax="0.16" style={{ width: 200, height: 200, bottom: '8%', left: '8%', borderWidth: 2, borderColor: 'rgba(22,166,255,.2)' }} />
        <div className="vt-arc" data-parallax="-0.1" style={{ width: 300, height: 300, top: '8%', right: '5%', borderWidth: 2, borderColor: 'rgba(29,78,216,.14)' }} />
        <div className="vt-hero-inner vt-hero-center">
          <span className="vt-eyebrow"><Layers size={13} /> {t('servicios.eyebrow')}</span>
          <h1 className="vt-h1" style={{ marginTop: 18 }}>{t('servicios.h1a')}<span className="vt-grad-ink">{t('servicios.h1grad')}</span></h1>
          <p className="vt-lead">{t('servicios.lead')}</p>
        </div>
      </header>

      <div style={{ background: '#ffffff' }}><Wave fill="#eef4ff" /></div>

      {/* Pilares tecnológicos */}
      <section className="vt-section vt-rel" style={{ background: '#eef4ff' }}>
        <div className="vt-inner">
          <Reveal className="vt-head-center">
            <span className="vt-eyebrow"><Sparkles size={13} /> {t('servicios.pilEyebrow')}</span>
            <h2 className="vt-h2" style={{ marginTop: 16 }}>{t('servicios.pilTitle')}</h2>
          </Reveal>
          <div className="vt-grid-3" style={{ marginTop: 8 }}>
            {PILLAR_ICONS.map((p, i) => {
              const Icon = p.icon
              return (
                <Reveal key={i} delay={i * 0.08} className="vt-open" as="div">
                  <span className="vt-ico-round" style={{ background: p.bg, color: p.c }}><Icon size={28} /></span>
                  <h3 className="vt-h3" style={{ fontSize: 19 }}>{pils[i]?.t}</h3>
                  <p className="vt-card-desc">{pils[i]?.d}</p>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <div style={{ background: '#eef4ff' }}><Wave flip fill="#ffffff" /></div>

      {/* Productos */}
      <section className="vt-section">
        <div className="vt-inner">
          <Reveal className="vt-head-center">
            <span className="vt-eyebrow"><Rocket size={13} /> {t('servicios.prodEyebrow')}</span>
            <h2 className="vt-h2" style={{ marginTop: 16 }}>{t('servicios.prodTitle')}</h2>
          </Reveal>
          <div className="vt-grid-2" style={{ maxWidth: 860, margin: '0 auto' }}>
            {SERVICES.map((s, i) => {
              const k = svcKey(s.slug)
              const tags = tr<string[]>(`svc.${k}.tags`) || []
              const inner = (
                <>
                  <ServiceIcon iconKey={s.icon} logo={s.logo} accent={s.accent} />
                  {s.soon
                    ? <span className="vt-badge-soon">{t(`svc.${k}.badge`)}</span>
                    : <span className="vt-badge-pill" style={{ color: s.accent, background: `${s.accent}15` }}>{t(`svc.${k}.badge`)}</span>}
                  <h3 className="vt-h3" style={{ fontSize: 21 }}>{s.name}</h3>
                  <p className="vt-card-desc">{t(`svc.${k}.desc`)}</p>
                  <div className="vt-tags">{tags.map(tag => <span key={tag} className="vt-tag">{tag}</span>)}</div>
                  {!s.soon && <span className="vt-link">{t('common.conocerMas')} <ArrowRight size={15} /></span>}
                </>
              )
              return (
                <Reveal key={s.slug} delay={i * 0.08}>
                  {s.soon
                    ? <div className="vt-card soon" style={{ height: '100%' }}>{inner}</div>
                    : <a href={s.href} className={`vt-card${s.slug === 'vanty-aba' ? ' featured' : ''}`} style={{ height: '100%' }}>{inner}</a>}
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <div style={{ background: '#ffffff' }}><Wave variant={2} fill="#0c1838" /></div>

      <section className="vt-cta" style={{ paddingTop: 40 }}>
        <div className="vt-cta-dots" />
        <div className="vt-cta-inner">
          <h2 className="vt-h2">{t('servicios.ctaTitle')}</h2>
          <p className="vt-cta-sub">{t('servicios.ctaSub')}</p>
          <div className="vt-cta-btns">
            <a href={WA_URL} className="vt-btn vt-btn-light" target="_blank" rel="noopener noreferrer"><Phone size={16} /> {t('common.hablemosFuturo')}</a>
            <a href="/contacto" className="vt-btn vt-btn-ghost-dark">{t('common.contactanos')} <ArrowRight size={16} /></a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  )
}
