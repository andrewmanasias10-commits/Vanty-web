'use client'

import {
  Brain, Bot, FileText, ShieldAlert, Target, Activity, TrendingUp, Lightbulb, BookOpen,
  ClipboardList, BarChart3, CalendarDays, CreditCard, Stethoscope, Users, MessageSquare,
  Video, ArrowRight, Check, Phone, Star, Sparkles, LayoutGrid, UserCog, Headset, HeartHandshake,
  ShieldCheck, Lock,
} from 'lucide-react'
import SiteNav from '@/app/components/SiteNav'
import SiteFooter from '@/app/components/SiteFooter'
import Reveal from '@/app/components/Reveal'
import Figure from '@/app/components/Figure'
import FaqList from '@/app/components/FaqList'
import Wave from '@/app/components/Wave'
import Avatar from '@/app/components/Avatar'
// import PricingABA from '@/app/components/PricingABA' // oculto temporalmente
import ConsultForm from '@/app/components/ConsultForm'
import CountUp from '@/app/components/CountUp'
import { useT } from '@/app/components/LangProvider'
import { FEATURES } from '@/app/lib/features'
import { WA_URL, EMAIL } from '@/app/lib/site'

const FEAT_ICONS: Record<string, any> = {
  bot: Bot, chart: BarChart3, calendar: CalendarDays, card: CreditCard, stethoscope: Stethoscope, family: HeartHandshake, chat: MessageSquare, video: Video,
}

const AGENT_ICONS = [Bot, FileText, Target, Activity, TrendingUp, Lightbulb, BookOpen]
const AGENT_COLORS = [
  { bg: '#e6efff', fg: '#1D4ED8' },
  { bg: '#e3f3ff', fg: '#16a6ff' },
  { bg: '#ddf7ef', fg: '#0f766e' },
  { bg: '#fdeccf', fg: '#d97706' },
  { bg: '#fde6ef', fg: '#e11d6b' },
  { bg: '#e0f5fb', fg: '#0891b2' },
]
const ROLE_META = [
  { icon: UserCog, accent: '#1D4ED8' },
  { icon: Stethoscope, accent: '#16a6ff' },
  { icon: Headset, accent: '#0891b2' },
  { icon: HeartHandshake, accent: '#ea580c' },
]
const cellClass = (v: string) => v.startsWith('✅') ? 'yes' : v.startsWith('❌') ? 'no' : v.startsWith('⚠️') ? 'par' : ''

