const Logo = ({ className = "h-8 w-auto" }: { className?: string }) => (
  <svg
    viewBox="0 0 260 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="FEM Kiinteistöpalvelut"
  >
    {/* Building mark – stylised skyline outline */}
    <g
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="square"
      strokeLinejoin="miter"
      fill="none"
    >
      {/* Tallest tower (left) */}
      <path d="M6 50 L6 18 L18 8 L18 50" />
      {/* Middle tower */}
      <path d="M22 50 L22 22 L34 14 L34 50" />
      {/* Shorter tower (right) */}
      <path d="M38 50 L38 28 L48 22 L48 50" />
      {/* Ground line */}
      <path d="M2 50 L52 50" />
    </g>

    {/* FEM wordmark */}
    <text
      x="64"
      y="36"
      fontFamily="'Montserrat', 'Poppins', sans-serif"
      fontWeight="800"
      fontSize="34"
      letterSpacing="0.02em"
      fill="currentColor"
    >
      FEM
    </text>

    {/* Tagline */}
    <text
      x="65"
      y="50"
      fontFamily="'Poppins', sans-serif"
      fontWeight="500"
      fontSize="7"
      letterSpacing="0.18em"
      fill="currentColor"
      opacity="0.85"
    >
      KIINTEISTÖPALVELUT
    </text>
  </svg>
);

export default Logo;
