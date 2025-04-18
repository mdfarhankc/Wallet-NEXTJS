import { create } from "zustand";
import { startOfMonth } from "date-fns";

export type DateRange = {
    from: Date;
    to: Date;
};

interface DateRangeState {
    dateRange: DateRange;
    setDateRange: (range: DateRange) => void;
}


export const useTransactionsHistoryStore = create<DateRangeState>((set) => ({
    dateRange: {
        from: startOfMonth(new Date()),
        to: new Date(),
    },
    setDateRange: (range) => set({ dateRange: range }),
}));