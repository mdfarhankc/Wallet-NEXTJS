import React from "react";
import { Metadata } from "next";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CreateTransactionDialog from "@/components/transactions/CreateTransactionDialog";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const session = await auth();

  return (
    <main className="flex-1 px-5">
      <section className="max-w-7xl container mx-auto flex flex-wrap justify-between items-center gap-2 py-5">
        <div id="user-info">
          <p className="text-2xl font-normal italic">Hey,</p>
          <p className="text-3xl font-extrabold text-gold font-sans tracking-tight">
            {session?.user?.name}!
          </p>
        </div>
        <div id="create-transaction" className="flex items-center gap-3">
          <CreateTransactionDialog
            type="income"
            trigger={<Button variant={"success"}>New Income</Button>}
          />
          <CreateTransactionDialog
            type="expense"
            trigger={<Button variant={"destructive"}>New Expense</Button>}
          />
        </div>
      </section>
      <Separator />
    </main>
  );
}
