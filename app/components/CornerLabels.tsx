'use client';
import { useEffect, useState } from 'react';

function pad(n: number) { return n.toString().padStart(2, '0'); }

function nowHCMC() {
  const now = new Date();
  // UTC+7 (Asia/Ho_Chi_Minh)
  const u = new Date(now.getTime() + now.getTimezoneOffset() * 60000 + 7 * 3600000);
  return `${pad(u.getHours())}:${pad(u.getMinutes())}:${pad(u.getSeconds())}`;
}

export default function CornerLabels() {
  const [clock, setClock] = useState('--:--:--');
  useEffect(() => {
    const update = () => setClock(nowHCMC());
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <>
      <div className="corner corner--bl">© 2026 Anh Khoa · HCMC · VN</div>
      <div className="corner corner--br">{clock} ICT</div>
    </>
  );
}
