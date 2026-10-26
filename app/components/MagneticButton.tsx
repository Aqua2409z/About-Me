'use client';
import { useEffect, useRef } from 'react';

export default function MagneticButton({ children, strength = 0.35 }: { children: React.ReactNode; strength?: number; }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const isTouch = window.matchMedia('(hover: none)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || reduced) return;

    let raf: number | null = null;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const tick = () => {
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;
      el.style.transform = `translate(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px)`;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      target.x = (e.clientX - cx) * strength;
      target.y = (e.clientY - cy) * strength;
    };
    const onLeave = () => { target.x = 0; target.y = 0; };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    tick();

    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength]);

  return <span ref={ref} style={{ display: 'inline-block', willChange: 'transform' }}>{children}</span>;
}
