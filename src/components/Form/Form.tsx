import React, { FC, HTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './form.module.scss';

export type TFormProps = {
  bordered?: boolean;
  centered?: boolean;
  small?: boolean;
  children: React.ReactNode;
  title?: string;
  error?: string | boolean;
} & HTMLAttributes<HTMLFormElement>;

export const Form: FC<TFormProps> = ({
  children,
  title,
  bordered,
  centered,
  small,
  error,
  ...others
}) => (
  <div
    className={classNames(
      styles.formContainer,
      bordered && styles.bordered,
      centered && styles.centered,
      small && styles.smallFormContainer,
    )}
  >
    {title && (
      <div className={styles.title}>
        <div className={styles.titleBackground}>{title}</div>
      </div>
    )}
    <form {...others}>{children}</form>
    {error && <div className={styles.error}>{error}</div>}
  </div>
);
