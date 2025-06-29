import { useState } from 'react';
import { type DataToLocalStorage } from '../../services/storage/localStorage';

import { Modal } from '../Modal';
import { Highlights } from '../Highlights';
import styles from './HistoryItemsList.module.css';
import { HistoryItem } from '../HistoryItem/HistoryItem';
import type { HistoryItemProps } from './types';

export const HistoryItemsList = ({ historyItems, handleDeleteHistoryItem }: HistoryItemProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<DataToLocalStorage | null>(null);

    const openModalWithItem = (item: DataToLocalStorage) => {
        setIsModalOpen(true);
        setSelectedItem(item);
    };

    return (
        <>
            {historyItems &&
                historyItems.map((item) => (
                    <div className={styles.container} key={item.id}>
                        <HistoryItem
                            handleDeleteHistoryItem={handleDeleteHistoryItem}
                            item={item}
                            openModalWithItem={openModalWithItem}
                            data-testid="history-item"
                        />
                    </div>
                ))}
            {selectedItem && selectedItem.data !== null && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <Highlights aggregatedResult={selectedItem.data} isModal={true} />
                </Modal>
            )}
        </>
    );
};
