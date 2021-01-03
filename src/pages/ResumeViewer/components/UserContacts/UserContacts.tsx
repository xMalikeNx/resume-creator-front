import React, { FC } from 'react';
import { BorderedBlock } from '../../../../components/BorderedBlock';
import { TUserModel } from '../../../../mst/models/user.model';

import { ReactComponent as TelegramIcon } from './telegram.svg';
import { ReactComponent as InstagramIcon } from './instagram.svg';
import { ReactComponent as GithubIcon } from './github.svg';
import { ReactComponent as VkIcon } from './vk.svg';
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
        <div className={styles.icons}>
          {user.instagram && (
            <a
              href={user.instagram}
              className={styles.icon}
              target="_blank"
              rel="noreferrer"
            >
              <InstagramIcon />
            </a>
          )}
          {user.gitHub && (
            <a
              href={user.gitHub}
              className={styles.icon}
              target="_blank"
              rel="noreferrer"
            >
              <GithubIcon />
            </a>
          )}
          {user.vk && (
            <a
              href={user.vk}
              className={styles.icon}
              target="_blank"
              rel="noreferrer"
            >
              <VkIcon />
            </a>
          )}
          {user.telegram && (
            <a
              href={user.telegram}
              className={styles.icon}
              target="_blank"
              rel="noreferrer"
            >
              <TelegramIcon />
            </a>
          )}
        </div>
      </BorderedBlock>
    </div>
  );
};
