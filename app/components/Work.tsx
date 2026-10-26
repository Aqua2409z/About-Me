'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WorkCard, { Project } from './WorkCard';
import { AloFinance, KhoaType, NhipCafe } from './WorkVisuals';

const projects: Project[] = [
  {
    n: '01',
    tag: 'UI · Team Project',
    title: 'AI Study Hub — MindSpace',
    year: '2026',
    image: { src: '/projects/ai-study-hub.png', alt: 'AI Study Hub — MindSpace homepage with mascots' },
    link: 'https://github.com/SWP-TEAM-4/AI-Study-Hub',
  },
  {
    n: '02',
    tag: 'UI Design',
    title: 'Alo Finance — Mobile App',
    year: '2026',
    visual: AloFinance,
  },
  {
    n: '03',
    tag: 'Poster · Gradient',
    title: 'Today’s Poster — Vibrant Series',
    year: '2025',
    image: { src: '/projects/vibrant-poster.png', alt: 'Vibrant gradient poster design' },
  },
  {
    n: '04',
    tag: 'Type Design',
    title: 'Khoa Type — Personal',
    year: '2025',
    visual: KhoaType,
  },
  {
    n: '05',
    tag: 'Visual Identity',
    title: 'Nhịp Café — Local',
    year: '2024',
    visual: NhipCafe,
  },
];

export default function Work() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const isMobile = window.matchMedia('(max-width: 900px)').matches;
    if (isMobile) return;
    const pin = pinRef.current, track = trackRef.current;
    if (!pin || !track) return;

    const getDistance = () => track.scrollWidth - window.innerWidth + 40;
    const tween = gsap.to(track, {
      x: () => -getDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: pin, start: 'top top',
        end: () => '+=' + getDistance(),
        scrub: 1, pin: true, anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });

    return () => { tween.scrollTrigger?.kill(); };
  }, []);

  return (
    <section className="work" id="work">
      <div className="work__intro">
        <h2 className="work__title">
          Selected<span>Work</span>
        </h2>
        <div className="work__count">
          Featured Projects
          <b>05</b>
        </div>
      </div>
      <div className="work__pin" ref={pinRef}>
        <div className="work__track" ref={trackRef}>
          {projects.map((p) => <WorkCard key={p.n} project={p} />)}
        </div>
      </div>
    </section>
  );
}
