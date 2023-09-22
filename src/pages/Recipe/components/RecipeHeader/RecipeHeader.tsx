import cn from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';
import Text from '@components/Text';
import ArrowDownIcon from '@components/icons/ArrowDownIcon';
import { ColorType, TextViewType } from '@customTypes/common';
import styles from './styles.module.scss';

type RecipeHeaderProps = {
  title: string;
  className?: string;
};

export const RecipeHeader: React.FC<RecipeHeaderProps> = ({ title, className }) => {
  return (
    <section className={cn(styles['recipe-title'], className)}>
      <Link to={'..'} className={styles['recipe-title-link']}>
        <ArrowDownIcon className={styles['recipe-title-link-icon']} color={ColorType.accent} />
      </Link>
      <Text view={TextViewType.title}>{title}</Text>
    </section>
  );
};
