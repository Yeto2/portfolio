import { profile } from '@/data/content';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-semibold text-white">{profile.name}</p>
          <p className="mt-1 text-sm text-slate-500">{profile.role} · {profile.location}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {profile.social.map((s) => (
            <a
              key={s.label}
              href={s.url}
              className="text-sm text-slate-400 transition hover:text-blue-400"
              {...(s.url.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {s.label}
            </a>
          ))}
        </div>
        <p className="text-sm text-slate-600">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
}
