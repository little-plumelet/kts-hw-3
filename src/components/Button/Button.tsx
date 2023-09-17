import * as cn from 'classnames';
import * as React from 'react';
import { SizeType } from 'types/common';
import Loader from '../Loader';
import styles from './style.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
  /** Дополнительный класс */
  className?: string;
  /** Заблокирована ли кнопка */
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ loading, children, className, disabled, ...rest }) => {
  return (
    <button
      className={cn(styles.button, { [styles['button-disabled']]: disabled }, className)}
      disabled={disabled ? disabled : loading}
      {...rest}
    >
      {loading && <Loader size={SizeType.s} className={styles.loader} />}
      {!loading && children}
    </button>
  );
};

export default Button;
