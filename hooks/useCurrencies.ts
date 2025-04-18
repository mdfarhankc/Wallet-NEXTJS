import { useQuery } from "@tanstack/react-query";

export const useCurrencies = () => {
    const { data: currencies, isLoading } = useQuery({
        queryKey: ["currencies"],
        queryFn: async () => {
            const response = await fetch("/api/currencies");
            const data = await response.json();
            return data
        }
    })

    return { currencies, isLoading };
};