import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { memo, useRef } from 'react';
import { useDrag } from 'react-dnd';

import { INGREDIENT_DND_TYPE } from '@utils/constants';

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
  const cardRef = useRef<HTMLElement>(null);

  const [{ isDragging }, dragRef] = useDrag({
    type: INGREDIENT_DND_TYPE,
    item: ingredient,
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  dragRef(cardRef);

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick(ingredient);
    }
  };

  return (
    <article
      ref={cardRef}
      className={`${styles.card} ${isDragging ? styles.dragging : ''}`}
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
