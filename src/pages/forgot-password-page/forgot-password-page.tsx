import { EmailInput } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import { AuthForm } from '@components/auth-form/auth-form';

export const ForgotPasswordPage = (): React.JSX.Element => {
  const [email, setEmail] = useState('');

  return (
    <AuthForm
      title="Восстановление пароля"
      submitText="Восстановить"
      links={[{ text: 'Вспомнили пароль?', linkText: 'Войти', to: '/login' }]}
    >
      <EmailInput
        placeholder="Укажите e-mail"
        name="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
    </AuthForm>
  );
};
