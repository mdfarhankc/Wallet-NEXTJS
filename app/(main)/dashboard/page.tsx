import React from "react";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const session = await auth();
  
  return (
    <main className="flex-1 px-5">
      <section className="max-w-7xl container mx-auto flex flex-wrap justify-between items-center gap-2">
        <div id="user-info">
          <p className="text-2xl font-normal">Hey,</p>
          <p className="text-3xl font-extrabold text-gold font-sans">
            {session?.user?.name}!
          </p>
        </div>
        <div id="create-transaction" className="flex items-center gap-3">
          <Button>New Income</Button>
          <Button>New Expense</Button>
        </div>
      </section>
    </main>
  );
}
