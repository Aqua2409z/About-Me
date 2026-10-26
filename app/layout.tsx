import type { Metadata } from 'next';
import { Anton, Space_Grotesk, Instrument_Serif, Pixelify_Sans } from 'next/font/google';
import './globals.css';

const anton = Anton({
  weight: '400',
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  variable: '--font-anton',
  display: 'swap',
});

const space = Space_Grotesk({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  variable: '--font-space',
  display: 'swap',
});

const instrument = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
});

const pixelify = Pixelify_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-pixel',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Anh Khoa — Portfolio 2026',
  description: 'Portfolio của Anh Khoa — sinh viên năm 3 ngành thiết kế đồ họa & UI/UX. Brand identity, UI design, type experiments. Based in Ho Chi Minh City.',
  openGraph: {
    title: 'Anh Khoa — Portfolio 2026',
    description: 'Sinh viên năm 3 thiết kế đồ họa & UI-UX. Based in HCMC.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${anton.variable} ${space.variable} ${instrument.variable} ${pixelify.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body>{children}</body>
    </html>
  );
}
