'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCursor } from './Cursor';

export type Project = {
  n: string;
  tag: string;
  title: string;
  year: string;
  /** SVG inline visual (left mock projects) */
  visual?: React.ReactNode;
  /** Image-based visual: path under /public (e.g. "/projects/ai-study-hub.png") */
  image?: { src: string; alt: string };
  /** Optional link */
  link?: string;
};

export default function WorkCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const cursor = useCursor();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = visualRef.current;
    if (!el) return;
    gsap.set(el, { clipPath: 'polygon(0 100%, 0 100%, 0 100%, 0 100%)' });
    const tween = gsap.to(el, {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      duration: 1.4, ease: 'expo.out',
      scrollTrigger: { trigger: cardRef.current!, start: 'left 85%' }
    });
    return () => { tween.scrollTrigger?.kill(); };
  }, []);

  const Inner = (
    <>
      <div ref={visualRef} className="work__visual">
        <span className="work__visual-tag">{project.n} · {project.tag}</span>
        {project.image ? (
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="(max-width: 900px) 100vw, 72vw"
            style={{ objectFit: 'cover' }}
            priority={project.n === '01'}
          />
        ) : project.visual}
        <div className="work__visual-overlay" />
      </div>
      <div className="work__meta">
        <h3>{project.title}</h3>
        <span className="year">{project.year}</span>
      </div>
    </>
  );

  const handleEnter = () => cursor?.set('view');
  const handleLeave = () => cursor?.set('default');

  if (project.link) {
    return (
      <article
        ref={cardRef}
        className="work__card"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ display: 'contents' }}>
          {Inner}
        </a>
      </article>
    );
  }

  return (
    <article
      ref={cardRef}
      className="work__card"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {Inner}
    </article>
  );
}
