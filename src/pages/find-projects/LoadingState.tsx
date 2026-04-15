import { Skeleton } from '../ui/skeleton';

export function LoadingState() {
  return (
    <div className="flex-1 p-6">
      <div className="mb-6 text-center">
        <p className="text-sm text-[#6B7280]">Finding perfect projects for you...</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="bg-white border border-[#E5E7EB] rounded-xl p-5 space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>

            <div className="flex gap-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-16" />
            </div>

            <Skeleton className="h-12 w-full" />

            <div className="grid grid-cols-3 gap-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>

            <Skeleton className="h-9 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
