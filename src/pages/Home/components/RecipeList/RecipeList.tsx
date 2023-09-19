import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import { CardList } from 'components/CardList';
import { ErrorCp } from 'components/ErrorCp';
import MultiDropdown from 'components/MultiDropdown';
import Pagination from 'components/Pagination';
import { useLocalStore } from 'customHooks/useLocalStore';
import { SearchRecipesStore } from 'store/SearchRecipesStore';
import { MealMap } from 'types/MealMap';
import { Option } from 'types/MultiDropdownOption';
import { SearchInput } from '../SearchInput';
import styles from './styles.module.scss';

export const RecipeList: React.FC = observer(() => {
  const searchRecipesStore = useLocalStore(() => new SearchRecipesStore());
  const [, setSearchParams] = useSearchParams();

  const { meta, recipesData, pagination, setCurrentPage, query, type } = searchRecipesStore;
  const { currentPage = 1, total = 10 } = pagination;
  const { isLoading, error } = meta;

  const types = type.split(' ');

  const [value, setValue] = useState<string>(query);
  const options = Object.entries(MealMap).map(([key, value]) => ({ key, value }));
  const [categoriesValue, setCategoriesValue] = useState<Option[]>(() =>
    options.filter((option) => types.includes(option.value)),
  );

  function handleClick() {
    setSearchParams({ type: categoriesValue.map((el) => el.value).join(' '), query: value });
  }

  function getTitle(value: Option[]) {
    const result = value.map((el: Option) => el.value).join(', ');
    return result.length ? result : 'Choose categories';
  }

  function handleChangeCategory(categoriesValue: Option[]) {
    setCategoriesValue(categoriesValue);
    setSearchParams({ query: value, type: categoriesValue.map((el) => el.value).join(' ') });
  }

  function handleChangePagination(page: string) {
    setSearchParams({ query: value, type: categoriesValue.map((el) => el.value).join(' '), page });
    setCurrentPage(page);
  }

  React.useEffect(() => {
    searchRecipesStore.fetchRecipes();
  }, [categoriesValue, currentPage, searchRecipesStore]);

  if (error) {
    return <ErrorCp errorMessage={error} />;
  }

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
      <Pagination currentPage={Number(currentPage)} updateCurrentPage={handleChangePagination} total={Number(total)} />
    </section>
  );
});
