"use client";

import { Button } from "@/components/ui/button";
import DeleteDialog from "@/components/common/DeleteDialog";
import { toast } from "sonner";
import { deleteProfileAction } from "@/app/(main)/profile/actions";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function DeleteProfileDialog() {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      toast.loading("User deleting ...", {
        id: "user-deletion",
      });
      await deleteProfileAction();
      await signOut({ callbackUrl: "/" });
      toast.success("User deleted successfully.", {
        id: "user-deletion",
      });
      router.replace("/sign-in");
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
      deleteText="Delete Account"
      trigger={<Button variant={"destructive"}>Delete Account</Button>}
    />
  );
}
