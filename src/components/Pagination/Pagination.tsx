import cn from 'classnames';
import * as React from 'react';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import { ColorType } from 'types/common';
import { PaginationPage } from './components/PaginationPage';
import styles from './style.module.scss';

export type PaginationProps = {
  currentPage: number;
  total: number;
  updateCurrentPage: (currentPage: string) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, total, updateCurrentPage }) => {
  function handleClick(event: React.SyntheticEvent) {
    updateCurrentPage((event.target as HTMLElement).id);
  }

  function handleClickArrow(event: React.SyntheticEvent) {
    if ((event.target as HTMLElement).id === 'back') {
      updateCurrentPage(String(currentPage - 1));
    }

    if ((event.target as HTMLElement).id === 'forward') {
      updateCurrentPage(String(currentPage + 1));
    }
  }
  return (
    <div className={styles.pagination}>
      <ArrowDownIcon
        color={currentPage === 1 ? ColorType.secondary : ColorType.accent}
        id="back"
        onClick={handleClickArrow}
        className={cn(styles['arrow-left'], { [styles['arrow-disabled']]: currentPage === 1 })}
      />
      <div onClick={handleClick} className={styles['pagination-block']}>
        {total <= 4 && (
          <>
            {new Array(total).map((_, index) => (
              <PaginationPage index={index + 1} currentPage={currentPage} key={index + 1} />
            ))}
          </>
        )}
        {total > 4 && currentPage < 4 && (
          <>
            <PaginationPage index={1} currentPage={currentPage} />
            <PaginationPage index={2} currentPage={currentPage} />
            <PaginationPage index={3} currentPage={currentPage} />
            ...
            <PaginationPage index={total} currentPage={currentPage} />
          </>
        )}
        {total > 4 && currentPage > total - 3 && (
          <>
            <>
              <PaginationPage index={1} currentPage={currentPage} />
              ...
              <PaginationPage index={total - 2} currentPage={currentPage} />
              <PaginationPage index={total - 1} currentPage={currentPage} />
              <PaginationPage index={total} currentPage={currentPage} />
            </>
          </>
        )}
        {total > 4 && currentPage >= 4 && currentPage <= total - 3 && (
          <>
            <PaginationPage index={1} currentPage={currentPage} />
            ...
            <PaginationPage index={currentPage - 1} currentPage={currentPage} />
            <PaginationPage index={currentPage} currentPage={currentPage} />
            <PaginationPage index={currentPage + 1} currentPage={currentPage} />
            ...
            <PaginationPage index={total} currentPage={currentPage} />
          </>
        )}
      </div>
      <ArrowDownIcon
        color={currentPage === total ? ColorType.secondary : ColorType.accent}
        id="forward"
        onClick={handleClickArrow}
        className={cn(styles['arrow-right'], { [styles['arrow-disabled']]: currentPage === total })}
      />
    </div>
  );
};

export default Pagination;
