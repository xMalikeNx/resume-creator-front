import { observer } from 'mobx-react';
import React, { FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useStores } from '../../mst/rootStoreContext';

export const ProtectedRoute: FC<RouteProps> = observer((props) => {
  const { auth } = useStores();

  if (auth.isLoggedIn) {
    return <Route {...props} />;
  }

  return <Route {...props} component={() => <Redirect to="/login" />} />;
});
