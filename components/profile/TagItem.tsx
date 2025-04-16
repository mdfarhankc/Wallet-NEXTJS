"use client";

import { Button } from "@/components/ui/button";
import { Tag } from "@prisma/client";
import { X } from "lucide-react";
import React from "react";
import { deleteTagAction } from "@/app/(main)/profile/actions";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import DeleteDialog from "@/components/common/DeleteDialog";
import { cn } from "@/lib/utils";

export default function TagItem({ tag, index }: { tag: Tag; index: number }) {
  const handleDelete = async () => {
    try {
      toast.loading("Tag deleting ...", {
        id: "tag-deletion",
      });
      await deleteTagAction(tag.id);
      toast.success("Tag deleted successfully.", {
        id: "tag-deletion",
      });
    } catch (error) {
      if (error instanceof Error)
        toast.error(error.message, {
          id: "tag-deletion",
        });
      else
        toast.error("Something went wrong!", {
          id: "tag-deletion",
        });
    }
  };

  const badgeColors = [
    "bg-red-500/10 hover:bg-red-500/20 text-red-500",
    "bg-green-500/10 hover:bg-green-500/20 text-green-500",
    "bg-blue-500/10 hover:bg-blue-500/20 text-blue-500",
    "bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500",
    "bg-purple-500/10 hover:bg-purple-500/20 text-purple-500",
    "bg-pink-500/10 hover:bg-pink-500/20 text-pink-500",
    "bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-500",
    "bg-orange-500/10 hover:bg-orange-500/20 text-orange-500",
    "bg-gray-500/10 hover:bg-gray-500/20 text-gray-500",
  ];

  const badgeColor = () => {
    return badgeColors[index % badgeColors.length];
  };

  return (
    <Badge className={cn("flex items-center gap-2", badgeColor())}>
      {tag.name}
      <DeleteDialog
        onDelete={handleDelete}
        title="tag"
        trigger={
          <Button variant="ghost" size="sm">
            <X size={3} />
          </Button>
        }
      />
    </Badge>
  );
}
