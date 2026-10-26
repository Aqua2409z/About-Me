'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const items = [
  { text: 'Available for internship 2026', outline: false },
  { text: 'Based in Ho Chi Minh', outline: true },
  { text: 'UI · UX · Branding', outline: false },
  { text: 'Năm 3 — Design student', outline: true },
];

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // Duplicate for seamless loop
    const html = track.innerHTML;
    track.innerHTML = html + html;
    const width = track.scrollWidth / 2;
    const tween = gsap.to(track, { x: -width, duration: 42, ease: 'none', repeat: -1 });
    return () => { tween.kill(); };
  }, []);

  return (
    <div className="marquee">
      <div className="marquee__track" ref={trackRef}>
        <div className="marquee__item">
          {items.map((it, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '24px' }}>
              {it.outline ? <span className="outline">{it.text}</span> : it.text}
              <span className="dot" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
