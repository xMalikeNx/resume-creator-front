import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../Container';

import styles from './navigation.module.scss';

export const Navigation: FC = () => (
  <div className={styles.navigation}>
    <Container>
      <ul className={styles.nav}>
        <li className={styles.navItem}>
          <Link className={styles.navLink} to="/">
            Главная
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link className={styles.navLink} to="/profile">
            Профиль
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link className={styles.navLink} to="/editor">
            Редактор резюме
          </Link>
        </li>
      </ul>
    </Container>
  </div>
);
