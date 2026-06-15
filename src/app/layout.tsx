import type { Metadata } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
import './globals.css';
import { AmbientBackground } from '@/components/background/AmbientBackground';
import { profile } from '@/data/content';
import { getSiteUrl } from '@/lib/site';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-instrument',
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: `${profile.name} — ${profile.role}`,
  description: profile.tagline,
  keywords: [
    'Full Stack Developer',
    'Frontend Developer',
    'Backend Developer',
    'WordPress Developer',
    'WooCommerce Developer',
    'Shopify Developer',
    'Node.js',
    'React',
    'Next.js',
    'TypeScript',
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-icon.svg', type: 'image/svg+xml' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${instrument.variable}`}>
      <body className={`${inter.className} grain min-h-screen antialiased`}>
        <AmbientBackground />
        {children}
      </body>
    </html>
  );
}
