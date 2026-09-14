'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ChevronDown, ChevronRight, Menu, X, Phone, ArrowRight, Globe } from 'lucide-react'
import { NAV_LINKS, SERVICES, WA_URL } from '@/app/lib/site'
import { LANGS } from '@/app/lib/dict'
import { useT } from '@/app/components/LangProvider'
import ServiceIcon from '@/app/components/ServiceIcon'
import Logo from '@/app/components/Logo'

const KEY: Record<string, string> = {
  '/': 'nav.inicio', '/servicios': 'nav.servicios', '/nosotros': 'nav.nosotros',
  '/como-trabajamos': 'nav.como', '/contacto': 'nav.contacto',
}

export default function SiteNav() {
  const pathname = usePathname()
  const { t, lang, setLang } = useT()
  const [scrolled, setScrolled] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSvc, setMobileSvc] = useState(false)
  const [langOpen, setLangOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setMobileOpen(false); setMegaOpen(false); setLangOpen(false) }, [pathname])

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))
  const cur = LANGS.find(l => l.code === lang) || LANGS[0]

  const LangSwitch = ({ block = false }: { block?: boolean }) => (
    <div className="vt-lang" style={block ? { width: '100%' } : undefined}>
      <button className="vt-lang-btn" onClick={() => setLangOpen(o => !o)} aria-label="Idioma" style={block ? { width: '100%', justifyContent: 'center' } : undefined}>
        <Globe size={15} /> {cur.flag} <span style={{ fontWeight: 700 }}>{cur.code.toUpperCase()}</span> <ChevronDown size={12} />
      </button>
      {langOpen && (
        <div className="vt-lang-menu" style={block ? { position: 'static', marginTop: 8, boxShadow: 'none', border: '1px solid var(--line)' } : undefined}>
          {LANGS.map(l => (
            <button key={l.code} className={l.code === lang ? 'on' : ''} onClick={() => { setLang(l.code); setLangOpen(false) }}>
              <span>{l.flag}</span> {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <nav className={`vt-nav${scrolled ? ' scrolled' : ''}`}>
      <div className="vt-nav-row">
        <a href="/" className="vt-logo">
          <Logo height={38} />
          <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span className="vt-logo-name">VANTY</span>
            <span className="vt-logo-sub">software &amp; inteligencia artificial</span>
          </span>
        </a>

        <ul className="vt-nav-links">
          {NAV_LINKS.map(link => (
            'dropdown' in link && link.dropdown ? (
              <li
                key={link.href}
                className={`vt-nav-item${megaOpen ? ' open' : ''}`}
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
              >
                <a
                  href={link.href}
                  className={`vt-nav-link${isActive(link.href) ? ' active' : ''}`}
                  onClick={e => { if (!megaOpen) { e.preventDefault(); setMegaOpen(true) } }}
                >
                  {t(KEY[link.href])} <ChevronDown size={15} className="chev" />
                </a>

                <div className="vt-mega" role="menu">
                  <div className="vt-mega-grid">
                    {SERVICES.map(s => {
                      const k = s.slug === 'vanty-aba' ? 'aba' : 'school'
                      const inner = (
                        <>
                          <ServiceIcon iconKey={s.icon} logo={s.logo} accent={s.accent} variant="mega" />
                          <span>
                            <span className="vt-mega-name">
                              {s.name}
                              {s.slug === 'vanty-aba' && <span className="vt-mega-star">{t('nav.estrella')}</span>}
                              {s.soon && <span className="vt-mega-star" style={{ background: '#eef1f6', color: '#7b8499' }}>{t('nav.proximamente')}</span>}
                            </span>
                            <span className="vt-mega-tag">{t(`svc.${k}.tagline`)}</span>
                          </span>
                        </>
                      )
                      return s.soon
                        ? <div key={s.slug} className="vt-mega-card" style={{ opacity: .7, filter: 'grayscale(.5)', cursor: 'default' }}>{inner}</div>
                        : <a key={s.slug} href={s.href} className="vt-mega-card">{inner}</a>
                    })}
                    <a href="/contacto" className="vt-mega-card">
                      <span className="vt-mega-ico" style={{ background: 'linear-gradient(135deg,#1D4ED8,#16a6ff)' }}><ArrowRight size={20} /></span>
                      <span>
                        <span className="vt-mega-name">{t('nav.noSabes')}</span>
                        <span className="vt-mega-tag">{t('nav.noSabesDesc')}</span>
                      </span>
                    </a>
                  </div>
                  <div className="vt-mega-foot">
                    <span style={{ fontSize: 12.5, color: 'var(--muted)' }}>{t('nav.megaFoot')}</span>
                    <a href="/servicios">{t('nav.verTodos')} <ArrowRight size={14} /></a>
                  </div>
                </div>
              </li>
            ) : (
              <li key={link.href}>
                <a href={link.href} className={`vt-nav-link${isActive(link.href) ? ' active' : ''}`}>{t(KEY[link.href])}</a>
              </li>
            )
          ))}
        </ul>

        <div className="vt-nav-right">
          <LangSwitch />
          <a href={WA_URL} className="vt-btn vt-btn-primary vt-btn-sm" target="_blank" rel="noopener noreferrer"><Phone size={15} /> {t('nav.hablemos')}</a>
          <button className="vt-burger" onClick={() => setMobileOpen(o => !o)} aria-label="Menú">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="vt-mobile">
          <a href="/">{t('nav.inicio')}</a>
          <button onClick={() => setMobileSvc(s => !s)}>
            {t('nav.servicios')} <ChevronDown size={17} style={{ transform: mobileSvc ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }} />
          </button>
          {mobileSvc && (
            <div className="vt-mobile-sub">
              {SERVICES.map(s => <a key={s.slug} href={s.href}>{s.name} <ChevronRight size={15} /></a>)}
              <a href="/servicios">{t('nav.verTodos')} <ChevronRight size={15} /></a>
            </div>
          )}
          <a href="/nosotros">{t('nav.nosotros')}</a>
          <a href="/como-trabajamos">{t('nav.como')}</a>
          <a href="/contacto">{t('nav.contacto')}</a>
          <div style={{ padding: '12px 0' }}><LangSwitch block /></div>
          <div className="vt-mobile-cta">
            <a href={WA_URL} className="vt-btn vt-btn-primary" target="_blank" rel="noopener noreferrer"><Phone size={15} /> {t('nav.hablemos')}</a>
          </div>
        </div>
      )}
    </nav>
  )
}
