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
  const [value, setValue] = useState('');
  const options = Object.entries(MealMap).map(([key, value]) => ({ key, value }));
  const { meta, recipesData, pagination, setCurrentPage, searchQueryParamsStore } = searchRecipeStore;
  const { categoriesValue } = searchQueryParamsStore;
  const { currentPage, total } = pagination;
  const { isLoading, error } = meta;

  function handleClick() {
    searchQueryParamsStore.setSearch(value);
  }

  function getTitle(value: Option[]) {
    const result = value.map((el: Option) => el.value).join(', ');
    return result.length ? result : 'Choose categories';
  }

  function handleChangeCategory(value: Option[]) {
    searchQueryParamsStore.setCategoriesValue(value);
  }

  React.useEffect(() => {
    searchRecipeStore.fetchRecipes();
  }, [categoriesValue, currentPage]);

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
      <Pagination currentPage={currentPage} updateCurrentPage={setCurrentPage} total={total ?? 0} />
    </section>
  );
});
