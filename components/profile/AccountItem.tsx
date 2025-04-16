"use client";

import { toast } from "sonner";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Account } from "@prisma/client";
import DeleteDialog from "@/components/common/DeleteDialog";
import { deleteAccountAction } from "@/app/(main)/profile/actions";

export default function AccountItem({ account }: { account: Account }) {
  const handleDelete = async () => {
    try {
      toast.loading("Account deleting ...", {
        id: "account-deletion",
      });
      await deleteAccountAction(account.id);
      toast.success("Account deleted successfully.", {
        id: "account-deletion",
      });
    } catch (error) {
      if (error instanceof Error)
        toast.error(error.message, {
          id: "account-deletion",
        });
      else
        toast.error("Something went wrong!", {
          id: "account-deletion",
        });
    }
  };
  return (
    <Card className="w-full bg-accent shadow-xl">
      <CardHeader>
        <CardTitle className="font-bold text-center">
          {account.icon}
          {account.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="font-bold text-center">
        Balance: {account.balance}
      </CardContent>
      <CardFooter>
        <DeleteDialog title="account" onDelete={handleDelete} />
      </CardFooter>
    </Card>
  );
}
