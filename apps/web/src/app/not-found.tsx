import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-medium uppercase tracking-widest text-blue-400">404</p>
      <h1 className="mt-3 text-3xl font-bold text-white">Page not found</h1>
      <p className="mt-3 max-w-md text-slate-400">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 text-sm font-semibold text-white transition hover:from-blue-500 hover:to-blue-400"
      >
        Back to home
      </Link>
    </main>
  );
}
