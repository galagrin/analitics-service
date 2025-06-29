import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import App from '../App';

const renderWithRouter = (initialRoute = '/') => {
    return render(
        <MemoryRouter initialEntries={[initialRoute]}>
            <App />
        </MemoryRouter>
    );
};

describe('тестирование роутинга', () => {
    it('рендер HomePage по роуту "/" ', () => {
        renderWithRouter('/');
        const homePageHeading = screen.getByTestId('homepage-heading');
        expect(homePageHeading).toBeInTheDocument();
    });

    it('рендер HistoryPage по роуту "/history"', () => {
        renderWithRouter('/history');
        const historyHeading = screen.getByTestId('history-heading');
        expect(historyHeading).toBeInTheDocument();
    });

    it('рендер GeneratorPage по роуту "/generator"', () => {
        renderWithRouter('/generator');
        const generatorHeading = screen.getByTestId('generator-heading');
        expect(generatorHeading).toBeInTheDocument();
    });

    it('навигация работает корректно при клике на ссылки в шапке', async () => {
        renderWithRouter('/');

        const historyLink = screen.getByRole('link', { name: /История/i });

        await userEvent.click(historyLink);
        expect(screen.getByTestId('history-heading')).toBeInTheDocument();

        const generatorLink = screen.getByRole('link', { name: /Генератор/i });
        await userEvent.click(generatorLink);
        expect(screen.getByTestId('generator-heading')).toBeInTheDocument();
    });

    it('по клике на кнопку "Сгенерировать больше" на странице Истории происходит редирект на роут"/generator"', async () => {
        renderWithRouter('/history');
        const generateButton = screen.getByRole('button', { name: /Сгенерировать больше/i });
        await userEvent.click(generateButton);
        expect(screen.getByTestId('generator-heading')).toBeInTheDocument();
    });
});
