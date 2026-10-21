import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { ErrorMessage } from '@components/error-message/error-message';
import { getIngredients } from '@utils/api';

import type { TIngredient } from '@utils/types';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const [ingredients, setIngredients] = useState<TIngredient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getIngredients()
      .then(setIngredients)
      .catch((err: unknown) => {
        console.error(err);
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
      })
      .finally(() => setIsLoading(false));
  }, []);

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
          <>
            <BurgerIngredients ingredients={ingredients} />
            <BurgerConstructor ingredients={ingredients} />
          </>
        )}
      </main>
    </div>
  );
};

export default App;
