import React, { FC, FormEvent, useCallback, useContext } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import { useStores } from '../../../../mst/rootStoreContext';
import { Button } from '../../../../components/Button';
import { LoginFormContext } from '../LoginFormContext';
import { Input } from '../../../../components/Input';
import { Form } from '../../../../components/Form';

export const LoginForm: FC = observer(() => {
  const loginFormStore = useContext(LoginFormContext);
  const { auth } = useStores();
  const { login, password, requestLogin, error } = loginFormStore;

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      requestLogin().then(() => auth.fetchProfile());
    },
    [requestLogin, error],
  );

  return (
    <Form
      onSubmit={handleSubmit}
      bordered
      centered
      small
      title="Авторизация"
      error={error}
    >
      <Input
        title="Логин"
        type="text"
        field={login}
        required
        onChange={loginFormStore.handleChangeLogin}
      />
      <Input
        title="Пароль"
        type="password"
        field={password}
        required
        onChange={loginFormStore.handleChangePassword}
      />
      <Button position="center" style={{ marginTop: '15px' }}>
        Войти
      </Button>
      <div style={{ fontSize: '14px', textAlign: 'center', marginTop: '15px' }}>
        Нет аккаунта?
        <Link to="/registration"> Зарегистрироваться</Link>
      </div>
    </Form>
  );
});
