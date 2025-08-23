import { useState } from 'react';
import styles from './GeneratorPage.module.css';
import { fetchReport } from '../../services/api/generatorApi';
import { ReportGenarationField } from '../../components/ReportGenarationField';

export const GeneratorPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null | undefined>(null);
    const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

    const handleGetReport = async (): Promise<void> => {
        setLoading(true);
        try {
            const result = await fetchReport();
            if (result.success) {
                setUploadSuccess(true);
            } else {
                setError(result.error);
            }
        } finally {
            setLoading(false);
        }
    };
    const handleDelete = () => {
        setUploadSuccess(false);
        setError(null);
        setLoading(false);
    };

    return (
        <>
            <div className={styles.generatorContainer} data-testid="generator-heading">
                <div className={styles.heading}>Сгенерируйте готовый csv-файл нажатием одной кнопки</div>
                <ReportGenarationField
                    loading={loading}
                    uploadSuccess={uploadSuccess}
                    error={error}
                    handleGetReport={handleGetReport}
                    handleDelete={handleDelete}
                />
            </div>
        </>
    );
};
