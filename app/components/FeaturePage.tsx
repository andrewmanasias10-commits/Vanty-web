'use client'

import { useState } from 'react'
import { notFound } from 'next/navigation'
import {
  Bot, BarChart3, CalendarDays, CreditCard, Stethoscope, HeartHandshake,
  ArrowLeft, ArrowRight, Check, Phone, Sparkles, Users, MessageSquare, Video,
  FileText, ShieldCheck, TrendingUp, ClipboardList, CalendarClock, Zap, Wallet, FileCheck,
  Target, Activity, BookOpen, Lightbulb,
} from 'lucide-react'
import SiteNav from '@/app/components/SiteNav'
import SiteFooter from '@/app/components/SiteFooter'
import Reveal from '@/app/components/Reveal'
import Figure from '@/app/components/Figure'
import Wave from '@/app/components/Wave'
import { useT } from '@/app/components/LangProvider'
import { FEATURES } from '@/app/lib/features'
import { WA_URL, waLink } from '@/app/lib/site'

const ICONS: Record<string, any> = {
  bot: Bot, chart: BarChart3, calendar: CalendarDays, card: CreditCard, stethoscope: Stethoscope, family: HeartHandshake, chat: MessageSquare, video: Video,
  fileText: FileText, shieldCheck: ShieldCheck, trendingUp: TrendingUp, clipboard: ClipboardList, calendarClock: CalendarClock, zap: Zap, wallet: Wallet, fileCheck: FileCheck,
  target: Target, activity: Activity, bookOpen: BookOpen, lightbulb: Lightbulb, sparkles: Sparkles,
}

// Foto de personas usándolo, con respaldo si aún no se sube
function PracticePhoto({ src, alt }: { src: string; alt: string }) {
  const [s, setS] = useState(src)
  return <img className="vt-feat-photo" src={s} alt={alt} onError={() => setS('/images/banner.png')} />
}

