import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import styles from './HistoryPage.module.css';
import { HistoryItemsList } from '../../components/HistoryItemsList';
import { clearLocalStorage, getFromLocalStorage, type DataToLocalStorage } from '../../services/storage/localStorage';
import { useEffect, useState } from 'react';

export const HistoryPage = () => {
    const navigate = useNavigate();
    const [historyItems, setHistoryItems] = useState<DataToLocalStorage[] | null>(null);

    useEffect(() => {
        setHistoryItems(getFromLocalStorage());
    }, []);

    const handleDeleteHistoryItem = (event: React.MouseEvent<HTMLDivElement>, id: string) => {
        event.stopPropagation();
        let newData = getFromLocalStorage();
        if (!newData) return;
        newData = newData?.filter((item) => item.id !== id);
        localStorage.setItem('aggregatedResult', JSON.stringify(newData));
        setHistoryItems(newData);
    };

    const handleClearAll = () => {
        clearLocalStorage();
        setHistoryItems([]);
    };

    return (
        <>
            <HistoryItemsList historyItems={historyItems} handleDeleteHistoryItem={handleDeleteHistoryItem} />
            <div className={styles.btnWrap}>
                <Button
                    text={'Сгенерировать больше'}
                    onClick={() => navigate('/generator')}
                    className={styles.generateMoreBtn}
                />
                {Boolean(historyItems?.length) && (
                    <Button text={'Очистить всё'} onClick={handleClearAll} className={styles.deleteAllBtn} />
                )}
            </div>
        </>
    );
};
