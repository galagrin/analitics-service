import { useState, type ChangeEvent } from 'react';
import styles from './UploadAndSend.module.css';
import { useStore } from '../../store/store';
import { UploadField } from '../UploadField';
import { FileInfo } from '../FileInfo';
import { Button } from '../Button';
import { saveToLocalStorage } from '../../services/storage/localStorage';
import { processFileUpload } from '../../services/api/fileApi';

export const UploadAndSend = () => {
    const setAggregatedResult = useStore((state) => state.setAggregatedResult);

    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };
    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
        const draggedFiles = event.dataTransfer.files;
        if (draggedFiles.length > 0) {
            setFile(draggedFiles[0]);
            setError(null);
        }
        if (draggedFiles[0] && draggedFiles[0].name.includes('.csv') === false) return setError('extentionError');
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setFile(files[0]);
            setError(null);
            setAggregatedResult(null);
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
        setUploadSuccess(false);
        setLoading(false);
        setError(null);
        setAggregatedResult(null);
        setIsDragging(false);
    };

    const handleSubmitFile = async (): Promise<void> => {
        if (!file) return;
        setLoading(true);
        setError(null);
        setIsDragging(false);
        const {
            data,
            error: apiError,
            invalidFields,
        } = await processFileUpload(file, (progressData) => setAggregatedResult(progressData));

        if (invalidFields) {
            setError('invalidFields');
            setLoading(false);
            return;
        }

        if (apiError) {
            setError(apiError);
            saveToLocalStorage({
                fileName: file.name,
                data: null,
                processedAt: new Date(),
                status: 'error',
                id: new Date().toISOString(),
            });
        } else {
            setUploadSuccess(true);
            saveToLocalStorage({
                fileName: file.name,
                data,
                processedAt: new Date(),
                status: 'success',
                id: new Date().toISOString(),
            });
        }
        setLoading(false);
    };

    const getFileStatus = (): 'default' | 'loading' | 'success' | 'error' | 'extentionError' | 'invalidFields' => {
        if (loading) return 'loading';
        if (uploadSuccess) return 'success';
        if (error === 'invalidFields') return 'invalidFields';
        if (error === 'extentionError') return 'extentionError';
        if (error) return 'error';
        return 'default';
    };

    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                Загрузите <strong>csv</strong> файл и получите <strong>полную информацию</strong> о нём за сверхнизкое
                время
            </div>

            <div
                className={`${styles.wrapper} ${
                    error === 'invalidFields' || error === 'extentionError' || error === 'error'
                        ? styles.errorWrapper
                        : uploadSuccess || file || loading
                          ? styles.successWrapper
                          : isDragging
                            ? styles.dragOver
                            : ''
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {!file && !uploadSuccess && <UploadField handleFileChange={handleFileChange} loading={loading} />}

                {file && <FileInfo file={file} onRemove={handleRemoveFile} status={getFileStatus()} />}
            </div>

            {!error && !loading && !uploadSuccess && (
                <Button
                    text="Отправить"
                    onClick={handleSubmitFile}
                    disabled={!file || loading}
                    className={`${styles.sentBtn} ${styles.showSentBtn} ${file ? styles.activeSentBtn : ''}`}
                />
            )}
        </div>
    );
};
