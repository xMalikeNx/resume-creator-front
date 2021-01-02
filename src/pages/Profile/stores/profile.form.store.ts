import {
  flow,
  getSnapshot,
  Instance,
  SnapshotIn,
  types,
} from 'mobx-state-tree';
import isEmail from 'validator/lib/isEmail';

import {
  CreatableUserStoreModel,
  createCreatableUserStoreModel,
  TUserModel,
} from '../../../mst/models/user.model';
import { AuthApiService } from '../../../services/auth.api.service';
import { extractError } from '../../../utils/extractError';

const api = new AuthApiService();

const ProfileFormStoreModel = types
  .model({ profile: CreatableUserStoreModel })
  .actions((self) => {
    const validate = () => {
      const {
        profile: { firstName, lastName, email, birthDate, profession },
      } = self;

      if (!firstName.value || firstName.value.length < 2) {
        firstName.setError(
          'Это поле должно содержать не менее 2 символов символов',
        );
      }

      if (!lastName.value || lastName.value.length < 2) {
        lastName.setError(
          'Это поле должно содержать не менее 2 символов символов',
        );
      }

      if (!email.value || !isEmail(email.value)) {
        email.setError('Email введен не верно');
      }

      if (!birthDate.value) {
        birthDate.setError('Данное поле обязательно к заполнению');
      }

      if (!profession.value) {
        profession.setError('Данное поле обязательно к заполнению');
      }
    };

    const updateProfile = flow(function* () {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, ...profile } = getSnapshot(self.profile);
        const result = yield api.updateProfile(profile);

        return result.data;
      } catch (err) {
        throw extractError(err);
      }
    });

    return { validate, updateProfile };
  })
  .views((self) => ({
    isValid: () =>
      !self.profile.firstName.error &&
      !self.profile.lastName.error &&
      !self.profile.about.error &&
      !self.profile.email.error &&
      !self.profile.phone.error &&
      !self.profile.avatar.error &&
      !self.profile.profession.error &&
      !self.profile.birthDate.error &&
      !self.profile.address.error,
  }));

export const createProfileFormStoreModel = (
  user: SnapshotIn<TUserModel> | null,
) => {
  if (!user) {
    return null;
  }

  return ProfileFormStoreModel.create({
    profile: createCreatableUserStoreModel(user),
  });
};

export type ProfileFormStore = Instance<typeof ProfileFormStoreModel>;
