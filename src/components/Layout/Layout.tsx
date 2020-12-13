import React, { FC } from 'react';
import classNames from 'classnames';

import styles from './layout.module.scss';
import { Navigation } from '../Navigation';
import { Container } from '../Container';

export type TLayout = {
  filled?: boolean;
  children: React.ReactNode;
  navigation?: boolean;
};

export const Layout: FC<TLayout> = ({
  children,
  filled,
  navigation = true,
}) => (
  <>
    {navigation && <Navigation />}
    <Container>
      <div className={classNames(filled && styles.filled)}>{children}</div>
    </Container>
  </>
);
