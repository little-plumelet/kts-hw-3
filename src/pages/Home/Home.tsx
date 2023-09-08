import * as cn from 'classnames';
import { CardList } from 'components/CardList';
import { Header } from 'components/Header';
import styles from './styles.module.scss';

export const Home = () => {
  return (
    <>
      <Header />
      <section className={cn(styles.homeMainImage)}>
        <p className={cn(styles.homeMainImageTitle)}>Be inspired, find your own recipe</p>
      </section>
      <section className={cn(styles.homeBasicSection)}>
        <CardList />
      </section>
    </>
  );
};
