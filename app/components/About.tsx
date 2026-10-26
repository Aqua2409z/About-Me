'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function About() {
  const statementRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = statementRef.current;
    if (!el) return;

    // Split to words with mask
    const walk = (node: Node): DocumentFragment => {
      const frag = document.createDocumentFragment();
      node.childNodes.forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const words = (child.textContent || '').split(/(\s+)/);
          words.forEach((w) => {
            if (w.trim() === '') {
              frag.appendChild(document.createTextNode(w));
              return;
            }
            const outer = document.createElement('span');
            outer.className = 'w';
            const inner = document.createElement('span');
            inner.style.transform = 'translateY(110%)';
            inner.textContent = w;
            outer.appendChild(inner);
            frag.appendChild(outer);
          });
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          const htmlEl = child as HTMLElement;
          const outer = document.createElement('span');
          outer.className = 'w';
          const inner = document.createElement('span');
          inner.style.transform = 'translateY(110%)';
          inner.appendChild(htmlEl.cloneNode(true));
          outer.appendChild(inner);
          frag.appendChild(outer);
        }
      });
      return frag;
    };
    el.innerHTML = '';
    el.appendChild(walk(statementRef.current!.cloneNode(true)));

    // Grab references after rebuild
    const inners = el.querySelectorAll('.w > span');
    gsap.set(inners, { transform: 'translateY(110%)' });
    const tween = gsap.to(inners, {
      transform: 'translateY(0%)',
      duration: 1, ease: 'expo.out', stagger: 0.06,
      scrollTrigger: { trigger: el, start: 'top 80%' }
    });

    return () => { tween.scrollTrigger?.kill(); };
  }, []);

  return (
    <section className="section intro" id="about">
      <div className="eyebrow">Introduction · 02</div>

      <h2 className="intro__statement" ref={statementRef}>
        Sinh viên <span className="em">năm 3</span> ngành thiết kế — làm việc với con chữ, hệ thống, và những ý tưởng chưa hoàn chỉnh.
      </h2>

      <div className="intro__grid">
        <div className="intro__label">
          Practice<br />
          Est. 2024<br />
          Student / Freelance<br />
          HCMC, Vietnam
        </div>
        <div className="intro__body">
          <p>Mình là <em>Anh Khoa</em>, sinh viên năm 3 ngành Thiết kế Đồ họa / UI-UX. Mình đang khám phá giao điểm giữa <em>brand identity</em>, giao diện số và typography — tìm cách làm thiết kế vừa có hệ thống chặt chẽ vừa giữ được cảm xúc.</p>
          <p>Gần nhất mình phụ trách UI cho <em>AI Study Hub</em> (MindSpace) — nền tảng học tập cho sinh viên tích hợp quản lý tài liệu, trợ lý AI, quiz &amp; flashcard, cùng SWP TEAM 4. Ngoài ra mình nhận các brief freelance nhỏ (brand identity, poster, UI mockup) và đang tìm cơ hội <em>thực tập</em> tại các studio thiết kế hoặc đội product design.</p>
          <p>Ngoài giờ học mình đọc sách về typography, chơi với Figma, và viết blog nhỏ về design process.</p>
        </div>
      </div>
    </section>
  );
}
