import React, { FC, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { observer } from 'mobx-react';

import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { Registration } from '../../pages/Registration';
import { useStores } from '../../mst/rootStoreContext';
import { ResumeBoard } from '../../pages/ResumeBoard';
import { Profile } from '../../pages/Profile';
import { Login } from '../../pages/Login';
import { Preloader } from '../Preloader';
import { Editor } from '../../pages/Editor';

const App: FC = () => {
  const { auth } = useStores();

  useEffect(() => {
    auth.fetchProfile();
  }, []);

  if (auth.loading) {
    return <Preloader />;
  }

  return (
    <div>
      <ProtectedRoute path="/" component={ResumeBoard} exact />
      <ProtectedRoute path="/profile" component={Profile} exact />
      <ProtectedRoute path="/editor" component={Editor} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/registration" component={Registration} exact />
    </div>
  );
};

export default observer(App);
