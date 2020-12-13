import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './createResumeItem.module.scss';

export const CreateResumeItem: FC = () => (
  <Link to="/editor" className={styles.item}>
    <div className={styles.description}>
      <span className={styles.plus}>+</span>
      Создать резюме
    </div>
  </Link>
);
