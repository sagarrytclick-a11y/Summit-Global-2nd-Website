"use client"

export function ExamCardSkeleton() {
  return (
    <div className="animate-pulse bg-white rounded-2xl border border-slate-200 p-6">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-slate-200 rounded-2xl" />
        <div className="flex-1">
          <div className="h-5 bg-slate-200 rounded w-2/3 mb-2" />
          <div className="h-4 bg-slate-200 rounded w-1/2 mb-3" />
          <div className="h-3 bg-slate-200 rounded w-full mb-1" />
          <div className="h-3 bg-slate-200 rounded w-4/5" />
        </div>
      </div>
    </div>
  );
}
