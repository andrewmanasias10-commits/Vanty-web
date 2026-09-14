# Vanty — Landing Page + Admin Panel

## Stack
Next.js 16 · TypeScript · Tailwind v4 · Lucide React · Supabase

---

## 1. Instalar dependencias
```bash
npm install
```

## 2. Configurar Supabase
1. Ve a supabase.com → crea un proyecto nuevo (o usa el mismo de Jugando Aprendo si quieres)
2. Copia el archivo `.env.example` como `.env.local` y pon tus keys:
```
NEXT_PUBLIC_SUPABASE_URL=https://TUPROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
```
3. En Supabase → SQL Editor → copia y pega todo el contenido de `SUPABASE.sql` y ejecuta

## 3. Crear usuario admin
1. Supabase → Authentication → Users → Add user
2. Pon tu email y contraseña
3. Eso es lo que usas para entrar en `/admin`

## 4. Correr en local
```bash
npm run dev
```
Abre http://localhost:3000

## 5. Deploy en Vercel
1. Sube el proyecto a GitHub
2. Importa en vercel.com
3. Agrega las variables de entorno en Vercel Settings

---

## Estructura del proyecto
```
app/
  page.tsx          → Landing page pública (vanty.app)
  admin/page.tsx    → Panel de administración (vanty.app/admin)
  layout.tsx        → Layout global
  globals.css       → Estilos base
lib/
  supabase.ts       → Cliente Supabase
SUPABASE.sql        → SQL para crear las tablas
```

---

## Personalizar la landing

### WhatsApp
En `app/page.tsx`, línea ~15:
```tsx
const waUrl = `https://wa.me/51XXXXXXXXX?text=${waMsg}`
```
Cambia `51XXXXXXXXX` por tu número real (sin espacios ni +).

### Email de contacto
Busca `contacto@vanty.app` y reemplaza por tu email real.

### Logo
En el Nav, reemplaza el `<Brain />` por tu logo:
```tsx
<Image src="/images/logo.png" alt="Vanty" width={40} height={40} />
```

---

## Panel Admin — Qué puedes hacer

| Sección | Función |
|---------|---------|
| Dashboard | Resumen: centros activos, ingresos, pendientes |
| Centros | Agregar, editar, eliminar clientes/centros |
| Pagos | Registrar pagos (Yape, Plin, transferencia) |
| Activaciones | Activar/desactivar plataformas manualmente |

**Flujo de pago:**
1. Recibes el pago por Yape/Plin/transferencia
2. Entras al admin → Pagos → Registrar pago
3. Si marcas "Confirmar y activar", el centro se activa automáticamente
4. También puedes activarlo manualmente desde Activaciones

---

## Precios configurados
- Primer mes: S/350 (configuración + setup)
- Mensual (mes 2+): S/250
