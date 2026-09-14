'use client'

import { useEffect, useState } from 'react'
import { Check, CreditCard, Phone } from 'lucide-react'
import { PLANS, REGIONS, countryToRegion, regionFromLanguage, type RegionKey, type Plan } from '@/app/lib/pricing'
import { waLink } from '@/app/lib/site'
import { useT } from '@/app/components/LangProvider'

export default function PricingABA() {
  const { t, tr } = useT()
  const [region, setRegion] = useState<RegionKey>('sudamerica')
  const [billing, setBilling] = useState<'m' | 'y'>('m')
  const [group, setGroup] = useState<'Personal' | 'Vanty Empresa'>('Personal')

  useEffect(() => {
    let cancelled = false
    fetch('/api/geo')
      .then(r => r.json())
      .then(d => { if (!cancelled) setRegion(countryToRegion(d?.country)) })
      .catch(() => { if (!cancelled) setRegion(regionFromLanguage(navigator.language)) })
    return () => { cancelled = true }
  }, [])

  const R = REGIONS[region]
  const fmt = (n: number) => (R.cur === '€' ? n.toLocaleString('de-DE') : n.toLocaleString('en-US'))

  const card = (p: Plan) => {
    const price = billing === 'm' ? p.m[region] : p.y[region]
    const pacientes = t(`pricing.plans.${p.id}.pacientes`)
    const desc = t(`pricing.plans.${p.id}.desc`)
    const feats = tr<string[]>(`pricing.plans.${p.id}.feats`) || p.features
    const href = waLink(
      (price === null ? t('pricing.waQuote') : t('pricing.waPlan')).replace('{p}', p.name)
    )
    return (
      <div key={p.id} className={`vt-price${p.featured ? ' feat' : ''}`}>
        {p.featured && <span className="vt-price-badge">{t('pricing.masElegido')}</span>}
        <div className="vt-price-name" style={{ textTransform: 'none', fontSize: 19, color: 'var(--ink)', letterSpacing: '-.01em' }}>{p.name}</div>
        <div style={{ fontSize: 12.5, color: 'var(--muted)', marginBottom: 8 }}>{pacientes}</div>
        {price === null ? (
          <div className="vt-price-amt"><span className="vt-price-num" style={{ fontSize: 36 }}>{t('pricing.consultar')}</span></div>
        ) : (
          <>
            <div className="vt-price-amt">
              <span className="vt-price-cur">{R.cur}</span>
              <span className="vt-price-num" style={{ fontSize: 42 }}>{fmt(price)}</span>
              <span className="vt-price-per">{billing === 'm' ? t('pricing.perMes') : t('pricing.perAno')}</span>
            </div>
            {billing === 'y' && <span className="vt-price-save">{t('pricing.mesGratis')}</span>}
          </>
        )}
        <p className="vt-price-desc" style={{ marginTop: 12 }}>{desc}</p>
        <ul className="vt-checks">
          {feats.map(f => <li key={f} style={{ fontSize: 13 }}><Check size={15} /> {f}</li>)}
        </ul>
        <a href={href} target="_blank" rel="noopener noreferrer" className={`vt-btn ${p.featured ? 'vt-btn-primary' : 'vt-btn-ghost'}`} style={{ marginTop: 20, width: '100%', justifyContent: 'center' }}>
          {price === null ? t('common.hablarVentas') : t('common.empezar')}
        </a>
      </div>
    )
  }

  const plans = PLANS.filter(p => p.group === group)
  const isPersonal = group === 'Personal'

  return (
    <section className="vt-section soft" id="precios">
      <div className="vt-inner">
        <div className="vt-head-center">
          <span className="vt-eyebrow"><CreditCard size={13} /> {t('pricing.eyebrow')}</span>
          <h2 className="vt-h2" style={{ marginTop: 16 }}>{t('pricing.title')}</h2>
          <p className="vt-lead">{t('pricing.lead1')}<strong style={{ color: 'var(--ink)' }}>{t('pricing.leadStrong')}</strong>{t('pricing.lead2')}</p>
        </div>

        {/* Selectores: Personal/Empresa + Mensual/Anual */}
        <div className="vt-pricebar">
          <div className="vt-bill-toggle" role="group" aria-label="Tipo de plan">
            <button className={isPersonal ? 'on' : ''} onClick={() => setGroup('Personal')}>{t('pricing.personal')}</button>
            <button className={!isPersonal ? 'on' : ''} onClick={() => setGroup('Vanty Empresa')}>{t('pricing.empresa')}</button>
          </div>
          <div className="vt-bill-toggle" role="group" aria-label="Facturación">
            <button className={billing === 'm' ? 'on' : ''} onClick={() => setBilling('m')}>{t('pricing.mensual')}</button>
            <button className={billing === 'y' ? 'on' : ''} onClick={() => setBilling('y')}>{t('pricing.anual')}</button>
          </div>
        </div>

        <div className={isPersonal ? 'vt-plans-3' : 'vt-plans-2'} style={{ marginTop: 36, ...(isPersonal ? {} : { marginLeft: 'auto', marginRight: 'auto' }) }}>
          {plans.map(card)}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginTop: 32 }}>
          <a href={waLink(t('pricing.waDemo'))} target="_blank" rel="noopener noreferrer" className="vt-btn vt-btn-primary">
            <Phone size={16} /> {t('common.solicitarDemo')}
          </a>
          <a href={waLink(t('pricing.waDudas'))} target="_blank" rel="noopener noreferrer" className="vt-btn vt-btn-ghost">
            {t('common.tengoDudas')}
          </a>
        </div>

        <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--muted-2)', marginTop: 24 }}>{t('pricing.activacion')}</p>
      </div>
    </section>
  )
}
