import React, { FC, useMemo } from 'react';
import { Layout } from '../../components/Layout';
import { ProfileForm } from '../../forms/ProfileForm';
import { UserStore } from '../../mst/models/user.store';
import { useStores } from '../../mst/rootStoreContext';
import { ProfileFormContext } from './components/ProfileFormContext';
import { createProfileFormStoreModel } from './stores/profile.form.store';

export const Profile: FC = () => {
  const { auth } = useStores();
  const profileFormStore = useMemo(
    () => createProfileFormStoreModel(auth.user as UserStore),
    [],
  );

  if (!profileFormStore) {
    return null;
  }

  return (
    <ProfileFormContext.Provider value={profileFormStore}>
      <Layout>
        <ProfileForm />
      </Layout>
    </ProfileFormContext.Provider>
  );
};
