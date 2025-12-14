"use client";

import { differenceInDays } from "date-fns";
import { DateRangePicker } from "../ui/date-range-picker";
import { toast } from "sonner";
import { useTransactionsHistoryStore } from "@/stores/transactions-history";
import { MAX_DATE_RANGE_DAYS } from "@/lib/constants";
import CreateTransactionDialog from "./CreateTransactionDialog";
import { Button } from "../ui/button";

export default function TransactionsHeader() {
  const { dateRange, setDateRange } = useTransactionsHistoryStore();

  return (
    <section className="max-w-7xl mx-auto container flex flex-wrap items-center justify-between gap-6 py-8">
      <h1 className="text-xl md:text-3xl font-bold">Transactions History</h1>
      <div className="flex flex-wrap gap-2">
        <DateRangePicker
          initialDateFrom={dateRange.from}
          initialDateTo={dateRange.to}
          showCompare={false}
          onUpdate={(values) => {
            const { from, to } = values.range;

            if (!from || !to) return;
            if (differenceInDays(to, from) > MAX_DATE_RANGE_DAYS) {
              toast.error(
                `The selected date range is too big. Max allowed range is ${MAX_DATE_RANGE_DAYS} days!`
              );
              return;
            }
            setDateRange({ from, to });
          }}
        />
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
  );
}
