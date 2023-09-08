import * as cn from 'classnames';
import * as React from 'react';
import Loader from '../Loader';
import styles from './style.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ loading, children, className, disabled, ...rest }) => {
  return (
    <button
      className={cn(styles.button, { [styles.buttonDisabled]: disabled }, className)}
      disabled={disabled ? disabled : loading}
      {...rest}
    >
      {loading && <Loader size="s" className={styles.loader} />}
      {children}
    </button>
  );
};

export default Button;
