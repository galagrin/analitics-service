import { HighlightsList } from '../../components/HighlightsList';
import { UploadAndSend } from '../../components/UploadAndSend';

export const HomePage = () => {
    return (
        <>
            <UploadAndSend />
            <HighlightsList />
        </>
    );
};
