import { observer } from 'mobx-react';
import React, { FC, useCallback, useMemo, KeyboardEvent } from 'react';
import { Button } from '../Button';
import { Input, TInputProps } from '../Input/Input';
import { createInputModel } from '../Input/models/input.model';
import { MultiInputModel } from './models/multiInput.model';

import styles from './multiInput.module.scss';

export type TMultiInputProps = Omit<TInputProps, 'field'> & {
  field: MultiInputModel;
};

export const MultiInput: FC<TMultiInputProps> = observer(
  ({ field, ...others }) => {
    const inputField = useMemo(() => createInputModel(), [field]);

    const handleAddItem = useCallback(() => {
      field.addValue(inputField.value);
      inputField.setValue('');
    }, [inputField]);

    const handleRemoveItem = useCallback(
      (value: string) => () => {
        field.removeValue(value);
      },
      [inputField],
    );

    const onEnterDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key.toLowerCase() === 'enter') {
        handleAddItem();
      }
    }, []);

    return (
      <div className={styles.multiInput}>
        <div className={styles.wrapper}>
          <Input
            onKeyDown={onEnterDown}
            className={styles.input}
            noMargin
            field={inputField}
            {...others}
          />
          {inputField.value && (
            <Button
              view="plain"
              className={styles.button}
              onClick={handleAddItem}
            >
              Добавить
            </Button>
          )}
        </div>
        <div>
          {field.value.map((item) => (
            <div className={styles.item}>
              {item}
              <Button
                className={styles.deleteItemButton}
                onClick={handleRemoveItem(item)}
              >
                x
              </Button>
            </div>
          ))}
        </div>
      </div>
    );
  },
);
