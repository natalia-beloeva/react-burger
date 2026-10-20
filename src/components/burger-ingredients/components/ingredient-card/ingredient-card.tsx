import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { memo } from 'react';

import type { TIngredientCardProps } from '../ingredient-card/types';

import styles from '../ingredient-card/ingredient-card.module.css';

const IngredientCardComponent = ({
  ingredient,
  count = 0,
}: TIngredientCardProps): React.JSX.Element => {
  return (
    <article className={styles.card}>
      {count > 0 && <Counter count={count} size="default" />}

      <img src={ingredient.image} alt={ingredient.name} width={240} height={120} />

      <p className={`${styles.price} text text_type_digits-default mt-1`}>
        {ingredient.price}
        <CurrencyIcon type="primary" />
      </p>

      <p className={`${styles.name} text text_type_main-default mt-1`}>
        {ingredient.name}
      </p>
    </article>
  );
};

export const IngredientCard = memo(IngredientCardComponent);
