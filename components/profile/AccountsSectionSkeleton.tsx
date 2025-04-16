// AccountsSectionSkeleton.tsx
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AccountsSectionSkeleton() {
  return (
    <Card className="w-2xs sm:w-xl md:w-3xl lg:w-5xl max-w-7xl mx-auto">
      <CardHeader className="flex flex-col sm:flex-row items-center justify-between">
        <div>
          <CardTitle className="text-3xl tracking-tighter">
            {" - "}Accounts{" - "}
          </CardTitle>
          <CardDescription>
            Manage your accounts, see their balances here.
          </CardDescription>
        </div>
        <Skeleton className="h-10 w-32 rounded-md" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-40 w-full rounded-md" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
