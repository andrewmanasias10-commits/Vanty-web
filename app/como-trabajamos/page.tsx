'use client'

import { Zap, ArrowRight, Phone, Check } from 'lucide-react'
import SiteNav from '@/app/components/SiteNav'
import SiteFooter from '@/app/components/SiteFooter'
import Reveal from '@/app/components/Reveal'
import Wave from '@/app/components/Wave'
import { useT } from '@/app/components/LangProvider'
import { WA_URL } from '@/app/lib/site'

const STEP_META = [
  { n: '01', c: '#1D4ED8' },
  { n: '02', c: '#16a6ff' },
  { n: '03', c: '#0f766e' },
  { n: '04', c: '#d97706' },
]

export default function ComoTrabajamosPage() {
  const { t, tr } = useT()
  const steps = tr<{ t: string; d: string }[]>('como.steps') || []
  const lqs = tr<string[]>('como.lqs') || []
  return (
    <>
      <SiteNav />

      <header className="vt-hero vt-hero-light vt-rel">
        <div className="vt-hero-grid" />
        <div className="vt-blob" style={{ width: 420, height: 420, bottom: '-18%', right: '-6%', background: 'rgba(37,99,235,.16)' }} />
        <div className="vt-arc" data-parallax="0.16" style={{ width: 220, height: 220, top: '10%', left: '7%', borderWidth: 2, borderColor: 'rgba(22,166,255,.22)' }} />
        <div className="vt-hero-inner vt-hero-center">
          <span className="vt-eyebrow"><Zap size={13} /> {t('como.eyebrow')}</span>
          <h1 className="vt-h1" style={{ marginTop: 18 }}>{t('como.h1a')}<span className="vt-grad-ink">{t('como.h1grad')}</span></h1>
          <p className="vt-lead">{t('como.lead')}</p>
        </div>
      </header>

      <div style={{ background: '#ffffff' }}><Wave fill="#f7f9fc" /></div>

      <section className="vt-section" style={{ background: '#f7f9fc' }}>
        <div className="vt-inner">
          <div className="vt-timeline">
            {STEP_META.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.06} className="vt-tl-item" as="div">
                <span className="vt-tl-node">{s.n}</span>
                <div className="vt-tl-card">
                  <h3 className="vt-h3" style={{ fontSize: 20 }}>{steps[i]?.t}</h3>
                  <p className="vt-card-desc" style={{ fontSize: 15 }}>{steps[i]?.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div style={{ background: '#f7f9fc' }}><Wave flip fill="#ffffff" /></div>

      <section className="vt-section">
        <div className="vt-inner vt-narrow" style={{ margin: '0 auto' }}>
          <Reveal>
            <h2 className="vt-h2" style={{ textAlign: 'center', marginBottom: 26 }}>{t('como.lqsTitle')}</h2>
            <ul className="vt-checks">
              {lqs.map(c => <li key={c}><Check size={18} /> {c}</li>)}
            </ul>
          </Reveal>
        </div>
      </section>

      <div style={{ background: '#ffffff' }}><Wave variant={2} fill="#0c1838" /></div>

      <section className="vt-cta" style={{ paddingTop: 40 }}>
        <div className="vt-cta-dots" />
        <div className="vt-cta-inner">
          <h2 className="vt-h2">{t('como.ctaTitle')}</h2>
          <p className="vt-cta-sub">{t('como.ctaSub')}</p>
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
