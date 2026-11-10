import { Button, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useCallback } from 'react';

import { OrderDetails } from '@components/burger-constructor/components/order-summary/components/order-details/order-details';
import { ErrorMessage } from '@components/error-message/error-message';
import { Modal } from '@components/modal/modal';
import {
  selectOrderIngredientIds,
  selectTotalPrice,
} from '@services/burger-constructor/burger-constructor-slice';
import { useAppDispatch, useAppSelector } from '@services/hooks';
import {
  placeOrder,
  clearOrder,
  selectOrder,
  selectOrderError,
  selectOrderLoading,
} from '@services/order/order-slice';

import styles from './order-summary.module.css';

export const OrderSummary = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const totalPrice = useAppSelector(selectTotalPrice);
  const ingredientIds = useAppSelector(selectOrderIngredientIds);

  const order = useAppSelector(selectOrder);
  const isLoading = useAppSelector(selectOrderLoading);
  const error = useAppSelector(selectOrderError);

  const handleOrderClick = useCallback(() => {
    void dispatch(placeOrder(ingredientIds));
  }, [dispatch, ingredientIds]);

  const handleOrderModalClose = useCallback(() => dispatch(clearOrder()), [dispatch]);

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
        <Modal onClose={handleOrderModalClose}>
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
