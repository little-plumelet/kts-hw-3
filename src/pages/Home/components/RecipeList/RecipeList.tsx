import axios, { AxiosError } from 'axios';
import * as cn from 'classnames';
import { useState } from 'react';
import * as React from 'react';
import { CardProps } from 'components/Card';
import { CardList } from 'components/CardList';
import MultiDropdown from 'components/MultiDropdown';
import Pagination from 'components/Pagination';
import { Option } from 'configs/MultiDropdownOptionType';
import { API_KEY, BASE_URL } from 'configs/constants';
import { MealTypeMap } from 'configs/mealType';
import { SearchInput } from '../SearchInput';
import { mapper } from './utils';
import styles from './styles.module.scss';

export const RecipeList: React.FC = () => {
  const [cards, setCards] = useState<Array<CardProps>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState<number | null>(null);
  const queryNb = 9;

  const options = Object.entries(MealTypeMap).map(([key, value]) => ({ key, value }));
  const [categoriesValue, setCategoriesValue] = useState<Array<Option>>([]);

  function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    setQuery(value);
  }

  function getTitle(value: Option[]) {
    const result = value.map((el: Option) => el.value).join(', ');
    return result.length ? result : 'Choose categories';
  }

  function handleChangeCategory(value: Option[]) {
    setCategoriesValue(value);
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
            type: getTitle(categoriesValue),
            offset: currentPage - 1,
          },
        });
        setCards(mapper(responce?.data?.results));
        setTotal(Math.ceil(responce?.data?.totalResults / queryNb));
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
  }, [query, categoriesValue, queryNb, currentPage]);

  return (
    <section className={cn(styles.homeBasicSection)}>
      <div className={cn(styles.searchBlock)}>
        <SearchInput value={value} onChange={setValue} onClick={handleClick} isLoading={isLoading} />
        <MultiDropdown
          options={options}
          value={categoriesValue}
          onChange={handleChangeCategory}
          getTitle={getTitle}
          className={styles.multiDropdown}
        />
      </div>
      <CardList cards={cards} />
      <Pagination currentPage={currentPage} updateCurrentPage={setCurrentPage} total={total} />
    </section>
  );
};
