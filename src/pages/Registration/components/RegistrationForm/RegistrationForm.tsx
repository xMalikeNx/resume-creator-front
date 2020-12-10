import React, { FC, FormEvent, useCallback, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button } from '../../../../components/Button';
import { Form } from '../../../../components/Form';
import { Input } from '../../../../components/Input';
import { RegistrationStoreContext } from '../RegistrationStoreContext/RegistrationStoreContext';

export const RegistrationForm: FC = () => {
  const history = useHistory();
  const {
    login,
    password,
    approvedPassword,
    error,
    registration,
    validate,
    handleApprovedPasswordChange,
    handleLoginChange,
    handlePasswordChange,
  } = useContext(RegistrationStoreContext);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (!validate()) {
        return;
      }
      registration().then(() => history.push('/login'));
    },
    [registration, error],
  );

  return (
    <Form bordered centered title="Регистрация" onSubmit={handleSubmit}>
      <Input
        field={login}
        title="Логин"
        onChange={handleLoginChange}
        required
      />
      <Input
        field={password}
        title="Пароль"
        type="password"
        onChange={handlePasswordChange}
        required
      />
      <Input
        field={approvedPassword}
        title="Подтвержение пароля"
        type="password"
        onChange={handleApprovedPasswordChange}
        required
      />
      <Button position="center" style={{ marginTop: '15px' }} type="submit">
        Зарегистрироваться
      </Button>
      <div style={{ fontSize: '14px', textAlign: 'center', marginTop: '15px' }}>
        Уже есть аккаунт?
        <Link to="/login">Войти</Link>
      </div>
    </Form>
  );
};
