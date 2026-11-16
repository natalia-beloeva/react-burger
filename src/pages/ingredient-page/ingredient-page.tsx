import { IngredientDetails } from '@components/ingredient-details/ingredient-details';

import styles from './ingredient-page.module.css';

export const IngredientPage = (): React.JSX.Element => {
  return (
    <main className={`${styles.page} pt-30`}>
      <h1 className="text text_type_main-large">Детали ингредиента</h1>
      <IngredientDetails />
    </main>
  );
};
