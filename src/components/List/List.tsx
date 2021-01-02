import React, { FC, HTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './list.module.scss';
import { ListItem } from './components/ListItem';

export type ListProps = HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export type TList = { Item: React.ElementType } & FC<ListProps>;

export const List: TList = ({ children, className, ...props }) => (
  <div className={classNames(styles.list, className)} {...props}>
    {children}
  </div>
);

List.Item = ListItem;
