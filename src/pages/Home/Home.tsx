import { Header } from 'components/Header';
import { Banner } from './components/Banner';
import { RecipeList } from './components/RecipeList';

export const Home = () => {
  return (
    <>
      <Header />
      <Banner />
      <RecipeList />
    </>
  );
};
