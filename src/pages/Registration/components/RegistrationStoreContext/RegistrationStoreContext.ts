import React from 'react';
import { RegistrationFormStore } from '../../stores/registration.form.store';

export const RegistrationStoreContext = React.createContext<RegistrationFormStore>(
  null as any,
);
