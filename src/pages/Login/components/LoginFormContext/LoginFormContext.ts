import React from 'react';
import { LoginFormStore } from '../../stores/login.form.store';

export const LoginFormContext = React.createContext<LoginFormStore>(
  null as any,
);
