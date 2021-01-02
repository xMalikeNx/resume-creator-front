import { flow, Instance, types } from 'mobx-state-tree';
import { extractError } from '../../../utils/extractError';

import resumeApi from '../../../api/resume.api';
import {
  createResumeModel,
  ResumeModelStore,
} from '../../../mst/models/resume.model';
import {
  createExperienceModel,
  TExperienceModelProps,
} from '../../Editor/components/ResumeEditorForm/components/ExperienceForm/models/experience.model';
import {
  createEducationModel,
  TEducationModelProps,
} from '../../Editor/components/ResumeEditorForm/components/EducationForm/models/education.model';
import { formatDate } from '../../../utils/dateHelpers';
import { createUserStoreModel } from '../../../mst/models/user.model';

export const ResumeViewStoreModel = types
  .model('ResumeViewModel', {
    loading: true,
    isFailed: false,
    resume: ResumeModelStore,
  })
  .actions((self) => {
    const fetchResume = flow(function* (userLogin: string, resumeId: string) {
      try {
        self.loading = true;
        const {
          data: { payload },
        } = yield resumeApi.fetchViewResume(userLogin, resumeId);

        const { name, _id, url, skills, education, experience, user } = payload;
        self.resume._id = _id;
        self.resume.name = name;
        self.resume.url = url;
        self.resume.user = createUserStoreModel(user);
        skills.forEach((item: string) => self.resume.skills.push(item));
        self.resume.education = education.map((item: TEducationModelProps) =>
          createEducationModel({
            ...item,
            endDate: formatDate(item.endDate) || '',
            startDate: formatDate(item.startDate) || '',
          }),
        );
        self.resume.experience = experience.map((item: TExperienceModelProps) =>
          createExperienceModel({
            ...item,
            endDate: formatDate(item.endDate) || '',
            startDate: formatDate(item.startDate) || '',
          }),
        );
      } catch (err) {
        self.isFailed = true;
        throw extractError(err);
      } finally {
        self.loading = false;
      }
    });

    return { fetchResume };
  });

export const createResumeViewModel = () =>
  ResumeViewStoreModel.create({
    loading: false,
    isFailed: false,
    resume: createResumeModel(),
  });

export type TResumeViewStore = Instance<typeof ResumeViewStoreModel>;
