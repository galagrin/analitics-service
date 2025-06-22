export type ReportGenarationFieldProps = {
    loading: boolean;
    uploadSuccess: boolean;
    error: string | null | undefined;
    handleGetReport: () => void;
    handleDelete: () => void;
};
