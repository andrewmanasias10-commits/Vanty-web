'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const [mode, setMode]         = useState<'login'|'reset'>('login')
  const [resetSent, setResetSent] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(
        error.message.includes('Invalid login')
          ? 'Email o contraseña incorrectos.'
          : error.message
      )
      setLoading(false)
    } else {
      window.location.href = '/admin'
    }
  }

  async function handleReset(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setResetSent(true)
      setLoading(false)
    }
  }

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        body { font-family:'Inter',sans-serif; background:#f0fdf4; min-height:100vh; display:flex; align-items:center; justify-content:center; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)} }
        .login-wrap { animation:fadeUp .5s both; }
      `}</style>

      <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'24px',background:'linear-gradient(135deg,#f0fdf4 0%,#dcfce7 50%,#f0fdf4 100%)'}}>

        {/* Logo */}
        <a href="/" style={{display:'flex',alignItems:'center',gap:'10px',textDecoration:'none',marginBottom:'32px'}}>
          <img src="/images/logo.png" alt="Vanty" style={{height:'44px',width:'auto'}}/>
          <div style={{display:'flex',flexDirection:'column',lineHeight:1.15}}>
            <span style={{fontFamily:'Poppins,sans-serif',fontWeight:800,fontSize:'20px',color:'#111',letterSpacing:'-0.02em'}}>VANTY</span>
            <span style={{fontFamily:'Inter,sans-serif',fontWeight:400,fontSize:'10px',color:'#6b7280'}}>evolución terapéutica inteligente</span>
          </div>
        </a>

        {/* Card */}
        <div className="login-wrap" style={{background:'#fff',borderRadius:'24px',padding:'40px',width:'100%',maxWidth:'420px',boxShadow:'0 20px 60px rgba(0,0,0,.08)',border:'1px solid #e5e7eb'}}>

          {mode === 'login' ? (
            <>
              <h1 style={{fontFamily:'Poppins,sans-serif',fontSize:'24px',fontWeight:800,color:'#111',marginBottom:'6px',letterSpacing:'-.02em'}}>
                Bienvenido de vuelta
              </h1>
              <p style={{fontSize:'14px',color:'#6b7280',marginBottom:'28px'}}>
                Ingresa a tu cuenta Vanty
              </p>

              <form onSubmit={handleLogin} style={{display:'flex',flexDirection:'column',gap:'16px'}}>
                {/* Email */}
                <div>
                  <label style={{display:'block',fontSize:'13px',fontWeight:600,color:'#374151',marginBottom:'6px'}}>
                    Correo electrónico
                  </label>
                  <div style={{position:'relative'}}>
                    <div style={{position:'absolute',left:'14px',top:'50%',transform:'translateY(-50%)',color:'#9ca3af',display:'flex'}}>
                      <Mail size={16}/>
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={e=>setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      required
                      style={{
                        width:'100%',padding:'12px 14px 12px 40px',
                        border:'1.5px solid #d1d5db',borderRadius:'10px',
                        fontSize:'14px',color:'#111',outline:'none',
                        transition:'border-color .2s',fontFamily:'Inter,sans-serif',
                      }}
                      onFocus={e=>e.target.style.borderColor='#1D6F42'}
                      onBlur={e=>e.target.style.borderColor='#d1d5db'}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'6px'}}>
                    <label style={{fontSize:'13px',fontWeight:600,color:'#374151'}}>
                      Contraseña
                    </label>
                    <button
                      type="button"
                      onClick={()=>setMode('reset')}
                      style={{fontSize:'12px',color:'#1D6F42',fontWeight:600,background:'none',border:'none',cursor:'pointer',padding:0}}
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>
                  <div style={{position:'relative'}}>
                    <div style={{position:'absolute',left:'14px',top:'50%',transform:'translateY(-50%)',color:'#9ca3af',display:'flex'}}>
                      <Lock size={16}/>
                    </div>
                    <input
                      type={showPass?'text':'password'}
                      value={password}
                      onChange={e=>setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      style={{
                        width:'100%',padding:'12px 44px 12px 40px',
                        border:'1.5px solid #d1d5db',borderRadius:'10px',
                        fontSize:'14px',color:'#111',outline:'none',
                        transition:'border-color .2s',fontFamily:'Inter,sans-serif',
                      }}
                      onFocus={e=>e.target.style.borderColor='#1D6F42'}
                      onBlur={e=>e.target.style.borderColor='#d1d5db'}
                    />
                    <button
                      type="button"
                      onClick={()=>setShowPass(p=>!p)}
                      style={{position:'absolute',right:'14px',top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:'#9ca3af',display:'flex'}}
                    >
                      {showPass?<EyeOff size={16}/>:<Eye size={16}/>}
                    </button>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div style={{display:'flex',alignItems:'center',gap:'8px',padding:'12px 14px',background:'#fef2f2',border:'1px solid #fecaca',borderRadius:'10px',fontSize:'13px',color:'#dc2626'}}>
                    <AlertCircle size={15} style={{flexShrink:0}}/>
                    {error}
                  </div>
                )}

                {/* Botón */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width:'100%',padding:'14px',
                    background: loading ? '#9ca3af' : '#111',
                    color:'#fff',border:'none',borderRadius:'10px',
                    fontFamily:'Poppins,sans-serif',fontSize:'15px',fontWeight:700,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',
                    transition:'background .2s',marginTop:'4px',
                  }}
                >
                  {loading ? 'Ingresando...' : <><span>Ingresar</span><ArrowRight size={16}/></>}
                </button>
              </form>
            </>
          ) : (
            <>
              {/* Reset password */}
              <button
                onClick={()=>{setMode('login');setResetSent(false);setError('')}}
                style={{display:'flex',alignItems:'center',gap:'6px',fontSize:'13px',color:'#6b7280',background:'none',border:'none',cursor:'pointer',marginBottom:'20px',padding:0,fontWeight:500}}
              >
                ← Volver al login
              </button>

              {resetSent ? (
                <div style={{textAlign:'center',padding:'20px 0'}}>
                  <div style={{fontSize:'48px',marginBottom:'16px'}}>📧</div>
                  <h2 style={{fontFamily:'Poppins,sans-serif',fontSize:'20px',fontWeight:800,color:'#111',marginBottom:'8px'}}>
                    Revisa tu correo
                  </h2>
                  <p style={{fontSize:'14px',color:'#6b7280',lineHeight:1.6}}>
                    Enviamos un enlace de recuperación a <strong>{email}</strong>. Revisa también tu carpeta de spam.
                  </p>
                </div>
              ) : (
                <>
                  <h1 style={{fontFamily:'Poppins,sans-serif',fontSize:'22px',fontWeight:800,color:'#111',marginBottom:'6px'}}>
                    Recuperar contraseña
                  </h1>
                  <p style={{fontSize:'14px',color:'#6b7280',marginBottom:'28px'}}>
                    Ingresa tu email y te enviamos un enlace para restablecer tu contraseña.
                  </p>

                  <form onSubmit={handleReset} style={{display:'flex',flexDirection:'column',gap:'16px'}}>
                    <div>
                      <label style={{display:'block',fontSize:'13px',fontWeight:600,color:'#374151',marginBottom:'6px'}}>
                        Correo electrónico
                      </label>
                      <div style={{position:'relative'}}>
                        <div style={{position:'absolute',left:'14px',top:'50%',transform:'translateY(-50%)',color:'#9ca3af',display:'flex'}}>
                          <Mail size={16}/>
                        </div>
                        <input
                          type="email"
                          value={email}
                          onChange={e=>setEmail(e.target.value)}
                          placeholder="tu@email.com"
                          required
                          style={{
                            width:'100%',padding:'12px 14px 12px 40px',
                            border:'1.5px solid #d1d5db',borderRadius:'10px',
                            fontSize:'14px',color:'#111',outline:'none',
                            fontFamily:'Inter,sans-serif',
                          }}
                          onFocus={e=>e.target.style.borderColor='#1D6F42'}
                          onBlur={e=>e.target.style.borderColor='#d1d5db'}
                        />
                      </div>
                    </div>

                    {error && (
                      <div style={{display:'flex',alignItems:'center',gap:'8px',padding:'12px 14px',background:'#fef2f2',border:'1px solid #fecaca',borderRadius:'10px',fontSize:'13px',color:'#dc2626'}}>
                        <AlertCircle size={15} style={{flexShrink:0}}/>{error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        width:'100%',padding:'14px',
                        background: loading ? '#9ca3af' : '#111',
                        color:'#fff',border:'none',borderRadius:'10px',
                        fontFamily:'Poppins,sans-serif',fontSize:'15px',fontWeight:700,
                        cursor: loading ? 'not-allowed' : 'pointer',
                        display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',
                      }}
                    >
                      {loading ? 'Enviando...' : 'Enviar enlace'}
                    </button>
                  </form>
                </>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <p style={{marginTop:'24px',fontSize:'12px',color:'#9ca3af',textAlign:'center'}}>
          © 2026 Vanty · <a href="/" style={{color:'#1D6F42',textDecoration:'none',fontWeight:600}}>Volver al inicio</a>
        </p>
      </div>
    </>
  )
}
