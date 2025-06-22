import styles from './HighlightsList.module.css';
import { useStore } from '../../store/store';
import { Highlights } from '../Highlights/Highlights';

export const HighlightsList = () => {
    const aggregatedResult = useStore((state) => state.aggregatedResult);

    if (!aggregatedResult) {
        return (
            <div className={styles.hightlightsWrap}>
                <p className={styles.highlightHeading}>Здесь появятся хайлайты</p>
            </div>
        );
    }
    return (
        <div className={styles.hightlightsWrap}>
            <div className={styles.highlight}>
                <Highlights aggregatedResult={aggregatedResult} />
            </div>
        </div>
    );
};
