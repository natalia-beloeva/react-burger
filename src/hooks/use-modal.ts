import { useCallback, useState } from 'react';

type TUseModal<T> = {
  modalData: T | null;
  openModal: (data: T) => void;
  closeModal: () => void;
};

export const useModal = <T>(): TUseModal<T> => {
  const [modalData, setModalData] = useState<T | null>(null);

  const openModal = useCallback((data: T) => setModalData(data), []);
  const closeModal = useCallback(() => setModalData(null), []);

  return { modalData, openModal, closeModal };
};
