import { type DataState } from '../../store/types';

const STORAGE_KEY = 'aggregatedResult';

export type DataToLocalStorage = {
    id: string;
    fileName: string;
    data: DataState['aggregatedResult'] | null;
    processedAt: Date;
    status: 'success' | 'error';
};

export const saveToLocalStorage = (data: DataToLocalStorage) => {
    try {
        const currentResult = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        currentResult.push(data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(currentResult));
    } catch (error) {
        console.error('Error saving to localStorage', error);
    }
};

export const getFromLocalStorage = () => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
        try {
            const parsedData = JSON.parse(savedData);
            return parsedData as DataToLocalStorage[];
        } catch (error) {
            console.error('Ошибка парсинга данных из LocalStorage', error);
            return null;
        }
    }
    return null;
};

export const clearLocalStorage = () => {
    localStorage.removeItem(STORAGE_KEY);
};
