'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// -----------------------------------------------------------------------------
// Hero visual — Big "K" typographic megaform with dramatic STAGGERED REVEAL.
// Elements materialize one by one over ~3.5s on load. After reveal: subtle
// breathing + grain flicker ambient animation.
// -----------------------------------------------------------------------------

export default function HeroLetter() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Set initial state (invisible)
    gsap.set('.hl-bg',       { opacity: 0 });
    gsap.set('.hl-glow',     { opacity: 0, transformOrigin: 'center' });
    gsap.set('.hl-horizon-line', { scaleX: 0, transformOrigin: 'left center' });
    gsap.set('.hl-tick',     { opacity: 0, scaleY: 0, transformOrigin: 'center bottom' });
    gsap.set('.hl-ridge',    { opacity: 0, yPercent: 20 });
    gsap.set('.hl-k-shadow', { opacity: 0 });
    gsap.set('.hl-k-fill',   { opacity: 0, scale: 0.85, filter: 'blur(30px)', transformOrigin: 'center 55%' });
    gsap.set('.hl-dot',      { opacity: 0, scale: 0, transformOrigin: 'center' });
    gsap.set('.hl-sparkle',  { opacity: 0, scale: 0, transformOrigin: 'center' });
    gsap.set('.hl-grain',    { opacity: 0 });
    gsap.set('.hl-tag',      { opacity: 0, y: 10 });

    if (reduced) {
      // Immediately show everything
      gsap.set('.hl-bg, .hl-glow, .hl-ridge, .hl-k-shadow, .hl-k-fill, .hl-dot, .hl-sparkle, .hl-tag',
        { opacity: 1, scale: 1, filter: 'blur(0px)', yPercent: 0, y: 0 });
      gsap.set('.hl-horizon-line, .hl-tick', { scaleX: 1, scaleY: 1, opacity: 1 });
      gsap.set('.hl-grain', { opacity: 0.5 });
      return;
    }

    // Reveal timeline — kicks in just after Hero's clip-path mask reveal (~1.9s)
    const tl = gsap.timeline({ delay: 2.0, defaults: { ease: 'power3.out' } });

    tl
      .to('.hl-bg', { opacity: 1, duration: 0.9 })
      .to('.hl-glow', {
        opacity: 1, duration: 1.6, stagger: { each: 0.35, from: 'random' }, ease: 'power2.out'
      }, '-=0.7')
      .to('.hl-horizon-line', { scaleX: 1, duration: 1.4, ease: 'expo.out' }, '-=1.2')
      .to('.hl-tick', {
        opacity: 0.5, scaleY: 1, duration: 0.5, stagger: 0.07, ease: 'back.out(1.6)'
      }, '-=1.0')
      .to('.hl-ridge', { opacity: 0.9, yPercent: 0, duration: 1.3, ease: 'expo.out' }, '-=1.3')
      // THE "K" — materializes with heavy blur → sharp, scale up gently
      .to('.hl-k-fill', {
        opacity: 1, scale: 1, filter: 'blur(0px)', duration: 2.0, ease: 'expo.out'
      }, '-=1.0')
      // Shadow K slides out from behind the main K
      .fromTo('.hl-k-shadow',
        { x: 0, y: 0 },
        { opacity: 0.85, x: 14, y: 12, duration: 1.0, ease: 'expo.out' },
      '-=1.0')
      // Dots appear one by one
      .to('.hl-dot', {
        opacity: 0.85, scale: 1, duration: 0.4, stagger: 0.045, ease: 'back.out(2)'
      }, '-=0.8')
      // Sparkle star appears last with overshoot
      .to('.hl-sparkle', {
        opacity: 1, scale: 1, duration: 0.9, ease: 'back.out(1.8)'
      }, '-=0.4')
      .to('.hl-tag', {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out'
      }, '-=0.6')
      .to('.hl-grain', { opacity: 0.5, duration: 1.4 }, '-=1.0');

    return () => { tl.kill(); };
  }, []);

  return (
    <svg ref={svgRef} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hlBase" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#0E0828"/>
          <stop offset="55%"  stopColor="#1A1046"/>
          <stop offset="100%" stopColor="#2E1861"/>
        </linearGradient>
        <radialGradient id="hlGlowBlue" cx="78%" cy="18%" r="52%">
          <stop offset="0%"   stopColor="#3B5CFF" stopOpacity="0.80"/>
          <stop offset="60%"  stopColor="#2454FF" stopOpacity="0.22"/>
          <stop offset="100%" stopColor="#2454FF" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="hlGlowMag" cx="14%" cy="42%" r="46%">
          <stop offset="0%"   stopColor="#D64B9F" stopOpacity="0.75"/>
          <stop offset="60%"  stopColor="#D64B9F" stopOpacity="0.20"/>
          <stop offset="100%" stopColor="#D64B9F" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="hlGlowCoral" cx="22%" cy="85%" r="48%">
          <stop offset="0%"   stopColor="#FF6B8A" stopOpacity="0.70"/>
          <stop offset="60%"  stopColor="#FF6B8A" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#FF6B8A" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="hlGlowAmber" cx="68%" cy="72%" r="40%">
          <stop offset="0%"   stopColor="#FFD966" stopOpacity="0.55"/>
          <stop offset="45%"  stopColor="#FFB84D" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="#FFB84D" stopOpacity="0"/>
        </radialGradient>

        {/* Gradient fill for the K — multi-stop aurora */}
        <linearGradient id="hlKGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#FFD966"/>
          <stop offset="30%"  stopColor="#FFB84D"/>
          <stop offset="55%"  stopColor="#FF6B8A"/>
          <stop offset="80%"  stopColor="#D64B9F"/>
          <stop offset="100%" stopColor="#3B5CFF"/>
        </linearGradient>

        <filter id="hlGrain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={14}/>
          <feColorMatrix values="0 0 0 0 1  0 0 0 0 0.55  0 0 0 0 0.65  0 0 0 0.16 0"/>
          <feComposite in2="SourceGraphic" operator="in"/>
        </filter>
      </defs>

      {/* Base + 4 aurora glows */}
      <rect className="hl-bg" width="800" height="600" fill="url(#hlBase)"/>
      <g data-layer="halo">
        <rect className="hl-glow" width="800" height="600" fill="url(#hlGlowBlue)"  style={{ mixBlendMode: 'screen' as const }}/>
        <rect className="hl-glow" width="800" height="600" fill="url(#hlGlowMag)"   style={{ mixBlendMode: 'screen' as const }}/>
        <rect className="hl-glow" width="800" height="600" fill="url(#hlGlowCoral)" style={{ mixBlendMode: 'screen' as const }}/>
        <rect className="hl-glow" width="800" height="600" fill="url(#hlGlowAmber)" style={{ mixBlendMode: 'screen' as const }}/>
      </g>

      {/* Horizon line + ticks */}
      <g data-layer="horizon">
        <rect className="hl-horizon-line" x="0" y="500" width="800" height="1" fill="#F5F0E8" opacity="0.4"/>
        <rect className="hl-horizon-line" x="0" y="506" width="800" height="1" fill="#FF6B8A" opacity="0.6"/>
        <g fill="#F5F0E8">
          {[60, 180, 300, 420, 500, 620, 740].map((x) => (
            <rect key={x} className="hl-tick" x={x} y="493" width="1" height="12" opacity="0.5"/>
          ))}
        </g>
      </g>

      {/* The BIG "K" — shadow (behind) + fill (front) using SVG <text> with Anton */}
      <g data-layer="letter">
        <text
          className="hl-k-shadow"
          x="400"
          y="470"
          fontFamily="var(--font-anton), 'Anton', 'Impact', sans-serif"
          fontSize="580"
          fontWeight="400"
          textAnchor="middle"
          fill="#FF6B8A"
          opacity="0.85"
        >K</text>
        <text
          className="hl-k-fill"
          x="400"
          y="470"
          fontFamily="var(--font-anton), 'Anton', 'Impact', sans-serif"
          fontSize="580"
          fontWeight="400"
          textAnchor="middle"
          fill="url(#hlKGrad)"
        >K</text>
      </g>

      {/* Tag labels (upper left + lower right, small editorial marks) */}
      <g data-layer="tags">
        <text className="hl-tag" x="40" y="60" fontFamily="monospace" fontSize="11" letterSpacing="4" fill="#F5F0E8" opacity="0.6">
          SS · 26
        </text>
        <text className="hl-tag" x="760" y="580" fontFamily="monospace" fontSize="11" letterSpacing="4" fill="#F5F0E8" opacity="0.6" textAnchor="end">
          KHOA / 01
        </text>
      </g>

      {/* Scattered dots (subtle star field) */}
      <g data-layer="dots">
        {[
          [120, 90], [140, 110], [160, 85], [700, 180], [720, 200], [690, 220],
          [80, 320], [100, 340], [720, 420], [740, 400], [260, 540], [540, 540],
          [200, 70], [600, 80], [50, 450], [750, 320], [400, 550], [370, 540], [430, 540],
        ].map(([x, y], i) => (
          <circle key={i} className="hl-dot" cx={x} cy={y} r={1.5} fill="#F5F0E8" />
        ))}
      </g>

      {/* Sparkle star in top-right area (echo poster motif) */}
      <g data-layer="sparkle" transform="translate(640 140)">
        <path className="hl-sparkle" d="M 0 -14 L 3 -3 L 14 0 L 3 3 L 0 14 L -3 3 L -14 0 L -3 -3 Z" fill="#F5F0E8"/>
      </g>

      {/* Ridge at bottom */}
      <g data-layer="ridge">
        <path className="hl-ridge"
              d="M 0 530 C 120 512, 240 548, 360 528 S 600 510, 720 536 L 800 530 L 800 600 L 0 600 Z"
              fill="#0A061F"/>
      </g>

      {/* Grain overlay */}
      <rect className="hl-grain anim-grain" width="800" height="600" filter="url(#hlGrain)"/>
    </svg>
  );
}
