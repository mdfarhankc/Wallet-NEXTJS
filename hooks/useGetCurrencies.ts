import { Currency } from "@prisma/client";
import { useEffect, useState } from "react";

const CACHE_KEY = "currencies";
const TTL_MS = 1000 * 60 * 60;

export const useGetCurrencies = () => {
    const [currencies, setCurrencies] = useState<Currency[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cached = localStorage.getItem(CACHE_KEY);
        const cachedAt = localStorage.getItem(`${CACHE_KEY}-timestamp`);

        const isCacheValid =
            cached && cachedAt && Date.now() - Number(cachedAt) < TTL_MS;

        if (isCacheValid) {
            setCurrencies(JSON.parse(cached));
            setLoading(false);
            return;
        }

        const fetchCurrencies = async () => {
            try {
                const response = await fetch("/api/currencies");
                if (!response.ok) throw new Error("Failed to fetch");
                const data = await response.json();
                setCurrencies(data);
                localStorage.setItem(CACHE_KEY, JSON.stringify(data));
                localStorage.setItem(`${CACHE_KEY}-timestamp`, Date.now().toString());
            } catch (error) {
                console.error("Currency fetch failed:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCurrencies();
    }, []);

    return { currencies, loading };
};