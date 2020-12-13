import { createAuthStore } from './models/auth.store';
import { RootStoreModel } from './models/root.store';
import { createUiStoreModel } from './models/ui.store';

export const createRootStore = () => {
  const rootStore = RootStoreModel.create({
    auth: createAuthStore(),
    ui: createUiStoreModel(),
  });

  return rootStore;
};
