import { describe, it, expect, beforeEach } from 'vitest';
import { processFileUpload } from '../services/api/fileApi';
import { BASE_URL, ROWS_COUNT } from '../constants/api';

describe('тестируем FileApi', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    global.fetch = vi.fn();
    const mockFile = new File(['test'], 'test.csv');
    const onProgress = vi.fn();

    it('processFileUpload() должен вызвать fetch с правильным URL', async () => {
        await processFileUpload(mockFile, onProgress);
        expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/aggregate?rows=${ROWS_COUNT}`, expect.any(Object));
    });

    it('processFileUpload() должен выбрасывать ошибку при ответе 400 ', async () => {
        global.fetch = vi.fn().mockResolvedValueOnce({
            status: 400,
            ok: false,
        });
        const result = await processFileUpload(mockFile, onProgress);
        expect(result).toEqual({
            data: null,
            error: 'Некорректный запрос',
        });
    });

    it('processFileUpload() долже выбрасывать ошибку при ответе 500 ', async () => {
        global.fetch = vi.fn().mockResolvedValueOnce({
            status: 500,
            ok: false,
        });
        const result = await processFileUpload(mockFile, onProgress);
        expect(result).toEqual({
            data: null,
            error: 'Ошибка сервера',
        });
    });

    it('получение успешного ответа 200 при обработке валидного файла', async () => {
        const mockValidResponse = {
            average_spend_galactic: 1000.5,
            big_spent_at: 123,
            big_spent_civ: 'Blobs',
            big_spent_value: 1000.5,
            less_spent_at: 123,
            less_spent_civ: 'Human',
            less_spent_value: 100.0,
            rows_affected: 1000,
            total_spend_galactic: 10000.0,
        };
        const decoder = new TextEncoder();
        const jsonLine = JSON.stringify(mockValidResponse) + '\n';
        const stream = new ReadableStream({
            start(controller) {
                controller.enqueue(decoder.encode(jsonLine));
                controller.close();
            },
        });
        global.fetch = vi.fn().mockResolvedValueOnce({
            status: 200,
            ok: true,
            body: stream,
        });

        const file = new File(['test content'], 'test.csv', { type: 'text/csv' });

        const result = await processFileUpload(file);
        expect(result.error).toBeNull();
        expect(result).toEqual({
            data: mockValidResponse,
            error: null,
        });
    });
});
