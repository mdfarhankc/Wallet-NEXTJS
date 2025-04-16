import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateCategoryDialog from "@/components/profile/CreateCategoryDialog";
import { Skeleton } from "@/components/ui/skeleton";

export default async function CategoriesSectionSkeleton() {
  return (
    <Card className="w-2xs sm:w-xl md:w-3xl lg:w-5xl max-w-7xl mx-auto">
      <CardHeader className="flex flex-col sm:flex-row items-center justify-between">
        <div>
          <CardTitle className="text-3xl tracking-tighter sm:text-left text-center">
            {" - "}Categories{" - "}
          </CardTitle>
          <CardDescription className="sm:text-left text-center">
            Manage your categories here.
          </CardDescription>
        </div>
        <CreateCategoryDialog />
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
