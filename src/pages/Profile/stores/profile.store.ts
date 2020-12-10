import { getSnapshot, Instance, types } from 'mobx-state-tree';
import { UserStore, UserStoreModel } from '../../../mst/models/user.store';

const ProfileErrorModel = types.model('ProfileError', {
  id: types.string,
  description: types.string,
});

export const ProfileStoreModel = types
  .model('ProfileStore', {
    errors: types.array(ProfileErrorModel),
    user: UserStoreModel,
  })
  .actions((self) => {
    const setError = (errorId: string, errorDescription: string) => {
      const error = ProfileErrorModel.create({
        id: errorId,
        description: errorDescription,
      });
      self.errors.push(error);
    };

    const removeError = (errorId: string) => {
      const error = self.errors.find((item) => item.id === errorId);
      if (error) {
        self.errors.remove(error);
      }
    };

    return { setError, removeError };
  });

export type ProfileStore = Instance<typeof ProfileStoreModel>;

export const createProfileStoreModel = (user: UserStore | null) => {
  if (!user) {
    return null;
  }

  const userObject = UserStoreModel.create(getSnapshot(user));
  return ProfileStoreModel.create({ user: userObject, errors: [] });
};
