import { createAuthStore } from './stores/auth.store';
import { RootStoreModel } from './stores/root.store';
import { createUiStoreModel } from './stores/ui.store';

export const createRootStore = () => {
  const rootStore = RootStoreModel.create({
    auth: createAuthStore(),
    ui: createUiStoreModel(),
  });

  return rootStore;
};
