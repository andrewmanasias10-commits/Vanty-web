'use client'

import {
  ArrowRight, Check, Bot, Database, Boxes,
  Phone, ShieldCheck, Sparkles, HeartPulse, GraduationCap, Building2, Layers,
} from 'lucide-react'
import SiteNav from '@/app/components/SiteNav'
import SiteFooter from '@/app/components/SiteFooter'
import Reveal from '@/app/components/Reveal'
import Figure from '@/app/components/Figure'
import Wave from '@/app/components/Wave'
import ServiceIcon from '@/app/components/ServiceIcon'
import ClientChip from '@/app/components/ClientChip'
import { useT } from '@/app/components/LangProvider'
import { SERVICES, WA_URL } from '@/app/lib/site'

const PILLARS = [
  { icon: Bot, c: '#1D4ED8', bg: '#e6efff', tk: 'p1' },
  { icon: Database, c: '#0f766e', bg: '#ddf7ef', tk: 'p2' },
  { icon: Boxes, c: '#16a6ff', bg: '#e3f3ff', tk: 'p3' },
]
const SECTORS = [
  { icon: HeartPulse, c: '#e11d6b', bg: '#fde6ef', tk: 's1' },
  { icon: GraduationCap, c: '#d97706', bg: '#fdeccf', tk: 's2' },
  { icon: Building2, c: '#1D4ED8', bg: '#e6efff', tk: 's3' },
]

