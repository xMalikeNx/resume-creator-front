import { Instance, types } from 'mobx-state-tree';

export const InputStoreModel = types
  .model({
    value: '',
    error: '',
  })
  .actions((self) => ({
    setValue: (value: string) => {
      self.value = value;
      self.error = '';
    },
    setError: (error: string) => {
      self.error = error;
    },
  }));

export const createInputModel = (value: string = '') =>
  InputStoreModel.create({ value });

export type InputModel = Instance<typeof InputStoreModel>;
