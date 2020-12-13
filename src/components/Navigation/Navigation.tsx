import { observer } from 'mobx-react';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useStores } from '../../mst/rootStoreContext';
import { Container } from '../Container';
import { LogoutButton } from '../LogoutButton';
import { Row } from '../Row';

import styles from './navigation.module.scss';

export const Navigation: FC = observer(() => {
  const { auth } = useStores();

  return (
    <div className={styles.navigation}>
      <Container>
        <Row>
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
          </ul>
          {auth.isLoggedIn && (
            <div className={styles.logoutButton}>
              <LogoutButton />
            </div>
          )}
        </Row>
      </Container>
    </div>
  );
});