export default function Home() {
  const { t, tr } = useT()
  return (
    <>
      <SiteNav />

      {/* HERO claro */}
      <header className="vt-hero vt-hero-light vt-rel">
        <div className="vt-hero-grid" />
        <div className="vt-blob" style={{ width: 460, height: 460, top: '-14%', left: '-8%', background: 'rgba(37,99,235,.16)' }} />
        <div className="vt-blob" style={{ width: 380, height: 380, bottom: '-20%', right: '-6%', background: 'rgba(22,166,255,.14)', animationDelay: '5s' }} />
        <div className="vt-arc" data-parallax="0.16" style={{ width: 280, height: 280, top: '12%', right: '6%', borderWidth: 2, borderColor: 'rgba(29,78,216,.18)' }} />
        <div className="vt-arc" data-parallax="-0.12" style={{ width: 130, height: 130, bottom: '14%', left: '7%', borderWidth: 2, borderColor: 'rgba(22,166,255,.2)' }} />
        <div className="vt-hero-inner vt-hero-split">
          <div>
            <h1 className="vt-h1">{t('home.h1a')}<span className="vt-grad-ink">{t('home.h1grad')}</span>{t('home.h1b')}</h1>
            <p className="vt-lead">{t('home.lead')}</p>
            <div className="vt-hero-btns">
              <a href="/nosotros" className="vt-btn vt-btn-primary">{t('home.ctaEnfoque')} <ArrowRight size={16} /></a>
              <a href="/servicios" className="vt-btn vt-btn-ghost">{t('home.ctaProductos')}</a>
            </div>
            <p style={{ marginTop: 18, fontSize: 13.5, color: 'var(--muted-2)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Check size={15} color="#1D4ED8" /> {t('home.micro')}
            </p>
          </div>
          <Reveal delay={0.1}>
            <Figure src="/images/hero-home.svg" alt="Vanty" caption="Producto Vanty" frameless blob="radial-gradient(circle at 40% 40%, #c9dbff, #e7defb)" />
          </Reveal>
        </div>
      </header>

      {/* LOGOS */}
      <section className="vt-section" style={{ paddingTop: 50, paddingBottom: 30 }}>
        <div className="vt-inner">
          <p className="vt-logos-label">{t('home.logos')}</p>
          <Reveal className="vt-logos">
            <ClientChip src="/images/clientes/santi.png" name="Neuropsicología y Terapias SANTI" />
            <ClientChip src="/images/aprendo.png" name="Jugando Aprendo" />
            <ClientChip src="/images/clientes/capyaba.png" alt="capyABA" name={<span>capy<span style={{ color: '#e0959c' }}>ABA</span></span>} />
            <span className="vt-logo-ghost">{t('home.tuOrg')}</span>
          </Reveal>
        </div>
      </section>

      <div style={{ background: '#ffffff' }}><Wave fill="#eef4ff" /></div>

      {/* ENGANCHE */}
      <section className="vt-section vt-rel" style={{ background: '#eef4ff' }}>
        <div className="vt-arc" style={{ width: 360, height: 360, top: '-12%', left: '-6%', borderWidth: 1.5, borderColor: 'rgba(29,78,216,.14)' }} />
        <div className="vt-inner">
          <Reveal className="vt-head-center">
            <span className="vt-eyebrow"><Sparkles size={13} /> {t('home.enfEyebrow')}</span>
            <h2 className="vt-h2" style={{ marginTop: 16 }}>{t('home.enfTitle')}</h2>
            <p className="vt-lead">{t('home.enfLead')}</p>
          </Reveal>
          <div className="vt-grid-3" style={{ marginTop: 8 }}>
            {PILLARS.map((p, i) => {
              const Icon = p.icon
              return (
                <Reveal key={p.tk} delay={i * 0.08} className="vt-open" as="div">
                  <span className="vt-ico-round" style={{ background: p.bg, color: p.c }}><Icon size={28} /></span>
                  <h3 className="vt-h3" style={{ fontSize: 19 }}>{t(`home.${p.tk}t`)}</h3>
                  <p className="vt-card-desc">{t(`home.${p.tk}d`)}</p>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <div style={{ background: '#eef4ff' }}><Wave flip fill="#ffffff" /></div>

      {/* PRODUCTOS */}
      <section className="vt-section">
        <div className="vt-inner">
          <Reveal className="vt-section-head">
            <div>
              <span className="vt-eyebrow"><Layers size={13} /> {t('home.prodEyebrow')}</span>
              <h2 className="vt-h2" style={{ marginTop: 16 }}>{t('home.prodTitle')}</h2>
              <p className="vt-lead">{t('home.prodLead')}</p>
            </div>
            <a href="/servicios" className="vt-btn vt-btn-ghost">{t('footer.verTodos')} <ArrowRight size={16} /></a>
          </Reveal>
          <div className="vt-grid-2" style={{ maxWidth: 860, margin: '0 auto' }}>
            {SERVICES.map((s, i) => {
              const k = s.slug === 'vanty-aba' ? 'aba' : 'school'
              const tags = tr<string[]>(`svc.${k}.tags`) || []
              const inner = (
                <>
                  <ServiceIcon iconKey={s.icon} logo={s.logo} accent={s.accent} />
                  {s.soon
                    ? <span className="vt-badge-soon">{t(`svc.${k}.badge`)}</span>
                    : <span className="vt-badge-pill" style={{ color: s.accent, background: `${s.accent}15` }}>{t(`svc.${k}.badge`)}</span>}
                  <h3 className="vt-h3">{s.name}</h3>
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

      <div style={{ background: '#ffffff' }}><Wave variant={2} fill="#eef6ff" /></div>

      {/* SECTORES */}
      <section className="vt-section vt-rel" style={{ background: '#eef6ff' }}>
        <div className="vt-arc" style={{ width: 300, height: 300, bottom: '-10%', right: '-6%', borderWidth: 1.5, borderColor: 'rgba(22,166,255,.16)' }} />
        <div className="vt-inner">
          <Reveal className="vt-head-center">
            <span className="vt-eyebrow"><Sparkles size={13} /> {t('home.secEyebrow')}</span>
            <h2 className="vt-h2" style={{ marginTop: 16 }}>{t('home.secTitle')}</h2>
          </Reveal>
          <div className="vt-grid-3" style={{ marginTop: 8 }}>
            {SECTORS.map((s, i) => {
              const Icon = s.icon
              return (
                <Reveal key={s.tk} delay={i * 0.08} className="vt-open" as="div">
                  <span className="vt-ico-round" style={{ background: s.bg, color: s.c }}><Icon size={28} /></span>
                  <h3 className="vt-h3" style={{ fontSize: 19 }}>{t(`home.${s.tk}n`)}</h3>
                  <p className="vt-card-desc">{t(`home.${s.tk}d`)}</p>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <div style={{ background: '#eef6ff' }}><Wave flip fill="#ffffff" /></div>

      {/* CÓMO TRABAJAMOS teaser */}
      <section className="vt-section">
        <div className="vt-inner vt-hero-split" style={{ alignItems: 'center' }}>
          <Reveal>
            <span className="vt-eyebrow"><ShieldCheck size={13} /> {t('home.comoEyebrow')}</span>
            <h2 className="vt-h2" style={{ marginTop: 16 }}>{t('home.comoTitle')}</h2>
            <p className="vt-lead" style={{ marginTop: 14 }}>{t('home.comoLead')}</p>
            <ul className="vt-checks" style={{ marginTop: 18 }}>
              {[t('home.comoCk1'), t('home.comoCk2'), t('home.comoCk3')].map(c => <li key={c}><Check size={18} /> {c}</li>)}
            </ul>
            <a href="/como-trabajamos" className="vt-btn vt-btn-primary" style={{ marginTop: 24 }}>{t('home.comoCta')} <ArrowRight size={16} /></a>
          </Reveal>
          <Reveal delay={0.1}>
            <Figure src="/images/servicios/software-a-medida.svg" alt="Vanty" caption="Proceso" frameless blob="radial-gradient(circle at 60% 40%, #cfeee4, #d9e6ff)" />
          </Reveal>
        </div>
      </section>

      <div style={{ background: '#ffffff' }}><Wave variant={2} fill="#0c1838" /></div>

      {/* CTA */}
      <section className="vt-cta" style={{ paddingTop: 40 }}>
        <div className="vt-cta-dots" />
        <div className="vt-cta-inner">
          <h2 className="vt-h2">{t('home.ctaTitle')}</h2>
          <p className="vt-cta-sub">{t('home.ctaSub')}</p>
          <div className="vt-cta-btns">
            <a href={WA_URL} className="vt-btn vt-btn-light" target="_blank" rel="noopener noreferrer"><Phone size={16} /> {t('home.ctaDemo')}</a>
            <a href="/contacto" className="vt-btn vt-btn-ghost-dark">{t('home.ctaContacto')} <ArrowRight size={16} /></a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  )
}
