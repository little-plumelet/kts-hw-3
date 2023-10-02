import cn from 'classnames';
import * as React from 'react';
import bg from '@assets/home-food-bg.jpg';
import styles from './styles.module.scss';

type BannerProps = {
  className?: string;
};

export const Banner: React.FC<BannerProps> = ({ className }) => {
  return (
    <section className={cn(styles['home-main-image'], className)} style={{ backgroundImage: `url(${bg})` }}>
      <p className={cn(styles['home-main-image__title'])}>Be inspired, find your own recipe</p>
    </section>
  );
};
