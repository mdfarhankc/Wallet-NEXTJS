import { TransactionType } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const useCategories = (type: TransactionType) => {
    const { data: categories, isLoading } = useQuery({
        queryKey: ["categories", type],
        queryFn: async () => {
            const response = await fetch(`/api/categories?type=${type}`);
            const data = await response.json();
            return data
        }
    })

    return { categories, isLoading };
};