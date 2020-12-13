import React, { FC, HTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './row.module.scss';

export type TRowProps = {
  children: React.ReactNode;
  justify?: 'left' | 'right' | 'center';
  align?: 'top' | 'center' | 'bottom';
} & HTMLAttributes<HTMLDivElement>;

export const Row: FC<TRowProps> = ({
  children,
  justify,
  align,
  className,
  ...others
}) => (
  <div
    className={classNames(
      styles.row,
      className,
      justify && styles[`justifyContent${justify}`],
      align && styles[`alignItems${align}`],
    )}
    {...others}
  >
    {children}
  </div>
);
