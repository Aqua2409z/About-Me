'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroWall from './HeroWall';
import MagneticButton from './MagneticButton';
import { useCurtain } from './PageCurtain';

declare global {
  interface Window { __preloaderLeft?: boolean }
}

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const curtain = useCurtain();

  const jump = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    curtain.transition(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, id.toUpperCase());
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(hover: none)').matches;

    // Split title into chars
    root.querySelectorAll<HTMLElement>('.motion__title-inner').forEach((inner) => {
      const text = inner.textContent || '';
      inner.textContent = '';
      for (const ch of text) {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = ch === ' ' ? ' ' : ch;
        inner.appendChild(span);
      }
    });

    const cleanups: (() => void)[] = [];

    const ctx = gsap.context(() => {
      const viewport = root.querySelector('.wall__viewport');
      const mouseEl  = root.querySelector('.wall__mouse');
      const scrollEl = root.querySelector('.wall__scroll');
      const cols     = root.querySelectorAll('.wall__colInner');
      const chars    = root.querySelectorAll('.motion__title .char');
      const fades    = root.querySelectorAll('.motion__pill, .hero3d__sub, .hero3d__cta');

      if (reduced) {
        gsap.set(chars, { opacity: 1 });
        return;
      }

      // Initial states
      gsap.set(viewport, { opacity: 0 });
      gsap.set(mouseEl,  { scale: 1.14 });
      gsap.set(cols,     { yPercent: 10, opacity: 0 });
      gsap.set(chars,    { y: 0, yPercent: 60, scale: 0.7, filter: 'blur(16px)', opacity: 0 });
      gsap.set(fades,    { y: 18, opacity: 0 });

      // Reveal (plays when preloader starts lifting)
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } });
      tl.to(viewport, { opacity: 1, duration: 1.6, ease: 'power2.out' }, 0)
        .to(mouseEl,  { scale: 1, duration: 2.8 }, 0)
        .to(cols,     { yPercent: 0, opacity: 1, duration: 1.9, stagger: { each: 0.09, from: 'center' } }, 0.1)
        .to(fades[0], { y: 0, opacity: 1, duration: 0.9 }, 0.55)
        .to(chars,    { yPercent: 0, scale: 1, filter: 'blur(0px)', opacity: 1, duration: 1.2, ease: 'back.out(1.5)', stagger: 0.045 }, 0.7)
        .to(fades[1], { y: 0, opacity: 1, duration: 1 }, 1.25)
        .to(fades[2], { y: 0, opacity: 1, duration: 1 }, 1.4);

      let started = false;
      const start = () => { if (!started) { started = true; tl.play(); } };
      if (window.__preloaderLeft) start();
      else window.addEventListener('preloader:leave', start, { once: true });
      const fallback = window.setTimeout(start, 4500);
      cleanups.push(() => { window.clearTimeout(fallback); window.removeEventListener('preloader:leave', start); });

      // Scroll: wall flattens + zooms, content drifts up and fades
      gsap.to(scrollEl, {
        rotationX: 14, scale: 1.12, yPercent: -6, ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 1 },
      });
      gsap.to('.hero3d__content', {
        yPercent: -22, opacity: 0, ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: '75% top', scrub: 1 },
      });

      // Mouse: gentle tilt of the whole wall + counter-parallax on content
      if (!isTouch) {
        const rx = gsap.quickTo(mouseEl, 'rotationX', { duration: 1.4, ease: 'power3.out' });
        const ry = gsap.quickTo(mouseEl, 'rotationY', { duration: 1.4, ease: 'power3.out' });
        const cx = gsap.quickTo('.hero3d__content', 'x', { duration: 1.2, ease: 'power3.out' });
        const onMove = (e: MouseEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          rx(-ny * 6);
          ry(nx * 8);
          cx(nx * -16);
        };
        window.addEventListener('mousemove', onMove);
        cleanups.push(() => window.removeEventListener('mousemove', onMove));
      }
    }, root);

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <section ref={rootRef} className="hero3d" id="top">
      <HeroWall />
      <div className="hero3d__vignette" aria-hidden="true" />

      <div className="hero3d__content">
        <div className="motion__pill">UI · UX · Design Student</div>
        <h1 className="motion__title">
          <span className="line"><span className="motion__title-inner">ANH</span></span>
          <span className="line"><span className="motion__title-inner">KHOA</span></span>
        </h1>
        <p className="hero3d__sub">
          Sinh viên năm 3 thiết kế <b>UI/UX</b> &amp; <b>brand identity</b>, sống ở TP.HCM.
        </p>
        <div className="hero3d__cta">
          <MagneticButton>
            <a href="#work" className="btn btn--primary" onClick={(e) => jump(e, 'work')}>
              Xem dự án <span aria-hidden="true">↓</span>
            </a>
          </MagneticButton>
          <MagneticButton>
            <a href="#contact" className="btn btn--ghost" onClick={(e) => jump(e, 'contact')}>
              Liên hệ
            </a>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
