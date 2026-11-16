import { useCallback, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { AppHeader } from '@components/app-header/app-header';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import { Modal } from '@components/modal/modal';
import { ProfileForm } from '@components/profile-form/profile-form';
import { FeedPage } from '@pages/feed-page/feed-page';
import { ForgotPasswordPage } from '@pages/forgot-password-page/forgot-password-page';
import { HomePage } from '@pages/home-page/home-page';
import { IngredientPage } from '@pages/ingredient-page/ingredient-page';
import { LoginPage } from '@pages/login-page/login-page';
import { NotFoundPage } from '@pages/not-found-page/not-found-page';
import { ProfileOrderPage } from '@pages/profile-order-page/profile-order-page';
import { ProfilePage } from '@pages/profile-page/profile-page';
import { RegisterPage } from '@pages/register-page/register-page';
import { ResetPasswordPage } from '@pages/reset-password-page/reset-password-page';
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
        <Route path="/" element={<HomePage />} />
        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/profile" element={<ProfilePage />}>
          <Route index element={<ProfileForm />} />
          <Route path="orders" element={<ProfileOrderPage />} />
        </Route>
        <Route path="/feed" element={<FeedPage />} />
        <Route path="*" element={<NotFoundPage />} />
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
