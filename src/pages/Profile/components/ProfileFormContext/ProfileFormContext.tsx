import React from 'react';
import { ProfileFormStore } from '../../stores/profile.form.store';

export const ProfileFormContext = React.createContext<ProfileFormStore>(
  null as any,
);
