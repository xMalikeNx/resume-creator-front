import React, { FC, useMemo } from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react';

import { uid } from '../../utils/uid';
import styles from './input.module.scss';
import { InputModel } from './models/input.model';

export type TInputProps = {
  title?: string;
  field: InputModel;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input: FC<TInputProps> = observer((props) => {
  const inputId = useMemo(() => uid(), []);
  const { title, id, field, required, ...others } = props;

  return (
    <div className={styles.mnformControl}>
      {title && (
        <label
          htmlFor={id || inputId}
          className={classNames(styles.mnlabel, require && styles.required)}
        >
          {title}
        </label>
      )}
      <input
        {...others}
        id={id || inputId}
        className={classNames(styles.mninput)}
        value={field.value}
      />
      {field.error && <span className={styles.error}>{field.error}</span>}
    </div>
  );
});
