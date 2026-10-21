import { Button, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useState } from 'react';

import { OrderDetails } from '@components/burger-constructor/components/order-details/order-details';
import { Modal } from '@components/modal/modal';
import { mockOrder } from '@utils/mocks';

import styles from './order-summary.module.css';

type TOrderSummaryProps = {
  total: number;
};

export const OrderSummary = ({ total }: TOrderSummaryProps): React.JSX.Element => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const handleCloseOrderModal = useCallback(() => setIsOrderModalOpen(false), []);

  return (
    <>
      <div className={styles.summary}>
        <p className={`${styles.total} text text_type_digits-medium`}>
          {total}
          <CurrencyIcon type="primary" />
        </p>

        <Button
          type="primary"
          size="large"
          htmlType="button"
          onClick={() => setIsOrderModalOpen(true)}
        >
          Оформить заказ
        </Button>
      </div>

      {isOrderModalOpen && (
        <Modal onClose={handleCloseOrderModal}>
          <OrderDetails order={mockOrder} />
        </Modal>
      )}
    </>
  );
};
