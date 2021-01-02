import { Instance, SnapshotIn, types } from 'mobx-state-tree';
import {
  createInputModel,
  InputStoreModel,
} from '../../components/Input/models/input.model';
import {
  createMultiInputModel,
  MultiInputStoreModel,
} from '../../components/MultiInput/models/multiInput.model';
import {
  CreatableEducationStoreModel,
  EducationStoreModel,
} from '../../pages/Editor/components/ResumeEditorForm/components/EducationForm/models/education.model';
import {
  CreatableExperienceStoreModel,
  ExperienceStoreModel,
} from '../../pages/Editor/components/ResumeEditorForm/components/ExperienceForm/models/experience.model';
import { UserStoreModel } from './user.model';

export const ResumeModelStore = types.model({
  user: types.maybeNull(UserStoreModel),
  _id: types.maybeNull(types.string),
  name: '',
  url: '',
  experience: types.array(ExperienceStoreModel),
  education: types.array(EducationStoreModel),
  skills: types.array(types.string),
});

export type TResumeModel = Instance<typeof ResumeModelStore>;

export const createResumeModel = (props?: SnapshotIn<TResumeModel>) =>
  ResumeModelStore.create(props);

// =====================================

export const CreatableResumeModelStore = types.model({
  name: InputStoreModel,
  url: InputStoreModel,
  experience: types.array(CreatableExperienceStoreModel),
  education: types.array(CreatableEducationStoreModel),
  skills: MultiInputStoreModel,
});

export type TCreatableResumeModel = Instance<typeof CreatableResumeModelStore>;

export const createCreatableResumeModel = () =>
  CreatableResumeModelStore.create({
    name: createInputModel(),
    url: createInputModel(),
    experience: [],
    education: [],
    skills: createMultiInputModel(),
  });
