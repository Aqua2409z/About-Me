'use client';
import { useState } from 'react';
import SmoothScroll from './components/SmoothScroll';
import Preloader from './components/Preloader';
import Nav from './components/Nav';
import CornerLabels from './components/CornerLabels';
import Progress from './components/Progress';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Work from './components/Work';
import Statement from './components/Statement';
import Contact from './components/Contact';
import CursorProvider from './components/Cursor';
import CurtainProvider from './components/PageCurtain';
import NoiseShader from './components/NoiseShader';

export default function Page() {
  const [ready, setReady] = useState(false);

  return (
    <CursorProvider>
      <CurtainProvider>
        <SmoothScroll>
          <NoiseShader />
          <Preloader onDone={() => setReady(true)} />
          <Nav />
          <CornerLabels />
          <Progress />

          <main style={{ position: 'relative', zIndex: 1 }}>
            <Hero />
            <Marquee />
            <About />
            <Work />
            <Statement />
            <Contact />
          </main>
        </SmoothScroll>
      </CurtainProvider>
    </CursorProvider>
  );
}