export default function FeaturePage({ slug }: { slug: string }) {
  const { t, tr } = useT()
  const meta = FEATURES.find(f => f.slug === slug)
  if (!meta) return notFound()

  const base = `feat.items.${slug}`
  const points = tr<{ t: string; d: string }[]>(`${base}.points`) || []
  const benefits = tr<string[]>(`${base}.benefits`) || []
  const roles = tr<string[]>(`${base}.roles`) || []
  const sub = tr<{ t: string; d: string }[]>(`${base}.sub`) || []
  const Icon = ICONS[meta.icon]
  const title = t(`${base}.title`)
  const wa = waLink(`Hola Vanty, quiero más información sobre "${t(`${base}.name`)}" de Vanty ABA.`)

  return (
    <>
      <SiteNav />

      {/* HERO */}
      <header className="vt-hero vt-hero-light vt-rel">
        <div className="vt-hero-grid" />
        <div className="vt-blob" style={{ width: 440, height: 440, top: '-14%', left: '-6%', background: 'rgba(22,166,255,.16)' }} />
        <div className="vt-arc" data-parallax="0.16" style={{ width: 260, height: 260, top: '12%', right: '6%', borderWidth: 2, borderColor: 'rgba(29,78,216,.16)' }} />
        <div className="vt-hero-inner vt-hero-split">
          <div>
            <a href="/vanty-aba" className="vt-feat-back"><ArrowLeft size={15} /> {t('feat.back')}</a>
            <span className="vt-eyebrow" style={{ marginTop: 14 }}>
              <span className="vt-feat-eyeico" style={{ background: meta.accent }}><Icon size={13} /></span> {t(`${base}.eyebrow`)}
            </span>
            <h1 className="vt-h1" style={{ marginTop: 16 }}>{title}</h1>
            <p className="vt-lead">{t(`${base}.lead`)}</p>
            <div className="vt-hero-btns">
              <a href={wa} className="vt-btn vt-btn-primary" target="_blank" rel="noopener noreferrer"><Phone size={16} /> {t('common.agendaDemo')}</a>
              <a href="/vanty-aba#consulta" className="vt-btn vt-btn-ghost">{t('common.solicitarDemo')} <ArrowRight size={16} /></a>
            </div>
          </div>
          <Reveal delay={0.1}>
            <Figure src={meta.img} alt={title} caption={title} frameless blob="radial-gradient(circle at 45% 40%, #cfe0fb, #e3f3ff)" badge={<><Sparkles size={15} color={meta.accent} /> Vanty ABA</>} />
          </Reveal>
        </div>
      </header>

      {/* PUNTOS / DETALLE */}
      <div style={{ background: '#ffffff' }}><Wave variant={2} fill="#eef6ff" /></div>
      <section className="vt-section vt-rel" style={{ background: '#eef6ff' }}>
        <div className="vt-inner">
          <div className="vt-grid-3">
            {points.map((p, i) => {
              const PIcon = ICONS[(p as any).icon] || Icon
              return (
                <Reveal key={p.t} delay={i * 0.08} className="vt-open" as="div">
                  <span className="vt-ico-round" style={{ background: `${meta.accent}18`, color: meta.accent }}><PIcon size={26} /></span>
                  <h3 className="vt-h3" style={{ fontSize: 18 }}>{p.t}</h3>
                  <p className="vt-card-desc">{p.d}</p>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>
      <div style={{ background: '#eef6ff' }}><Wave flip fill="#ffffff" /></div>

      {/* EN LA PRÁCTICA — foto de personas + voz clínica */}
      <section className="vt-section">
        <div className="vt-inner vt-feature reverse">
          <Reveal className="vt-feature-media">
            <PracticePhoto src={meta.photo} alt={title} />
          </Reveal>
          <Reveal className="vt-feature-text" delay={0.1}>
            <span className="vt-eyebrow">
              <span className="vt-feat-eyeico" style={{ background: meta.accent }}><Icon size={13} /></span> {t('feat.practiceTitle')}
            </span>
            <p className="vt-lead" style={{ marginTop: 16 }}>{t(`${base}.deep`)}</p>
            <blockquote className="vt-blockquote" style={{ borderLeftColor: meta.accent }}>{t(`${base}.quote`)}</blockquote>
            <div className="vt-feat-role">— {t(`${base}.quoteRole`)}</div>
          </Reveal>
        </div>
      </section>

      {/* ¿PARA QUIÉN ES? — foto de personas + roles */}
      <section className="vt-section">
        <div className="vt-inner vt-feature">
          <Reveal className="vt-feature-text">
            <span className="vt-eyebrow">
              <span className="vt-feat-eyeico" style={{ background: meta.accent }}><Users size={13} /></span> {t('feat.forWhomTitle')}
            </span>
            <p className="vt-lead" style={{ marginTop: 16 }}>{t(`${base}.forWhom`)}</p>
            <ul className="vt-checks" style={{ marginTop: 18 }}>
              {roles.map(r => <li key={r}><Check size={18} /> {r}</li>)}
            </ul>
          </Reveal>
          <Reveal className="vt-feature-media" delay={0.1}>
            <PracticePhoto src={meta.photo2} alt={title} />
          </Reveal>
        </div>
      </section>

      {/* TODO LO QUE INCLUYE — subfunciones */}
      <section className="vt-section soft">
        <div className="vt-inner">
          <Reveal className="vt-head-center">
            <h2 className="vt-h2">{t('feat.subTitle')}</h2>
            <p className="vt-lead">{t('feat.subLead')}</p>
          </Reveal>
          <div className="vt-grid-2" style={{ maxWidth: 880, margin: '0 auto' }}>
            {sub.map((s, i) => {
              const SIcon = ICONS[(s as any).icon] || Check
              return (
                <Reveal key={s.t} delay={(i % 2) * 0.06}>
                  <div className="vt-card" style={{ height: '100%', flexDirection: 'row', gap: 16, alignItems: 'flex-start' }}>
                    <span className="vt-ico" style={{ background: meta.accent, marginBottom: 0, width: 44, height: 44, flexShrink: 0 }}><SIcon size={20} /></span>
                    <span>
                      <h3 className="vt-h3" style={{ fontSize: 17 }}>{s.t}</h3>
                      <p className="vt-card-desc" style={{ marginTop: 4 }}>{s.d}</p>
                    </span>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="vt-section">
        <div className="vt-inner vt-narrow" style={{ margin: '0 auto' }}>
          <Reveal>
            <h2 className="vt-h2" style={{ textAlign: 'center', marginBottom: 26 }}>{t('feat.benefitsTitle')}</h2>
            <ul className="vt-checks vt-checks-2">
              {benefits.map(b => <li key={b}><Check size={18} /> {b}</li>)}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <div style={{ background: '#ffffff' }}><Wave variant={2} fill="#0c1838" /></div>
      <section className="vt-cta" style={{ paddingTop: 40 }}>
        <div className="vt-cta-dots" />
        <div className="vt-cta-inner">
          <h2 className="vt-h2">{t('feat.ctaTitle')}</h2>
          <p className="vt-cta-sub">{t(`${base}.ctaSub`)}</p>
          <div className="vt-cta-btns">
            <a href={WA_URL} className="vt-btn vt-btn-light" target="_blank" rel="noopener noreferrer"><Phone size={16} /> {t('common.agendaDemo')}</a>
            <a href="/vanty-aba" className="vt-btn vt-btn-ghost-dark">{t('feat.back')} <ArrowRight size={16} /></a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  )
}
