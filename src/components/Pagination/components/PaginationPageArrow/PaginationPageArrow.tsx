import cn from 'classnames';
import * as React from 'react';
import ArrowDownIcon from '@components/icons/ArrowDownIcon';
import { ColorType } from '@customTypes/common';
import styles from './styles.module.scss';

type PaginationPageArrowProps = {
  id: string;
  currentPage: number;
  total: number;
  handleClick: (page: string) => void;
};

export const PaginationPageArrow: React.FC<PaginationPageArrowProps> = ({ id, currentPage, total, handleClick }) => {
  return (
    <ArrowDownIcon
      color={
        (currentPage === 1 && id === 'back') || (currentPage === total && id === 'forward')
          ? ColorType.secondary
          : ColorType.accent
      }
      id="back"
      onClick={() => handleClick(id === 'back' ? String(currentPage - 1) : String(currentPage + 1))}
      className={cn(
        { [styles['arrow-left']]: id === 'back' },
        { [styles['arrow-right']]: id === 'forward' },
        { [styles['arrow-disabled']]: currentPage === 1 && id === 'back' },
        { [styles['arrow-disabled']]: currentPage === total && id === 'forward' },
      )}
    />
  );
};
