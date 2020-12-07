import { flow, types } from "mobx-state-tree";
import { AuthApiService } from "../../services/auth.api.service";
import { UserStoreModel } from "./user.store";

const authApi = new AuthApiService();

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
      } catch (err) {
        console.dir(err.response.status);
      } finally {
        self.loading = false;
      }
    });

    const login = flow(function* (login, password) {
      try {
        self.loading = true;
        yield authApi.login(login, password);
        yield fetchProfile();
      } catch (err) {
        console.dir(err.response.status);
      } finally {
        self.loading = false;
      }
    });

    return { fetchProfile, login };
  });

export const createAuthStore = () =>
  AuthStoreModel.create({
    isLoggedIn: false,
    loading: false,
    user: null,
  });
