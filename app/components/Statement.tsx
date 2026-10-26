'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const WORDS = 'Thiết kế là lắng nghe, cắt bỏ, rồi dám để lại khoảng trống đúng chỗ.'.split(/\s+/);
const HOLLOW_INDICES = new Set([1, 4]); // "là" and "cắt" become outlined

export default function Statement() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = containerRef.current;
    if (!el) return;
    const spans = el.querySelectorAll<HTMLSpanElement>('.word > span');
    const tween = gsap.to(spans, {
      opacity: 1, color: 'var(--cream)',
      duration: 0.6, stagger: 0.08, ease: 'power3.out',
      scrollTrigger: {
        trigger: el, start: 'top 70%', end: 'bottom 40%', scrub: 1,
      }
    });
    return () => { tween.scrollTrigger?.kill(); };
  }, []);

  return (
    <section className="statement__pin">
      <div className="statement" ref={containerRef} id="statementText">
        {WORDS.map((w, i) => (
          <span key={i} className="word">
            <span className={HOLLOW_INDICES.has(i) ? 'hollow' : ''}>{w}</span>
          </span>
        ))}
      </div>
    </section>
  );
}
