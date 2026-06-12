export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-px w-12 overflow-hidden bg-white/10">
          <div className="h-full w-full origin-left animate-[shimmer_1.2s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
        </div>
        <p className="text-[0.625rem] font-medium uppercase tracking-[0.25em] text-slate-600">
          Loading
        </p>
      </div>
    </div>
  );
}
