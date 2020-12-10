import { Instance, types } from 'mobx-state-tree';
import { AuthStoreModel } from './auth.store';

export const RootStoreModel = types.model('RootStoreModel').props({
  auth: AuthStoreModel,
});

export interface RootStore extends Instance<typeof RootStoreModel> {}
