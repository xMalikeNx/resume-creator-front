import { ApiService } from './api.service';
import { LoginDto, RegistrationDto, UpdateProfileDto } from './types';

export class AuthApiService extends ApiService {
  fetchProfile = () => this.get('/auth/profile');

  updateProfile = (data: UpdateProfileDto) => this.put('/users/', data);

  login = (data: LoginDto) => this.post('/auth/login', data);

  registration = (data: RegistrationDto) => this.post('/users/', data);

  logout = () => this.post('/auth/logout');
}
