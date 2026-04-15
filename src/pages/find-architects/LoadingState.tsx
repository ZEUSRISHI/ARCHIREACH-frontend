import { Skeleton } from "../ui/skeleton";

export function LoadingState() {
  return (
    <div className="flex-1">
      <div className="text-center mb-8">
        <p className="text-[#6B7280]">
          Finding perfect architects for you...
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white border border-[#E5E7EB] rounded-xl p-5">
            <div className="flex flex-col items-center text-center mb-4">
              <Skeleton className="w-24 h-24 rounded-full mb-3" />
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-4 w-40 mb-2" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex gap-2 mb-3">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-24" />
            </div>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-3" />
            <div className="grid grid-cols-3 gap-2 mb-3">
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
            </div>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3 mb-4" />
            <div className="flex gap-2">
              <Skeleton className="flex-1 h-9" />
              <Skeleton className="h-9 w-12" />
              <Skeleton className="h-9 w-12" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
