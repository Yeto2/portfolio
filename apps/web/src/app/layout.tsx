import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Senior Backend & AI Systems Engineer | Portfolio',
  description:
    'Production backends, real-time systems, SaaS platforms, and AI integrations. Node.js, PostgreSQL, Stripe, WebSockets, RAG.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased selection:bg-indigo-500/30">
        {children}
      </body>
    </html>
  );
}
