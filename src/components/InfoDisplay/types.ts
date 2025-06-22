export type InfoDisplayProps = {
    buttonClassName: string;
    buttonContent: React.ReactNode;
    onRemove: () => void;
    message: string;
    isError: boolean;
    isLoading: boolean;
};
