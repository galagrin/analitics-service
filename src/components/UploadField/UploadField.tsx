import { type UploadFieldProps } from './types';
import styles from './UploadField.module.css';

export const UploadField = ({ loading, handleFileChange }: UploadFieldProps) => {
    return (
        <>
            <input
                type="file"
                id="file-upload"
                style={{ display: 'none' }}
                onChange={handleFileChange}
                disabled={loading}
                accept=".csv"
                data-testid="file-input"
            />

            <label htmlFor="file-upload" className={styles.uploadBtn}>
                Загрузить файл
            </label>
            <span className={styles.uploadText}>или перетащите сюда</span>
        </>
    );
};
