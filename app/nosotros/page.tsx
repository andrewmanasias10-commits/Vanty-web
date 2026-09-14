'use client'

import { Heart, ArrowRight, Phone, Target, Eye, Cpu, Wrench, Users, Sparkles } from 'lucide-react'
import SiteNav from '@/app/components/SiteNav'
import SiteFooter from '@/app/components/SiteFooter'
import Reveal from '@/app/components/Reveal'
import Wave from '@/app/components/Wave'
import { useT } from '@/app/components/LangProvider'
import { WA_URL } from '@/app/lib/site'

const VALUE_ICONS = [
  { icon: Cpu, c: '#1D4ED8', bg: '#e6efff' },
  { icon: Wrench, c: '#0f766e', bg: '#ddf7ef' },
  { icon: Users, c: '#16a6ff', bg: '#e3f3ff' },
]

export default function NosotrosPage() {
  const { t, tr } = useT()
  const vals = tr<{ t: string; d: string }[]>('nosotros.vals') || []
  return (
    <>
      <SiteNav />

      <header className="vt-hero vt-hero-light vt-rel">
        <div className="vt-hero-grid" />
        <div className="vt-blob" style={{ width: 420, height: 420, top: '-14%', left: '-6%', background: 'rgba(22,166,255,.16)' }} />
        <div className="vt-arc" data-parallax="0.16" style={{ width: 240, height: 240, bottom: '6%', right: '7%', borderWidth: 2, borderColor: 'rgba(29,78,216,.18)' }} />
        <div className="vt-arc" data-parallax="-0.12" style={{ width: 130, height: 130, top: '16%', left: '8%', borderWidth: 2, borderColor: 'rgba(22,166,255,.2)' }} />
        <div className="vt-hero-inner vt-hero-center">
          <span className="vt-eyebrow"><Heart size={13} /> {t('nosotros.eyebrow')}</span>
          <h1 className="vt-h1" style={{ marginTop: 18 }}>{t('nosotros.h1a')}<span className="vt-grad-ink">{t('nosotros.h1grad')}</span></h1>
          <p className="vt-lead">{t('nosotros.lead')}</p>
        </div>
      </header>

      <div style={{ background: '#ffffff' }}><Wave fill="#eef4ff" /></div>

      {/* Quiénes somos + imagen */}
      <section className="vt-section" style={{ background: '#eef4ff' }}>
        <div className="vt-inner vt-hero-split" style={{ alignItems: 'center' }}>
          <Reveal>
            <span className="vt-eyebrow"><Sparkles size={13} /> {t('nosotros.vEyebrow')}</span>
            <h2 className="vt-h2" style={{ marginTop: 16 }}>{t('nosotros.vTitle')}</h2>
            <p className="vt-lead" style={{ marginTop: 14 }}>
              {t('nosotros.vLead1')}
              <strong style={{ color: 'var(--ink)' }}> {t('nosotros.vLeadStrong')}</strong>
              {t('nosotros.vLead2')}
            </p>
            <a href="/vanty-aba" className="vt-btn vt-btn-primary" style={{ marginTop: 24 }}>{t('nosotros.vCta')} <ArrowRight size={16} /></a>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="vt-brandcard">
              <span className="blob" />
              <div className="inner">
                <img src="/images/logos/vanty.png" alt="Vanty" />
                <div className="nm">VANTY</div>
                <div className="tg">{t('nosotros.brandTag')}</div>
                <div className="chips">
                  {(tr<string[]>('nosotros.chips') || []).map(c => <span key={c}>{c}</span>)}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div style={{ background: '#eef4ff' }}><Wave flip fill="#ffffff" /></div>

      {/* Misión / Visión */}
      <section className="vt-section">
        <div className="vt-inner vt-grid-2">
          <Reveal className="vt-open" as="div">
            <span className="vt-ico-round" style={{ background: '#e6efff', color: '#1D4ED8' }}><Target size={28} /></span>
            <h2 className="vt-h3" style={{ fontSize: 22 }}>{t('nosotros.misionT')}</h2>
            <p className="vt-card-desc" style={{ fontSize: 15.5 }}>{t('nosotros.misionD')}</p>
          </Reveal>
          <Reveal className="vt-open" as="div" delay={0.1}>
            <span className="vt-ico-round" style={{ background: '#e3f3ff', color: '#16a6ff' }}><Eye size={28} /></span>
            <h2 className="vt-h3" style={{ fontSize: 22 }}>{t('nosotros.visionT')}</h2>
            <p className="vt-card-desc" style={{ fontSize: 15.5 }}>{t('nosotros.visionD')}</p>
          </Reveal>
        </div>
      </section>

      <div style={{ background: '#ffffff' }}><Wave variant={2} fill="#eef6ff" /></div>

      {/* Valores */}
      <section className="vt-section vt-rel" style={{ background: '#eef6ff' }}>
        <div className="vt-arc" style={{ width: 300, height: 300, top: '-10%', right: '-6%', borderWidth: 1.5, borderColor: 'rgba(22,166,255,.16)' }} />
        <div className="vt-inner">
          <Reveal className="vt-head-center">
            <span className="vt-eyebrow"><Heart size={13} /> {t('nosotros.valEyebrow')}</span>
            <h2 className="vt-h2" style={{ marginTop: 16 }}>{t('nosotros.valTitle')}</h2>
          </Reveal>
          <div className="vt-grid-3" style={{ marginTop: 8 }}>
            {VALUE_ICONS.map((v, i) => {
              const Icon = v.icon
              return (
                <Reveal key={i} delay={i * 0.08} className="vt-open" as="div">
                  <span className="vt-ico-round" style={{ background: v.bg, color: v.c }}><Icon size={28} /></span>
                  <h3 className="vt-h3" style={{ fontSize: 19 }}>{vals[i]?.t}</h3>
                  <p className="vt-card-desc">{vals[i]?.d}</p>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <div style={{ background: '#eef6ff' }}><Wave flip fill="#0c1838" /></div>

      <section className="vt-cta" style={{ paddingTop: 40 }}>
        <div className="vt-cta-dots" />
        <div className="vt-cta-inner">
          <h2 className="vt-h2">{t('nosotros.ctaTitle')}</h2>
          <p className="vt-cta-sub">{t('nosotros.ctaSub')}</p>
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
