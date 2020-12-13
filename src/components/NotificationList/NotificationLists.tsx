import { observer } from 'mobx-react';
import React, { FC } from 'react';
import { useStores } from '../../mst/rootStoreContext';
import { Notification } from './components/Notification';

import styles from './notificationList.module.scss';

export const NotificationList: FC = observer(() => {
  const { ui } = useStores();

  if (!ui.preferedNotifications.length) {
    return null;
  }

  return (
    <div className={styles.notificationList}>
      {ui.preferedNotifications.map((notification) => (
        <Notification notification={notification} />
      ))}
    </div>
  );
});
