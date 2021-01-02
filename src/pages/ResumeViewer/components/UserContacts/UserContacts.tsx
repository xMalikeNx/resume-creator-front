import React, { FC } from 'react';
import { BorderedBlock } from '../../../../components/BorderedBlock';
import { TUserModel } from '../../../../mst/models/user.model';

import styles from './userContacts.module.scss';

export type UserContactsProps = {
  user: TUserModel;
};

export const UserContacts: FC<UserContactsProps> = ({ user }) => {
  if (!user.address && !user.email && !user.phone) {
    return null;
  }

  return (
    <div className={styles.userContacts}>
      <BorderedBlock title="Контакты" className={styles.borderedBlock}>
        {user.address && (
          <div className={styles.info}>
            <h3>Местоположение</h3>
            {user.address}
          </div>
        )}
        {user.email && (
          <div className={styles.info}>
            <h3>E-mail</h3>
            {user.email}
          </div>
        )}
        {user.phone && (
          <div>
            <h3>Телефон</h3>
            {user.phone}
          </div>
        )}
      </BorderedBlock>
    </div>
  );
};
