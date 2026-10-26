// 3D isometric "screen wall" behind the hero title.
// Updated to display AI Study Hub content
// Structure (each layer owns ONE kind of transform, so nothing fights):
//   .wall__viewport  perspective + edge mask      (GSAP: opacity reveal)
//   .wall__mouse     preserve-3d                  (GSAP: mouse tilt + reveal scale)
//   .wall__scroll    preserve-3d                  (GSAP: scroll scrub)
//   .wall            CSS base isometric transform (never touched by JS)
//   .wall__col       CSS drift animation          (never touched by JS)
//   .wall__colInner  GSAP column rise-in on load
import type { CSSProperties } from 'react';
import { TasksApp, MusicApp, FinanceApp, ChatApp, DashboardApp, WidgetApp, AiHubHero, AiHubPoster } from './MockupScreens';

type Kind = 'tasks' | 'music' | 'finance' | 'chat' | 'dash' | 'widget' | 'aihub-hero' | 'aihub-poster';

const COLUMNS: { items: Kind[]; dur: number; delay: number; amp: number }[] = [
  { items: ['tasks', 'aihub-hero', 'music', 'widget', 'finance'], dur: 17, delay: -3,  amp:  70 },
  { items: ['dash', 'chat', 'aihub-poster', 'tasks', 'aihub-hero'],     dur: 21, delay: -9,  amp: -80 },
  { items: ['finance', 'widget', 'aihub-hero', 'chat', 'music'],  dur: 15, delay: -6,  amp:  60 },
  { items: ['aihub-poster', 'music', 'dash', 'finance', 'widget'],dur: 19, delay: -12, amp: -75 },
  { items: ['chat', 'aihub-hero', 'tasks', 'aihub-poster', 'dash'],     dur: 16, delay: -2,  amp:  65 },
  { items: ['music', 'finance', 'widget', 'aihub-hero', 'chat'],  dur: 22, delay: -14, amp: -85 },
  { items: ['widget', 'tasks', 'aihub-poster', 'music', 'aihub-hero'],  dur: 18, delay: -7,  amp:  70 },
];

function Item({ kind }: { kind: Kind }) {
  switch (kind) {
    case 'tasks':   return <div className="wall__item wall__item--phone"><TasksApp /></div>;
    case 'music':   return <div className="wall__item wall__item--phone"><MusicApp /></div>;
    case 'finance': return <div className="wall__item wall__item--phone"><FinanceApp /></div>;
    case 'chat':    return <div className="wall__item wall__item--phone"><ChatApp /></div>;
    case 'dash':    return <div className="wall__item wall__item--dash"><DashboardApp /></div>;
    case 'widget':  return <div className="wall__item wall__item--square"><WidgetApp /></div>;
    case 'aihub-hero':    return <div className="wall__item"><AiHubHero /></div>;
    case 'aihub-poster':  return <div className="wall__item wall__item--square"><AiHubPoster /></div>;
  }
}

export default function HeroWall() {
  return (
    <div className="wall__viewport" aria-hidden="true">
      <div className="wall__mouse">
        <div className="wall__scroll">
          <div className="wall">
            {COLUMNS.map((c, i) => (
              <div
                className="wall__col"
                key={i}
                style={{ '--dur': `${c.dur}s`, '--delay': `${c.delay}s`, '--amp': `${c.amp}px` } as CSSProperties}
              >
                <div className="wall__colInner">
                  {c.items.map((k, j) => <Item key={j} kind={k} />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
