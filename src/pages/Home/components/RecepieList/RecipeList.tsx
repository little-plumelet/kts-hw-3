import axios, { AxiosError } from 'axios';
import * as cn from 'classnames';
import { useState } from 'react';
import * as React from 'react';
import { CardProps } from 'components/Card';
import { CardList } from 'components/CardList';
import { API_KEY, BASE_URL } from 'configs/constants';
import { SearchInput } from '../SearchInput';
import data from './mockdata.json';
import { mapper } from './utils';
import styles from './styles.module.scss';

export const RecipeList: React.FC = () => {
  const defaultQuery = 'shrimp';
  const [cards, setCards] = useState<Array<CardProps>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');
  const [query, setQuery] = useState(defaultQuery);
  const queryNb = 9;
  const mockData = data?.results;

  function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    setQuery(value);
  }

  React.useEffect(() => {
    (async function getRecipeces() {
      try {
        setIsLoading(true);
        const responce = await axios.get(`${BASE_URL}/recipes/complexSearch`, {
          params: {
            query,
            apiKey: API_KEY,
            number: queryNb,
            addRecipeInformation: true,
            addRecipeNutrition: true,
          },
        });
        //setCards(mapper(responce?.data?.results));
        setCards(mapper(mockData));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        if (error instanceof AxiosError) {
          throw Error(error.message);
        } else {
          throw Error('Unknown error occurred');
        }
      }
    })();
  }, [query]);

  return (
    <section className={cn(styles.homeBasicSection)}>
      <SearchInput value={value} onChange={setValue} onClick={handleClick} isLoading={isLoading} />
      <CardList cards={cards} />
    </section>
  );
};
