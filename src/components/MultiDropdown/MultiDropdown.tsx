import * as cn from 'classnames';
import * as React from 'react';
import { Option } from 'types/MultiDropdownOption';
import Input from '../Input';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import styles from './styles.module.scss';

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  value,
  options,
  onChange,
  getTitle,
  className,
  disabled,
  ...rest
}) => {
  const multyDropDownRef = React.useRef<null | HTMLDivElement>(null);
  const [inputValue, setInputValue] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (multyDropDownRef.current && !multyDropDownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      window.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      window.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  function handleChangeInput(value: string) {
    const index = value.lastIndexOf(' ');
    const newValue = value.slice(index + 1);
    setInputValue(newValue ?? '');
    setIsOpen(true);
  }

  const filteredOptions = options.filter((option) => option.value.toLowerCase().includes(inputValue.toLowerCase()));

  function selectOption(event: React.MouseEvent<HTMLLIElement>) {
    const currentValue = (event.target as HTMLLIElement).innerHTML;
    const currentKey = (event.target as HTMLLIElement).id;
    if (value.find((el) => el.key === currentKey)) {
      onChange(value.filter((el) => el.key !== currentKey));
    } else {
      onChange([...value, { value: currentValue, key: currentKey }]);
    }
    setInputValue('');
  }

  return (
    <div className={cn(styles.container, className)} ref={multyDropDownRef} {...rest}>
      <Input
        value={isOpen ? inputValue : value.length ? getTitle(value) : ''}
        disabled={disabled}
        placeholder={getTitle(value)}
        onChange={handleChangeInput}
        onFocus={() => setIsOpen(true)}
        className={cn({ [styles.input]: isOpen })}
        afterSlot={<ArrowDownIcon color="secondary" onClick={() => setIsOpen((prev) => !prev)} />}
      />
      {isOpen && !disabled && (
        <ul className={styles.optionContainer}>
          {filteredOptions.map((option) => (
            <li
              key={option.key}
              onClick={selectOption}
              id={option.key}
              className={cn(styles.option, {
                [styles.selected]: value.find((el) => el.key === option.key),
              })}
            >
              {option.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiDropdown;
