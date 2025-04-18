import TransactionsHeader from "@/components/transactions/TransactionsHeader";
import TransactionsSection from "@/components/transactions/TransactionsSection";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transaction",
};

export default async function TransactionsPage() {
  return (
    <main className="flex-1 px-4 py-3">
      <TransactionsHeader />
      <Separator />
      <TransactionsSection />
    </main>
  );
}
