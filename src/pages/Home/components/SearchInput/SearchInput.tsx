import * as React from 'react';
import Button from '@components/Button';
import Input from '@components/Input';
import SearchIcon from '@components/icons/SearchIcon';
import { ColorType } from '@customTypes/common';
import styles from './styles.module.scss';

type SearchInputProps = {
  value: string;
  isLoading: boolean;
  onChange: (value: string) => void;
  onClick: () => void;
};

export const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, onClick, isLoading }) => {
  function handleClick(event: React.SyntheticEvent) {
    event.preventDefault();
    onClick();
  }
  return (
    <form className={styles.form}>
      <Input
        value={value}
        onChange={onChange}
        className={styles.input}
        placeholder="What dish are we going to search"
      />
      <Button className={styles['search-button']} type="submit" onClick={handleClick} loading={isLoading}>
        <SearchIcon color={ColorType.primaryInvert} />
      </Button>
    </form>
  );
};
