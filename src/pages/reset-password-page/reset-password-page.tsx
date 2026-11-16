import { Input, PasswordInput } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import { AuthForm } from '@components/auth-form/auth-form';

export const ResetPasswordPage = (): React.JSX.Element => {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  return (
    <AuthForm
      title="Восстановление пароля"
      submitText="Сохранить"
      links={[{ text: 'Вспомнили пароль?', linkText: 'Войти', to: '/login' }]}
    >
      <PasswordInput
        placeholder="Введите новый пароль"
        name="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <Input
        type="text"
        placeholder="Введите код из письма"
        name="token"
        value={token}
        onChange={(event) => setToken(event.target.value)}
      />
    </AuthForm>
  );
};
