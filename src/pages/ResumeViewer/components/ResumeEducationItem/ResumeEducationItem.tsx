import React, { FC } from 'react';
import { TEducationModel } from '../../../Editor/components/ResumeEditorForm/components/EducationForm/models/education.model';
import styles from './resumeEducationItem.module.scss';

export type ResumeEducationItemProps = {
  education: TEducationModel;
};

export const ResumeEducationItem: FC<ResumeEducationItemProps> = ({
  education,
}) => (
  <div className={styles.education}>
    <div className={styles.profession}>{education.speciality}</div>
    <div className={styles.institution}>{education.institution}</div>
    <div className={styles.date}>
      {`${education.startDate} - ${education.endDate || 'По настоящее время'}`}
    </div>
  </div>
);
