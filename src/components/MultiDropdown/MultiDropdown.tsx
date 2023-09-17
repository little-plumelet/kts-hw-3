import * as cn from 'classnames';
import * as React from 'react';
import { useOpen } from 'customHooks/useOpen';
import { Option } from 'types/MultiDropdownOption';
import { ColorType } from 'types/common';
import Input from '../Input';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import { OptionCp } from './components/OptionCp';
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
  console.log('options = ', options);
  console.log('value = ', value);
  const multyDropDownRef = React.useRef<null | HTMLDivElement>(null);
  const [inputValue, setInputValue] = React.useState('');
  const [isOpen, open, close] = useOpen();

  React.useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (multyDropDownRef.current && !multyDropDownRef.current.contains(event.target as Node)) {
        close();
      }
    }

    if (isOpen) {
      window.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      window.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, close]);

  function handleChangeInput(value: string) {
    const index = value.lastIndexOf(' ');
    const newValue = value.slice(index + 1);
    setInputValue(newValue ?? '');
    open();
  }

  const filteredOptions = options.filter((option) => option.value.toLowerCase().includes(inputValue.toLowerCase()));

  function selectOption(currentKey: string, currentValue: string) {
    console.log('currentValue = ', currentValue);
    console.log('value in Selection = ', value);
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
        onFocus={() => open()}
        className={cn({ [styles.input]: isOpen })}
        afterSlot={<ArrowDownIcon color={ColorType.secondary} onClick={() => (isOpen ? close() : open())} />}
      />
      {isOpen && !disabled && (
        <ul className={styles['option-container']}>
          {filteredOptions.map((option) => (
            <OptionCp
              key={option.key}
              onClick={selectOption}
              id={option.key}
              className={cn(styles.option, {
                [styles.selected]: value.find((el) => el.key === option.key),
              })}
              value={option.value}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiDropdown;
