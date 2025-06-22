import deleteBtn from '../../assets/deleteBtn.svg';
import styles from './InfoDisplay.module.css';
import type { InfoDisplayProps } from './types';

export const InfoDisplay = ({
    buttonClassName,
    buttonContent,
    onRemove,
    message,
    isError,
    isLoading,
}: InfoDisplayProps) => {
    return (
        <>
            <div className={styles.fileInfoContainer}>
                <button className={buttonClassName} disabled>
                    {buttonContent}
                </button>
                {isLoading && <img src={deleteBtn} alt="delete" className={styles.removeBtn} onClick={onRemove} />}
            </div>
            <span className={isError ? styles.errorFileText : styles.fileUploadedText}>{message}</span>
        </>
    );
};
