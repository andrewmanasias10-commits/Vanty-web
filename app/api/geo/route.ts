// Devuelve el país del visitante a partir de las cabeceras de geolocalización.
// En Vercel: x-vercel-ip-country. En Cloudflare: cf-ipcountry.
export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const country =
    req.headers.get('x-vercel-ip-country') ||
    req.headers.get('cf-ipcountry') ||
    null
  return Response.json({ country }, { headers: { 'cache-control': 'no-store' } })
}
