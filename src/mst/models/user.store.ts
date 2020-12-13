import { Instance, types } from 'mobx-state-tree';

export const UserStoreModel = types.model('UserModel').props({
  login: types.string,
  firstName: '',
  lastName: '',
  about: '',
  email: '',
  phone: '',
  avatar: '',
  address: '',
  profession: '',
  birthDate: '',
});

export interface UserStore extends Instance<typeof UserStoreModel> {}
