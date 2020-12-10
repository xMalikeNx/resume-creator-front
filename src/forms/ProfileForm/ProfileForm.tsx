import React, { FC, useContext } from 'react';
import { ProfileContext } from '../../pages/Profile/components/ProfileContext';

export const ProfileForm: FC = () => {
  const { user } = useContext(ProfileContext);

  return <div>{user.login}</div>;
};
