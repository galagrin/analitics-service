import { BASE_URL, SIZE } from '../../constants/api';

type ReportResult = {
    success: boolean;
    error?: string;
};
export const fetchReport = async (): Promise<ReportResult> => {
    try {
        const result = await fetch(`${BASE_URL}/report?size=${SIZE}&withErrors=off&maxSpend=1000`, {
            method: 'GET',
            headers: {
                Accept: 'text/csv',
            },
        });

        if (!result.ok) {
            throw new Error('Ошибка при получении данных');
        }

        const blob = await result.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'newReport.csv';
        a.click();
        window.URL.revokeObjectURL(url);
        return { success: true };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : String(error),
        };
    }
};
