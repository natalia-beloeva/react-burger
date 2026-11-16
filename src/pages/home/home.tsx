import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { ErrorMessage } from '@components/error-message/error-message';
import { useAppSelector } from '@services/hooks';
import {
  selectIngredientsError,
  selectIngredientsLoading,
} from '@services/ingredients/ingredients-slice';

import styles from './home.module.css';

export const Home = (): React.JSX.Element => {
  const isLoading = useAppSelector(selectIngredientsLoading);
  const error = useAppSelector(selectIngredientsError);

  return (
    <>
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>

      <main className={`${styles.main} pl-5 pr-5`}>
        {isLoading && <Preloader />}

        {!isLoading && error && (
          <ErrorMessage
            title="Не удалось загрузить ингредиенты"
            details={`Попробуйте обновить страницу. Причина: ${error}`}
          />
        )}

        {!isLoading && !error && (
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        )}
      </main>
    </>
  );
};
