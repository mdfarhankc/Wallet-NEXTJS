"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTransactions } from "@/hooks/useTransactions";
import { useTransactionsHistoryStore } from "@/stores/transactions-history";
import { Skeleton } from "../ui/skeleton";

export default function TransactionsTable() {
  const { dateRange } = useTransactionsHistoryStore();
  const { transactions, isLoading } = useTransactions(dateRange);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Date</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-40" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-4 w-16 ml-auto" />
              </TableCell>
            </TableRow>
          ))
        ) : transactions.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={4}
              className="text-center py-6 text-muted-foreground"
            >
              No transactions found in this date range.
            </TableCell>
          </TableRow>
        ) : (
          transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>
                {new Date(transaction.date).toLocaleDateString()}
              </TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell className="text-right">{transaction.amount}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
      {!isLoading && transactions.length > 0 && (
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right font-medium">
              {transactions.reduce((acc, tx) => acc + tx.amount, 0).toFixed(2)}
            </TableCell>
          </TableRow>
        </TableFooter>
      )}
    </Table>
  );
}
