import * as cn from 'classnames';
import styles from './styles.module.scss';

export const Banner: React.FC = () => {
  return (
    <section className={cn(styles.homeMainImage)}>
      <p className={cn(styles.homeMainImageTitle)}>Be inspired, find your own recipe</p>
    </section>
  );
};
