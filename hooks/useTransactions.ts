import { DateToUTCDate } from "@/lib/utils";
import { DateRange } from "@/stores/transactions-history";
import { Transaction } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";


export const useTransactions = (dateRange: DateRange) => {
    const { from, to } = dateRange;
    const { data: transactions, isLoading } = useQuery<Transaction[]>({
        queryKey: ["transactions", from, to],
        queryFn: async () => {
            const response = await fetch(`/api/transactions-history?from=${DateToUTCDate(from)}&to=${DateToUTCDate(to)}`);
            const data = response.json()
            return data
        },
    });
    return { transactions: transactions ?? [], isLoading }
}