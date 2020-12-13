import { Instance, types } from 'mobx-state-tree';
import {
  createInputModel,
  InputStoreModel,
} from '../../../components/Input/models/input.model';

export const EducationModel = types.model({
  institution: InputStoreModel,
  speciality: InputStoreModel,
  startDate: InputStoreModel,
  endDate: InputStoreModel,
});

export const createEducationModel = () =>
  EducationModel.create({
    institution: createInputModel(),
    speciality: createInputModel(),
    startDate: createInputModel(),
    endDate: createInputModel(),
  });

export type TEducationModel = Instance<typeof EducationModel>;
