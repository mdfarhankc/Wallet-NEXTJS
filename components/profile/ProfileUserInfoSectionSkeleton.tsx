import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileUserInfoSectionSkeleton() {
  return (
    <section className="max-w-7xl mx-auto container space-y-3">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-8 text-center sm:text-left">
        {/* Avatar Skeleton */}
        <Skeleton className="w-48 h-48 rounded-full" />
        {/* Info Skeleton */}
        <div className="flex flex-col space-y-4 w-60">
          {[...Array(4)].map((_, idx) => (
            <div key={idx}>
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-6 w-60" />
            </div>
          ))}
          {/* Buttons Skeleton */}
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
    </section>
  );
}
