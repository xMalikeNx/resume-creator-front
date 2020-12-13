import { Instance, types } from 'mobx-state-tree';

export const InputStoreModel = types
  .model({
    value: '',
    error: '',
    required: false,
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

export type TcreateInputModelProps = {
  value?: string;
  required?: boolean;
};

export const createInputModel = (props?: TcreateInputModelProps) =>
  InputStoreModel.create({
    value: props?.value || '',
    required: Boolean(props?.required),
  });

export type InputModel = Instance<typeof InputStoreModel>;
