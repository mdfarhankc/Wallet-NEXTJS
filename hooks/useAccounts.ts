import { useQuery } from "@tanstack/react-query";

export const useAccounts = () => {
    const { data: accounts, isLoading } = useQuery({
        queryKey: ["accounts"],
        queryFn: async () => {
            const response = await fetch("/api/accounts");
            const data = await response.json();
            return data
        }
    })

    return { accounts, isLoading };
};