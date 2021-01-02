import { Instance, types } from 'mobx-state-tree';

export const InputStoreModel = types
  .model('InputModel', {
    value: '',
    error: '',
  })
  .preProcessSnapshot((snapshot) => {
    if (typeof snapshot === 'string') {
      return { value: snapshot, error: '' };
    }
    return snapshot;
  })
  .postProcessSnapshot((snapshot) => snapshot.value)
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
};

export const createInputModel = (props?: TcreateInputModelProps) =>
  InputStoreModel.create({
    value: props?.value || '',
  });

export type InputModel = Instance<typeof InputStoreModel>;
