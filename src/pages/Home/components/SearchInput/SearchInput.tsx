import * as React from 'react';
import Button from 'components/Button';
import Input from 'components/Input';
import SearchIcon from 'components/icons/SearchIcon';
import styles from './styles.module.scss';

type SearchInputProps = {
  value: string;
  isLoading: boolean;
  onChange: (value: string) => void;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, onClick, isLoading }) => {
  return (
    <form className={styles.form}>
      <Input
        value={value}
        onChange={onChange}
        className={styles.input}
        placeholder="What dish are we going to search"
      />
      <Button className={styles.searchButton} type="submit" onClick={onClick} loading={isLoading}>
        <SearchIcon color="primary-invert" />
      </Button>
    </form>
  );
};
