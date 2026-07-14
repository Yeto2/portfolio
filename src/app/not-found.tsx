import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
      <p className="font-mono text-sm tracking-[0.2em] text-blue-400/80">404</p>
      <h1 className="mt-3 font-display text-4xl text-white">Page not found</h1>
      <p className="mt-3 max-w-md text-slate-400">This page does not exist or was moved.</p>
      <Link
        href="/"
        className="mt-8 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-500"
      >
        Back home
      </Link>
    </div>
  );
}
