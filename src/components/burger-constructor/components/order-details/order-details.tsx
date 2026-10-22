import doneIcon from '@/assets/images/done.svg';

import type { TOrder } from '@utils/types';

import styles from './order-details.module.css';

type TOrderDetailsProps = {
  order: TOrder;
};

export const OrderDetails = ({ order }: TOrderDetailsProps): React.JSX.Element => {
  return (
    <div className={`${styles.details} pb-15`}>
      <p className={`${styles.number} text text_type_digits-large`}>{order.number}</p>

      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>

      <img className="mt-15" src={doneIcon} alt="" />

      <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>

      <p className="text text_type_main-default text_color_inactive mt-2">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};
