import { useQuery } from "@tanstack/react-query";

export const useTags = () => {
    const { data: tags, isLoading } = useQuery({
        queryKey: ["tags"],
        queryFn: async () => {
            const response = await fetch("/api/tags");
            const data = await response.json();
            return data
        }
    })

    return { tags, isLoading };
};