import { flow, Instance, types } from 'mobx-state-tree';
import { FormEvent } from 'react';
import {
  createInputModel,
  InputStoreModel,
} from '../../../components/Input/models/input.model';
import { AuthApiService } from '../../../services/auth.api.service';
import { extractError } from '../../../utils/extractError';

const api = new AuthApiService();

export const LoginFormStoreModel = types
  .model({
    login: InputStoreModel,
    password: InputStoreModel,
    loading: false,
    error: '',
  })
  .actions((self) => ({
    requestLogin: flow(function* requestLogin() {
      try {
        self.loading = true;
        self.error = '';
        yield api.login({
          login: self.login.value,
          password: self.password.value,
        });
      } catch (err) {
        self.error = extractError(err);
        throw err;
      } finally {
        self.loading = false;
      }
    }),
    handleChangeLogin: (e: FormEvent) => {
      const { value } = e.target as HTMLInputElement;
      self.login.setValue(value);
    },
    handleChangePassword: (e: FormEvent) => {
      const { value } = e.target as HTMLInputElement;
      self.password.setValue(value);
    },
  }));

export type LoginFormStore = Instance<typeof LoginFormStoreModel>;

export const createLoginFormStoreModel = () =>
  LoginFormStoreModel.create({
    login: createInputModel(),
    password: createInputModel(),
  });
