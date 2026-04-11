const Logo = ({ className = "h-8 w-auto" }: { className?: string }) => (
  <svg
    viewBox="0 0 200 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* House in hexagon icon */}
    <g transform="translate(0, 4)">
      {/* Hexagon */}
      <path
        d="M20 0L37.3 10V30L20 40L2.7 30V10L20 0Z"
        fill="hsl(155, 30%, 42%)"
      />
      {/* House shape */}
      <path
        d="M20 10L10 18V30H16V23H24V30H30V18L20 10Z"
        fill="hsl(220, 20%, 7%)"
      />
      {/* Window */}
      <rect x="17" y="14" width="6" height="5" rx="0.5" fill="hsl(155, 30%, 42%)" />
    </g>
    {/* Text: FEM */}
    <text
      x="50"
      y="34"
      fontFamily="'Space Grotesk', sans-serif"
      fontWeight="700"
      fontSize="28"
      letterSpacing="-0.02em"
      fill="hsl(210, 20%, 92%)"
    >
      FEM
    </text>
    {/* Dot */}
    <circle cx="113" cy="32" r="3.5" fill="hsl(155, 30%, 42%)" />
  </svg>
);

export default Logo;
