import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { AppHeader } from '@components/app-header/app-header';
import { Home } from '@pages/home/home';
import { useAppDispatch } from '@services/hooks';
import { fetchIngredients } from '@services/ingredients/ingredients-slice';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
