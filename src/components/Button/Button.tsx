import React, { ButtonHTMLAttributes, FC } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './button.module.scss';

export type TButtonProps = {
  position?: 'left' | 'right' | 'center';
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<TButtonProps> = ({
  children,
  position = 'left',
  className,
  ...others
}) => (
  <div className={classNames(styles.buttonWrapper, styles[position])}>
    <button className={classNames(styles.button, className)} {...others}>
      {children}
    </button>
  </div>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  position: PropTypes.oneOf(['left', 'right', 'center']),
  className: PropTypes.string,
};

Button.defaultProps = {
  position: 'left',
  className: '',
};
