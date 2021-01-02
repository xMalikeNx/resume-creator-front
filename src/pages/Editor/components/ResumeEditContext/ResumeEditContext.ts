import React from 'react';
import { ResumeEditModel } from '../../models/resume.edit.model';

export const ResumeEditContext = React.createContext<ResumeEditModel>(
  null as any,
);
