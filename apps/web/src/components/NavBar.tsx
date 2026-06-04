import Link from 'next/link';

export default function NavBar({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('');

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-white">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-500 text-sm">
            {initials}
          </span>
          <span className="hidden sm:inline">{name}</span>
        </Link>
        <div className="flex items-center gap-6 text-sm text-zinc-300">
          <Link href="/#about" className="hover:text-white">About</Link>
          <Link href="/#services" className="hidden hover:text-white sm:inline">Services</Link>
          <Link href="/#projects" className="hover:text-white">Work</Link>
          <Link
            href="/#contact"
            className="rounded-lg bg-indigo-500 px-4 py-2 font-semibold text-white transition hover:bg-indigo-400"
          >
            Hire me
          </Link>
        </div>
      </div>
    </nav>
  );
}
