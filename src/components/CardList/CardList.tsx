import axios, { AxiosError } from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import Card, { CardProps } from 'components/Card';
import { API_KEY, BASE_URL } from 'configs/constants';
import data from './mockdata.json';
import { mapper } from './utils/utils';

interface ICardListProps {
  /** строка запроса */
  query?: string;
  /** количество запрашиваемых элементов*/
  queryNb?: number;
}

export const CardList: React.FC<ICardListProps> = ({ query = 'shrimp', queryNb = 9 }) => {
  const [cards, setCards] = useState<Array<CardProps & { key: string }>>([]);
  const mockData = data?.results;

  useEffect(() => {
    (async function () {
      try {
        const responce = await axios.get(`${BASE_URL}/recipes/complexSearch`, {
          params: {
            query,
            apiKey: API_KEY,
            number: queryNb,
            addRecipeInformation: true,
            addRecipeNutrition: true,
          },
        });
        setCards(mapper(responce?.data?.results));
        setCards(mapper(mockData));
      } catch (error) {
        if (error instanceof AxiosError) {
          throw Error(error.message);
        } else {
          throw Error('Unknown error occurred');
        }
      }
    })();
  }, [query, queryNb]);

  return (
    <>
      {cards.map((card) => (
        <Card {...card} key={card.key} />
      ))}
    </>
  );
};
