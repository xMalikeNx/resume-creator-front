import React, { FC, useMemo } from 'react';
import { ProfileForm } from '../../forms/ProfileForm';
import { UserStore } from '../../mst/models/user.store';
import { useStores } from '../../mst/rootStoreContext';
import { ProfileContext } from './components/ProfileContext';
import { createProfileStoreModel } from './stores/profile.store';

export const Profile: FC = () => {
  const { auth } = useStores();
  const profileStore = useMemo(
    () => createProfileStoreModel(auth.user as UserStore),
    [],
  );

  if (!profileStore) {
    return null;
  }

  return (
    <ProfileContext.Provider value={profileStore}>
      <ProfileForm />
    </ProfileContext.Provider>
  );
};
