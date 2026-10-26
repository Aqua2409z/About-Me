'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Progress() {
  const fillRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const st = ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: (self) => {
        if (fillRef.current) fillRef.current.style.width = (self.progress * 100) + '%';
      }
    });
    return () => { st.kill(); };
  }, []);
  return (
    <div className="progress">
      <div ref={fillRef} className="progress__fill" />
    </div>
  );
}
