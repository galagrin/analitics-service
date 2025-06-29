import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { GeneratorPage } from '../pages/GeneratorPage';
import * as api from '../services/api/generatorApi';

vi.mock('../services/api/generatorApi');

describe('тестируем GeneratorPage', () => {
    const mockedFetchReport = vi.mocked(api.fetchReport);
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('при нажатии на кнопку "Начать генерацию" вызывается fetchReport, запускается лоадер и показывается сообщение "Done!" в случае успеха', async () => {
        mockedFetchReport.mockResolvedValueOnce({ success: true });
        render(<GeneratorPage />);

        const generateButton = screen.getByText('Начать генерацию');
        fireEvent.click(generateButton);
        const loader = screen.getByTestId('loader');
        expect(loader).toBeDefined();

        await waitFor(() => {
            expect(screen.getByText(/Done!/i)).toBeDefined();
        });
        expect(mockedFetchReport).toHaveBeenCalledTimes(1);
    });

    it('при нажатии на кнопку "Начать генерацию" вызывается fetchReport и показывается сообщение Ошибка! в случае неудачи', async () => {
        const errorMessage = 'Ошибка!';
        mockedFetchReport.mockResolvedValueOnce({ success: false, error: errorMessage });
        render(<GeneratorPage />);

        const generateButton = screen.getByText('Начать генерацию');
        fireEvent.click(generateButton);
        const loader = screen.getByTestId('loader');
        expect(loader).toBeDefined();
        await waitFor(() => {
            expect(screen.getByText(errorMessage)).toBeDefined();
        });
        expect(mockedFetchReport).toHaveBeenCalledTimes(1);
    });
});
