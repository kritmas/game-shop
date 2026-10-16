export default function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="coreGrad" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FFE5B0" />
          <stop offset="50%" stopColor="#FFA94D" />
          <stop offset="100%" stopColor="#FF6B35" />
        </radialGradient>
        <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFA94D" />
          <stop offset="100%" stopColor="#FF6B35" />
        </linearGradient>
      </defs>
      {/* Внешнее кольцо — аккреционный диск */}
      <ellipse
        cx="32"
        cy="32"
        rx="28"
        ry="10"
        stroke="url(#ringGrad)"
        strokeWidth="2"
        transform="rotate(-30 32 32)"
        opacity="0.7"
      />
      <ellipse
        cx="32"
        cy="32"
        rx="26"
        ry="8"
        stroke="url(#ringGrad)"
        strokeWidth="1.5"
        transform="rotate(30 32 32)"
        opacity="0.5"
      />
      {/* Центральная сфера */}
      <circle cx="32" cy="32" r="14" fill="url(#coreGrad)" />
      {/* Внутренняя тень — эффект горизонта событий */}
      <circle cx="32" cy="32" r="7" fill="#050505" />
      <circle cx="32" cy="32" r="7" fill="none" stroke="#FFA94D" strokeWidth="1" opacity="0.8" />
    </svg>
  );
}