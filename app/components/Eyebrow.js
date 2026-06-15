// Signature small detail: caps label + a crisp 1px turquoise SVG rule
// (drawn, not a CSS border, so it stays sharp at any DPI).
export default function Eyebrow({ children, className = '' }) {
  return (
    <span className={`eyebrow ${className}`}>
      <svg width="24" height="1" viewBox="0 0 24 1" aria-hidden="true" style={{ flexShrink: 0 }}>
        <line x1="0" y1="0.5" x2="24" y2="0.5" stroke="var(--turquoise)" strokeWidth="1" />
      </svg>
      {children}
    </span>
  );
}
