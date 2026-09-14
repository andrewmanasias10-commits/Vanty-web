'use client'

import { supabase } from '@/lib/supabase'
import { useState, useEffect } from 'react'
import {
  LayoutDashboard, Users, LogOut, Brain, DollarSign,
  X, CheckCircle, XCircle, Clock, Plus, Edit2, Trash2,
  TrendingUp, AlertCircle, Calendar, Phone, Mail,
  ChevronDown, Loader2, Power, RefreshCw
} from 'lucide-react'

// ─── TYPES ───────────────────────────────────────────────────────────────────
type Centro = {
  id: string
  nombre: string
  responsable: string
  email: string
  telefono: string
  plan: 'mensual' | 'piloto'
  estado: 'activo' | 'pendiente' | 'inactivo' | 'prueba'
  notas: string
  fecha_inicio: string
  fecha_proximo_pago: string
  created_at: string
}

type Pago = {
  id: string
  centro_id: string
  centro_nombre?: string
  monto: number
  tipo: 'primer_mes' | 'mensual' | 'otro'
  metodo: 'yape' | 'plin' | 'transferencia' | 'efectivo' | 'otro'
  fecha: string
  referencia: string
  confirmado: boolean
  created_at: string
}

type View = 'dashboard' | 'centros' | 'pagos' | 'activaciones'

// ─── SIDEBAR LINK ─────────────────────────────────────────────────────────────
function SidebarLink({ icon: Icon, label, active, onClick }: { icon: any; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 text-left text-sm
        ${active
          ? 'bg-orange-500 text-white shadow-md'
          : 'text-slate-500 hover:bg-orange-50 hover:text-orange-600'
        }`}
    >
      <Icon size={18} className="flex-shrink-0" />
      <span className="font-semibold truncate">{label}</span>
    </button>
  )
}

// ─── STATUS BADGE ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; text: string; label: string }> = {
    activo:    { bg: 'bg-green-100',  text: 'text-green-700',  label: 'Activo' },
    pendiente: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Pendiente' },
    inactivo:  { bg: 'bg-red-100',    text: 'text-red-700',    label: 'Inactivo' },
    prueba:    { bg: 'bg-blue-100',   text: 'text-blue-700',   label: 'Prueba' },
  }
  const s = map[status] || map.pendiente
  return <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${s.bg} ${s.text}`}>{s.label}</span>
}

// ─── MODAL ────────────────────────────────────────────────────────────────────
function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-lg text-slate-800" style={{ fontFamily: "'Baloo 2',cursive" }}>{title}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors">
            <X size={16} className="text-slate-500" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-slate-500 mb-1.5">{label}</label>
      {children}
    </div>
  )
}

