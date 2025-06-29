import { describe, it, expect, beforeEach } from 'vitest';
import {
    saveToLocalStorage,
    getFromLocalStorage,
    clearLocalStorage,
    type DataToLocalStorage,
} from '../services/storage/localStorage';

describe('тестирование LocalStorageApi', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    const mockData: DataToLocalStorage = {
        id: '123',
        fileName: 'fileName',
        data: {
            average_spend_galactic: 1000.5,
            big_spent_at: 123,
            big_spent_civ: 'Blobs',
            big_spent_value: 1000.5,
            less_spent_at: 123,
            less_spent_civ: 'Human',
            less_spent_value: 100.0,
            rows_affected: 1000,
            total_spend_galactic: 10000.0,
        },
        processedAt: new Date(),
        status: 'success',
    };

    it('saveToLocalStorage сохраняет данные в localStorage', () => {
        saveToLocalStorage(mockData);
        const savedData = localStorage.getItem('aggregatedResult');
        expect(savedData).not.toBeNull();
    });

    it('возвращает сохранённые данные getFromLocalStorage', () => {
        localStorage.setItem('aggregatedResult', JSON.stringify([mockData]));
        const result = getFromLocalStorage();
        const expected = [{ ...mockData, processedAt: mockData.processedAt.toISOString() }];

        expect(result).toEqual(expected);
    });

    it('clearLocalStorage удаляет данные из localStorage', () => {
        localStorage.setItem('aggregatedResult', JSON.stringify([mockData]));
        clearLocalStorage();

        const afterClear = localStorage.getItem('aggregatedResult');
        expect(afterClear).toBeNull();
    });

    it('getFromLocalStorage возвращает null если данных нет', () => {
        const result = getFromLocalStorage();
        expect(result).toBeNull();
    });
});
