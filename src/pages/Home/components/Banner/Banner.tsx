import * as cn from 'classnames';
import * as React from 'react';
import styles from './styles.module.scss';

type BannerProps = {
  className?: string;
};

export const Banner: React.FC<BannerProps> = ({ className }) => {
  return (
    <section className={cn(styles.homeMainImage, className)}>
      <p className={cn(styles.homeMainImageTitle)}>Be inspired, find your own recipe</p>
    </section>
  );
};
