import { flow, types } from 'mobx-state-tree';
import { AuthApiService } from '../../services/auth.api.service';
import { UserStoreModel } from './user.store';

const authApi = new AuthApiService();

export type AuthStoreLoadingState = 'fetchProfile' | 'loading';

export const AuthStoreModel = types
  .model({
    isLoggedIn: false,
    loading: false,
    user: types.union(UserStoreModel, types.null),
  })
  .actions((self) => {
    const fetchProfile = flow(function* () {
      try {
        self.loading = true;
        const response = yield authApi.fetchProfile();
        self.user = UserStoreModel.create(response.data.payload);
        self.isLoggedIn = true;
        console.log(self.isLoggedIn);
      } catch (err) {
        console.error(err);
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
        console.dir(err);
      } finally {
        self.loading = false;
      }
    });

    return { fetchProfile, logout };
  });

export const createAuthStore = () =>
  AuthStoreModel.create({
    isLoggedIn: false,
    loading: false,
    user: null,
  });
