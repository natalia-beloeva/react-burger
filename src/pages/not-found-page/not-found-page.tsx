import { Link } from 'react-router-dom';

import styles from './not-found-page.module.css';

export const NotFoundPage = (): React.JSX.Element => {
  return (
    <main className={styles.page}>
      <p className="text text_type_digits-large">404</p>
      <h1 className="text text_type_main-medium mt-8">Страница не найдена</h1>
      <Link to="/" className={`${styles.link} text text_type_main-default mt-8`}>
        Вернуться на главную
      </Link>
    </main>
  );
};
