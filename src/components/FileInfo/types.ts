export type FileInfoProps = {
    file: File;
    onRemove: () => void;
    status: 'default' | 'loading' | 'success' | 'error' | 'extentionError' | 'invalidFields';
};
