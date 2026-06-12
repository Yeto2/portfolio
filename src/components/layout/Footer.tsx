import { profile } from '@/data/content';
import { SectionDivider } from '@/components/ui';

export default function Footer() {
  return (
    <footer className="px-5 pb-10 pt-8 sm:px-6">
      <div className="mx-auto max-w-[var(--content-max)]">
        <SectionDivider />
        <div className="mt-10 flex flex-col items-center justify-between gap-8 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="font-display text-lg text-white">{profile.name}</p>
            <p className="mt-1 text-sm text-slate-600">
              {profile.role} · {profile.location}
            </p>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2" aria-label="Footer">
            {profile.social.map((s) => (
              <a
                key={s.label}
                href={s.url}
                className="link-underline text-sm text-slate-500 transition-colors hover:text-slate-200"
                {...(s.url.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {s.label}
              </a>
            ))}
          </nav>
          <p className="text-xs text-slate-700">
            © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
