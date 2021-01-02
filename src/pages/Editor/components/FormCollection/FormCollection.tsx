import { observer } from 'mobx-react';
import React, { FC } from 'react';
import { Button } from '../../../../components/Button';
import { uid } from '../../../../utils/uid';

import styles from './formCollection.module.scss';

export type TFormCollection = {
  buttonText: string;
  onAdd: () => void;
  items: unknown[];
  renderItem: React.ElementType;
};

export const FormCollection: FC<TFormCollection> = observer(
  ({ onAdd, items, renderItem, buttonText }) => {
    const Component = renderItem;

    return (
      <div>
        <Button
          className={styles.button}
          view="plain"
          position="right"
          onClick={onAdd}
        >
          {buttonText}
        </Button>
        {items.map((item, idx) => (
          <div key={uid()} className={styles.formCollection}>
            <h3 className={styles.counter}>{`#${idx + 1}`}</h3>
            <Component item={item} />
          </div>
        ))}
      </div>
    );
  },
);
