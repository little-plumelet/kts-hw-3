import axios, { AxiosError } from 'axios';
import { IReactionDisposer, action, computed, makeObservable, observable, reaction } from 'mobx';
import { API_KEY, RECIPES_PER_PAGE, BASE_URL } from 'configs/constants';
import SearchQueryParamsStore from 'store/SearchQueryParamsStore';
import { MetaFetchModel } from 'store/models/MetaFetchModel';
import { PaginationModel } from 'store/models/PaginationModel';
import { RecipeData } from 'types/RecipeData';

type PrivateFields = '_recipesData' | '_pagination' | '_metaFetch' | '_setPagination';

class SearchRecipesStore {
  private _recipesData: RecipeData[] = [];
  private _pagination: PaginationModel = { currentPage: 1, total: null };
  private _metaFetch: MetaFetchModel = { isLoading: false, error: null };
  searchQueryParamsStore = new SearchQueryParamsStore();

  constructor() {
    makeObservable<SearchRecipesStore, PrivateFields>(this, {
      _recipesData: observable.ref,
      recipesData: computed,
      _pagination: observable,
      pagination: computed,
      _metaFetch: observable,
      meta: computed,
      fetchRecipes: action,
      setMetaFetch: action.bound,
      _setPagination: action,
      setCurrentPage: action.bound,
      setTotal: action.bound,
      setRecipesData: action,
      searchQueryParamsStore: observable,
    });
  }

  setCurrentPage(currentPage: number) {
    this._setPagination({ total: this._pagination.total, currentPage });
  }

  setTotal(total: number) {
    this._setPagination({ total, currentPage: this._pagination.currentPage });
  }

  setRecipesData(recipesData: RecipeData[]) {
    this._recipesData = recipesData;
  }

  private _setPagination(pagination: PaginationModel) {
    this._pagination = pagination;
  }

  setMetaFetch({ isLoading, error }: MetaFetchModel) {
    this._metaFetch = { isLoading, error };
  }

  get recipesData(): RecipeData[] {
    return this._recipesData;
  }

  get meta(): MetaFetchModel {
    return this._metaFetch;
  }

  get pagination(): PaginationModel {
    return this._pagination;
  }

  private readonly _searchReactionDisposer: IReactionDisposer = reaction(
    () => this.searchQueryParamsStore.search,
    () => {
      this.fetchRecipes();
    },
  );

  private readonly _categoriesValueReactionDisposer: IReactionDisposer = reaction(
    () => this.searchQueryParamsStore.categoriesValue,
    () => {
      this.fetchRecipes();
    },
  );

  async fetchRecipes() {
    this.setMetaFetch({ error: null, isLoading: true } as MetaFetchModel);
    try {
      const response = await axios.get(`${BASE_URL}/recipes/complexSearch`, {
        params: {
          query: this.searchQueryParamsStore.search,
          apiKey: API_KEY,
          number: RECIPES_PER_PAGE,
          addRecipeInformation: true,
          addRecipeNutrition: true,
          type: this.getTitle(),
          offset: this._pagination.currentPage - 1,
        },
      });
      this.setRecipesData(response?.data?.results);
      this.setTotal(Math.ceil(response?.data?.totalResults / RECIPES_PER_PAGE));
      this.setMetaFetch({ error: null, isLoading: false } as MetaFetchModel);
    } catch (error) {
      if (error instanceof AxiosError) {
        this.setMetaFetch({ isLoading: false, error: error.message } as MetaFetchModel);
      } else {
        this.setMetaFetch({ isLoading: false, error: 'Unknown error occurred' } as MetaFetchModel);
      }
    }
  }

  getTitle() {
    if (this.searchQueryParamsStore.categoriesValue && this.searchQueryParamsStore.categoriesValue.length > 0) {
      return this.searchQueryParamsStore.categoriesValue.map((el) => el.value).join(', ');
    }
    return 'Choose categories';
  }

  destroy() {
    this.searchQueryParamsStore.destroy();
    this._searchReactionDisposer();
    this._categoriesValueReactionDisposer();
  }
}

const searchRecipeStore = new SearchRecipesStore();

export default searchRecipeStore;
