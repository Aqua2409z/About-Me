// Mock project visuals — abstract SVG scenes for each student project
export const BrandMiyako = (
  <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="miyBg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#1E1A4A"/>
        <stop offset="100%" stopColor="#0B0F2E"/>
      </linearGradient>
    </defs>
    <rect width="800" height="600" fill="url(#miyBg)"/>
    {/* Circle logo */}
    <circle cx="400" cy="300" r="140" fill="none" stroke="#FF5C88" strokeWidth="1.5"/>
    <text x="400" y="310" fontFamily="serif" fontSize="72" fill="#F0EBE0" textAnchor="middle" letterSpacing="4">宮</text>
    <text x="400" y="470" fontFamily="monospace" fontSize="11" fill="#F0EBE0" textAnchor="middle" letterSpacing="8" opacity="0.6">MIYAKO · TOKYO</text>
    <line x1="200" y1="520" x2="600" y2="520" stroke="#FF5C88" strokeWidth="1" opacity="0.4"/>
  </svg>
);

export const AloFinance = (
  <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="aloBg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2A1240"/>
        <stop offset="100%" stopColor="#0B0F2E"/>
      </linearGradient>
    </defs>
    <rect width="800" height="600" fill="url(#aloBg)"/>
    {/* Phone mockup */}
    <rect x="300" y="80" width="200" height="440" rx="32" fill="#F0EBE0"/>
    <rect x="320" y="120" width="160" height="40" rx="8" fill="#0B0F2E"/>
    <rect x="320" y="180" width="160" height="100" rx="8" fill="#FF5C88"/>
    <rect x="340" y="210" width="60" height="8" fill="#F0EBE0"/>
    <rect x="340" y="226" width="100" height="16" fill="#F0EBE0"/>
    <rect x="320" y="300" width="160" height="60" rx="6" fill="#D8D2C4"/>
    <rect x="320" y="370" width="160" height="60" rx="6" fill="#D8D2C4"/>
    <rect x="320" y="440" width="160" height="60" rx="6" fill="#D8D2C4"/>
    <circle cx="400" cy="490" r="4" fill="#0B0F2E"/>
  </svg>
);

export const RisoPosters = (
  <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="600" fill="#241547"/>
    {/* Three overlapping posters */}
    <g transform="rotate(-6 220 300)">
      <rect x="100" y="150" width="240" height="300" fill="#FF5C88"/>
      <text x="120" y="420" fontFamily="serif" fontSize="40" fill="#241547" fontWeight="900">A1</text>
    </g>
    <g transform="rotate(4 400 300)">
      <rect x="280" y="130" width="240" height="300" fill="#F0EBE0"/>
      <text x="300" y="420" fontFamily="serif" fontSize="40" fill="#FF5C88" fontWeight="900">A2</text>
    </g>
    <g transform="rotate(-3 580 300)">
      <rect x="460" y="150" width="240" height="300" fill="#7B3B7A"/>
      <text x="480" y="420" fontFamily="serif" fontSize="40" fill="#F0EBE0" fontWeight="900">A3</text>
    </g>
  </svg>
);

export const KhoaType = (
  <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="600" fill="#0B0F2E"/>
    {/* Big letter K with overlay */}
    <text x="400" y="440" fontFamily="serif" fontSize="520" fill="#F0EBE0" textAnchor="middle" fontWeight="900" letterSpacing="-20">K</text>
    <text x="400" y="440" fontFamily="serif" fontSize="520" fill="none" stroke="#FF5C88" strokeWidth="1" textAnchor="middle" fontWeight="900" letterSpacing="-20" transform="translate(14 10)">K</text>
    <text x="400" y="540" fontFamily="monospace" fontSize="11" fill="#F0EBE0" textAnchor="middle" letterSpacing="8" opacity="0.5">KHOA TYPE · V0.1</text>
  </svg>
);

export const NhipCafe = (
  <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="600" fill="#D8D2C4"/>
    {/* Coffee cup abstract */}
    <ellipse cx="400" cy="260" rx="130" ry="30" fill="#241547"/>
    <path d="M 270 260 L 290 440 Q 400 480 510 440 L 530 260 Z" fill="#7B3B7A"/>
    <path d="M 530 290 Q 580 290 580 350 Q 580 410 520 410" fill="none" stroke="#7B3B7A" strokeWidth="12"/>
    <ellipse cx="400" cy="260" rx="100" ry="18" fill="#1A0F30"/>
    {/* Steam */}
    <path d="M 370 220 Q 380 190 370 160 Q 360 130 380 100" stroke="#241547" strokeWidth="2" fill="none" opacity="0.5"/>
    <path d="M 420 220 Q 430 190 420 160 Q 410 130 430 100" stroke="#241547" strokeWidth="2" fill="none" opacity="0.5"/>
    <text x="400" y="540" fontFamily="serif" fontSize="36" fill="#241547" textAnchor="middle" fontStyle="italic">Nhịp Café</text>
  </svg>
);
