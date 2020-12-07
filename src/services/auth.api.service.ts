import { ApiService } from "./api.service";

export class AuthApiService extends ApiService {
  fetchProfile = () => {
    return this.get("/auth/profile");
  };

  login = (login: string, password: string) => {
    return this.post("/auth/login", { login, password });
  };
}
