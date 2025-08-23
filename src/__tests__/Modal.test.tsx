import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { HistoryItemsList } from '../components/HistoryItemsList';

describe('Modal', () => {
    it('открывает модальное окно при клике на пункт истории при наличии данных в data', async () => {
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
        const handleDeleteHistoryItem = vi.fn();

        render(<HistoryItemsList historyItems={mockData} handleDeleteHistoryItem={handleDeleteHistoryItem} />);

        const histryItem = screen.getByText('fileName');
        fireEvent.click(histryItem);

        await waitFor(() => {
            const modal = screen.getByTestId('modal');
            expect(modal).toBeInTheDocument();
        });
    });

    it('НЕ открывает модальное окно при клике на пункт истории без данных в data', async () => {
        const mockData = [
            {
                id: '123',
                fileName: 'fileName',
                data: null,
                processedAt: new Date(),
                status: 'error' as const,
            },
        ];
        const handleDeleteHistoryItem = vi.fn();

        render(<HistoryItemsList historyItems={mockData} handleDeleteHistoryItem={handleDeleteHistoryItem} />);

        const histryItem = screen.getByText('fileName');
        fireEvent.click(histryItem);

        expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });
});
