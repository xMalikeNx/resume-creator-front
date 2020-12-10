import React, { FC, useMemo } from 'react';
import { RegistrationForm } from './components/RegistrationForm';
import { RegistrationStoreContext } from './components/RegistrationStoreContext';
import { createRegistrationFormStoreModel } from './stores/registration.form.store';

export const Registration: FC = () => {
  const registrationFormStore = useMemo(
    () => createRegistrationFormStoreModel(),
    [],
  );

  return (
    <RegistrationStoreContext.Provider value={registrationFormStore}>
      <RegistrationForm />
    </RegistrationStoreContext.Provider>
  );
};
