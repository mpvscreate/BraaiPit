interface Props {
  size?: number
  className?: string
}

export default function VintageMic({ size = 24, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Mic head - classic rounded grille */}
      <ellipse cx="24" cy="14" rx="10" ry="12" fill="currentColor" opacity="0.15" />
      <ellipse cx="24" cy="14" rx="10" ry="12" stroke="currentColor" strokeWidth="2.5" fill="none" />
      {/* Grille lines */}
      <line x1="16" y1="8" x2="32" y2="8" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      <line x1="15" y1="11" x2="33" y2="11" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      <line x1="14.5" y1="14" x2="33.5" y2="14" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      <line x1="15" y1="17" x2="33" y2="17" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      <line x1="16" y1="20" x2="32" y2="20" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      {/* Connector ring */}
      <rect x="20" y="25" width="8" height="4" rx="1" fill="currentColor" opacity="0.6" />
      {/* Stand shaft */}
      <rect x="22.5" y="29" width="3" height="10" rx="1.5" fill="currentColor" opacity="0.8" />
      {/* Base */}
      <ellipse cx="24" cy="42" rx="9" ry="3" fill="currentColor" opacity="0.3" />
      <ellipse cx="24" cy="41" rx="9" ry="3" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  )
}
