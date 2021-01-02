import { Instance, SnapshotIn, types } from 'mobx-state-tree';
import { InputStoreModel } from '../../../../../../../components/Input/models/input.model';

export const EducationStoreModel = types.model({
  _id: types.string,
  institution: types.string,
  speciality: types.string,
  startDate: types.string,
  endDate: types.string,
});

export type TEducationModel = Instance<typeof EducationStoreModel>;

export type TEducationModelProps = SnapshotIn<TEducationModel>;

export const createEducationModel = (props: TEducationModelProps) =>
  EducationStoreModel.create(props);

// =======================================

export const CreatableEducationStoreModel = types.model({
  institution: InputStoreModel,
  speciality: InputStoreModel,
  startDate: InputStoreModel,
  endDate: InputStoreModel,
});

export type TCreatableEducationModel = Instance<
  typeof CreatableEducationStoreModel
>;

export const createCreatableEducationModel = (props?: TEducationModelProps) =>
  CreatableEducationStoreModel.create({
    institution: { value: props?.institution || '' },
    speciality: { value: props?.speciality || '' },
    startDate: { value: props?.startDate || '' },
    endDate: { value: props?.endDate || '' },
  });
