import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateTagDialog from "@/components/profile/CreateTagDialog";
import { Skeleton } from "@/components/ui/skeleton";

export default async function TagsSectionSkeleton() {
  return (
    <Card className="w-2xs sm:w-xl md:w-3xl lg:w-5xl max-w-7xl mx-auto">
      <CardHeader className="flex flex-col sm:flex-row items-center justify-between">
        <div>
          <CardTitle className="text-3xl tracking-tighter sm:text-left text-center">
            {" - "}Tags{" - "}
          </CardTitle>
          <CardDescription className="sm:text-left text-center">
            Manage your tags here.
          </CardDescription>
        </div>
        <CreateTagDialog />
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3 items-center justify-center sm:items-start sm:justify-start">
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-[40px] w-[85px] rounded-md flex items-center justify-center"
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
