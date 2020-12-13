import { flow, types } from 'mobx-state-tree';
import {
  createInputModel,
  InputStoreModel,
} from '../../../components/Input/models/input.model';
import { extractError } from '../../../utils/extractError';
import resumeApi from '../../../api/resume.api';
import { ExperienceModel } from '../../ResumeBoard/stores/experience.model';
import { EducationModel } from '../../ResumeBoard/stores/education.model';

export const ResumeModel = types.model({
  _id: types.maybe(types.string),
  name: InputStoreModel,
  url: InputStoreModel,
  skills: types.array(types.string),
  experience: types.array(ExperienceModel),
  education: types.array(EducationModel),
});

export const ResumeEditStoreModel = types
  .model({
    loading: false,
    resume: ResumeModel,
  })
  .actions((self) => {
    const fetchResume = flow(function* (resumeId: string) {
      try {
        self.loading = true;
        const response = yield resumeApi.fetchResume(resumeId);
        self.resume = response.data;
      } catch (err) {
        throw extractError(err);
      } finally {
        self.loading = false;
      }
    });

    return { fetchResume };
  });

export const createResumeEditStoreModel = () =>
  ResumeEditStoreModel.create({
    resume: {
      name: createInputModel(),
      url: createInputModel(),
      education: [],
    },
  });
