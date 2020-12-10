import { createAuthStore } from './models/auth.store';
import { RootStoreModel } from './models/root.store';

export const createRootStore = () => {
  const rootStore = RootStoreModel.create({
    auth: createAuthStore(),
  });

  return rootStore;
};
