// Divisor curvo entre secciones. `fill` = color de la sección siguiente.
export default function Wave({
  fill = '#ffffff',
  flip = false,
  variant = 1,
}: {
  fill?: string
  flip?: boolean
  variant?: 1 | 2
}) {
  const path =
    variant === 1
      ? 'M0,44 C320,96 620,4 880,30 C1120,54 1300,82 1440,40 L1440,100 L0,100 Z'
      : 'M0,60 C240,10 520,90 760,58 C1000,26 1240,8 1440,52 L1440,100 L0,100 Z'
  return (
    <svg
      className="vt-wave"
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ transform: flip ? 'scaleX(-1)' : undefined, marginTop: -1, marginBottom: -1 }}
    >
      <path d={path} fill={fill} />
    </svg>
  )
}
