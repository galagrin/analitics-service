import type { ChangeEvent } from 'react';

export type UploadFieldProps = {
    loading: boolean;
    handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
