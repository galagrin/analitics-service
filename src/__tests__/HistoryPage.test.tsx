import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { HistoryPage } from '../pages/HistoryPage';
import * as storage from '../services/storage/localStorage';
import { MemoryRouter } from 'react-router-dom';

const mockData = [
    {
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
        status: 'success' as const,
    },
];

vi.mock('../services/storage/localStorage', () => ({
    saveToLocalStorage: vi.fn(),
    getFromLocalStorage: vi.fn(),
    clearLocalStorage: vi.fn(),
}));

describe('тестируем HistoryPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('получает данные из локального хранилища при рендере страницы и отображает их', async () => {
        vi.mocked(storage.getFromLocalStorage).mockReturnValue(mockData);
        render(
            <MemoryRouter>
                <HistoryPage />
            </MemoryRouter>
        );
        await waitFor(() => {
            expect(storage.getFromLocalStorage).toHaveBeenCalled();
        });
        expect(screen.getByText('fileName')).toBeInTheDocument();
        expect(screen.getByText('Очистить всё')).toBeInTheDocument();
    });

    it('при нажатии кнопки "Очистить всё" очищается LocalStorage', async () => {
        vi.mocked(storage.getFromLocalStorage).mockReturnValue(mockData);
        render(
            <MemoryRouter>
                <HistoryPage />
            </MemoryRouter>
        );
        const clearLSButton = await screen.getByRole('button', { name: /Очистить всё/i });

        fireEvent.click(clearLSButton, () => {
            expect(storage.clearLocalStorage).toHaveBeenCalled();
            expect(screen.queryByText(mockData[0].fileName)).not.toBeInTheDocument();
        });
    });

    it('при нажатии на иконку Корзины удаляеся элемент истории и не отображается в списке', () => {
        vi.mocked(storage.getFromLocalStorage).mockReturnValue(mockData);
        render(
            <MemoryRouter>
                <HistoryPage />
            </MemoryRouter>
        );
        const deleteButton = screen.getByRole('img', { name: /delete/i });
        fireEvent.click(deleteButton, () => {
            expect(storage.saveToLocalStorage).toHaveBeenCalled();
            expect(screen.queryByText(mockData[0].fileName)).not.toBeInTheDocument();
        });
    });
});
