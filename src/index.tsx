import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { RootStoreProvider } from './mst/rootStoreContext';
import { createRootStore } from './mst/createRootStore';
import { initAxios } from './utils/initAxios';
import { App } from './components/App';
import './index.scss';

initAxios();
const rootStore = createRootStore();

ReactDOM.render(
  <Router>
    <RootStoreProvider value={rootStore}>
      <App />
    </RootStoreProvider>
  </Router>,
  document.getElementById('root'),
);
