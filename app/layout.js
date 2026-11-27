import { Fraunces, Inter, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

const SITE_NAME   = 'Carraway Business Capital';
const TITLE       = 'Carraway Business Capital — Commercial Capital, Brokered with Intent';
const DESCRIPTION = 'Carraway Business Capital connects established businesses with the funding to grow — from working capital to acquisitions, structured around how you actually operate.';

// Favicon and Apple touch icon come from app/icon.png and app/apple-icon.png
// (Next.js App Router file conventions), so no `icons` entry is needed here.
export const metadata = {
  metadataBase: new URL('https://gocarraway.com'),
  title:       TITLE,
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type:        'website',
    url:         '/',
    siteName:    SITE_NAME,
    title:       TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card:        'summary',
    title:       TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
