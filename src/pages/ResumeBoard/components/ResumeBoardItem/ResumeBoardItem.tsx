import React, { FC } from 'react';

import styles from './resumeBoardItem.module.scss';

export type TResumeBoardItem = {
  item: {
    _id: string;
    name: string;
    url?: string;
    createdAt: string;
  };
};

export const ResumeBoardItem: FC<TResumeBoardItem> = ({ item }) => (
  <div className={styles.item}>
    <div className={styles.title}>{item.name}</div>
    <div className={styles.url}>{item.url || item._id}</div>
    <div className={styles.createdAt}>{item.createdAt}</div>
  </div>
);
