'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Preloader({ onDone }: { onDone?: () => void }) {
  const [count, setCount] = useState(0);
  const [barWidth, setBarWidth] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obj = { v: 0 };
    const tl = gsap.timeline();
    tl.to(obj, {
      v: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => {
        const val = Math.round(obj.v);
        setCount(val);
        setBarWidth(val);
      },
    })
      .add(() => {
        setLeaving(true);
        window.__preloaderLeft = true;
        window.dispatchEvent(new Event('preloader:leave'));
      })
      .to([rootRef.current, curtainRef.current], {
        yPercent: -100,
        duration: 1.35,
        ease: 'expo.inOut',
        stagger: 0.12,
        onComplete: () => {
          if (rootRef.current) rootRef.current.style.display = 'none';
          if (curtainRef.current) curtainRef.current.style.display = 'none';
          onDone?.();
        },
      }, '+=0.25');

    return () => { tl.kill(); };
  }, [onDone]);

  const padded = count.toString().padStart(3, '0');

  return (
    <>
      <div ref={rootRef} className={`preloader${leaving ? ' is-leaving' : ''}`} aria-hidden="true">
        <div className="preloader__count">{padded}</div>
        <div className="preloader__label">
          LOADING PORTFOLIO<br />
          <span>ANH KHOA · 2026</span>
        </div>
        <div className="preloader__bar" style={{ width: `${barWidth}%` }} />
      </div>
      <div ref={curtainRef} className="preloader__curtain" />
    </>
  );
}
