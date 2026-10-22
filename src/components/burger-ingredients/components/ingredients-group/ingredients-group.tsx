import { memo } from 'react';

import { IngredientCard } from '@components/burger-ingredients/components/ingredient-card/ingredient-card';

import type { TIngredient } from '@utils/types';

import styles from '../ingredients-group/ingredients-group.module.css';

type TIngredientsGroupProps = {
  ref: React.Ref<HTMLElement>;
  title: string;
  ingredients: TIngredient[];
  className?: string;
  onIngredientClick: (ingredient: TIngredient) => void;
};

const IngredientsGroupComponent = ({
  ref,
  title,
  ingredients,
  className,
  onIngredientClick,
}: TIngredientsGroupProps): React.JSX.Element => {
  return (
    <section ref={ref} className={className}>
      <h2 className="text text_type_main-medium">{title}</h2>

      <ul className={`${styles.list} mt-6`}>
        {ingredients.map((ingredient) => (
          <li key={ingredient._id}>
            <IngredientCard ingredient={ingredient} onClick={onIngredientClick} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export const IngredientsGroup = memo(IngredientsGroupComponent);
