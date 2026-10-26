'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';

export default function Contact() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const spans = titleRef.current?.querySelectorAll<HTMLSpanElement>('.line span') ?? [];
    const tweens: gsap.core.Tween[] = [];
    spans.forEach((span, i) => {
      gsap.set(span, { yPercent: 110 });
      const t = gsap.to(span, {
        yPercent: 0, duration: 1.1, ease: 'expo.out', delay: i * 0.08,
        scrollTrigger: { trigger: titleRef.current!, start: 'top 70%' }
      });
      tweens.push(t);
    });
    return () => { tweens.forEach((t) => t.scrollTrigger?.kill()); };
  }, []);

  return (
    <section className="contact" id="contact">
      <div className="eyebrow">Contact · 05</div>
      <h2 className="contact__title" ref={titleRef}>
        <span className="line"><span>Let&apos;s</span></span>
        <span className="line"><span>work together</span></span>
      </h2>

      <MagneticButton>
        <a href="mailto:anhkhoa24092005@gmail.com" className="contact__email">
          anhkhoa24092005@gmail.com
        </a>
      </MagneticButton>

      <div className="contact__grid">
        <div className="contact__block">
          <h4>Email</h4>
          <p><a href="mailto:anhkhoa24092005@gmail.com">anhkhoa24092005@gmail.com</a></p>
        </div>
        <div className="contact__block">
          <h4>Social</h4>
          <p><a href="#">Instagram / @anhkhoa.studio</a></p>
          <p><a href="#">Behance / anhkhoa</a></p>
          <p><a href="#">Dribbble / anhkhoa</a></p>
        </div>
        <div className="contact__block">
          <h4>Available</h4>
          <p>Internship Q1 — Q3 2026<br />Freelance brand / UI</p>
        </div>
      </div>

      <div className="footer">
        <span>© 2026 Anh Khoa — Portfolio</span>
        <span>Made in HCMC · Next.js + GSAP</span>
      </div>
    </section>
  );
}
