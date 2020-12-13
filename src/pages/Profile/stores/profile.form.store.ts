import { flow, Instance, types } from 'mobx-state-tree';
import isEmail from 'validator/lib/isEmail';

import {
  createInputModel,
  InputStoreModel,
} from '../../../components/Input/models/input.model';
import { UserStore } from '../../../mst/models/user.store';
import { AuthApiService } from '../../../services/auth.api.service';
import { extractError } from '../../../utils/extractError';

const api = new AuthApiService();

const ProfileFormStoreModel = types
  .model({
    firstName: InputStoreModel,
    lastName: InputStoreModel,
    about: InputStoreModel,
    email: InputStoreModel,
    phone: InputStoreModel,
    avatar: InputStoreModel,
    address: InputStoreModel,
    profession: InputStoreModel,
    birthDate: InputStoreModel,
  })
  .actions((self) => {
    const validate = () => {
      const { firstName, lastName, email, birthDate, profession } = self;

      if (!firstName.value || firstName.value.length < 2) {
        self.firstName.setError(
          'Это поле должно содержать не менее 2 символов символов',
        );
      }

      if (!lastName.value || lastName.value.length < 2) {
        self.lastName.setError(
          'Это поле должно содержать не менее 2 символов символов',
        );
      }

      if (!email.value || !isEmail(email.value)) {
        self.email.setError('Email введен не верно');
      }

      if (!birthDate.value) {
        self.birthDate.setError('Данное поле обязательно к заполнению');
      }

      if (!profession.value) {
        self.profession.setError('Данное поле обязательно к заполнению');
      }
    };

    const updateProfile = flow(function* () {
      try {
        const result = yield api.updateProfile({
          firstName: self.firstName.value,
          lastName: self.lastName.value,
          about: self.about.value,
          email: self.email.value,
          phone: self.phone.value,
          avatar: self.avatar.value,
          address: self.address.value,
          profession: self.profession.value,
          birthDate: self.birthDate.value,
        });

        return result.data;
      } catch (err) {
        throw extractError(err);
      }
    });

    return { validate, updateProfile };
  })
  .views((self) => ({
    isValid: () =>
      !self.firstName.error &&
      !self.lastName.error &&
      !self.about.error &&
      !self.email.error &&
      !self.phone.error &&
      !self.avatar.error &&
      !self.profession.error &&
      !self.birthDate.error &&
      !self.address.error,
  }));

export const createProfileFormStoreModel = (user: UserStore | null) => {
  if (!user) {
    return null;
  }

  return ProfileFormStoreModel.create({
    firstName: createInputModel({ value: user.firstName, required: true }),
    lastName: createInputModel({ value: user.lastName, required: true }),
    about: createInputModel({ value: user.about }),
    email: createInputModel({ value: user.email, required: true }),
    phone: createInputModel({ value: user.phone }),
    avatar: createInputModel({ value: user.avatar }),
    address: createInputModel({ value: user.address }),
    profession: createInputModel({ value: user.profession }),
    birthDate: createInputModel({ value: user.birthDate, required: true }),
  });
};

export type ProfileFormStore = Instance<typeof ProfileFormStoreModel>;
