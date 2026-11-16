import { Button } from '@krgaa/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

import styles from './auth-form.module.css';

type TAuthFormLink = {
  text: string;
  linkText: string;
  to: string;
};

type TAuthFormProps = {
  title: string;
  submitText: string;
  links: TAuthFormLink[];
  onSubmit?: () => void;
  children: React.ReactNode;
};

export const AuthForm = ({
  title,
  submitText,
  links,
  onSubmit,
  children,
}: TAuthFormProps): React.JSX.Element => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onSubmit?.();
  };

  return (
    <main className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium">{title}</h1>

        {children}

        <Button type="primary" size="medium" htmlType="submit">
          {submitText}
        </Button>
      </form>

      <ul className={`${styles.links} mt-20`}>
        {links.map((link) => (
          <li key={link.to} className="text text_type_main-default text_color_inactive">
            {link.text}{' '}
            <Link to={link.to} className={styles.link}>
              {link.linkText}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};
