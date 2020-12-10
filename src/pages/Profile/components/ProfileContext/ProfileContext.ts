import React from 'react';
import { ProfileStore } from '../../stores/profile.store';

export const ProfileContext = React.createContext<ProfileStore>(null as any);
