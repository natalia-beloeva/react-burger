import {
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import styles from './profile-form.module.css';

export const ProfileForm = (): React.JSX.Element => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form className={styles.form}>
      <Input
        type="text"
        placeholder="Имя"
        name="name"
        icon="EditIcon"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <EmailInput
        placeholder="Логин"
        name="email"
        isIcon={true}
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <PasswordInput
        placeholder="Пароль"
        name="password"
        icon="EditIcon"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
    </form>
  );
};
