import { flow } from 'mobx';
import { types } from 'mobx-state-tree';
import { UserStoreModel } from '../../mst/models/user.store';

export const ProfileFormModel = types
  .model({
    user: UserStoreModel,
  })
  .actions((self) => {
    const updateProfile = flow(function* () {
      console.log(self.user);
      yield 'one';
    });

    return { updateProfile };
  });
