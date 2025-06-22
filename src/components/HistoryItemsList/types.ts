import type { DataToLocalStorage } from '../../services/storage/localStorage';

export type HistoryItemProps = {
    historyItems: DataToLocalStorage[] | null;
    handleDeleteHistoryItem: (event: React.MouseEvent<HTMLDivElement>, id: string) => void;
};
