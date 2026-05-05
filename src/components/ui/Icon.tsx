type IconName = 'upload' | 'pdf' | 'lock' | 'check' | 'arrow' | 'warning' | 'chev' | 'sparkle'

const PATHS: Record<IconName, React.ReactNode> = {
  upload:  <><path d="M8 11V3M5 6l3-3 3 3"/><path d="M3 11v2a1 1 0 001 1h8a1 1 0 001-1v-2"/></>,
  pdf:     <><path d="M4 2h6l3 3v9a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z"/><path d="M10 2v3h3"/></>,
  lock:    <><rect x="3" y="7" width="10" height="7" rx="1"/><path d="M5 7V5a3 3 0 016 0v2"/></>,
  check:   <path d="M3 8l3 3 7-7" />,
  arrow:   <path d="M3 8h10M9 4l4 4-4 4" />,
  warning: <><path d="M8 2L1 14h14L8 2z"/><path d="M8 7v4"/><circle cx="8" cy="12" r="0.5" fill="currentColor"/></>,
  chev:    <path d="M6 4l4 4-4 4" />,
  sparkle: <path d="M8 2v4M8 10v4M2 8h4M10 8h4" />,
}

export function Icon({ name, size = 14, color, className }: {
  name: IconName; size?: number; color?: string; className?: string
}) {
  return (
    <svg className={`icon ${className ?? ''}`} width={size} height={size} viewBox="0 0 16 16"
      style={{ color: color ?? 'currentColor', flexShrink: 0 }}>
      {PATHS[name]}
    </svg>
  )
}
