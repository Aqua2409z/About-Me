// Realistic iOS-style app mockups rendered inside phone frames.
// Updated to include actual AI Study Hub content
import React from 'react';

/* ---------- tiny inline icons ---------- */
const Signal = () => (
  <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
    <rect x="0" y="5" width="2" height="3" rx="0.5" fill="currentColor"/>
    <rect x="3" y="3.5" width="2" height="4.5" rx="0.5" fill="currentColor"/>
    <rect x="6" y="2" width="2" height="6" rx="0.5" fill="currentColor"/>
    <rect x="9" y="0" width="2" height="8" rx="0.5" fill="currentColor" opacity="0.4"/>
  </svg>
);
const Wifi = () => (
  <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
    <path d="M5.5 7.2a0.9 0.9 0 100-1.8 0.9 0.9 0 000 1.8z" fill="currentColor"/>
    <path d="M2.4 4.2a4.4 4.4 0 016.2 0" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
    <path d="M0.8 2.6a6.7 6.7 0 019.4 0" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
  </svg>
);
const Battery = () => (
  <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
    <rect x="0.5" y="0.5" width="13" height="7" rx="2" stroke="currentColor" strokeOpacity="0.5"/>
    <rect x="2" y="2" width="9" height="4" rx="1" fill="currentColor"/>
    <rect x="14.2" y="2.6" width="1.3" height="2.8" rx="0.6" fill="currentColor" fillOpacity="0.5"/>
  </svg>
);
const PlayIcon = () => (<svg viewBox="0 0 12 12" fill="#0E0828"><path d="M3 2l7 4-7 4z"/></svg>);

function StatusBar({ time = '9:41' }: { time?: string }) {
  return (
    <div className="phone__status">
      <span>{time}</span>
      <span className="stat-icons"><Signal /><Wifi /><Battery /></span>
    </div>
  );
}

function PhoneFrame({ children, time }: { children: React.ReactNode; time?: string }) {
  return (
    <div className="phone">
      <div className="phone__screen">
        <div className="phone__island" />
        <StatusBar time={time} />
        {children}
        <div className="phone__home" />
      </div>
      <div className="phone__glare" />
    </div>
  );
}

/* ---------- App 1: Tasks / Workflow ---------- */
export function TasksApp() {
  return (
    <PhoneFrame time="9:41">
      <div className="sapp">
        <div className="sapp__head">
          <div>
            <div className="sapp__sub">Thursday</div>
            <div className="sapp__title">Your Workflow</div>
          </div>
          <div className="sapp__icon" style={{ background: 'linear-gradient(135deg,var(--blush),var(--magenta))' }} />
        </div>
        <div className="schip">4 of 7 done · Focus mode</div>
        <div className="sapp__list" style={{ marginTop: 2 }}>
          {[['var(--sapphire)', true], ['var(--blush)', true], ['var(--amber)', false], ['var(--plum)', false]].map(([c, done], i) => (
            <div className="srow" key={i}>
              <div className="srow__av" style={{ background: done ? (c as string) : 'transparent', border: done ? 'none' : '1.5px solid rgba(245,240,232,0.2)' }} />
              <div className="srow__mid">
                <div className="srow__l1" style={{ opacity: done ? 0.5 : 1 }} />
                <div className="srow__l2" />
              </div>
            </div>
          ))}
        </div>
        <div className="sbtn sbtn--grad" style={{ marginTop: 'auto' }}>+ New task</div>
      </div>
      <div className="stab">
        <div className="stab__i stab__i--on" /><div className="stab__i" /><div className="stab__i" /><div className="stab__i" />
      </div>
    </PhoneFrame>
  );
}

/* ---------- App 2: Music player ---------- */
export function MusicApp() {
  return (
    <PhoneFrame time="9:41">
      <div className="sapp" style={{ gap: 9 }}>
        <div className="sapp__head">
          <div className="sapp__sub">Now Playing</div>
          <div className="sapp__icon" />
        </div>
        <div className="sart" style={{ background: 'linear-gradient(145deg,var(--amber),var(--blush) 55%,var(--magenta))' }}>
          <div className="sart__glow" />
        </div>
        <div>
          <div className="sapp__title" style={{ fontSize: 13 }}>Midnight Drive</div>
          <div className="sapp__sub" style={{ textTransform: 'none' }}>Neon Avenue</div>
        </div>
        <div className="sprog" />
        <div className="splay">
          <div className="stab__i" style={{ width: 11, height: 11, background: 'rgba(245,240,232,0.4)' }} />
          <div className="splay__btn"><PlayIcon /></div>
          <div className="stab__i" style={{ width: 11, height: 11, background: 'rgba(245,240,232,0.4)' }} />
        </div>
      </div>
    </PhoneFrame>
  );
}

