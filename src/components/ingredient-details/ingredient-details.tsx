import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@services/hooks';
import {
  selectIngredients,
  selectIngredientsLoading,
} from '@services/ingredients/ingredients-slice';
import {
  clearSelectedIngredient,
  selectSelectedIngredient,
  setSelectedIngredient,
} from '@services/selected-ingredient/selected-ingredient-slice';

import styles from './ingredient-details.module.css';

export const IngredientDetails = (): React.JSX.Element | null => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const ingredients = useAppSelector(selectIngredients);
  const isLoading = useAppSelector(selectIngredientsLoading);
  const ingredient = useAppSelector(selectSelectedIngredient);

  const ingredientFromUrl = ingredients.find((item) => item._id === id);

  useEffect(() => {
    if (ingredientFromUrl) {
      dispatch(setSelectedIngredient(ingredientFromUrl));
    }

    return (): void => {
      dispatch(clearSelectedIngredient());
    };
  }, [dispatch, ingredientFromUrl]);

  if (isLoading) {
    return <Preloader />;
  }

  if (!ingredientFromUrl) {
    return <p className="text text_type_main-medium">Ингредиент не найден</p>;
  }

  if (!ingredient) {
    return null;
  }

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
