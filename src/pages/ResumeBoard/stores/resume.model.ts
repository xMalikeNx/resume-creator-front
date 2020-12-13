import { format } from 'date-fns';
import { Instance, types } from 'mobx-state-tree';
import { maybe } from 'mobx-state-tree/dist/internal';
import {
  createInputModel,
  InputStoreModel,
} from '../../../components/Input/models/input.model';
import {
  createMultiInputModel,
  MultiInputStoreModel,
} from '../../../components/Input/models/multiInput.model';
import { EducationModel } from './education.model';
import { ExperienceModel } from './experience.model';

export const ResumeStoreModel = types
  .model({
    _id: maybe(types.string),
    name: InputStoreModel,
    url: InputStoreModel,
    skills: MultiInputStoreModel,
    education: types.array(EducationModel),
    experience: types.array(ExperienceModel),
  })
  .actions((self) => {
    const validate = () => {};

    const saveResume = () => {};

    return { validate, saveResume };
  });

export type TCreateEducationItem = {
  institution: string;
  speciality: string;
  startDate: string;
  endDate?: string;
};

export type TCreateExperienceItem = {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  duties: string[];
  description: string;
};

export type TCreateResumeModelProps = {
  name?: string;
  url?: string;
  skills?: string[];
  education?: TCreateEducationItem[];
  experience?: TCreateExperienceItem[];
};

export const createResumeModel = (props?: TCreateResumeModelProps) =>
  ResumeStoreModel.create({
    name: createInputModel({ value: props?.name }),
    url: createInputModel({ value: props?.url }),
    skills: createMultiInputModel({ value: [] }),
    education: props?.education?.map((education) => ({
      institution: createInputModel({ value: education.institution }),
      speciality: createInputModel({ value: education.speciality }),
      startDate: createInputModel({
        value: education.startDate
          ? format(new Date(education.startDate), 'dd.mm.yyyy')
          : '',
      }),
      endDate: createInputModel({
        value: education.endDate
          ? format(new Date(education.endDate), 'dd.mm.yyyy')
          : '',
      }),
    })),
    experience: props?.experience?.map((experience) => ({
      company: createInputModel({ value: experience.company }),
      position: createInputModel({ value: experience.position }),
      duties: createMultiInputModel({ value: experience.duties }),
      description: createInputModel({ value: experience.description }),
      startDate: createInputModel({
        value: experience.startDate
          ? format(new Date(experience.startDate), 'dd.mm.yyyy')
          : '',
      }),
      endDate: createInputModel({
        value: experience.endDate
          ? format(new Date(experience.endDate), 'dd.mm.yyyy')
          : '',
      }),
    })),
  });

export type ResumeModel = Instance<typeof ResumeStoreModel>;
