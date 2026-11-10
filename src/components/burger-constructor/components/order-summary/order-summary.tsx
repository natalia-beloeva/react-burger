import { Button, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useCallback } from 'react';

import { OrderDetails } from '@components/burger-constructor/components/order-summary/components/order-details/order-details';
import { ErrorMessage } from '@components/error-message/error-message';
import { Modal } from '@components/modal/modal';
import { useAppDispatch, useAppSelector } from '@services/hooks';
import { placeOrder, clearOrder } from '@services/order/order-slice';

import styles from './order-summary.module.css';

type TOrderSummaryProps = {
  totalPrice: number;
  ingredientIds: string[];
};

export const OrderSummary = ({
  totalPrice,
  ingredientIds,
}: TOrderSummaryProps): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const { item: order, isLoading, error } = useAppSelector((state) => state.order);

  const handleOrderClick = useCallback(() => {
    void dispatch(placeOrder(ingredientIds));
  }, [dispatch, ingredientIds]);

  const closeOrderModal = useCallback(() => dispatch(clearOrder()), [dispatch]);

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
          disabled={isLoading || ingredientIds.length === 0}
          onClick={handleOrderClick}
        >
          {isLoading ? 'Оформляем...' : 'Оформить заказ'}
        </Button>
      </div>

      {(order ?? error) && (
        <Modal onClose={closeOrderModal}>
          {order ? (
            <OrderDetails order={order} />
          ) : (
            <ErrorMessage
              title="Не удалось оформить заказ"
              details="Попробуйте ещё раз"
            />
          )}
        </Modal>
      )}
    </>
  );
};
