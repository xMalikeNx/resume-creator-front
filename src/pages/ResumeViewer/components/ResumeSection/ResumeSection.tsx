import React, { FC, HTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './resumeSection.module.scss';

export type ResumeSectionProps = {
  children: React.ReactNode;
  title: string;
} & HTMLAttributes<HTMLDivElement>;

export const ResumeSection: FC<ResumeSectionProps> = ({
  children,
  title,
  className,
  ...props
}) => (
  <div className={classNames(styles.section, className)}>
    <h2 className={styles.title}>{title}</h2>
    {children}
  </div>
);
