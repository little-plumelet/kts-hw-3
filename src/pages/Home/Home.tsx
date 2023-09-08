import { Header } from 'components/Header';
import { Banner } from './components/Banner';
import { RecipeList } from './components/RecepieList';

export const Home = () => {
  return (
    <>
      <Header />
      <Banner />
      <RecipeList />
    </>
  );
};
