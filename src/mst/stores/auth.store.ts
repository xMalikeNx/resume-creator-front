import { flow, types } from 'mobx-state-tree';
import { format } from 'date-fns';
import { AuthApiService } from '../../services/auth.api.service';
import { extractError } from '../../utils/extractError';
import { formatDate } from '../../utils/dateHelpers';
import { createUserStoreModel, UserStoreModel } from '../models/user.model';

const authApi = new AuthApiService();

export type AuthStoreLoadingState = 'fetchProfile' | 'loading';

export const AuthStoreModel = types
  .model({
    isLoggedIn: false,
    loading: true,
    user: types.union(UserStoreModel, types.null),
  })
  .actions((self) => {
    const fetchProfile = flow(function* () {
      try {
        self.loading = true;
        const {
          data: { payload },
        } = yield authApi.fetchProfile();
        self.user = createUserStoreModel({
          ...payload,
          birthDate: formatDate(payload.birthDate),
        });
        self.isLoggedIn = true;
      } catch (err) {
        extractError(err);
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        logout();
      } finally {
        self.loading = false;
      }
    });

    const clearProfile = () => {
      self.user = null;
      self.isLoggedIn = false;
    };

    const logout = flow(function* () {
      try {
        self.loading = true;
        yield authApi.logout();
        clearProfile();
      } catch (err) {
        extractError(err);
      } finally {
        self.loading = false;
      }
    });

    return { fetchProfile, logout };
  });

export const createAuthStore = () =>
  AuthStoreModel.create({
    isLoggedIn: false,
    loading: true,
    user: null,
  });
