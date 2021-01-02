import React, { ChangeEvent, FC, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react';

import { uid } from '../../utils/uid';
import styles from './input.module.scss';
import { InputModel } from './models/input.model';

export type TInputProps = {
  title?: string;
  field: InputModel;
  noMargin?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input: FC<TInputProps> = observer((props) => {
  const inputId = useMemo(() => uid(), []);
  const { title, id, field, noMargin, required, onChange, ...others } = props;

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (typeof onChange !== 'function') {
        field.setValue(e.target.value);
      } else {
        onChange(e);
      }
    },
    [onChange, field],
  );

  return (
    <div
      className={classNames(noMargin && styles.noMargin, styles.mnformControl)}
    >
      {title && (
        <label
          htmlFor={id || inputId}
          className={classNames(styles.mnlabel, required && styles.required)}
        >
          {title}
        </label>
      )}
      <input
        {...others}
        id={id || inputId}
        className={classNames(styles.mninput)}
        value={field.value}
        onChange={handleChange}
      />
      {field.error && <div className={styles.error}>{field.error}</div>}
    </div>
  );
});
