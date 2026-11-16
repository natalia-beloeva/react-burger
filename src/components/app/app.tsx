import { useCallback, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { AppHeader } from '@components/app-header/app-header';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import { Modal } from '@components/modal/modal';
import { Home } from '@pages/home/home';
import { Ingredient } from '@pages/ingredient/ingredient';
import { useAppDispatch } from '@services/hooks';
import { fetchIngredients } from '@services/ingredients/ingredients-slice';

import type { Location } from 'react-router-dom';

import styles from './app.module.css';

type TLocationState = {
  background?: Location;
} | null;

export const App = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const background = (location.state as TLocationState)?.background;

  useEffect(() => {
    void dispatch(fetchIngredients());
  }, [dispatch]);

  const handleModalClose = useCallback(() => {
    void navigate(-1);
  }, [navigate]);

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes location={background ?? location}>
        <Route path="/" element={<Home />} />
        <Route path="/ingredients/:id" element={<Ingredient />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal title="Детали ингредиента" onClose={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
