import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";
import React from "react";
import CreateAccountDialog from "@/components/profile/CreateAccountDialog";
import AccountItem from "./AccountItem";
import { User } from "@prisma/client";

export default async function AccountsSection({ user }: { user: User }) {
  const accounts = await prisma.account.findMany({
    where: {
      userId: user.id,
    },
  });
  return (
    <Card className="w-2xs sm:w-xl md:w-3xl lg:w-5xl max-w-7xl mx-auto">
      <CardHeader className="flex flex-col sm:flex-row items-center justify-between">
        <div>
          <CardTitle className="text-3xl tracking-tighter sm:text-left text-center">
            {" - "}Accounts{" - "}
          </CardTitle>
          <CardDescription className="sm:text-left text-center">
            Manage your accounts, see their balances here.
          </CardDescription>
        </div>
        <CreateAccountDialog />
      </CardHeader>
      <CardContent>
        {accounts.length === 0 ? (
          <p className="text-center text-gray-500">
            No accounts found. Create one to get started!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {accounts.map((account) => (
              <AccountItem key={account.id} account={account} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
