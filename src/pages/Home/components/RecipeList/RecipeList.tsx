import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import { CardList } from '@components/CardList';
import { ErrorCp } from '@components/ErrorCp';
import Loader from '@components/Loader';
import MultiDropdown from '@components/MultiDropdown';
import Pagination from '@components/Pagination';
import { useLocalStore } from '@customHooks/useLocalStore';
import { Option } from '@customTypes/MultiDropdownOption';
import { SizeType } from '@customTypes/common';
import { SearchRecipesStore } from '@store/local/SearchRecipesStore';
import { SearchInput } from '../SearchInput';
import styles from './styles.module.scss';

export const RecipeList: React.FC = observer(() => {
  const searchRecipesStore = useLocalStore(() => new SearchRecipesStore());
  const [, setSearchParams] = useSearchParams();

  const {
    recipesData,
    pagination,
    setCurrentPage,
    inputValue,
    categoriesValue,
    setInputValue,
    setCategoriesValue,
    categoriesOptions,
    error,
    loading,
  } = searchRecipesStore;
  const { currentPage = 1, total = 10 } = pagination;

  function handleClick() {
    setSearchParams({
      type: categoriesValue.map((el) => el.value).join(' '),
      query: inputValue,
      page: String(currentPage),
    });
  }

  function getTitle(value: Option[]) {
    const result = value.map((el: Option) => el.value).join(', ');
    return result.length ? result : 'Choose categories';
  }

  function handleChangeCategory(categoriesValue: Option[]) {
    runInAction(() => {
      setCategoriesValue(categoriesValue);
      setSearchParams({
        query: inputValue,
        type: categoriesValue.map((el) => el.value).join(' '),
        page: String(currentPage),
      });
    });
  }

  function handleChangePagination(page: string) {
    runInAction(() => {
      setSearchParams({ query: inputValue, type: categoriesValue.map((el) => el.value).join(' '), page });
      setCurrentPage(page);
    });
  }

  if (loading) {
    return <Loader size={SizeType.l} />;
  }

  if (error) {
    return <ErrorCp errorMessage={error} />;
  }

  return (
    <section className={styles['home-basic-section']}>
      <div className={styles['search-block']}>
        <SearchInput value={inputValue} onChange={setInputValue} onClick={handleClick} isLoading={loading} />
        <MultiDropdown
          options={categoriesOptions}
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
