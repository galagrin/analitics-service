import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { HomePage } from '../pages/HomePage';

describe('отправка запроса и отрисовка ответа HomePage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    // Мок для store
    vi.mock('../store/store', () => ({
        useStore: vi.fn().mockImplementation((selector) =>
            selector({
                aggregatedResult: {
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
                setAggregatedResult: vi.fn(),
            })
        ),
    }));

    // Мок для fileApi - запрос на обработку файла
    vi.mock('../services/api/fileApi', () => ({
        processFileUpload: vi.fn().mockImplementation(
            () =>
                new Promise((resolve) => {
                    setTimeout(() => {
                        resolve({
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
                            error: null,
                        });
                    }, 100);
                })
        ),
    }));

    it('при нажатии на кнопку "Отправить" вызывается processFileUpload и отображаются данные', async () => {
        render(<HomePage />);

        const fileInput = screen.getByTestId('file-input');
        const file = new File(['file content'], 'test.csv', { type: 'text/csv' });

        await act(async () => {
            fireEvent.change(fileInput, { target: { files: [file] } });
        });

        const sentButton = screen.getByText('Отправить');
        expect(sentButton).not.toBeDisabled();

        await act(async () => {
            fireEvent.click(sentButton);
        });

        const { processFileUpload } = await import('../services/api/fileApi');
        expect(processFileUpload).toHaveBeenCalledTimes(1);

        await waitFor(() => {
            expect(screen.getByText('готово!')).toBeInTheDocument();

            expect(screen.getByText('общие расходы в галактических кредитах')).toBeInTheDocument();
            expect(screen.getByText('цивилизация с минимальными расходами')).toBeInTheDocument();
            expect(screen.getByText('количество обработанных записей')).toBeInTheDocument();
            expect(screen.getByText('цивилизация с максимальными расходами')).toBeInTheDocument();
            expect(screen.getByText('средние расходы в галактических кредитах')).toBeInTheDocument();
            expect(screen.getByText('день года с минимальными расходами')).toBeInTheDocument();
            expect(screen.getByText('день года с максимальными расходами')).toBeInTheDocument();
        });
    });
});
