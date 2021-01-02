import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useStores } from '../../../../mst/rootStoreContext';

import styles from './resumeBoardItem.module.scss';

export type TResumeBoardItem = {
  item: {
    _id: string;
    name: string;
    url?: string;
    createdAt: string;
  };
};

export const ResumeBoardItem: FC<TResumeBoardItem> = ({ item }) => {
  const { auth } = useStores();

  return (
    <div className={styles.item}>
      <Link to={`/editor/${item._id}`}>
        <div className={styles.title}>{item.name}</div>
      </Link>
      <div className={styles.url}>{item.url || item._id}</div>
      <div className={styles.createdAt}>{item.createdAt}</div>
      <a href={`resume/${auth.user?.login}/${item.url || item._id}`}>перейти</a>
    </div>
  );
};
