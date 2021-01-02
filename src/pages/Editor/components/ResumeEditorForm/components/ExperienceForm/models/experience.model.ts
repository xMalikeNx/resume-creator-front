import { Instance, SnapshotIn, types } from 'mobx-state-tree';
import { InputStoreModel } from '../../../../../../../components/Input/models/input.model';
import { MultiInputStoreModel } from '../../../../../../../components/MultiInput/models/multiInput.model';

export const ExperienceStoreModel = types.model({
  _id: types.string,
  company: types.string,
  position: types.string,
  startDate: types.string,
  endDate: types.string,
  description: types.string,
  duties: types.array(types.string),
});

export type TExperienceModel = Instance<typeof ExperienceStoreModel>;

export type TExperienceModelProps = SnapshotIn<TExperienceModel>;

export const createExperienceModel = (props?: TExperienceModelProps) =>
  ExperienceStoreModel.create(props);

export const CreatableExperienceStoreModel = types.model({
  company: InputStoreModel,
  position: InputStoreModel,
  startDate: InputStoreModel,
  endDate: InputStoreModel,
  description: InputStoreModel,
  duties: MultiInputStoreModel,
});

export type TCreatableExperienceModel = Instance<
  typeof CreatableExperienceStoreModel
>;

export const createCreatableExperienceModel = (props?: TExperienceModelProps) =>
  CreatableExperienceStoreModel.create({
    company: { value: props?.company || '' },
    position: { value: props?.position || '' },
    startDate: { value: props?.startDate || '' },
    endDate: { value: props?.endDate || '' },
    description: { value: props?.description || '' },
    duties: { value: props?.duties || [] },
  });
