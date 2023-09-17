import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import * as React from 'react';
import { CardList } from 'components/CardList';
import { ErrorCp } from 'components/ErrorCp';
import MultiDropdown from 'components/MultiDropdown';
import Pagination from 'components/Pagination';
import searchRecipeStore from 'store/SearchRecipesStore';
import { MealMap } from 'types/MealMap';
import { Option } from 'types/MultiDropdownOption';
import { SearchInput } from '../SearchInput';
import styles from './styles.module.scss';

export const RecipeList: React.FC = observer(() => {
  console.log('RecipeList is rendered', searchRecipeStore.recipesData);
  const [value, setValue] = useState('');
  const options = Object.entries(MealMap).map(([key, value]) => ({ key, value }));
  const { categoriesValue, meta, recipesData, pagination, query, setCategoriesValue, setQuery, setCurrentPage } =
    searchRecipeStore;
  const { currentPage, total } = pagination;
  const { isLoading, error } = meta;

  function handleClick() {
    console.log('searchValue =', value);
    setQuery(value);
  }

  function getTitle(value: Option[]) {
    const result = value.map((el: Option) => el.value).join(', ');
    return result.length ? result : 'Choose categories';
  }

  function handleChangeCategory(value: Option[]) {
    console.log('values in ON CHANGE = ', value);
    setCategoriesValue(value);
  }

  React.useEffect(() => {
    searchRecipeStore.fetchRecipes();
  }, [query, categoriesValue, currentPage]);

  if (error) {
    return <ErrorCp errorMessage={error} />;
  }

  console.log('categoriesValye = ', categoriesValue);
  console.log('recipesData = ', recipesData);
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
});
