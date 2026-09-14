'use client'

import { MessageSquare, Phone, Mail, Instagram, Facebook, ArrowRight, Clock, MapPin } from 'lucide-react'
import SiteNav from '@/app/components/SiteNav'
import SiteFooter from '@/app/components/SiteFooter'
import Reveal from '@/app/components/Reveal'
import { useT } from '@/app/components/LangProvider'
import { WA_URL, EMAIL, FB_URL, IG_URL, TIKTOK_URL } from '@/app/lib/site'

const TikTokIcon = ({ size = 17 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16.5 5.82a4.78 4.78 0 0 1-1.03-2.82h-3.2v12.36a2.74 2.74 0 1 1-2-2.64V7.43a5.93 5.93 0 1 0 5.2 5.88V9.01a7.9 7.9 0 0 0 4.6 1.47V7.27a4.77 4.77 0 0 1-3.57-1.45z" />
  </svg>
)

const CHANNEL_META = [
  { icon: Phone, href: WA_URL, accent: '#1D4ED8', external: true, useEmail: false },
  { icon: Mail, href: `mailto:${EMAIL}`, accent: '#0f766e', external: false, useEmail: true },
  { icon: Instagram, href: IG_URL, accent: '#16a6ff', external: true, useEmail: false },
]

export default function ContactoPage() {
  const { t, tr } = useT()
  const channels = tr<{ t: string; d: string; cta: string }[]>('contacto.channels') || []
  return (
    <>
      <SiteNav />

      <header className="vt-hero vt-hero-light vt-rel">
        <div className="vt-hero-grid" />
        <div className="vt-blob" style={{ width: 420, height: 420, top: '-14%', right: '-6%', background: 'rgba(37,99,235,.16)' }} />
        <div className="vt-arc" data-parallax="0.16" style={{ width: 200, height: 200, bottom: '8%', left: '8%', borderWidth: 2, borderColor: 'rgba(22,166,255,.2)' }} />
        <div className="vt-arc" data-parallax="-0.1" style={{ width: 280, height: 280, top: '6%', right: '6%', borderWidth: 2, borderColor: 'rgba(29,78,216,.14)' }} />
        <div className="vt-hero-inner vt-hero-center">
          <span className="vt-eyebrow"><MessageSquare size={13} /> {t('contacto.eyebrow')}</span>
          <h1 className="vt-h1" style={{ marginTop: 18 }}>{t('contacto.h1a')}<span className="vt-grad-ink">{t('contacto.h1grad')}</span></h1>
          <p className="vt-lead">{t('contacto.lead')}</p>
          <div className="vt-hero-btns">
            <a href={WA_URL} className="vt-btn vt-btn-primary" target="_blank" rel="noopener noreferrer"><Phone size={16} /> {t('common.hablarWhatsapp')}</a>
            <a href={`mailto:${EMAIL}`} className="vt-btn vt-btn-ghost"><Mail size={16} /> {EMAIL}</a>
          </div>
        </div>
      </header>

      <section className="vt-section">
        <div className="vt-inner">
          <div className="vt-grid-3">
            {CHANNEL_META.map((c, i) => {
              const Icon = c.icon
              const ch = channels[i]
              return (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="vt-card" style={{ height: '100%' }}>
                    <span className="vt-ico" style={{ background: c.accent }}><Icon size={22} /></span>
                    <h3 className="vt-h3" style={{ fontSize: 18 }}>{ch?.t}</h3>
                    <p className="vt-card-desc">{c.useEmail ? EMAIL : ch?.d}</p>
                    <a className="vt-link" href={c.href} target={c.external ? '_blank' : undefined} rel={c.external ? 'noopener noreferrer' : undefined}>
                      {ch?.cta} <ArrowRight size={15} />
                    </a>
                  </div>
                </Reveal>
              )
            })}
          </div>

          <Reveal delay={0.1}>
            <div className="vt-card" style={{ marginTop: 22, background: 'var(--soft)', flexDirection: 'row', flexWrap: 'wrap', gap: 28, alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="vt-trust-item"><Clock size={16} /> {t('contacto.infoTime')}</span>
              <span className="vt-trust-item"><MapPin size={16} /> {t('contacto.infoLoc')}</span>
              <span style={{ display: 'flex', gap: 10 }}>
                <a href={FB_URL} className="vt-soc" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ background: '#eef3fb', color: '#1D4ED8' }}><Facebook size={17} /></a>
                <a href={IG_URL} className="vt-soc" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ background: '#eef3fb', color: '#1D4ED8' }}><Instagram size={17} /></a>
                <a href={TIKTOK_URL} className="vt-soc" target="_blank" rel="noopener noreferrer" aria-label="TikTok" style={{ background: '#eef3fb', color: '#1D4ED8' }}><TikTokIcon size={17} /></a>
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </>
  )
}
