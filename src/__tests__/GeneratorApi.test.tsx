import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchReport } from '../services/api/generatorApi';
import { BASE_URL, SIZE } from '../constants/api';

describe('тестируем работу GeneratorApi', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        global.fetch = vi.fn();
        global.URL.createObjectURL = vi.fn(() => 'blob:http://localhost/fake-blob-url');
        global.URL.revokeObjectURL = vi.fn();
    });

    it('fetchReport() должен вызвать fetch с правильным URL', async () => {
        await fetchReport();
        expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/report?size=${SIZE}&withErrors=off&maxSpend=1000`, {
            method: 'GET',
            headers: {
                Accept: 'text/csv',
            },
        });
    });

    it('fetchReport() должен выбрасывать ошибку при ответе 400 ', async () => {
        global.fetch = vi.fn().mockResolvedValueOnce({
            status: 400,
            ok: false,
        });
        const result = await fetchReport();
        expect(result).toEqual({
            success: false,
            error: 'Некорректный запрос',
        });
    });

    it('fetchReport() долже выбрасывать ошибку при ответе 500 ', async () => {
        global.fetch = vi.fn().mockResolvedValueOnce({
            status: 500,
            ok: false,
        });
        const result = await fetchReport();
        expect(result).toEqual({
            success: false,
            error: 'Ошибка сервера',
        });
    });

    it('получение успешного ответа 200 при генерации репорта', async () => {
        global.fetch = vi.fn().mockResolvedValueOnce({
            status: 200,
            ok: true,
            blob: vi.fn().mockResolvedValueOnce(new Blob(['test data'], { type: 'text/csv' })),
        });
        const result = await fetchReport();

        expect(result).toEqual({ success: true });
        expect(global.URL.createObjectURL).toHaveBeenCalled();
    });
});
