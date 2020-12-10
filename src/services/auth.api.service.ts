import { ApiService } from './api.service';
import { LoginDto, RegistrationDto } from './types';

export class AuthApiService extends ApiService {
  fetchProfile = () => this.get('/auth/profile');

  login = (data: LoginDto) => this.post('/auth/login', data);

  registration = (data: RegistrationDto) => this.post('/users/', data);

  logout = () => this.post('/auth/logout');
}
