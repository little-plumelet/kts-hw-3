import * as cn from 'classnames';
import * as React from 'react';
import styles from './styles.module.scss';

type PaginationPageProps = {
  index: number;
  currentPage: number;
};
export const PaginationPage: React.FC<PaginationPageProps> = ({ index, currentPage }) => {
  return (
    <div id={index.toString()} className={cn(styles.page, { [styles['page-active']]: currentPage === index })}>
      {index}
    </div>
  );
};
