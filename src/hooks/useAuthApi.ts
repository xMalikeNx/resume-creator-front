import { useMemo } from 'react';
import { AuthApiService } from '../services/auth.api.service';

export const useAuthApi = () => {
  const api = useMemo(() => new AuthApiService(), []);

  return api;
};
