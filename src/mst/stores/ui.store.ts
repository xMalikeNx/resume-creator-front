import { Instance, types } from 'mobx-state-tree';
import {
  createNotificationModel,
  NotificationModel,
  TNotification,
  TNotificationType,
} from '../../components/NotificationList/components/Notification/notification.model';
import { uid } from '../../utils/uid';

export const UiStoreModel = types
  .model('UiStore', {
    notifications: types.array(NotificationModel),
  })
  .actions((self) => {
    const removeNotification = (notification: TNotification) => {
      self.notifications.remove(notification);
    };

    const createNotification = (
      message: string,
      type?: TNotificationType,
      timeout?: number,
    ) => {
      self.notifications.push(
        createNotificationModel({ message, type, timeout, id: uid() }),
      );
    };

    return { removeNotification, createNotification };
  })
  .views((self) => ({
    get preferedNotifications() {
      return self.notifications.slice().reverse();
    },
  }));

export const createUiStoreModel = () => UiStoreModel.create();

export type UiStore = Instance<typeof UiStoreModel>;
