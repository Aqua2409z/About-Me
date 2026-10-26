'use client';
import { createContext, useContext, useRef, useState } from 'react';

type CurtainCtx = { transition: (fn: () => void, label?: string) => void };
const Ctx = createContext<CurtainCtx | null>(null);
export function useCurtain() {
  const c = useContext(Ctx);
  if (!c) return { transition: (fn: () => void) => fn() };
  return c;
}

export default function CurtainProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<'idle' | 'in' | 'out'>('idle');
  const [label, setLabel] = useState('');
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const transition = (fn: () => void, nextLabel: string = '') => {
    // Guard against overlapping transitions
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setLabel(nextLabel);
    setState('in');
    timers.current.push(setTimeout(() => {
      fn();
      setState('out');
    }, 650));
    timers.current.push(setTimeout(() => {
      setState('idle');
    }, 1650));
  };

  const cls =
    state === 'in'  ? 'pageCurtain is-entering' :
    state === 'out' ? 'pageCurtain is-leaving'  :
    'pageCurtain';

  return (
    <Ctx.Provider value={{ transition }}>
      <div className={cls} aria-hidden="true">
        <div className="pageCurtain__label">{label}</div>
      </div>
      {children}
    </Ctx.Provider>
  );
}
