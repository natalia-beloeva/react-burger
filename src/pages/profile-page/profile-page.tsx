import { NavLink, Outlet, useMatch } from 'react-router-dom';

import styles from './profile-page.module.css';

const getLinkClassName = ({ isActive }: { isActive: boolean }): string =>
  `${styles.link} ${isActive ? styles.link_active : ''} text text_type_main-medium`;

export const ProfilePage = (): React.JSX.Element => {
  const isOrdersPage = useMatch('/profile/orders');

  return (
    <main className={`${styles.page} pt-30`}>
      <div className={styles.sidebar}>
        <nav>
          <ul className={styles.menu}>
            <li>
              <NavLink to="/profile" end className={getLinkClassName}>
                Профиль
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile/orders" className={getLinkClassName}>
                История заказов
              </NavLink>
            </li>
            <li>
              <button
                type="button"
                className={`${styles.link} ${styles.button} text text_type_main-medium`}
              >
                Выход
              </button>
            </li>
          </ul>
        </nav>

        <p
          className={`${styles.caption} text text_type_main-default text_color_inactive mt-20`}
        >
          {isOrdersPage
            ? 'В этом разделе вы можете просмотреть свою историю заказов'
            : 'В этом разделе вы можете изменить свои персональные данные'}
        </p>
      </div>

      <Outlet />
    </main>
  );
};
