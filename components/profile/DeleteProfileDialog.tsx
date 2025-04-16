"use client";

import { Button } from "@/components/ui/button";
import DeleteDialog from "@/components/common/DeleteDialog";
import { toast } from "sonner";
import { deleteProfileAction } from "@/app/(main)/profile/actions";

export default function DeleteProfileDialog() {
  const handleDelete = async () => {
    try {
      toast.loading("User deleting ...", {
        id: "user-deletion",
      });
      await deleteProfileAction();
      toast.success("User deleted successfully.", {
        id: "user-deletion",
      });
    } catch (error) {
      if (error instanceof Error)
        toast.error(error.message, {
          id: "user-deletion",
        });
      else
        toast.error("Something went wrong!", {
          id: "user-deletion",
        });
    }
  };

  return (
    <DeleteDialog
      onDelete={handleDelete}
      title="wallet account"
      trigger={<Button variant={"destructive"}>Delete Account</Button>}
    />
  );
}
