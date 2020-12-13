import React, { FC, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { observer } from 'mobx-react';

import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { Registration } from '../../pages/Registration';
import { useStores } from '../../mst/rootStoreContext';
import { NotificationList } from '../NotificationList';
import { ResumeBoard } from '../../pages/ResumeBoard';
import { Profile } from '../../pages/Profile';
import { Editor } from '../../pages/Editor';
import { Login } from '../../pages/Login';
import { Preloader } from '../Preloader';

const App: FC = () => {
  const { auth, ui } = useStores();

  useEffect(() => {
    auth.fetchProfile();
  }, []);

  if (auth.loading) {
    return <Preloader />;
  }

  return (
    <div>
      <button
        onClick={() => ui.createNotification('Something went wrong', 'error')}
      >
        error
      </button>
      <button onClick={() => ui.createNotification('Some new info ', 'info')}>
        info
      </button>
      <button onClick={() => ui.createNotification('All is ok =)', 'success')}>
        success
      </button>
      <NotificationList />
      <ProtectedRoute path="/" component={ResumeBoard} exact />
      <ProtectedRoute path="/profile" component={Profile} exact />
      <ProtectedRoute path="/editor" component={Editor} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/registration" component={Registration} exact />
    </div>
  );
};

export default observer(App);
