import styles from './Highlights.module.css';
import { formatDayMonth } from '../../utils/dateUtils';
import type { HighlightsProps } from './types';

export const Highlights = ({ aggregatedResult, isModal }: HighlightsProps) => {
    return (
        <>
            <div className={`${styles.highlightItem} ${isModal ? styles.isModal : styles.highlightsBg}`}>
                <span className={styles.itemValue}>{Math.round(aggregatedResult.total_spend_galactic)}</span>
                <span className={styles.itemDescription}>общие расходы в галактических кредитах</span>
            </div>

            <div className={`${styles.highlightItem} ${isModal ? styles.isModal : styles.highlightsBg}`}>
                <span className={styles.itemValue}>{aggregatedResult.less_spent_civ}</span>
                <span className={styles.itemDescription}>цивилизация с минимальными расходами</span>
            </div>

            <div className={`${styles.highlightItem} ${isModal ? styles.isModal : styles.highlightsBg}`}>
                <span className={styles.itemValue}>{aggregatedResult.rows_affected}</span>
                <span className={styles.itemDescription}>количество обработанных записей</span>
            </div>

            <div className={`${styles.highlightItem} ${isModal ? styles.isModal : styles.highlightsBg}`}>
                <span className={styles.itemValue}>{formatDayMonth(aggregatedResult.big_spent_at)}</span>
                <span className={styles.itemDescription}>день года с максимальными расходами </span>
            </div>

            <div className={`${styles.highlightItem} ${isModal ? styles.isModal : styles.highlightsBg}`}>
                <span className={styles.itemValue}>{formatDayMonth(aggregatedResult.less_spent_at)}</span>
                <span className={styles.itemDescription}>день года с минимальными расходами</span>
            </div>

            <div className={`${styles.highlightItem} ${isModal ? styles.isModal : styles.highlightsBg}`}>
                <span className={styles.itemValue}>{Math.round(aggregatedResult.big_spent_value)}</span>
                <span className={styles.itemDescription}>максимальная сумма расходов за день</span>
            </div>

            <div className={`${styles.highlightItem} ${isModal ? styles.isModal : styles.highlightsBg}`}>
                <span className={styles.itemValue}>{aggregatedResult.big_spent_civ}</span>
                <span className={styles.itemDescription}>цивилизация с максимальными расходами</span>
            </div>

            <div className={`${styles.highlightItem} ${isModal ? styles.isModal : styles.highlightsBg}`}>
                <span className={styles.itemValue}>{Math.round(aggregatedResult.average_spend_galactic)}</span>
                <span className={styles.itemDescription}> средние расходы в галактических кредитах</span>
            </div>
        </>
    );
};
