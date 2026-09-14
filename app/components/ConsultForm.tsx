'use client'

import { useState } from 'react'
import { Send, CalendarCheck, Check, MessageCircle } from 'lucide-react'
import { useT } from '@/app/components/LangProvider'
import { waLink } from '@/app/lib/site'

export default function ConsultForm() {
  const { t, tr } = useT()
  const roleOpts = tr<string[]>('aba.form.roleOpts') || []
  const benefits = tr<string[]>('aba.form.benefits') || []
  const [sending, setSending] = useState(false)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = e.currentTarget
    const v = (n: string) => (f.elements.namedItem(n) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)?.value?.trim() || ''
    const L = (k: string) => t(`aba.form.${k}`)
    const lines = [
      t('aba.form.waIntro'),
      '',
      `${L('first')}: ${v('first')} ${v('last')}`,
      `${L('email')}: ${v('email')}`,
      `${L('phone')}: ${v('phone')}`,
      `${L('org')}: ${v('org')}`,
      `${L('role')}: ${v('role')}`,
      `${L('country')}: ${v('country')}`,
    ]
    if (v('msg')) lines.push(`${L('msg')}: ${v('msg')}`)
    setSending(true)
    window.open(waLink(lines.join('\n')), '_blank', 'noopener,noreferrer')
    setTimeout(() => setSending(false), 1500)
  }

  return (
    <section className="vt-section vt-rel" id="consulta">
      <div className="vt-inner">
        <div className="vt-consult">
          <div className="vt-consult-split">
            {/* Columna izquierda: propuesta + beneficios */}
            <div className="vt-consult-left">
              <span className="vt-eyebrow on-dark"><CalendarCheck size={13} /> {t('aba.form.eyebrow')}</span>
              <h2 className="vt-h2" style={{ color: '#fff', marginTop: 16 }}>{t('aba.form.title')}</h2>
              <p className="vt-lead" style={{ color: 'rgba(255,255,255,.74)', marginTop: 12 }}>{t('aba.form.lead')}</p>
              <ul className="vt-consult-benefits">
                {benefits.map(b => (
                  <li key={b}><span className="vt-consult-check"><Check size={14} strokeWidth={3} /></span>{b}</li>
                ))}
              </ul>
              <div className="vt-consult-wa"><MessageCircle size={16} /> +51 994 196 916</div>
            </div>

            {/* Columna derecha: formulario */}
            <form className="vt-consult-card" onSubmit={onSubmit}>
              <div className="vt-form-grid">
                <label className="vt-field">
                  <span>{t('aba.form.first')} *</span>
                  <input name="first" required autoComplete="given-name" />
                </label>
                <label className="vt-field">
                  <span>{t('aba.form.last')} *</span>
                  <input name="last" required autoComplete="family-name" />
                </label>
                <label className="vt-field vt-field-full">
                  <span>{t('aba.form.email')} *</span>
                  <input name="email" type="email" required autoComplete="email" />
                </label>
                <label className="vt-field">
                  <span>{t('aba.form.phone')} *</span>
                  <input name="phone" type="tel" required autoComplete="tel" />
                </label>
                <label className="vt-field">
                  <span>{t('aba.form.country')} *</span>
                  <input name="country" required autoComplete="country-name" />
                </label>
                <label className="vt-field vt-field-full">
                  <span>{t('aba.form.org')} *</span>
                  <input name="org" required autoComplete="organization" />
                </label>
                <label className="vt-field vt-field-full">
                  <span>{t('aba.form.role')} *</span>
                  <select name="role" required defaultValue="">
                    <option value="" disabled>{t('aba.form.rolePh')}</option>
                    {roleOpts.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </label>
                <label className="vt-field vt-field-full">
                  <span>{t('aba.form.msg')}</span>
                  <textarea name="msg" rows={2} />
                </label>
              </div>

              <button type="submit" className="vt-btn vt-btn-primary vt-consult-submit" disabled={sending}>
                <Send size={16} /> {sending ? t('aba.form.sending') : t('aba.form.submit')}
              </button>
              <p className="vt-consult-note">{t('aba.form.note')}</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
