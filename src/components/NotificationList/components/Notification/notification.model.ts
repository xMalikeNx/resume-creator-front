import { getParent, Instance, types } from 'mobx-state-tree';
import { UiStore } from '../../../../mst/models/ui.store';

export const NotificationModel = types
  .model({
    id: types.identifier,
    message: types.string,
    type: 'info',
    timeout: 3000,
  })
  .actions((self) => ({
    afterCreate: () => {
      setTimeout(() => {
        getParent<UiStore>(self, 2).removeNotification(self as TNotification);
      }, self.timeout);
    },
  }));

export type TNotificationType = 'info' | 'success' | 'error';

export type TCreateNotificationModelProps = {
  id: string;
  message: string;
  type?: TNotificationType;
  timeout?: number;
};

export type TNotification = Instance<typeof NotificationModel>;

export const createNotificationModel = (props: TCreateNotificationModelProps) =>
  NotificationModel.create({ ...props });
