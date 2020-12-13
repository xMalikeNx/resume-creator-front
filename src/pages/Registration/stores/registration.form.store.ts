import { flow, Instance, types } from 'mobx-state-tree';
import { FormEvent } from 'react';
import {
  createInputModel,
  InputStoreModel,
} from '../../../components/Input/models/input.model';
import { AuthApiService } from '../../../services/auth.api.service';
import { extractError } from '../../../utils/extractError';

const api = new AuthApiService();

export const RegistrationFormStoreModel = types
  .model({
    login: InputStoreModel,
    password: InputStoreModel,
    approvedPassword: InputStoreModel,
    error: '',
  })
  .actions((self) => {
    const validate = () => {
      let error = false;

      const { login, password, approvedPassword } = self;
      if (!login.value.length || login.value.length < 3) {
        login.setError('Логин введен не верно');
        error = true;
      }

      if (!password.value || password.value.length < 5) {
        password.setError('Пароль должен содержать более 5 символов');
        error = true;
      }

      if (approvedPassword.value !== password.value) {
        approvedPassword.setError('Пароли не совпадают');
        error = true;
      }

      return !error;
    };

    const handleLoginChange = (e: FormEvent) => {
      const { value } = e.target as HTMLInputElement;
      self.login.setValue(value);
    };

    const handlePasswordChange = (e: FormEvent) => {
      const { value } = e.target as HTMLInputElement;
      self.password.setValue(value);
    };

    const handleApprovedPasswordChange = (e: FormEvent) => {
      const { value } = e.target as HTMLInputElement;
      self.approvedPassword.setValue(value);
    };

    const registration = flow(function* () {
      try {
        self.error = '';
        yield api.registration({
          login: self.login.value,
          password: self.password.value,
        });
      } catch (err) {
        self.error = extractError(err);
        throw err;
      }
    });
    return {
      validate,
      registration,
      handleLoginChange,
      handlePasswordChange,
      handleApprovedPasswordChange,
    };
  });

export const createRegistrationFormStoreModel = () =>
  RegistrationFormStoreModel.create({
    login: createInputModel(),
    password: createInputModel(),
    approvedPassword: createInputModel(),
  });

export type RegistrationFormStore = Instance<typeof RegistrationFormStoreModel>;
