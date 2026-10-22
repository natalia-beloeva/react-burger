import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { ModalOverlay } from '@components/modal-overlay/modal-overlay';

import styles from './modal.module.css';

type TModalProps = {
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
};

export const Modal = ({ title, onClose, children }: TModalProps): React.JSX.Element => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return (): void => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const modalRoot = document.getElementById('modals');

  if (!modalRoot) {
    throw new Error('Modal root not found');
  }

  return createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div className={styles.modal}>
        <div className={styles.header}>
          {title && <h2 className="text text_type_main-large">{title}</h2>}

          <button
            type="button"
            className={styles.close}
            aria-label="Закрыть модальное окно"
            onClick={onClose}
          >
            <CloseIcon type="primary" aria-hidden={true} />
          </button>
        </div>

        {children}
      </div>
    </>,
    modalRoot
  );
};
