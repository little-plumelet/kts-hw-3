import { Header } from 'components/Header';
import { Banner } from './components/Banner';
import { RecipeList } from './components/RecipeList';

export const Home: React.FC = () => {
  return (
    <>
      <Header />
      <Banner />
      <RecipeList />
    </>
  );
};
