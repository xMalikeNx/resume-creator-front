import { types } from 'mobx-state-tree';
import { InputStoreModel } from '../../../components/Input/models/input.model';
import { MultiInputStoreModel } from '../../../components/Input/models/multiInput.model';

export const ExperienceModel = types.model({
  company: InputStoreModel,
  position: InputStoreModel,
  startDate: InputStoreModel,
  endDate: InputStoreModel,
  duties: MultiInputStoreModel,
  description: InputStoreModel,
});
