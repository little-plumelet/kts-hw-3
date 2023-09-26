import * as React from 'react';
import { PaginationPage } from './components/PaginationPage';
import { PaginationPageArrow } from './components/PaginationPageArrow';
import styles from './style.module.scss';

export type PaginationProps = {
  currentPage: number;
  total: number;
  updateCurrentPage: (currentPage: string) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, total, updateCurrentPage }) => {
  return (
    <div className={styles.pagination}>
      <PaginationPageArrow id="back" handleClick={updateCurrentPage} currentPage={currentPage} total={total} />
      <div className={styles['pagination-block']}>
        {total <= 4 && (
          <>
            {new Array(total).map((_, index) => (
              <PaginationPage
                index={index + 1}
                currentPage={currentPage}
                key={index + 1}
                handleClick={updateCurrentPage}
              />
            ))}
          </>
        )}
        {total > 4 && currentPage < 4 && (
          <>
            <PaginationPage index={1} currentPage={currentPage} handleClick={updateCurrentPage} />
            <PaginationPage index={2} currentPage={currentPage} handleClick={updateCurrentPage} />
            <PaginationPage index={3} currentPage={currentPage} handleClick={updateCurrentPage} />
            ...
            <PaginationPage index={total} currentPage={currentPage} handleClick={updateCurrentPage} />
          </>
        )}
        {total > 4 && currentPage > total - 3 && (
          <>
            <>
              <PaginationPage index={1} currentPage={currentPage} handleClick={updateCurrentPage} />
              ...
              <PaginationPage index={total - 2} currentPage={currentPage} handleClick={updateCurrentPage} />
              <PaginationPage index={total - 1} currentPage={currentPage} handleClick={updateCurrentPage} />
              <PaginationPage index={total} currentPage={currentPage} handleClick={updateCurrentPage} />
            </>
          </>
        )}
        {total > 4 && currentPage >= 4 && currentPage <= total - 3 && (
          <>
            <PaginationPage index={1} currentPage={currentPage} handleClick={updateCurrentPage} />
            ...
            <PaginationPage index={currentPage - 1} currentPage={currentPage} handleClick={updateCurrentPage} />
            <PaginationPage index={currentPage} currentPage={currentPage} handleClick={updateCurrentPage} />
            <PaginationPage index={currentPage + 1} currentPage={currentPage} handleClick={updateCurrentPage} />
            ...
            <PaginationPage index={total} currentPage={currentPage} handleClick={updateCurrentPage} />
          </>
        )}
      </div>
      <PaginationPageArrow id="forward" handleClick={updateCurrentPage} currentPage={currentPage} total={total} />
    </div>
  );
};

export default Pagination;
