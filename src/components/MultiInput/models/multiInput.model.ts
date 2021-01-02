import { Instance, types } from 'mobx-state-tree';

export const MultiInputStoreModel = types
  .model('MultiInputModel', {
    value: types.array(types.string),
    error: '',
  })
  .preProcessSnapshot((snapshot) => {
    if (Array.isArray(snapshot)) {
      return [];
    }

    return snapshot;
  })
  .postProcessSnapshot((snapshot) => snapshot.value)
  .actions((self) => ({
    addValue: (value: string) => {
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
};

export const createMultiInputModel = (props?: TcreateMultiInputModelProps) =>
  MultiInputStoreModel.create({
    value: props?.value || [],
  });

export type MultiInputModel = Instance<typeof MultiInputStoreModel>;
