import { flow, getSnapshot, Instance, types } from 'mobx-state-tree';
import { extractError } from '../../../utils/extractError';
import resumeApi from '../../../api/resume.api';

import { formatDate } from '../../../utils/dateHelpers';
import { DATE_FORMAT, RESUME_URL_FORMAT } from '../../../utils/consts';
import {
  CreatableResumeModelStore,
  createCreatableResumeModel,
} from '../../../mst/models/resume.model';
import {
  createCreatableExperienceModel,
  TExperienceModelProps,
} from '../components/ResumeEditorForm/components/ExperienceForm/models/experience.model';
import {
  createCreatableEducationModel,
  TEducationModelProps,
} from '../components/ResumeEditorForm/components/EducationForm/models/education.model';

export const ResumeEditStoreModel = types
  .model({
    loading: false,
    resume: CreatableResumeModelStore,
  })
  .actions((self) => {
    const validate = () => {
      const {
        resume: { name, url },
      } = self;

      if (!name.value) {
        name.setError('Это поле обязательно для заполнения');
      }

      if (url.value && !RESUME_URL_FORMAT.test(url.value)) {
        url.setError(
          'Это поле может содержать только латинские символы и знаки - _',
        );
      }

      self.resume.experience.forEach((item) => {
        if (!item.company.value) {
          item.company.setError('Название организации должно быть указано');
        }
        if (!item.startDate.value || !DATE_FORMAT.test(item.startDate.value)) {
          item.startDate.setError(
            'Введенная дата не соответствует формату dd.mm.yyyy',
          );
        }
        if (item.endDate.value && !DATE_FORMAT.test(item.endDate.value)) {
          item.endDate.setError(
            'Введенная дата не соответствует формату dd.mm.yyyy',
          );
        }
      });

      self.resume.education.forEach((item) => {
        if (!item.institution.value) {
          item.institution.setError(
            'Название образовательной организации должно быть указано',
          );
        }
        if (!item.speciality.value) {
          item.speciality.setError('Специальность должна быть указана');
        }
        if (!item.startDate.value || !DATE_FORMAT.test(item.startDate.value)) {
          item.startDate.setError(
            'Введенная дата не соответствует формату dd.mm.yyyy',
          );
        }
        if (item.endDate.value && !DATE_FORMAT.test(item.endDate.value)) {
          item.endDate.setError('Введенная дата не соответствует формату');
        }
      });
    };

    const fetchResume = flow(function* (resumeId: string) {
      try {
        self.loading = true;
        const {
          data: { payload },
        } = yield resumeApi.fetchResume(resumeId);

        self.resume.name.setValue(payload.name);
        self.resume.url.setValue(payload.url || '');

        payload.experience.forEach((item: TExperienceModelProps) => {
          const experienceItem = createCreatableExperienceModel({
            ...item,
            startDate: formatDate(item.startDate) || '',
            endDate: formatDate(item.endDate) || '',
          });
          self.resume.experience.push(experienceItem);
        });

        payload.education.forEach((item: TEducationModelProps) => {
          const educationItem = createCreatableEducationModel({
            ...item,
            startDate: formatDate(item.startDate) || '',
            endDate: formatDate(item.endDate) || '',
          });
          self.resume.education.push(educationItem);
        });

        payload.skills.forEach((skill: string) =>
          self.resume.skills.addValue(skill),
        );
      } catch (err) {
        throw extractError(err);
      } finally {
        self.loading = false;
      }
    });

    const addExperienceItem = () => {
      self.resume.experience.unshift(createCreatableExperienceModel());
    };

    const addEducationItem = () => {
      self.resume.education.unshift(createCreatableEducationModel());
    };

    const postResume = flow(function* (id?: string) {
      try {
        self.loading = true;
        const resumeDto = getSnapshot(self.resume);
        yield id
          ? resumeApi.updateResume(resumeDto as any, id)
          : resumeApi.createResume(resumeDto as any);
      } catch (err) {
        throw extractError(err);
      } finally {
        self.loading = false;
      }
    });

    return {
      fetchResume,
      addExperienceItem,
      addEducationItem,
      validate,
      postResume,
    };
  })
  .views((self) => ({
    get isFormValid() {
      const {
        resume: { name, experience, education, url },
      } = self;
      return (
        !name.error &&
        !url.error &&
        experience.every(
          (item) =>
            !item.company.error &&
            !item.description.error &&
            !item.endDate.error &&
            !item.startDate.error &&
            !item.position.error,
        ) &&
        education.every(
          (item) =>
            !item.institution.error &&
            !item.speciality.error &&
            !item.startDate.error &&
            !item.endDate.error,
        )
      );
    },
  }));

export const createResumeEditStoreModel = () =>
  ResumeEditStoreModel.create({
    resume: createCreatableResumeModel(),
  });

export type ResumeEditModel = Instance<typeof ResumeEditStoreModel>;
