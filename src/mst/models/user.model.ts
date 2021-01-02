import { Instance, SnapshotIn, types } from 'mobx-state-tree';
import {
  createInputModel,
  InputStoreModel,
} from '../../components/Input/models/input.model';

export const UserStoreModel = types.model({
  _id: types.maybeNull(types.string),
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

export type TUserModel = Instance<typeof UserStoreModel>;

export const createUserStoreModel = (props?: SnapshotIn<TUserModel>) =>
  UserStoreModel.create({ ...props, login: props?.login || '' });

export const CreatableUserStoreModel = types.model({
  _id: types.maybeNull(types.string),
  login: InputStoreModel,
  firstName: InputStoreModel,
  lastName: InputStoreModel,
  about: InputStoreModel,
  email: InputStoreModel,
  phone: InputStoreModel,
  avatar: InputStoreModel,
  address: InputStoreModel,
  profession: InputStoreModel,
  birthDate: InputStoreModel,
});

export type TCreatableUserModel = Instance<typeof CreatableUserStoreModel>;

export const createCreatableUserStoreModel = (props?: SnapshotIn<TUserModel>) =>
  CreatableUserStoreModel.create({
    _id: props?._id || null,
    login: createInputModel({ value: props?.login || '' }),
    firstName: createInputModel({ value: props?.firstName || '' }),
    lastName: createInputModel({ value: props?.lastName || '' }),
    about: createInputModel({ value: props?.about || '' }),
    email: createInputModel({ value: props?.email || '' }),
    phone: createInputModel({ value: props?.phone || '' }),
    avatar: createInputModel({ value: props?.avatar || '' }),
    address: createInputModel({ value: props?.address || '' }),
    profession: createInputModel({ value: props?.profession || '' }),
    birthDate: createInputModel({ value: props?.birthDate || '' }),
  });
