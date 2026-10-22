import type { TIngredient } from '@utils/types';

import styles from './ingredient-details.module.css';

type TIngredientDetailsProps = {
  ingredient: TIngredient;
};

export const IngredientDetails = ({
  ingredient,
}: TIngredientDetailsProps): React.JSX.Element => {
  const nutrition = [
    { label: 'Калории, ккал', value: ingredient.calories },
    { label: 'Белки, г', value: ingredient.proteins },
    { label: 'Жиры, г', value: ingredient.fat },
    { label: 'Углеводы, г', value: ingredient.carbohydrates },
  ];

  return (
    <div className={`${styles.details} pb-5`}>
      <img src={ingredient.image_large} alt={ingredient.name} width={480} height={240} />

      <p className="text text_type_main-medium mt-4">{ingredient.name}</p>

      <ul className={`${styles.nutrition} mt-8`}>
        {nutrition.map((item) => (
          <li key={item.label} className={styles.item}>
            <p className="text text_type_main-default text_color_inactive">
              {item.label}
            </p>

            <p className="text text_type_digits-default text_color_inactive mt-2">
              {item.value}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
