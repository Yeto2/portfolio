import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow justify-center">404</p>
      <h1 className="mt-6 font-display text-4xl text-white">Page not found</h1>
      <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_32px_-8px_rgba(37,99,235,0.55)] transition-colors hover:bg-blue-500"
      >
        Back to home
      </Link>
    </main>
  );
}
