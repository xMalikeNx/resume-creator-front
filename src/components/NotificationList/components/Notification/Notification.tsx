import React, { FC } from 'react';
import classNames from 'classnames';

import { TNotification } from './notification.model';
import styles from './notification.module.scss';

export type TNotificationProps = {
  notification: TNotification;
};

export const Notification: FC<TNotificationProps> = ({
  notification: { message, type },
}) => (
  <div className={classNames(styles.notification, styles[type])}>{message}</div>
);
