import * as cn from 'classnames';
import { Header } from 'components/Header';
import { RecipeList } from './components/RecepieList';
import styles from './styles.module.scss';

export const Home = () => {
  return (
    <>
      <Header />
      <section className={cn(styles.homeMainImage)}>
        <p className={cn(styles.homeMainImageTitle)}>Be inspired, find your own recipe</p>
      </section>
      <RecipeList />
    </>
  );
};
