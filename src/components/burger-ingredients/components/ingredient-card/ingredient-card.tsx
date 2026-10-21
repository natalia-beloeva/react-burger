import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { memo } from 'react';

import type { TIngredient } from '@utils/types';

import styles from '../ingredient-card/ingredient-card.module.css';

type TIngredientCardProps = {
  ingredient: TIngredient;
  count?: number;
  onClick: (ingredient: TIngredient) => void;
};

const IngredientCardComponent = ({
  ingredient,
  count = 0,
  onClick,
}: TIngredientCardProps): React.JSX.Element => {
  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick(ingredient);
    }
  };

  return (
    <article
      className={styles.card}
      role="button"
      tabIndex={0}
      onClick={() => onClick(ingredient)}
      onKeyDown={handleKeyDown}
    >
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
