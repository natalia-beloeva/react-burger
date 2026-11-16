import { IngredientDetails } from '@components/ingredient-details/ingredient-details';

import styles from './ingredient.module.css';

export const Ingredient = (): React.JSX.Element => {
  return (
    <main className={`${styles.page} pt-30`}>
      <h1 className="text text_type_main-large">Детали ингредиента</h1>
      <IngredientDetails />
    </main>
  );
};
