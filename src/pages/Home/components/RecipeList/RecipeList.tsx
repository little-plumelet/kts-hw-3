import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import * as React from 'react';
import { CardList } from 'components/CardList';
import MultiDropdown from 'components/MultiDropdown';
import Pagination from 'components/Pagination';
import { API_KEY, BASE_URL, RECIPES_PER_PAGE } from 'configs/constants';
import { MealMap } from 'types/MealMap';
import { Option } from 'types/MultiDropdownOption';
import { RecipeData } from 'types/RecipeData';
import { SearchInput } from '../SearchInput';
import styles from './styles.module.scss';

export const RecipeList: React.FC = () => {
  const [recipesData, setRecipesData] = useState<RecipeData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState<number | null>(null);

  const options = Object.entries(MealMap).map(([key, value]) => ({ key, value }));
  const [categoriesValue, setCategoriesValue] = useState<Array<Option>>([]);

  function handleClick() {
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
            number: RECIPES_PER_PAGE,
            addRecipeInformation: true,
            addRecipeNutrition: true,
            type: getTitle(categoriesValue),
            offset: currentPage - 1,
          },
        });
        setRecipesData(responce?.data?.results);
        setTotal(Math.ceil(responce?.data?.totalResults / RECIPES_PER_PAGE));
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
  }, [query, categoriesValue, currentPage]);

  return (
    <section className={styles['home-basic-section']}>
      <div className={styles['search-block']}>
        <SearchInput value={value} onChange={setValue} onClick={handleClick} isLoading={isLoading} />
        <MultiDropdown
          options={options}
          value={categoriesValue}
          onChange={handleChangeCategory}
          getTitle={getTitle}
          className={styles.multidropdown}
        />
      </div>
      <CardList cardsData={recipesData} />
      <Pagination currentPage={currentPage} updateCurrentPage={setCurrentPage} total={total ?? 0} />
    </section>
  );
};
