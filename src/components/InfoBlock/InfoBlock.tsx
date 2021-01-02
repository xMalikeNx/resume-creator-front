import React, { FC } from 'react';

import styles from './infoBlock.module.scss';

export type TInfoBlockProps = {
  children: React.ReactNode;
  title: string;
};

export const InfoBlock: FC<TInfoBlockProps> = ({ title, children }) => (
  <div>
    <h3 className={styles.title}>{title}</h3>
    {children}
  </div>
);
