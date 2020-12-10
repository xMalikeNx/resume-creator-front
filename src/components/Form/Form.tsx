import React, { FC, HTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './form.module.scss';

export type TFormProps = {
  bordered?: boolean;
  centered?: boolean;
  children: React.ReactNode;
  title?: string;
  error?: string | boolean;
} & HTMLAttributes<HTMLFormElement>;

export const Form: FC<TFormProps> = ({
  children,
  title,
  bordered,
  centered,
  error,
  ...others
}) => (
  <div
    className={classNames(
      styles.formContainer,
      bordered && styles.bordered,
      centered && styles.centered,
    )}
  >
    {title && <div className={styles.title}>{title}</div>}
    <form {...others}>{children}</form>
    {error && <div className={styles.error}>{error}</div>}
  </div>
);
