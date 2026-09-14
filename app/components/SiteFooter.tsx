'use client'

import { Phone, Mail, Instagram, Facebook } from 'lucide-react'
import { WA_URL, EMAIL, FB_URL, IG_URL, TIKTOK_URL, SERVICES } from '@/app/lib/site'
import { useT } from '@/app/components/LangProvider'
import Logo from '@/app/components/Logo'

const TikTokIcon = ({ size = 17 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16.5 5.82a4.78 4.78 0 0 1-1.03-2.82h-3.2v12.36a2.74 2.74 0 1 1-2-2.64V7.43a5.93 5.93 0 1 0 5.2 5.88V9.01a7.9 7.9 0 0 0 4.6 1.47V7.27a4.77 4.77 0 0 1-3.57-1.45z" />
  </svg>
)

export default function SiteFooter() {
  const { t } = useT()
  return (
    <footer className="vt-footer">
      <div className="vt-footer-grid">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <Logo height={34} />
            <span className="vt-display" style={{ fontWeight: 800, fontSize: 19, color: '#fff' }}>VANTY</span>
          </div>
          <p className="vt-footer-tag">{t('footer.tagline')}</p>
          <div className="vt-socials">
            <a href={WA_URL} className="vt-soc" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><Phone size={17} /></a>
            <a href={`mailto:${EMAIL}`} className="vt-soc" aria-label="Email"><Mail size={17} /></a>
            <a href={IG_URL} className="vt-soc" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={17} /></a>
            <a href={FB_URL} className="vt-soc" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={17} /></a>
            <a href={TIKTOK_URL} className="vt-soc" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><TikTokIcon size={17} /></a>
          </div>
        </div>
        <div>
          <h4>{t('footer.servicios')}</h4>
          <ul>
            {SERVICES.map(s => <li key={s.slug}><a href={s.href}>{s.name}</a></li>)}
            <li><a href="/servicios">{t('footer.verTodos')}</a></li>
          </ul>
        </div>
        <div>
          <h4>{t('footer.empresa')}</h4>
          <ul>
            <li><a href="/nosotros">{t('footer.nosotros')}</a></li>
            <li><a href="/como-trabajamos">{t('footer.como')}</a></li>
            <li><a href="/contacto">{t('footer.contacto')}</a></li>
          </ul>
        </div>
        <div>
          <h4>{t('footer.contacto')}</h4>
          <ul>
            <li><a href={WA_URL} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
            <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
          </ul>
        </div>
      </div>
      <div className="vt-footer-bottom">
        <p>{t('footer.copy')}</p>
      </div>
    </footer>
  )
}
