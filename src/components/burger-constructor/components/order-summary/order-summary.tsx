import { Button, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import { OrderDetails } from '@components/burger-constructor/components/order-details/order-details';
import { Modal } from '@components/modal/modal';
import { useModal } from '@hooks/use-modal';
import { mockOrder } from '@utils/mocks';

import type { TOrder } from '@utils/types';

import styles from './order-summary.module.css';

type TOrderSummaryProps = {
  totalPrice: number;
};

export const OrderSummary = ({ totalPrice }: TOrderSummaryProps): React.JSX.Element => {
  const { modalData: order, openModal, closeModal } = useModal<TOrder>();

  return (
    <>
      <div className={styles.summary}>
        <p className={`${styles.total} text text_type_digits-medium`}>
          {totalPrice}
          <CurrencyIcon type="primary" />
        </p>

        <Button
          type="primary"
          size="large"
          htmlType="button"
          onClick={() => openModal(mockOrder)}
        >
          Оформить заказ
        </Button>
      </div>

      {order && (
        <Modal onClose={closeModal}>
          <OrderDetails order={order} />
        </Modal>
      )}
    </>
  );
};