const inputClass = "w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function VantyAdmin() {
  const [loading, setLoading]           = useState(true)
  const [loggedIn, setLoggedIn]         = useState(false)
  const [loginEmail, setLoginEmail]     = useState('')
  const [loginPass, setLoginPass]       = useState('')
  const [loginError, setLoginError]     = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  const [view, setView]       = useState<View>('dashboard')
  const [centros, setCentros] = useState<Centro[]>([])
  const [pagos, setPagos]     = useState<Pago[]>([])
  const [saving, setSaving]   = useState(false)
  const [alert, setAlert]     = useState('')

  // Modals
  const [showAddCentro, setShowAddCentro]   = useState(false)
  const [showEditCentro, setShowEditCentro] = useState<Centro | null>(null)
  const [showAddPago, setShowAddPago]       = useState(false)

  // Forms
  const blankCentro = { nombre: '', responsable: '', email: '', telefono: '', plan: 'mensual' as const, estado: 'pendiente' as const, notas: '', fecha_inicio: today(), fecha_proximo_pago: nextMonth() }
  const [centroForm, setCentroForm] = useState(blankCentro)
  const blankPago = { centro_id: '', monto: 250, tipo: 'mensual' as const, metodo: 'yape' as const, fecha: today(), referencia: '', confirmado: true }
  const [pagoForm, setPagoForm] = useState(blankPago)

  function today() { return new Date().toISOString().split('T')[0] }
  function nextMonth() { const d = new Date(); d.setMonth(d.getMonth()+1); return d.toISOString().split('T')[0] }

  function showAlert(msg: string) {
    setAlert(msg)
    setTimeout(() => setAlert(''), 3500)
  }

  // ── AUTH ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setLoggedIn(!!session)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setLoggedIn(!!s))
    return () => subscription.unsubscribe()
  }, [])

  async function handleLogin() {
    setLoginLoading(true); setLoginError('')
    const { error } = await supabase.auth.signInWithPassword({ email: loginEmail, password: loginPass })
    if (error) setLoginError('Credenciales incorrectas')
    setLoginLoading(false)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
  }

  // ── FETCH DATA ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (loggedIn) { fetchCentros(); fetchPagos() }
  }, [loggedIn])

  async function fetchCentros() {
    const { data } = await supabase.from('centros').select('*').order('created_at', { ascending: false })
    if (data) setCentros(data)
  }

  async function fetchPagos() {
    const { data } = await supabase.from('pagos').select('*, centros(nombre)').order('created_at', { ascending: false })
    if (data) setPagos(data.map((p: any) => ({ ...p, centro_nombre: p.centros?.nombre })))
  }

  // ── CENTROS CRUD ───────────────────────────────────────────────────────────
  async function saveCentro() {
    setSaving(true)
    const { error } = await supabase.from('centros').insert([centroForm])
    if (!error) { showAlert('✅ Centro guardado correctamente'); setShowAddCentro(false); setCentroForm(blankCentro); fetchCentros() }
    setSaving(false)
  }

  async function updateCentro() {
    if (!showEditCentro) return
    setSaving(true)
    const { id, created_at, ...rest } = showEditCentro
    const { error } = await supabase.from('centros').update(rest).eq('id', id)
    if (!error) { showAlert('✅ Centro actualizado'); setShowEditCentro(null); fetchCentros() }
    setSaving(false)
  }

  async function deleteCentro(id: string) {
    if (!confirm('¿Eliminar este centro? No se puede deshacer.')) return
    await supabase.from('centros').delete().eq('id', id)
    fetchCentros()
  }

  async function toggleActivacion(c: Centro) {
    const newStatus = c.estado === 'activo' ? 'inactivo' : 'activo'
    await supabase.from('centros').update({ estado: newStatus }).eq('id', c.id)
    fetchCentros()
  }

  // ── PAGOS ─────────────────────────────────────────────────────────────────
  async function savePago() {
    setSaving(true)
    const { error } = await supabase.from('pagos').insert([pagoForm])
    if (!error) {
      // auto-activate center on payment
      if (pagoForm.confirmado && pagoForm.centro_id) {
        await supabase.from('centros').update({ estado: 'activo', fecha_proximo_pago: nextMonth() }).eq('id', pagoForm.centro_id)
        fetchCentros()
      }
      showAlert('✅ Pago registrado. Centro activado automáticamente.')
      setShowAddPago(false); setPagoForm(blankPago); fetchPagos()
    }
    setSaving(false)
  }

  async function confirmPago(id: string, centroId: string) {
    await supabase.from('pagos').update({ confirmado: true }).eq('id', id)
    await supabase.from('centros').update({ estado: 'activo', fecha_proximo_pago: nextMonth() }).eq('id', centroId)
    fetchPagos(); fetchCentros()
    showAlert('✅ Pago confirmado. Centro activado.')
  }

  async function deletePago(id: string) {
    if (!confirm('¿Eliminar este pago?')) return
    await supabase.from('pagos').delete().eq('id', id)
    fetchPagos()
  }

  // ── STATS ─────────────────────────────────────────────────────────────────
  const activos   = centros.filter(c => c.estado === 'activo').length
  const pendientes = centros.filter(c => c.estado === 'pendiente').length
  const totalCobrado = pagos.filter(p => p.confirmado).reduce((a, p) => a + p.monto, 0)
  const pagosPendientes = pagos.filter(p => !p.confirmado).length

  // ── LOGIN SCREEN ──────────────────────────────────────────────────────────
  if (loading) return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center">
      <Loader2 size={32} className="animate-spin text-orange-400" />
    </div>
  )

  if (!loggedIn) return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;700;800&family=Nunito:wght@400;600;700&display=swap');
        body { font-family: 'Nunito',sans-serif; }
      `}</style>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl border-2 border-orange-100 p-8 w-full max-w-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
              <Brain size={22} color="#fff" />
            </div>
            <div>
              <p style={{ fontFamily: "'Baloo 2',cursive" }} className="font-bold text-lg text-slate-800 leading-none">Vanty</p>
              <p className="text-xs text-slate-400 font-semibold">Panel de Administración</p>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Email</label>
            <input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)}
              className={inputClass} placeholder="admin@vanty.app"
              onKeyDown={e => e.key === 'Enter' && handleLogin()} />
          </div>
          <div className="mb-5">
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Contraseña</label>
            <input type="password" value={loginPass} onChange={e => setLoginPass(e.target.value)}
              className={inputClass} placeholder="••••••"
              onKeyDown={e => e.key === 'Enter' && handleLogin()} />
          </div>
          {loginError && <p className="text-red-500 text-xs mb-3">{loginError}</p>}
          <button onClick={handleLogin} disabled={loginLoading}
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold text-sm transition-all hover:shadow-lg disabled:opacity-60"
            style={{ fontFamily: "'Baloo 2',cursive" }}>
            {loginLoading ? <Loader2 size={16} className="animate-spin inline" /> : 'Ingresar al panel'}
          </button>
          <p className="text-xs text-slate-400 text-center mt-4">Acceso restringido · Solo equipo Vanty</p>
        </div>
      </div>
    </>
  )

  // ── MAIN APP ──────────────────────────────────────────────────────────────
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;700;800&family=Nunito:wght@400;600;700&display=swap');
        body { font-family: 'Nunito',sans-serif; background: #f8fafc; }
      `}</style>

      <div className="flex h-screen overflow-hidden">
        {/* SIDEBAR */}
        <aside className="w-56 bg-white border-r border-slate-100 flex flex-col py-4 px-3 flex-shrink-0 shadow-sm">
          <div className="flex items-center gap-2.5 px-2 mb-6">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0">
              <Brain size={18} color="#fff" />
            </div>
            <div>
              <p style={{ fontFamily: "'Baloo 2',cursive" }} className="font-bold text-base text-slate-800 leading-none">Vanty</p>
              <p className="text-[10px] text-slate-400 font-semibold">Admin Panel</p>
            </div>
          </div>

          <div className="flex flex-col gap-1 flex-1">
            <SidebarLink icon={LayoutDashboard} label="Dashboard"    active={view === 'dashboard'}    onClick={() => setView('dashboard')} />
            <SidebarLink icon={Users}           label="Centros"       active={view === 'centros'}       onClick={() => setView('centros')} />
            <SidebarLink icon={DollarSign}      label="Pagos"         active={view === 'pagos'}         onClick={() => setView('pagos')} />
            <SidebarLink icon={Power}           label="Activaciones"  active={view === 'activaciones'}  onClick={() => setView('activaciones')} />
          </div>

          <div className="border-t border-slate-100 pt-3 mt-3">
            <button onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all">
              <LogOut size={16} /> <span className="font-semibold">Cerrar sesión</span>
            </button>
          </div>
        </aside>

        {/* MAIN */}
        <main className="flex-1 overflow-y-auto bg-slate-50">
          {/* Alert */}
          {alert && (
            <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-3 rounded-xl shadow-lg text-sm font-semibold flex items-center gap-2">
              <CheckCircle size={16} /> {alert}
            </div>
          )}

          {/* ── DASHBOARD ── */}
          {view === 'dashboard' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 style={{ fontFamily: "'Baloo 2',cursive" }} className="text-2xl font-bold text-slate-800">Dashboard</h2>
                <span className="text-sm text-slate-400">{new Date().toLocaleDateString('es-PE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Centros activos', value: activos, sub: `de ${centros.length} totales`, color: 'from-green-500 to-emerald-500', icon: CheckCircle },
                  { label: 'Pendientes de pago', value: pendientes, sub: 'requieren atención', color: 'from-yellow-500 to-amber-500', icon: AlertCircle },
                  { label: 'Ingresos confirmados', value: `S/${totalCobrado}`, sub: 'total acumulado', color: 'from-orange-500 to-red-500', icon: TrendingUp },
                  { label: 'Pagos pendientes', value: pagosPendientes, sub: 'por confirmar', color: 'from-blue-500 to-indigo-500', icon: Clock },
                ].map((s, i) => (
                  <div key={i} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm relative overflow-hidden">
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${s.color}`} />
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{s.label}</p>
                      <s.icon size={16} className="text-slate-300" />
                    </div>
                    <p style={{ fontFamily: "'Baloo 2',cursive" }} className="text-3xl font-black text-slate-800 leading-none mb-1">{s.value}</p>
                    <p className="text-xs text-slate-400">{s.sub}</p>
                  </div>
                ))}
              </div>
              {/* Recent centers */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <h3 style={{ fontFamily: "'Baloo 2',cursive" }} className="font-bold text-slate-800">Centros registrados</h3>
                  <button onClick={() => setView('centros')} className="text-xs text-orange-500 font-bold hover:underline">Ver todos →</button>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50">
                      {['Centro','Responsable','Estado','Próx. pago'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-wide">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {centros.slice(0, 5).map(c => (
                      <tr key={c.id} className="border-t border-slate-50 hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 text-sm font-semibold text-slate-800">{c.nombre}</td>
                        <td className="px-4 py-3 text-sm text-slate-500">{c.responsable}</td>
                        <td className="px-4 py-3"><StatusBadge status={c.estado} /></td>
                        <td className="px-4 py-3 text-sm text-slate-400">{c.fecha_proximo_pago || '—'}</td>
                      </tr>
                    ))}
                    {!centros.length && (
                      <tr><td colSpan={4} className="px-4 py-8 text-center text-slate-400 text-sm">Sin centros registrados aún</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── CENTROS ── */}
          {view === 'centros' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 style={{ fontFamily: "'Baloo 2',cursive" }} className="text-2xl font-bold text-slate-800">Centros / Clientes</h2>
                <div className="flex gap-2">
                  <button onClick={fetchCentros} className="p-2 rounded-xl hover:bg-white border border-slate-200 transition-colors" title="Actualizar">
                    <RefreshCw size={16} className="text-slate-400" />
                  </button>
                  <button onClick={() => setShowAddCentro(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl text-sm font-bold transition-all hover:shadow-md"
                    style={{ fontFamily: "'Baloo 2',cursive" }}>
                    <Plus size={16} /> Agregar centro
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      {['Centro','Responsable','Email','Estado','Plan','Próx. pago','Acciones'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-wide">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {centros.map(c => (
                      <tr key={c.id} className="border-t border-slate-50 hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 text-sm font-bold text-slate-800">{c.nombre}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{c.responsable}</td>
                        <td className="px-4 py-3 text-sm"><a href={`mailto:${c.email}`} className="text-orange-500 hover:underline">{c.email}</a></td>
                        <td className="px-4 py-3"><StatusBadge status={c.estado} /></td>
                        <td className="px-4 py-3 text-sm text-slate-400">{c.plan === 'mensual' ? 'S/250/mes' : 'Piloto'}</td>
                        <td className="px-4 py-3 text-sm text-slate-400">{c.fecha_proximo_pago || '—'}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button onClick={() => setShowEditCentro(c)}
                              className="p-1.5 rounded-lg hover:bg-orange-50 text-slate-400 hover:text-orange-500 transition-colors" title="Editar">
                              <Edit2 size={14} />
                            </button>
                            <button onClick={() => deleteCentro(c.id)}
                              className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors" title="Eliminar">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {!centros.length && (
                      <tr><td colSpan={7} className="px-4 py-10 text-center text-slate-400">Sin centros. ¡Agrega el primero!</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── PAGOS ── */}
          {view === 'pagos' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 style={{ fontFamily: "'Baloo 2',cursive" }} className="text-2xl font-bold text-slate-800">Control de Pagos</h2>
                <button onClick={() => setShowAddPago(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl text-sm font-bold"
                  style={{ fontFamily: "'Baloo 2',cursive" }}>
                  <Plus size={16} /> Registrar pago
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'Total cobrado', value: `S/${totalCobrado}`, color: 'from-green-500 to-emerald-500' },
                  { label: 'Pagos registrados', value: pagos.length, color: 'from-orange-500 to-amber-500' },
                  { label: 'Por confirmar', value: pagosPendientes, color: 'from-yellow-500 to-orange-500' },
                ].map((s, i) => (
                  <div key={i} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm relative overflow-hidden">
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${s.color}`} />
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">{s.label}</p>
                    <p style={{ fontFamily: "'Baloo 2',cursive" }} className="text-3xl font-black text-slate-800">{s.value}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      {['Centro','Monto','Tipo','Fecha','Método','Estado','Acciones'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-wide">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pagos.map(p => {
                      const tipoLabel: Record<string,string> = { primer_mes: 'Primer mes', mensual: 'Mensual', otro: 'Otro' }
                      return (
                        <tr key={p.id} className="border-t border-slate-50 hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 text-sm font-bold text-slate-800">{p.centro_nombre || '—'}</td>
                          <td className="px-4 py-3 text-sm font-bold text-green-600">S/{p.monto}</td>
                          <td className="px-4 py-3"><span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold">{tipoLabel[p.tipo]}</span></td>
                          <td className="px-4 py-3 text-sm text-slate-400">{p.fecha}</td>
                          <td className="px-4 py-3 text-sm text-slate-500 capitalize">{p.metodo}</td>
                          <td className="px-4 py-3">
                            {p.confirmado
                              ? <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-1 w-fit"><CheckCircle size={11} /> Confirmado</span>
                              : <button onClick={() => confirmPago(p.id, p.centro_id)} className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold hover:bg-green-100 hover:text-green-700 transition-colors">⚡ Confirmar</button>
                            }
                          </td>
                          <td className="px-4 py-3">
                            <button onClick={() => deletePago(p.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                    {!pagos.length && (
                      <tr><td colSpan={7} className="px-4 py-10 text-center text-slate-400">Sin pagos registrados aún</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── ACTIVACIONES ── */}
          {view === 'activaciones' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 style={{ fontFamily: "'Baloo 2',cursive" }} className="text-2xl font-bold text-slate-800">Activaciones</h2>
                <button onClick={fetchCentros} className="p-2 rounded-xl hover:bg-white border border-slate-200 transition-colors">
                  <RefreshCw size={16} className="text-slate-400" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'Activos', value: activos, color: 'from-green-500 to-emerald-500' },
                  { label: 'Pendientes', value: pendientes, color: 'from-yellow-500 to-amber-500' },
                  { label: 'Inactivos', value: centros.filter(c=>c.estado==='inactivo').length, color: 'from-red-400 to-red-500' },
                ].map((s,i) => (
                  <div key={i} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm relative overflow-hidden">
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${s.color}`} />
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">{s.label}</p>
                    <p style={{ fontFamily: "'Baloo 2',cursive" }} className="text-3xl font-black text-slate-800">{s.value}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      {['Centro','Estado','Activado el','Próx. pago','Días','Control'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-wide">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {centros.map(c => {
                      const days = c.fecha_proximo_pago ? Math.ceil((new Date(c.fecha_proximo_pago).getTime() - Date.now()) / 86400000) : null
                      const daysColor = days === null ? 'text-slate-400' : days < 7 ? 'text-red-500 font-bold' : days < 14 ? 'text-yellow-500 font-bold' : 'text-green-600 font-bold'
                      return (
                        <tr key={c.id} className="border-t border-slate-50 hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3">
                            <p className="text-sm font-bold text-slate-800">{c.nombre}</p>
                            <p className="text-xs text-slate-400">{c.email}</p>
                          </td>
                          <td className="px-4 py-3"><StatusBadge status={c.estado} /></td>
                          <td className="px-4 py-3 text-sm text-slate-400">{c.fecha_inicio || '—'}</td>
                          <td className="px-4 py-3 text-sm text-slate-400">{c.fecha_proximo_pago || '—'}</td>
                          <td className={`px-4 py-3 text-sm ${daysColor}`}>{days !== null ? `${days}d` : '—'}</td>
                          <td className="px-4 py-3">
                            <button onClick={() => toggleActivacion(c)}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                                c.estado === 'activo'
                                  ? 'bg-red-50 text-red-500 hover:bg-red-100'
                                  : 'bg-green-50 text-green-600 hover:bg-green-100'
                              }`}>
                              {c.estado === 'activo' ? <><XCircle size={13} /> Desactivar</> : <><CheckCircle size={13} /> Activar</>}
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ── MODAL ADD CENTRO ── */}
      <Modal open={showAddCentro} onClose={() => setShowAddCentro(false)} title="➕ Agregar nuevo centro">
        <Field label="Nombre del centro *">
          <input type="text" className={inputClass} placeholder="Ej: Centro ABA Lima" value={centroForm.nombre} onChange={e => setCentroForm(p => ({...p, nombre: e.target.value}))} />
        </Field>
        <Field label="Responsable *">
          <input type="text" className={inputClass} placeholder="Nombre y apellido" value={centroForm.responsable} onChange={e => setCentroForm(p => ({...p, responsable: e.target.value}))} />
        </Field>
        <Field label="Email *">
          <input type="email" className={inputClass} placeholder="correo@centro.com" value={centroForm.email} onChange={e => setCentroForm(p => ({...p, email: e.target.value}))} />
        </Field>
        <Field label="Teléfono">
          <input type="text" className={inputClass} placeholder="+51 999 999 999" value={centroForm.telefono} onChange={e => setCentroForm(p => ({...p, telefono: e.target.value}))} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Plan">
            <select className={inputClass} value={centroForm.plan} onChange={e => setCentroForm(p => ({...p, plan: e.target.value as any}))}>
              <option value="mensual">Mensual (S/250)</option>
              <option value="piloto">Piloto</option>
            </select>
          </Field>
          <Field label="Estado inicial">
            <select className={inputClass} value={centroForm.estado} onChange={e => setCentroForm(p => ({...p, estado: e.target.value as any}))}>
              <option value="pendiente">Pendiente de pago</option>
              <option value="activo">Activo</option>
              <option value="prueba">Prueba</option>
            </select>
          </Field>
        </div>
        <Field label="Notas internas">
          <textarea className={inputClass} rows={2} placeholder="Notas..." value={centroForm.notas} onChange={e => setCentroForm(p => ({...p, notas: e.target.value}))} />
        </Field>
        <div className="flex gap-3 justify-end">
          <button onClick={() => setShowAddCentro(false)} className="px-4 py-2 text-sm text-slate-500 hover:bg-slate-100 rounded-xl transition-colors">Cancelar</button>
          <button onClick={saveCentro} disabled={saving || !centroForm.nombre}
            className="px-5 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl text-sm font-bold disabled:opacity-50"
            style={{ fontFamily: "'Baloo 2',cursive" }}>
            {saving ? <Loader2 size={14} className="animate-spin inline" /> : 'Guardar centro'}
          </button>
        </div>
      </Modal>

      {/* ── MODAL EDIT CENTRO ── */}
      <Modal open={!!showEditCentro} onClose={() => setShowEditCentro(null)} title="✏️ Editar centro">
        {showEditCentro && (<>
          <Field label="Nombre del centro">
            <input type="text" className={inputClass} value={showEditCentro.nombre} onChange={e => setShowEditCentro(p => p ? {...p, nombre: e.target.value} : p)} />
          </Field>
          <Field label="Responsable">
            <input type="text" className={inputClass} value={showEditCentro.responsable} onChange={e => setShowEditCentro(p => p ? {...p, responsable: e.target.value} : p)} />
          </Field>
          <Field label="Email">
            <input type="email" className={inputClass} value={showEditCentro.email} onChange={e => setShowEditCentro(p => p ? {...p, email: e.target.value} : p)} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Plan">
              <select className={inputClass} value={showEditCentro.plan} onChange={e => setShowEditCentro(p => p ? {...p, plan: e.target.value as any} : p)}>
                <option value="mensual">Mensual (S/250)</option>
                <option value="piloto">Piloto</option>
              </select>
            </Field>
            <Field label="Estado">
              <select className={inputClass} value={showEditCentro.estado} onChange={e => setShowEditCentro(p => p ? {...p, estado: e.target.value as any} : p)}>
                <option value="activo">Activo</option>
                <option value="pendiente">Pendiente</option>
                <option value="inactivo">Inactivo</option>
                <option value="prueba">Prueba</option>
              </select>
            </Field>
          </div>
          <Field label="Notas">
            <textarea className={inputClass} rows={2} value={showEditCentro.notas} onChange={e => setShowEditCentro(p => p ? {...p, notas: e.target.value} : p)} />
          </Field>
          <div className="flex gap-3 justify-end">
            <button onClick={() => setShowEditCentro(null)} className="px-4 py-2 text-sm text-slate-500 hover:bg-slate-100 rounded-xl transition-colors">Cancelar</button>
            <button onClick={updateCentro} disabled={saving}
              className="px-5 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl text-sm font-bold"
              style={{ fontFamily: "'Baloo 2',cursive" }}>
              {saving ? <Loader2 size={14} className="animate-spin inline" /> : 'Actualizar'}
            </button>
          </div>
        </>)}
      </Modal>

      {/* ── MODAL ADD PAGO ── */}
      <Modal open={showAddPago} onClose={() => setShowAddPago(false)} title="💳 Registrar pago">
        <Field label="Centro *">
          <select className={inputClass} value={pagoForm.centro_id} onChange={e => setPagoForm(p => ({...p, centro_id: e.target.value}))}>
            <option value="">Seleccionar centro...</option>
            {centros.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
          </select>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Monto (S/) *">
            <input type="number" className={inputClass} value={pagoForm.monto} onChange={e => setPagoForm(p => ({...p, monto: Number(e.target.value)}))} />
          </Field>
          <Field label="Tipo de pago">
            <select className={inputClass} value={pagoForm.tipo} onChange={e => setPagoForm(p => ({...p, tipo: e.target.value as any}))}>
              <option value="primer_mes">Primer mes (S/350)</option>
              <option value="mensual">Mensual (S/250)</option>
              <option value="otro">Otro</option>
            </select>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Método de pago">
            <select className={inputClass} value={pagoForm.metodo} onChange={e => setPagoForm(p => ({...p, metodo: e.target.value as any}))}>
              <option value="yape">Yape</option>
              <option value="plin">Plin</option>
              <option value="transferencia">Transferencia</option>
              <option value="efectivo">Efectivo</option>
              <option value="otro">Otro</option>
            </select>
          </Field>
          <Field label="Fecha *">
            <input type="date" className={inputClass} value={pagoForm.fecha} onChange={e => setPagoForm(p => ({...p, fecha: e.target.value}))} />
          </Field>
        </div>
        <Field label="Referencia / N° operación">
          <input type="text" className={inputClass} placeholder="Nro. de operación..." value={pagoForm.referencia} onChange={e => setPagoForm(p => ({...p, referencia: e.target.value}))} />
        </Field>
        <label className="flex items-center gap-2 mb-5 cursor-pointer">
          <input type="checkbox" checked={pagoForm.confirmado} onChange={e => setPagoForm(p => ({...p, confirmado: e.target.checked}))} className="accent-orange-500 w-4 h-4" />
          <span className="text-sm text-slate-600 font-semibold">Confirmar y activar centro automáticamente</span>
        </label>
        <div className="flex gap-3 justify-end">
          <button onClick={() => setShowAddPago(false)} className="px-4 py-2 text-sm text-slate-500 hover:bg-slate-100 rounded-xl transition-colors">Cancelar</button>
          <button onClick={savePago} disabled={saving || !pagoForm.centro_id || !pagoForm.monto}
            className="px-5 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl text-sm font-bold disabled:opacity-50"
            style={{ fontFamily: "'Baloo 2',cursive" }}>
            {saving ? <Loader2 size={14} className="animate-spin inline" /> : 'Registrar pago'}
          </button>
        </div>
      </Modal>
    </>
  )
}
