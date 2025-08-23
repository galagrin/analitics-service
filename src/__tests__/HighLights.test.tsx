import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { HighlightsList } from '../components/HighlightsList';

// Мокаем store
vi.mock('../store/store', () => ({
    useStore: vi.fn(),
}));

// Импортируем мок
import { useStore } from '../store/store';

describe('HighlightsList', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('отображает пустое состояние, когда нет данных', () => {
        vi.mocked(useStore).mockImplementation((selector: any) =>
            selector({
                aggregatedResult: null,
                setAggregatedResult: vi.fn(),
            })
        );

        render(<HighlightsList />);
        expect(screen.getByText('Здесь появятся хайлайты')).toBeInTheDocument();
    });

    it('отображает данные, когда они есть', () => {
        const mockData = {
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

        vi.mocked(useStore).mockImplementation((selector: any) =>
            selector({
                aggregatedResult: mockData,
                setAggregatedResult: vi.fn(),
            })
        );

        render(<HighlightsList />);

        expect(screen.getByText('общие расходы в галактических кредитах')).toBeInTheDocument();
        expect(screen.getByText('цивилизация с минимальными расходами')).toBeInTheDocument();
        expect(screen.getByText('количество обработанных записей')).toBeInTheDocument();
        expect(screen.getByText('цивилизация с максимальными расходами')).toBeInTheDocument();
        expect(screen.getByText('средние расходы в галактических кредитах')).toBeInTheDocument();
        expect(screen.getByText('день года с минимальными расходами')).toBeInTheDocument();
        expect(screen.getByText('день года с максимальными расходами')).toBeInTheDocument();
    });
});
