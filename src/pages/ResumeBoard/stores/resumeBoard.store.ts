import { flow, types } from 'mobx-state-tree';
import resumeApi from '../../../api/resume.api';
import { extractError } from '../../../utils/extractError';

const ResumeBoardStoreItemModel = types.model({
  _id: types.string,
  name: types.string,
  url: types.maybe(types.string),
  createdAt: types.string,
});

export const ResumeBoardStoreModel = types
  .model({
    isLoading: false,
    resumes: types.array(ResumeBoardStoreItemModel),
  })
  .actions((self) => {
    const fetchResumes = flow(function* () {
      try {
        self.isLoading = true;
        const response = yield resumeApi.fetchResumes();
        self.resumes = response.data.payload;
      } catch (err) {
        throw extractError(err);
      } finally {
        self.isLoading = false;
      }
    });

    return { fetchResumes };
  });

export const createResumeBoardModel = () => ResumeBoardStoreModel.create();
