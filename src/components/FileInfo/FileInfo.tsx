import { type FileInfoProps } from './types';
import styles from './FileInfo.module.css';
import { InfoDisplay } from '../InfoDisplay';

export const FileInfo = ({ file, onRemove, status }: FileInfoProps) => {
    const getButtonClassName = () => {
        switch (status) {
            case 'loading':
                return styles.fileLoadingButton;
            case 'success':
                return `${styles.fileButton} ${styles.successFileButton}`;
            case 'error':
                return styles.errorFileButton;
            case 'extentionError':
                return styles.errorFileButton;
            case 'invalidFields':
                return styles.errorFileButton;
            default:
                return styles.fileButton;
        }
    };

    const getMessage = () => {
        switch (status) {
            case 'loading':
                return 'идёт парсинг файла';
            case 'success':
                return 'готово!';
            case 'extentionError':
                return 'Неверный формат файла. Попробуйте загрузить .csv';
            case 'invalidFields':
                return 'В файле некорректные данные';
            case 'error':
                return 'упс, не то...';
            default:
                return 'файл загружен!';
        }
    };
    return (
        <>
            <InfoDisplay
                buttonClassName={getButtonClassName()}
                isError={status === 'error' || status === 'extentionError' || status === 'invalidFields'}
                isLoading={status !== 'loading'}
                onRemove={onRemove}
                buttonContent={
                    status === 'loading' ? <span className={styles.loader} data-testid="loader"></span> : file.name
                }
                message={getMessage()}
            />
        </>
    );
};
