import { create } from 'zustand';
import { type DataState } from './types';
import { devtools } from 'zustand/middleware';

export const useStore = create<DataState>()(
    devtools((set) => ({
        aggregatedResult: null,
        setAggregatedResult: (data) => set({ aggregatedResult: data }),
    }))
);
