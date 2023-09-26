import cn from 'classnames';
import * as React from 'react';
import styles from './styles.module.scss';

type PaginationPageProps = {
  index: number;
  currentPage: number;
  handleClick: (page: string) => void;
};
export const PaginationPage: React.FC<PaginationPageProps> = ({ index, currentPage, handleClick }) => {
  return (
    <div
      onClick={() => handleClick(index.toString())}
      id={index.toString()}
      className={cn(styles.page, { [styles['page-active']]: currentPage === index })}
    >
      {index}
    </div>
  );
};
