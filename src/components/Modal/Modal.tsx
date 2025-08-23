import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import type { ModalProps } from './type';

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    if (!isOpen) return null;

    return createPortal(
        <div className={styles.modalOverlay} onClick={onClose} data-testid="modal">
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>,
        document.body
    );
};
