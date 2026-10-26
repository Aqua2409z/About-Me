// Hero visual — faithful recreation of vibrant poster palette:
// 4 overlapping radial glows (blue top-right, magenta mid-left, amber center, coral bottom-left)
// blended with screen mode on deep purple base; 2 ellipse ring outlines, dot grid corners,
// center 4-point sparkle, dark ridge, grain overlay.
//
// Each animated element lives inside a `<g data-layer>` parallax wrapper so GSAP's
// transform on the wrapper doesn't fight the inner CSS keyframe transform.

function Dot({ x, y, r = 2 }: { x: number; y: number; r?: number }) {
  return <circle cx={x} cy={y} r={r} fill="#F5F0E8" opacity={0.85} />;
}
function DotGrid({ x, y, cols = 5, rows = 5, step = 12 }: { x: number; y: number; cols?: number; rows?: number; step?: number }) {
  const dots: React.ReactNode[] = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      dots.push(<Dot key={`${r}-${c}`} x={x + c * step} y={y + r * step} r={1.5} />);
  return <g>{dots}</g>;
}

export default function HeroSun() {
  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Deep purple base */}
        <linearGradient id="baseBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#0E0828"/>
          <stop offset="50%"  stopColor="#1A1046"/>
          <stop offset="100%" stopColor="#2E1861"/>
        </linearGradient>

        {/* 4 glow lights — each gets its own radial, all blended with screen */}
        <radialGradient id="glowBlue" cx="78%" cy="22%" r="48%">
          <stop offset="0%"   stopColor="#3B5CFF" stopOpacity="0.95"/>
          <stop offset="55%"  stopColor="#2454FF" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="#2454FF" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="glowMagenta" cx="12%" cy="45%" r="42%">
          <stop offset="0%"   stopColor="#D64B9F" stopOpacity="0.85"/>
          <stop offset="60%"  stopColor="#D64B9F" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="#D64B9F" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="glowAmber" cx="50%" cy="52%" r="38%">
          <stop offset="0%"   stopColor="#FFD966" stopOpacity="0.95"/>
          <stop offset="30%"  stopColor="#FFB84D" stopOpacity="0.60"/>
          <stop offset="70%"  stopColor="#FF8E42" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#FF8E42" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="glowCoral" cx="25%" cy="82%" r="45%">
          <stop offset="0%"   stopColor="#FF6B8A" stopOpacity="0.80"/>
          <stop offset="60%"  stopColor="#FF6B8A" stopOpacity="0.20"/>
          <stop offset="100%" stopColor="#FF6B8A" stopOpacity="0"/>
        </radialGradient>

        {/* Grain filter */}
        <filter id="grain2" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={12}/>
          <feColorMatrix values="0 0 0 0 1  0 0 0 0 0.55  0 0 0 0 0.65  0 0 0 0.16 0"/>
          <feComposite in2="SourceGraphic" operator="in"/>
        </filter>
      </defs>

      {/* Base dark */}
      <rect width="800" height="600" fill="url(#baseBg)"/>

      {/* 4 blended glow lights (poster-like). Each layered rect uses screen blend */}
      <g data-layer="halo">
        <g className="anim-halo">
          <rect width="800" height="600" fill="url(#glowBlue)" style={{ mixBlendMode: 'screen' as const }}/>
          <rect width="800" height="600" fill="url(#glowMagenta)" style={{ mixBlendMode: 'screen' as const }}/>
          <rect width="800" height="600" fill="url(#glowCoral)" style={{ mixBlendMode: 'screen' as const }}/>
          <rect width="800" height="600" fill="url(#glowAmber)" style={{ mixBlendMode: 'screen' as const }}/>
        </g>
      </g>

      {/* Thin elliptical ring 1 (bigger, tilted) */}
      <g data-layer="ring1">
        <g transform="translate(400 300)">
          <g className="anim-ring-a">
            <ellipse cx="0" cy="0" rx="300" ry="100" fill="none" stroke="#F5F0E8" strokeWidth="0.9" opacity="0.55"/>
          </g>
        </g>
      </g>

      {/* Thin elliptical ring 2 (smaller, opposite tilt) */}
      <g data-layer="ring2">
        <g transform="translate(400 300)">
          <g className="anim-ring-b">
            <ellipse cx="0" cy="0" rx="240" ry="70" fill="none" stroke="#F5F0E8" strokeWidth="0.8" opacity="0.45"/>
          </g>
        </g>
      </g>

      {/* Sun — still kept as a subtle central disc; mostly provides focal gradient on top of glows */}
      <g data-layer="sun">
        <g className="anim-sun">
          <circle cx="400" cy="300" r="38" fill="none" stroke="#F5F0E8" strokeWidth="0.5" opacity="0.35"/>
        </g>
      </g>

      {/* Center 4-point sparkle (like poster's star mark) */}
      <g data-layer="star" transform="translate(400 300)">
        <g className="anim-star">
          <g className="anim-star-pulse">
            {/* Diamond-cross star */}
            <path d="M 0 -22 L 4 -4 L 22 0 L 4 4 L 0 22 L -4 4 L -22 0 L -4 -4 Z" fill="#F5F0E8"/>
            <path d="M 0 -22 L 4 -4 L 22 0 L 4 4 L 0 22 L -4 4 L -22 0 L -4 -4 Z" fill="none" stroke="#F5F0E8" strokeWidth="0.5" opacity="0.6" transform="scale(1.3)"/>
          </g>
        </g>
      </g>

      {/* Dot grid top-right */}
      <g data-layer="dots1">
        <g className="anim-sparkles">
          <DotGrid x={620} y={90} cols={5} rows={5} step={12}/>
        </g>
      </g>

      {/* Dot grid bottom-left */}
      <g data-layer="dots2">
        <g className="anim-sparkles">
          <DotGrid x={110} y={400} cols={5} rows={3} step={12}/>
        </g>
      </g>

      {/* Horizon editorial line */}
      <g data-layer="horizon" opacity="0.9">
        <rect x="0" y="500" width="800" height="1" fill="#F5F0E8" opacity="0.35"/>
        <rect x="0" y="506" width="800" height="1" fill="#FF6B8A" opacity="0.55"/>
      </g>

      {/* Dark ridge at bottom to ground composition */}
      <g data-layer="ridge">
        <path d="M 0 530 C 120 512, 240 548, 360 528 S 600 510, 720 536 L 800 530 L 800 600 L 0 600 Z"
              fill="#0A061F" opacity="0.9"/>
      </g>

      {/* Drifting mist band */}
      <g data-layer="mist">
        <rect className="anim-mist" x="-100" y="280" width="1000" height="36" fill="#F5F0E8" opacity="0.07"/>
      </g>

      {/* Grain overlay */}
      <rect className="anim-grain" width="800" height="600" filter="url(#grain2)" opacity="0.5"/>
    </svg>
  );
}
