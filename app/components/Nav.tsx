'use client';
import Link from 'next/link';
import MagneticButton from './MagneticButton';
import { useCurtain } from './PageCurtain';

export default function Nav() {
  const curtain = useCurtain();

  const handleJump = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    curtain.transition(() => {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, id.toUpperCase());
  };

  return (
    <nav className="nav">
      <Link href="#top" className="nav__brand" onClick={(e) => handleJump(e, 'top')}>
        KHOA
        <span>STUDIO / 2026</span>
      </Link>
      <ul className="nav__links">
        <li>
          <MagneticButton>
            <a href="#work" onClick={(e) => handleJump(e, 'work')}>Work</a>
          </MagneticButton>
        </li>
        <li>
          <MagneticButton>
            <a href="#about" onClick={(e) => handleJump(e, 'about')}>About</a>
          </MagneticButton>
        </li>
        <li>
          <MagneticButton>
            <a href="#contact" onClick={(e) => handleJump(e, 'contact')}>Contact</a>
          </MagneticButton>
        </li>
      </ul>
    </nav>
  );
}
