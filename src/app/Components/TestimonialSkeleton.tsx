"use client"

export function TestimonialSkeleton() {
  return (
    <div className="animate-pulse rounded-3xl border border-slate-100 bg-white p-8">
      <div className="h-10 w-10 bg-slate-200 rounded mb-4" />
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-4 w-4 bg-slate-200 rounded" />
        ))}
      </div>
      <div className="space-y-2 mb-8">
        <div className="h-4 bg-slate-200 rounded w-full" />
        <div className="h-4 bg-slate-200 rounded w-5/6" />
        <div className="h-4 bg-slate-200 rounded w-4/6" />
      </div>
      <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
        <div className="h-14 w-14 bg-slate-200 rounded-full" />
        <div>
          <div className="h-4 bg-slate-200 rounded w-24 mb-2" />
          <div className="h-3 bg-slate-200 rounded w-32" />
        </div>
      </div>
    </div>
  );
}