/* ---------- App 3: Finance ---------- */
export function FinanceApp() {
  return (
    <PhoneFrame time="9:41">
      <div className="sapp">
        <div className="sapp__head">
          <div>
            <div className="sapp__sub">Total balance</div>
            <div className="sapp__balance">$12,480<small>.50</small></div>
          </div>
          <div className="schip"><span style={{ color: '#6BE39A' }}>▲</span> 8.2%</div>
        </div>
        <svg className="sapp__chart" viewBox="0 0 160 42" preserveAspectRatio="none">
          <defs>
            <linearGradient id="finFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF6B8A" stopOpacity="0.35"/>
              <stop offset="100%" stopColor="#FF6B8A" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path d="M0 34 L20 28 L40 31 L60 20 L80 24 L100 12 L120 17 L140 7 L160 10 L160 42 L0 42 Z" fill="url(#finFill)"/>
          <path d="M0 34 L20 28 L40 31 L60 20 L80 24 L100 12 L120 17 L140 7 L160 10" fill="none" stroke="#FF6B8A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div className="sapp__list">
          {[['Spotify', '-$9.99', 'var(--plum)'], ['Salary', '+$2,400', 'var(--sapphire)'], ['Figma', '-$15.00', 'var(--magenta)']].map(([n, a, c], i) => (
            <div className="srow" key={i}>
              <div className="srow__av srow__av--round" style={{ background: c as string }} />
              <div className="srow__mid"><div className="srow__l1" /><div className="srow__l2" /></div>
              <div className={`srow__amt${(a as string).startsWith('+') ? ' srow__amt--up' : ''}`}>{a}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="stab">
        <div className="stab__i stab__i--on" /><div className="stab__i" /><div className="stab__i" /><div className="stab__i" />
      </div>
    </PhoneFrame>
  );
}

/* ---------- App 4: Chat ---------- */
export function ChatApp() {
  return (
    <PhoneFrame time="9:41">
      <div className="sapp" style={{ gap: 8 }}>
        <div className="sapp__head" style={{ paddingBottom: 6, borderBottom: '1px solid rgba(245,240,232,0.07)' }}>
          <div className="srow" style={{ gap: 6 }}>
            <div className="srow__av srow__av--round" style={{ width: 24, height: 24, background: 'linear-gradient(135deg,var(--blush),var(--amber))' }} />
            <div>
              <div className="sapp__title" style={{ fontSize: 11 }}>Mai Linh</div>
              <div className="sapp__sub" style={{ textTransform: 'none', color: '#6BE39A' }}>online</div>
            </div>
          </div>
          <div className="sapp__icon" style={{ width: 18, height: 18 }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
          <div className="sbub sbub--in"><span className="l" style={{ width: 50 }} /><span className="l" style={{ width: 34 }} /></div>
          <div className="sbub sbub--out"><span className="l" style={{ width: 44, background: 'rgba(255,255,255,0.7)' }} /></div>
          <div className="sbub sbub--in"><span className="l" style={{ width: 30 }} /></div>
          <div className="sbub sbub--out"><span className="l" style={{ width: 52, background: 'rgba(255,255,255,0.7)' }} /><span className="l" style={{ width: 28, background: 'rgba(255,255,255,0.7)' }} /></div>
        </div>
        <div style={{ height: 24, borderRadius: 12, background: 'rgba(245,240,232,0.08)' }} />
      </div>
    </PhoneFrame>
  );
}

/* ---------- App 5: Dashboard (wide) ---------- */
export function DashboardApp() {
  return (
    <div className="phone" style={{ borderRadius: 16, padding: 0 }}>
      <div className="phone__screen" style={{ borderRadius: 16, background: 'linear-gradient(150deg,#161033,#0A0818)' }}>
        <div className="dash">
          <div className="dash__head">
            <div className="dash__title">Finances</div>
            <div className="schip">This month</div>
          </div>
          <div className="dash__tile">
            <div className="dash__k">Revenue</div>
            <div className="dash__v">$48.2k</div>
            <div className="sapp__delta">▲ 12.4%</div>
          </div>
          <div className="dash__tile">
            <div className="dash__k">Spending</div>
            <div className="dash__v">$12.9k</div>
            <div className="sapp__delta" style={{ color: 'var(--blush)' }}>▼ 3.1%</div>
          </div>
          <div className="dash__big">
            <div className="dash__k">Cashflow · 7d</div>
            <svg viewBox="0 0 240 46" preserveAspectRatio="none" style={{ width: '100%', height: 46 }}>
              {[8, 20, 14, 30, 24, 38, 28].map((h, i) => (
                <rect key={i} x={10 + i * 32} y={46 - h} width="18" height={h} rx="3"
                  fill={i === 5 ? 'var(--amber)' : 'rgba(245,240,232,0.25)'} />
              ))}
            </svg>
          </div>
        </div>
      </div>
      <div className="phone__glare" style={{ borderRadius: 16 }} />
    </div>
  );
}

/* ---------- App 6: Widget (square) — fitness rings ---------- */
export function WidgetApp() {
  return (
    <div className="phone" style={{ borderRadius: 22, padding: 0 }}>
      <div className="phone__screen" style={{ borderRadius: 22 }}>
        <div className="widget">
          <div className="sapp__head">
            <div className="sapp__title" style={{ fontSize: 13 }}>Activity</div>
            <div className="sapp__sub">Today</div>
          </div>
          <div className="srings">
            <svg width="92" height="92" viewBox="0 0 92 92">
              {[[40, 'var(--blush)', 0.78], [31, 'var(--amber)', 0.62], [22, '#6BE39A', 0.9]].map(([r, c, p], i) => {
                const rad = r as number; const circ = 2 * Math.PI * rad;
                return (
                  <g key={i} transform="rotate(-90 46 46)">
                    <circle cx="46" cy="46" r={rad} fill="none" stroke="rgba(245,240,232,0.12)" strokeWidth="6" />
                    <circle cx="46" cy="46" r={rad} fill="none" stroke={c as string} strokeWidth="6" strokeLinecap="round"
                      strokeDasharray={`${circ * (p as number)} ${circ}`} />
                  </g>
                );
              })}
            </svg>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div><div className="dash__v" style={{ fontSize: 15 }}>8.2k</div><div className="dash__k">steps</div></div>
            <div><div className="dash__v" style={{ fontSize: 15 }}>540</div><div className="dash__k">kcal</div></div>
          </div>
        </div>
      </div>
      <div className="phone__glare" style={{ borderRadius: 22 }} />
    </div>
  );
}

/* ---------- AI Study Hub Content ---------- */
export function AiHubHero() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      padding: 16,
      background: 'linear-gradient(135deg, #0A0818 0%, #1A1046 50%, #161033 100%)',
      textAlign: 'center',
      color: 'rgba(245, 240, 232, 0.95)',
      fontFamily: 'var(--font-space-grotesk), sans-serif',
      fontSize: 13,
      lineHeight: 1.4,
      gap: 12
    }}>
      <div style={{ fontSize: 20, fontWeight: 700, color: '#00FF88', letterSpacing: 1 }}>MIND SPACE</div>
      <div style={{ fontSize: 11, opacity: 0.7, textTransform: 'uppercase' }}>Next-gen Knowledge</div>
      <div style={{ fontSize: 12, color: '#00FF88', marginTop: 8 }}>BEYOND EARTH AND ITS FAMILIAR BOUNDARIES</div>
      <div style={{ fontSize: 10, opacity: 0.6, marginTop: 4 }}>Academic Odyssey</div>
    </div>
  );
}

export function AiHubPoster() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      padding: 12,
      background: 'linear-gradient(135deg, #FF6B8A 0%, #D64B9F 50%, #2454FF 100%)',
      borderRadius: 12,
      color: 'white',
      fontFamily: 'var(--font-space-grotesk), sans-serif',
      textAlign: 'center',
      gap: 8
    }}>
      <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: -0.5 }}>AI STUDY</div>
      <div style={{ fontSize: 14, fontWeight: 600, opacity: 0.9 }}>HUB</div>
      <div style={{ fontSize: 9, opacity: 0.8, marginTop: 6, letterSpacing: 1 }}>LEARNING EVOLUTION</div>
      <div style={{ 
        width: 24, 
        height: 24, 
        borderRadius: '50%', 
        background: 'rgba(255,255,255,0.2)', 
        marginTop: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 12
      }}>✨</div>
    </div>
  );
}
