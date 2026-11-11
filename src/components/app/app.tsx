import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { ErrorMessage } from '@components/error-message/error-message';
import { useAppDispatch, useAppSelector } from '@services/hooks';
import {
  fetchIngredients,
  selectIngredientsError,
  selectIngredientsLoading,
} from '@services/ingredients/ingredients-slice';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(selectIngredientsLoading);
  const error = useAppSelector(selectIngredientsError);

  useEffect(() => {
    void dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
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
    </div>
  );
};

export default App;
