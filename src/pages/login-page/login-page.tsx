import { EmailInput, PasswordInput } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import { AuthForm } from '@components/auth-form/auth-form';

export const LoginPage = (): React.JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <AuthForm
      title="Вход"
      submitText="Войти"
      links={[
        {
          text: 'Вы — новый пользователь?',
          linkText: 'Зарегистрироваться',
          to: '/register',
        },
        {
          text: 'Забыли пароль?',
          linkText: 'Восстановить пароль',
          to: '/forgot-password',
        },
      ]}
    >
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
