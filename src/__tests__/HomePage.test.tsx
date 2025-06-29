import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';

import { HomePage } from '../pages/HomePage';
import { UploadAndSend } from '../components/UploadAndSend';

describe('тестируем Home Page', () => {
    it('отображает начальное состояние корректно при загрузке страницы', () => {
        render(<HomePage />);

        expect(screen.getByTestId('homepage-heading')).toBeInTheDocument();
        expect(screen.getByText(/Загрузите файл/i)).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /Отправить/i })).toBeInTheDocument();
    });

    it('обрабатывает загрузку CSV файла', async () => {
        render(<HomePage />);

        const file = new File(['test'], 'test.csv', { type: 'text/csv' });
        const input = screen.getByTestId('file-input');

        await userEvent.upload(input, file);

        expect(screen.getByText('test.csv')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Отправить/i })).toBeEnabled();
    });

    it('обрабатывает d&d некорректного формата файла и отображает ошибку и не отображает кнопку отправки', async () => {
        render(<UploadAndSend />);

        const dropArea = screen.getByTestId('drop-area');
        const file = new File(['content'], 'test.txt', { type: 'text/plain' });
        fireEvent.drop(dropArea!, {
            dataTransfer: {
                files: [file],
                items: [{ kind: 'file', type: 'text/plain', getAsFile: () => file }],
            },
        });

        await waitFor(() => {
            expect(screen.getByText(/Неверный формат файла/i)).toBeInTheDocument();
        });
        expect(screen.queryByRole('button', { name: /Отправить/i })).not.toBeInTheDocument();
    });
});
