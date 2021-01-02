import React, { FC, HTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './avatar.module.scss';

export type TAvatarProps = {
  url: string;
} & HTMLAttributes<HTMLDivElement>;

export const Avatar: FC<TAvatarProps> = ({ url, className, ...others }) => (
  <div
    className={classNames(styles.avatar, className)}
    style={{ backgroundImage: `url(${url}` }}
    {...others}
  />
);
