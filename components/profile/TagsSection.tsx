import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";
import CreateTagDialog from "./CreateTagDialog";
import TagItem from "./TagItem";
import { User } from "@prisma/client";

export default async function TagsSection({ user }: { user: User }) {
  const tags = await prisma.tag.findMany({
    where: {
      userId: user.id,
    },
  });
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
        {tags.length === 0 ? (
          <p className="text-center text-gray-500">
            No tags found. Create one to get started!
          </p>
        ) : (
          <div className="flex flex-wrap gap-3 items-center justify-center sm:items-start sm:justify-start">
            {tags.map((tag, index) => (
              <TagItem key={tag.id} tag={tag} index={index} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
