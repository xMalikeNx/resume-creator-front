import React, { FC } from 'react';

import styles from './container.module.scss';

export type TContainerProps = { children: React.ReactNode };

export const Container: FC<TContainerProps> = ({ children }) => (
  <div className={styles.container}>{children}</div>
);
