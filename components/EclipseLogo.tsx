export function EclipseLogo({ size = 80 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer glow ring */}
      <circle cx="60" cy="60" r="55" stroke="rgba(232,212,77,0.15)" strokeWidth="1" />
      {/* Main eclipse circle */}
      <circle cx="60" cy="60" r="46" fill="#0D0825" stroke="rgba(232,212,77,0.4)" strokeWidth="1.5" />
      {/* Eclipse shadow (overlapping circle) */}
      <circle cx="80" cy="60" r="36" fill="#08041A" />
      {/* Inner glow on crescent */}
      <circle cx="60" cy="60" r="46" fill="none" stroke="#E8D44D" strokeWidth="0.5" opacity="0.6" />
      {/* Radio waves */}
      <path
        d="M 20 45 Q 10 60 20 75"
        stroke="rgba(232,212,77,0.5)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 14 38 Q 0 60 14 82"
        stroke="rgba(232,212,77,0.3)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Stars */}
      <circle cx="35" cy="42" r="1.5" fill="#E8D44D" opacity="0.8" />
      <circle cx="28" cy="55" r="1" fill="#E8D44D" opacity="0.6" />
      <circle cx="38" cy="70" r="1.2" fill="#E8D44D" opacity="0.7" />
      <circle cx="48" cy="35" r="0.8" fill="#E8D44D" opacity="0.5" />
    </svg>
  );
}
