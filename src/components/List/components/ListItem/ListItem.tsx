import React, { FC, HTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './listItem.module.scss';

export type ListItemProps = HTMLAttributes<HTMLLIElement> & {
  children: React.ReactNode;
};

export const ListItem: FC<ListItemProps> = ({
  children,
  className,
  ...props
}) => (
  <li className={classNames(styles.item, className)} {...props}>
    {children}
  </li>
);
