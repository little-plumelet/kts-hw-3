import * as cn from 'classnames';
import * as React from 'react';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import styles from './style.module.scss';

export type PaginationProps = {
  currentPage: number;
  total: number;
  updateCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, total, updateCurrentPage }) => {
  function handleClick(event: React.SyntheticEvent) {
    updateCurrentPage(parseInt((event.target as HTMLElement).id));
  }

  function handleClickArrow(event: React.SyntheticEvent) {
    if ((event.target as HTMLElement).id === 'back') {
      updateCurrentPage((prev) => prev - 1);
    }

    if ((event.target as HTMLElement).id === 'forward') {
      updateCurrentPage((prev) => prev + 1);
    }
  }
  return (
    <div className={styles.pagination}>
      <ArrowDownIcon
        color={currentPage === 1 ? 'secondary' : 'accent'}
        id="back"
        onClick={handleClickArrow}
        className={cn(styles.arrowLeft, { [styles.arrowDisabled]: currentPage === 1 })}
      />
      <div onClick={handleClick} className={styles.paginationBlock}>
        {total <= 4 && (
          <>
            {new Array(total).map((_, index) => (
              <div
                id={index.toString()}
                key={index + 1}
                className={cn(styles.page, { [styles.activePage]: currentPage === index + 1 })}
              >
                {index + 1}
              </div>
            ))}
          </>
        )}
        {total > 4 && currentPage < 4 && (
          <>
            <div className={cn(styles.page, { [styles.activePage]: currentPage === 1 })} id={'1'}>
              1
            </div>
            <div className={cn(styles.page, { [styles.activePage]: currentPage === 2 })} id={'2'}>
              2
            </div>
            <div className={cn(styles.page, { [styles.activePage]: currentPage === 3 })} id={'3'}>
              3
            </div>
            ...
            <div className={cn(styles.page, { [styles.activePage]: currentPage === total })} id={total.toString()}>
              {total}
            </div>
          </>
        )}
        {total > 4 && currentPage > total - 3 && (
          <>
            <>
              <div className={cn(styles.page, { [styles.activePage]: currentPage === 1 })} id={'1'}>
                1
              </div>
              ...
              <div
                className={cn(styles.page, { [styles.activePage]: currentPage === total - 2 })}
                id={(total - 2).toString()}
              >
                {total - 2}
              </div>
              <div
                className={cn(styles.page, { [styles.activePage]: currentPage === total - 1 })}
                id={(total - 1).toString()}
              >
                {total - 1}
              </div>
              <div className={cn(styles.page, { [styles.activePage]: currentPage === total })} id={total.toString()}>
                {total}
              </div>
            </>
          </>
        )}
        {total > 4 && currentPage >= 4 && currentPage <= total - 3 && (
          <>
            <div className={cn(styles.page, { [styles.activePage]: currentPage === 1 })} id={'1'}>
              1
            </div>
            ...
            <div className={styles.page} id={(currentPage - 1).toString()}>
              {currentPage - 1}
            </div>
            <div className={cn(styles.page, styles.activePage)} id={currentPage.toString()}>
              {currentPage}
            </div>
            <div className={styles.page} id={(currentPage + 1).toString()}>
              {currentPage + 1}
            </div>
            ...
            <div className={styles.page} id={total.toString()}>
              {total}
            </div>
          </>
        )}
      </div>
      <ArrowDownIcon
        color={currentPage === total ? 'secondary' : 'accent'}
        id="forward"
        onClick={handleClickArrow}
        className={cn(styles.arrowRight, { [styles.arrowDisabled]: currentPage === total })}
      />
    </div>
  );
};

export default Pagination;
