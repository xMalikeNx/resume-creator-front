import { observer } from 'mobx-react';
import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';
import { useStores } from '../../mst/rootStoreContext';
import { LoginForm } from './components/LoginForm';
import { LoginFormContext } from './components/LoginFormContext';
import { createLoginFormStoreModel } from './stores/login.form.store';

export const Login: FC = observer(() => {
  const loginFormStore = createLoginFormStoreModel();
  const { auth } = useStores();

  if (auth.isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <LoginFormContext.Provider value={loginFormStore}>
      <LoginForm />
    </LoginFormContext.Provider>
  );
});
