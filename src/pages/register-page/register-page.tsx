import {
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import { AuthForm } from '@components/auth-form/auth-form';

export const RegisterPage = (): React.JSX.Element => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <AuthForm
      title="Регистрация"
      submitText="Зарегистрироваться"
      links={[{ text: 'Уже зарегистрированы?', linkText: 'Войти', to: '/login' }]}
    >
      <Input
        type="text"
        placeholder="Имя"
        name="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <EmailInput
        placeholder="E-mail"
        name="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <PasswordInput
        placeholder="Пароль"
        name="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
    </AuthForm>
  );
};
