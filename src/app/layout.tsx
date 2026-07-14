import type { Metadata, Viewport } from 'next';
import { Syne, Manrope } from 'next/font/google';
import './globals.css';
import { AmbientBackground } from '@/components/background/AmbientBackground';
import { SpotlightCursor } from '@/components/motion/SpotlightCursor';
import { ScrollToHash } from '@/components/motion/ScrollToHash';
import { profile } from '@/data/content';
import { getSiteUrl } from '@/lib/site';

const syne = Syne({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
});

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#050816' },
    { media: '(prefers-color-scheme: light)', color: '#050816' },
  ],
  colorScheme: 'dark',
};

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: `${profile.name} — ${profile.role}`,
  description: profile.tagline,
  keywords: [
    'WooCommerce Developer',
    'Next.js E-commerce',
    'Headless WooCommerce',
    'WordPress Developer',
    'Premium Online Store',
    'E-commerce Developer',
    'Upwork WooCommerce',
    'React Storefront',
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
    apple: [{ url: '/apple-icon', sizes: '180x180', type: 'image/png' }],
    shortcut: ['/icon.svg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${manrope.variable}`}>
      <body className={`${manrope.className} grain min-h-screen antialiased`}>
        <AmbientBackground />
        <SpotlightCursor />
        <ScrollToHash />
        {children}
      </body>
    </html>
  );
}
