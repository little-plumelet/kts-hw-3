import * as cn from 'classnames';
import * as React from 'react';
import styles from './styles.module.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  /** Значение поля */
  value: string;
  /** Значение поля в отсуствие value */
  placeholder?: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input: React.FC<InputProps> = ({ value, onChange, afterSlot, className, ...rest }) => {
  const [isFocused, setIsFocused] = React.useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  function handleFocus() {
    setIsFocused(true);
  }

  function handleBlur() {
    setIsFocused(false);
  }
  return (
    <div className={cn(styles.wrapper, className, { [styles['wrapper-focused']]: isFocused })}>
      <input
        type="text"
        className={styles.input}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      />
      {afterSlot}
    </div>
  );
};

export default Input;
