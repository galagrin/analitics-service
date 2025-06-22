import type { DataToLocalStorage } from '../../services/storage/localStorage';

export type HistoryItemProps = {
    handleDeleteHistoryItem: (event: React.MouseEvent<HTMLDivElement>, id: string) => void;
    item: DataToLocalStorage;
    openModalWithItem: (item: DataToLocalStorage) => void;
};
