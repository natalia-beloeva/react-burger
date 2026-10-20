import { memo } from 'react';

import { IngredientCard } from '@components/burger-ingredients/components/ingredient-card/ingredient-card';

import type { TIngredientsGroupProps } from '../ingredients-group/types';

import styles from '../ingredients-group/ingredients-group.module.css';

const IngredientsGroupComponent = ({
  ref,
  title,
  ingredients,
  className,
}: TIngredientsGroupProps): React.JSX.Element => {
  return (
    <section ref={ref} className={className}>
      <h2 className="text text_type_main-medium">{title}</h2>

      <ul className={`${styles.list} mt-6`}>
        {ingredients.map((ingredient) => (
          <li key={ingredient._id}>
            <IngredientCard ingredient={ingredient} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export const IngredientsGroup = memo(IngredientsGroupComponent);
