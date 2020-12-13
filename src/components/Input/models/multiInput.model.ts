import { Instance, types } from 'mobx-state-tree';

export const MultiInputStoreModel = types
  .model({
    value: types.array(types.string),
    error: '',
    required: false,
  })
  .actions((self) => ({
    setValue: (value: string) => {
      self.value.push(value);
      self.error = '';
    },
    removeValue: (value: string) => {
      self.value.remove(value);
    },
    setError: (error: string) => {
      self.error = error;
    },
  }));

export type TcreateMultiInputModelProps = {
  value?: string[];
  required?: boolean;
};

export const createMultiInputModel = (props?: TcreateMultiInputModelProps) =>
  MultiInputStoreModel.create({
    value: props?.value || [],
    required: Boolean(props?.required),
  });

export type InputModel = Instance<typeof MultiInputStoreModel>;
