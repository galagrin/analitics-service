import { Button } from '../Button';
import { InfoDisplay } from '../InfoDisplay';
import styles from './ReportGenarationField.module.css';
import type { ReportGenarationFieldProps } from './types';

export const ReportGenarationField = ({
    loading,
    uploadSuccess,
    error,
    handleGetReport,
    handleDelete,
}: ReportGenarationFieldProps) => {
    const getButtonClassName = () => {
        switch (status) {
            case 'loading':
                return styles.fileLoadingButton;
            case 'success':
                return `${styles.fileButton} ${styles.successFileButton}`;
            case 'error':
                return styles.errorFileButton;
            default:
                return styles.fileButton;
        }
    };

    const getMessage = () => {
        if (loading && !uploadSuccess && !error) {
            return 'идёт процесс генерации';
        } else if (uploadSuccess && !error && !loading) {
            return 'файл загружен!';
        }
        return 'упс, не то...';
    };

    const status = loading ? 'loading' : uploadSuccess ? 'success' : error ? 'error' : 'default';
    const getButtonContent = () => {
        if (loading && !uploadSuccess && !error) {
            return <span className={styles.loader}></span>;
        } else if (uploadSuccess && !error && !loading) {
            return 'Done!';
        }
        return 'Ошибка!';
    };
    return (
        <>
            {status !== 'default' && (
                <InfoDisplay
                    buttonClassName={getButtonClassName()}
                    isError={status === 'error'}
                    isLoading={status !== 'loading'}
                    onRemove={handleDelete}
                    buttonContent={getButtonContent()}
                    message={getMessage()}
                />
            )}

            {!error && !loading && !uploadSuccess && (
                <Button text={'Начать генерацию'} onClick={handleGetReport} className={styles.generateBtn} />
            )}
        </>
    );
};
