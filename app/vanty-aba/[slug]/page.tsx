import FeaturePage from '@/app/components/FeaturePage'
import { FEATURE_SLUGS } from '@/app/lib/features'

export function generateStaticParams() {
  return FEATURE_SLUGS.map(slug => ({ slug }))
}

export const dynamicParams = false

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <FeaturePage slug={slug} />
}