export default function VantyAbaPage() {
  const { t, tr } = useT()
  const agents = tr<{ n: string; d: string }[]>('aba.agents') || []
  const roles = tr<{ n: string; items: string[] }[]>('aba.roles') || []
  const cmpHead = tr<string[]>('aba.cmpHead') || []
  const cmpRows = tr<string[][]>('aba.cmpRows') || []
  const faqs = tr<{ q: string; a: string }[]>('aba.faqs') || []
  const f1Checks = tr<string[]>('aba.f1Checks') || []
  const f2Checks = tr<string[]>('aba.f2Checks') || []
  const statsLabels = tr<string[]>('aba.statsLabels') || []

  return (
    <>
      <SiteNav />

      {/* HERO */}
      <header className="vt-hero vt-hero-light vt-rel">
        <div className="vt-hero-grid" />
        <div className="vt-blob" style={{ width: 460, height: 460, top: '-14%', left: '-6%', background: 'rgba(37,99,235,.16)' }} />
        <div className="vt-blob" style={{ width: 360, height: 360, bottom: '-16%', right: '-4%', background: 'rgba(22,166,255,.14)', animationDelay: '5s' }} />
        <div className="vt-arc" data-parallax="0.16" style={{ width: 260, height: 260, top: '14%', right: '6%', borderWidth: 2, borderColor: 'rgba(29,78,216,.16)' }} />
        <div className="vt-hero-inner vt-hero-split">
          <div>
            <span className="vt-eyebrow"><Brain size={13} /> {t('aba.eyebrow')}</span>
            <h1 className="vt-h1">{t('aba.h1a')}<span className="vt-grad-ink">{t('aba.h1grad')}</span>{t('aba.h1b')}</h1>
            <p className="vt-lead">{t('aba.lead1')}</p>
            <div className="vt-hero-btns">
              <a href={WA_URL} className="vt-btn vt-btn-primary" target="_blank" rel="noopener noreferrer"><Phone size={16} /> {t('common.agendaDemo')}</a>
              <a href="#consulta" className="vt-btn vt-btn-ghost">{t('common.solicitarDemo')} <ArrowRight size={16} /></a>
            </div>
            <p style={{ marginTop: 18, fontSize: 13.5, color: 'var(--muted-2)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Check size={15} color="#1D4ED8" /> {t('aba.micro')}
            </p>
          </div>
          <Reveal delay={0.1}>
            <Figure src="/images/vanty-aba/dashboard.svg" alt="Dashboard de Vanty ABA" caption="Dashboard de Vanty ABA" frameless blob="radial-gradient(circle at 45% 40%, rgba(96,165,250,.35), rgba(22,166,255,.18))" badge={<><Bot size={15} color="#1D4ED8" /> ARIA · IA</>} />
          </Reveal>
        </div>
      </header>

      {/* LOGOS + USO REAL */}
      <section className="vt-section" style={{ paddingTop: 52, paddingBottom: 0 }}>
        <div className="vt-inner">
          <p className="vt-logos-label">{t('aba.logos')}</p>
          <Reveal className="vt-logos">
            <span className="vt-logo-chip"><img src="/images/clientes/santi.png" alt="SANTI" /> Neuropsicología y Terapias SANTI</span>
            <span className="vt-logo-chip"><img src="/images/aprendo.png" alt="Jugando Aprendo" /> Jugando Aprendo</span>
            <span className="vt-logo-ghost">{t('aba.tuCentro')}</span>
          </Reveal>

          {/* Banda de métricas clínicas — números que cuentan al hacer scroll */}
          <Reveal>
            <div className="vt-statband vt-sb3" style={{ marginTop: 44 }}>
              <div className="vt-stat-cell2">
                <div className="vt-stat-big"><CountUp to={4} /></div>
                <div className="vt-stat-cap">{statsLabels[0]}</div>
              </div>
              <div className="vt-stat-cell2">
                <div className="vt-stat-big"><CountUp to={24} suffix="h" /></div>
                <div className="vt-stat-cap">{statsLabels[1]}</div>
              </div>
              <div className="vt-stat-cell2">
                <div className="vt-stat-big"><CountUp to={100} suffix="%" /></div>
                <div className="vt-stat-cap">{statsLabels[2]}</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HUB DE IA */}
      <div style={{ background: '#ffffff' }}><Wave variant={2} fill="#eef6ff" /></div>
      <section className="vt-section vt-rel" id="aria" style={{ background: '#eef6ff' }}>
        <div className="vt-arc" style={{ width: 320, height: 320, top: '-10%', right: '-6%', borderWidth: 1.5, borderColor: 'rgba(22,166,255,.16)' }} />
        <div className="vt-inner">
          <Reveal className="vt-head-center">
            <span className="vt-eyebrow"><Sparkles size={13} /> {t('aba.hubEyebrow')}</span>
            <h2 className="vt-h2" style={{ marginTop: 16 }}>{t('aba.hubTitle')}</h2>
            <p className="vt-lead">{t('aba.hubLead')}</p>
          </Reveal>
          <div className="vt-agents">
            {agents.map((a, i) => {
              const Icon = AGENT_ICONS[i % AGENT_ICONS.length]
              const c = AGENT_COLORS[i % AGENT_COLORS.length]
              return (
                <Reveal key={a.n} delay={(i % 4) * 0.06} className="vt-open" as="div">
                  <span className="vt-ico-round" style={{ background: c.bg, color: c.fg }}><Icon size={26} /></span>
                  <h3 className="vt-h3" style={{ fontSize: 17 }}>{a.n}</h3>
                  <p className="vt-card-desc">{a.d}</p>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>
      <div style={{ background: '#eef6ff' }}><Wave flip fill="#ffffff" /></div>

      {/* EXPLORA CADA FUNCIÓN → páginas dedicadas */}
      <section className="vt-section">
        <div className="vt-inner">
          <Reveal className="vt-head-center">
            <h2 className="vt-h2">{t('feat.gridTitle')}</h2>
            <p className="vt-lead">{t('feat.gridLead')}</p>
          </Reveal>
          <div className="vt-grid-3">
            {FEATURES.map((f, i) => {
              const Icon = FEAT_ICONS[f.icon]
              return (
                <Reveal key={f.slug} delay={(i % 3) * 0.06}>
                  <a href={`/vanty-aba/${f.slug}`} className="vt-card" style={{ height: '100%' }}>
                    <span className="vt-ico" style={{ background: f.accent }}><Icon size={22} /></span>
                    <h3 className="vt-h3" style={{ fontSize: 18 }}>{t(`feat.items.${f.slug}.name`)}</h3>
                    <p className="vt-card-desc">{t(`feat.items.${f.slug}.short`)}</p>
                    <span className="vt-link">{t('feat.conocer')} <ArrowRight size={15} /></span>
                  </a>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* RESPALDO CLÍNICO */}
      <section className="vt-section vt-rel" id="respaldo">
        <div className="vt-inner" style={{ position: 'relative', zIndex: 1 }}>
          <Reveal>
            <div style={{ textAlign: 'center', maxWidth: 980, margin: '0 auto' }}>
              <span className="vt-eyebrow"><ShieldCheck size={13} /> {t('aba.respEyebrow')}</span>
              <h2 className="vt-h2" style={{ marginTop: 16, fontSize: 'clamp(30px,4.4vw,52px)' }}>{t('aba.respTitle')}</h2>
              <p className="vt-lead" style={{ marginTop: 14, maxWidth: 720, marginLeft: 'auto', marginRight: 'auto' }}>{t('aba.respLead')}</p>
            </div>
          </Reveal>

          <div className="vt-respaldo-grid" style={{ marginTop: 'clamp(40px,6vw,64px)' }}>
            <Reveal>
              <div className="vt-cutout">
                <img src="/images/equipo/francesca.png" alt="Francesca Ramírez Bontá" />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <span className="vt-badge-pill" style={{ color: '#1D4ED8', background: '#eff6ff' }}>{t('aba.fRole')}</span>
              <h3 className="vt-h3" style={{ fontSize: 26 }}>{t('aba.fName')}</h3>
              <p className="vt-card-desc" style={{ fontSize: 15, marginTop: 10 }}>{t('aba.fBio')}</p>
              <blockquote className="vt-blockquote">{t('aba.fQuote')}</blockquote>
            </Reveal>
          </div>

          <Reveal>
            <div className="vt-credential">
              <Avatar src="/images/equipo/andrew.png" alt="Andrew Martinez Albitres" />
              <div>
                <h4>{t('aba.aTitle')}</h4>
                <p>
                  {t('aba.aBio1')}
                  <strong style={{ color: 'var(--ink)' }}>{t('aba.aName')}</strong>, {t('aba.aRole')}. {t('aba.aBio2')}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ROLES */}
      <section className="vt-section soft" id="roles">
        <div className="vt-inner">
          <Reveal className="vt-head-center">
            <span className="vt-eyebrow"><Users size={13} /> {t('aba.rolesEyebrow')}</span>
            <h2 className="vt-h2" style={{ marginTop: 16 }}>{t('aba.rolesTitle')}</h2>
          </Reveal>
          <div className="vt-grid-4">
            {roles.map((r, i) => {
              const Icon = ROLE_META[i % ROLE_META.length].icon
              const accent = ROLE_META[i % ROLE_META.length].accent
              return (
                <Reveal key={r.n} delay={i * 0.07}>
                  <div className="vt-card" style={{ height: '100%' }}>
                    <span className="vt-ico" style={{ background: accent }}><Icon size={22} /></span>
                    <h3 className="vt-h3" style={{ fontSize: 17 }}>{r.n}</h3>
                    <ul className="vt-checks" style={{ marginTop: 12 }}>
                      {r.items.map(it => <li key={it} style={{ fontSize: 13.5 }}><Check size={16} /> {it}</li>)}
                    </ul>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* FEATURE ROWS */}
      <section className="vt-section" id="diferencial">
        <div className="vt-inner">
          <div className="vt-feature">
            <Reveal className="vt-feature-text">
              <span className="vt-eyebrow"><BarChart3 size={13} /> {t('aba.f1Eyebrow')}</span>
              <h2 className="vt-h2" style={{ marginTop: 16 }}>{t('aba.f1Title')}</h2>
              <p className="vt-lead" style={{ marginTop: 14 }}>{t('aba.f1Lead')}</p>
              <ul className="vt-checks" style={{ marginTop: 18 }}>
                {f1Checks.map(c => <li key={c}><Check size={18} /> {c}</li>)}
              </ul>
            </Reveal>
            <Reveal className="vt-feature-media" delay={0.1}>
              <Figure src="/images/vanty-aba/graficas.svg" alt="Gráficas clínicas ABA" caption={t('aba.f1Title')} frameless blob="radial-gradient(circle at 55% 40%, #cfe0fb, #e7defb)" badge={<><BarChart3 size={15} color="#1D4ED8" /> {t('aba.f1Eyebrow')}</>} />
            </Reveal>
          </div>

          <div className="vt-feature reverse">
            <Reveal className="vt-feature-text">
              <span className="vt-eyebrow"><HeartHandshake size={13} /> {t('aba.f2Eyebrow')}</span>
              <h2 className="vt-h2" style={{ marginTop: 16 }}>{t('aba.f2Title')}</h2>
              <p className="vt-lead" style={{ marginTop: 14 }}>{t('aba.f2Lead')}</p>
              <ul className="vt-checks" style={{ marginTop: 18 }}>
                {f2Checks.map(c => <li key={c}><Check size={18} /> {c}</li>)}
              </ul>
            </Reveal>
            <Reveal className="vt-feature-media" delay={0.1}>
              <Figure src="/images/vanty-aba/portal-familiar.svg" alt="Portal familiar de Vanty ABA" caption={t('aba.f2Title')} frameless blob="radial-gradient(circle at 50% 40%, #fde6ef, #cfe0fb)" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* COMPARACIÓN */}
      <section className="vt-section soft">
        <div className="vt-inner">
          <Reveal className="vt-head-center">
            <span className="vt-eyebrow"><Star size={13} /> {t('aba.cmpEyebrow')}</span>
            <h2 className="vt-h2" style={{ marginTop: 16 }}>{t('aba.cmpTitle')}</h2>
            <p className="vt-lead">{t('aba.cmpLead')}</p>
          </Reveal>
          <Reveal className="vt-cmp-wrap">
            <table className="vt-cmp">
              <thead>
                <tr>{cmpHead.map((h, i) => <th key={i}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {cmpRows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => <td key={j} className={j > 0 ? cellClass(cell) : ''}>{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIO */}
      <section className="vt-section">
        <div className="vt-inner">
          <Reveal className="vt-quote">
            <div className="vt-quote-mark">“</div>
            <p className="vt-quote-text">{t('aba.testimQuote')}</p>
            <div className="vt-quote-who">
              <img className="vt-quote-av" src="/images/Testimonial.png" alt="Ana M." />
              <div style={{ textAlign: 'left' }}>
                <div className="vt-quote-name">Ana M.</div>
                <div className="vt-quote-role">{t('aba.testimRole')}</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FRANJA DE CONFIANZA / CUMPLIMIENTO */}
      <section className="vt-section" style={{ paddingTop: 0 }}>
        <div className="vt-inner">
          <Reveal>
            <div className="vt-trustbar">
              {[Lock, ShieldCheck, Users, Headset].map((Ic, i) => (
                <span key={i} className="vt-trustbar-item">
                  <span className="vt-trustbar-ic"><Ic size={18} /></span>
                  {(tr<string[]>('aba.trust') || [])[i]}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRECIOS — oculto temporalmente (aún no se usa). Para reactivar: descomentar. */}
      {/* <PricingABA /> */}

      {/* FORMULARIO DE CONSULTA → WhatsApp */}
      <ConsultForm />

      {/* FAQ */}
      <section className="vt-section" id="faq">
        <div className="vt-inner">
          <Reveal className="vt-head-center">
            <span className="vt-eyebrow"><MessageSquare size={13} /> {t('aba.faqEyebrow')}</span>
            <h2 className="vt-h2" style={{ marginTop: 16 }}>{t('aba.faqTitle')}</h2>
          </Reveal>
          <FaqList items={faqs} />
        </div>
      </section>

      {/* CTA */}
      <div style={{ background: '#ffffff' }}><Wave variant={2} fill="#0c1838" /></div>
      <section className="vt-cta" style={{ paddingTop: 40 }}>
        <div className="vt-cta-dots" />
        <div className="vt-cta-inner">
          <h2 className="vt-h2">{t('aba.ctaTitle')}</h2>
          <p className="vt-cta-sub">{t('aba.ctaSub')}</p>
          <div className="vt-cta-btns">
            <a href={WA_URL} className="vt-btn vt-btn-light" target="_blank" rel="noopener noreferrer"><Phone size={16} /> {t('common.agendaDemo')}</a>
            <a href={`mailto:${EMAIL}`} className="vt-btn vt-btn-ghost-dark">{EMAIL}</a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  )
}
