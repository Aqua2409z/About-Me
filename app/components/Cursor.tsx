'use client';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

type Mode = 'default' | 'view' | 'link';
type CursorCtx = { set: (m: Mode) => void };
const Ctx = createContext<CursorCtx | null>(null);

export function useCursor() { return useContext(Ctx); }

export default function CursorProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>('default');
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100, tx: -100, ty: -100 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (isTouch) return;

    const onMove = (e: MouseEvent) => {
      pos.current.tx = e.clientX;
      pos.current.ty = e.clientY;
    };
    const tick = () => {
      pos.current.x += (pos.current.tx - pos.current.x) * 0.22;
      pos.current.y += (pos.current.ty - pos.current.y) * 0.22;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    window.addEventListener('mousemove', onMove);
    tick();
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const label =
    mode === 'view' ? 'VIEW' :
    mode === 'link' ? 'OPEN' : '';

  return (
    <Ctx.Provider value={{ set: setMode }}>
      <div
        ref={dotRef}
        className={`cursor${mode !== 'default' ? ' cursor--big' : ''}`}
        aria-hidden="true"
      />
      <div
        ref={labelRef}
        className={`cursor__label${mode !== 'default' ? ' is-visible' : ''}`}
        aria-hidden="true"
      >
        {label}
      </div>
      {children}
    </Ctx.Provider>
  );
}
