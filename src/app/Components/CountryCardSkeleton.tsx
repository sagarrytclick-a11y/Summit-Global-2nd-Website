"use client"

export function CountryCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-pulse">
      <div className="p-6 pb-0">
        <div className="flex items-start justify-between mb-4">
          <div className="w-16 h-16 bg-slate-200 rounded-2xl" />
          <div className="flex flex-col gap-2">
            <div className="h-6 w-14 bg-slate-200 rounded-full" />
            <div className="h-6 w-16 bg-slate-200 rounded-full" />
          </div>
        </div>
        <div className="h-7 bg-slate-200 rounded w-2/3 mb-2" />
        <div className="h-4 bg-slate-200 rounded w-1/3" />
      </div>
      <div className="px-6 py-4">
        <div className="h-4 bg-slate-200 rounded w-full mb-2" />
        <div className="h-4 bg-slate-200 rounded w-5/6 mb-4" />
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="h-16 bg-slate-200 rounded-xl" />
          <div className="h-16 bg-slate-200 rounded-xl" />
        </div>
      </div>
      <div className="px-6 pb-6 pt-4 border-t border-slate-100">
        <div className="h-12 bg-slate-200 rounded-2xl" />
      </div>
    </div>
  );
}
