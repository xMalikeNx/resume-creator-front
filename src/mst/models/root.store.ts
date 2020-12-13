import { Instance, types } from 'mobx-state-tree';
import { AuthStoreModel } from './auth.store';
import { UiStoreModel } from './ui.store';

export const RootStoreModel = types.model('RootStoreModel').props({
  auth: AuthStoreModel,
  ui: UiStoreModel,
});

export interface RootStore extends Instance<typeof RootStoreModel> {}
