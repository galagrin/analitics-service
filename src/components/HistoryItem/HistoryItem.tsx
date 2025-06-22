import { formatDayMonthYear } from '../../utils/dateUtils';
import trashcan from '../../assets/Trash.svg';
import smile from '../../assets/Smile.svg';
import sadSmile from '../../assets/SadSmile.svg';
import fileIcon from '../../assets/File.svg';
import styles from './HistoryItem.module.css';
import type { HistoryItemProps } from './types';

export const HistoryItem = ({ handleDeleteHistoryItem, item, openModalWithItem }: HistoryItemProps) => {
    return (
        <>
            <div className={styles.fileInfoWrap} onClick={() => openModalWithItem(item)}>
                <div className={styles.fileName}>
                    <img src={fileIcon} alt="file icon" />
                    <span>{item.fileName}</span>
                </div>
                <div className={styles.fileDate}>{formatDayMonthYear(item.processedAt)}</div>
                <div className={`${styles.fileStatus} ${item.status === 'success' ? styles.active : styles.inactive}`}>
                    <span>Обработан успешно</span>
                    <img src={smile} alt="success file" />
                </div>
                <div className={`${styles.fileStatus} ${item.status === 'error' ? styles.active : styles.inactive}`}>
                    <span>Не удалось обработать</span>
                    <img src={sadSmile} alt="error file" />
                </div>
            </div>
            <div className={styles.trashIcon} onClick={(event) => handleDeleteHistoryItem(event, item.id)}>
                <img src={trashcan} alt="delete" />
            </div>
        </>
    );
};
