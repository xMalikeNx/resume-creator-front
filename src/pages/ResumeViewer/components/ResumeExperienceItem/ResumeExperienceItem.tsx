import React, { FC } from 'react';
import { TExperienceModel } from '../../../Editor/components/ResumeEditorForm/components/ExperienceForm/models/experience.model';
import styles from './resumeExperienceItem.module.scss';

export type ResumeExperienceItemProps = {
  experience: TExperienceModel;
};

export const ResumeExperienceItem: FC<ResumeExperienceItemProps> = ({
  experience,
}) => (
  <div className={styles.item}>
    <div className={styles.position}>{experience.position}</div>
    <div className={styles.info}>
      {`${experience.company} / ${experience.startDate} - ${
        experience.endDate || 'по настоящее время'
      }`}
    </div>
    <div className={styles.description}>{experience.description}</div>
    <ul className={styles.list}>
      {experience.duties.map((duty) => (
        <li key={duty} className={styles.listItem}>
          {duty}
        </li>
      ))}
    </ul>
  </div>
);
