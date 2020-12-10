import React, { useContext } from 'react';
import { RootStore } from './models/root.store';

const RootStoreContext = React.createContext<RootStore>({} as RootStore);

export const RootStoreProvider = RootStoreContext.Provider;

export const useStores = () => useContext(RootStoreContext);
