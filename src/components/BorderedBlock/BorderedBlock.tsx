import React, { FC, HTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './borderedBlock.module.scss';

export type BorderedBlockProps = HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  title?: string;
};

export const BorderedBlock: FC<BorderedBlockProps> = ({
  children,
  className,
  title,
  ...props
}) => (
  <div className={classNames(styles.block, className)}>
    {title && (
      <div className={styles.title}>
        <div className={styles.titleBackground}>{title}</div>
      </div>
    )}
    {children}
  </div>
);
