import { Instance, types } from 'mobx-state-tree';
import { InputStoreModel } from '../../../components/Input/models/input.model';

export const EducationModel = types.model({
  institution: InputStoreModel,
  speciality: InputStoreModel,
  startDate: InputStoreModel,
  endDate: InputStoreModel,
});

export type TEducation = Instance<typeof EducationModel>;
