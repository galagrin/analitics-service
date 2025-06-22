import { BASE_URL, ROWS_COUNT } from '../../constants/api';
import { fieldValidation } from './validation';

export type AggregateResponse = {
    average_spend_galactic: number;
    big_spent_at: number;
    big_spent_civ: string;
    big_spent_value: number;
    less_spent_at: number;
    less_spent_civ: string;
    less_spent_value: number;
    rows_affected: number;
    total_spend_galactic: number;
};

type ProcessingResult = {
    data: AggregateResponse | null;
    error: string | null;
    invalidFields?: string[];
};

export const processFileUpload = async (
    file: File,
    onProgress?: (data: AggregateResponse) => void
): Promise<ProcessingResult> => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${BASE_URL}/aggregate?rows=${ROWS_COUNT}`, {
            method: 'POST',
            body: formData,
        });

        if (response.status === 400) {
            throw new Error('Некорректный запрос');
        }
        if (response.status === 500) {
            throw new Error('Ошибка сервера');
        }
        if (!response.ok) {
            throw new Error(`Ошибка отправки файла: ${response.status}`);
        }

        const reader = response.body?.getReader();

        if (!reader) {
            throw new Error('Не удалось получить reader');
        }

        const decoder = new TextDecoder();
        let buffer = '';
        let finalResult = null;

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
                if (line.trim()) {
                    try {
                        const result = JSON.parse(line);
                        const validation = fieldValidation(result);
                        if (validation.isValid) {
                            onProgress?.(result);
                            finalResult = result;
                        }
                    } catch (e) {
                        console.error('Ошибка при парсинге строки:', line, e);
                    }
                }
            }
        }

        if (buffer.trim()) {
            try {
                const result = JSON.parse(buffer);
                finalResult = result;
            } catch (e) {
                console.error('Ошибка парсинга последней строки:', buffer, e);
            }
        }

        if (finalResult) {
            const { isValid, invalidFields } = fieldValidation(finalResult);
            if (!isValid) {
                return {
                    data: null,
                    error: 'Некорректный формат данных',
                    invalidFields,
                };
            }
        } else {
            return {
                data: null,
                error: 'Данные отсутствуют или некорректны',
                invalidFields: ['all'],
            };
        }
        return {
            data: finalResult,
            error: null,
        };
    } catch (err) {
        return {
            data: null,
            error: err instanceof Error ? err.message : 'Неизвестная ошибка',
        };
    }
};
