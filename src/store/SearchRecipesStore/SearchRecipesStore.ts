import axios, { AxiosError } from 'axios';
import { action, computed, makeObservable, observable } from 'mobx';
import { API_KEY, RECIPES_PER_PAGE, BASE_URL } from 'configs/constants';
import { MetaFetchModel } from 'store/models/MetaFetchModel';
import { PaginationModel } from 'store/models/PaginationModel';
import { Option } from 'types/MultiDropdownOption';
import { RecipeData } from 'types/RecipeData';

type PrivateFields = '_recipesData' | '_pagination' | '_metaFetch' | '_query' | '_categoriesValue' | '_setPagination';

class SearchRecipesStore {
  private _recipesData: RecipeData[] = [];
  private _pagination: PaginationModel = { currentPage: 1, total: null };
  private _metaFetch: MetaFetchModel = { isLoading: false, error: null };
  private _query: string = '';
  private _categoriesValue: Option[] = [];

  constructor() {
    makeObservable<SearchRecipesStore, PrivateFields>(this, {
      _recipesData: observable.ref,
      recipesData: computed,
      _pagination: observable,
      pagination: computed,
      _metaFetch: observable,
      meta: computed,
      _query: observable,
      query: computed,
      _categoriesValue: observable,
      categoriesValue: computed,
      fetchRecipes: action,
      setCategoriesValue: action.bound,
      setMetaFetch: action.bound,
      _setPagination: action,
      setCurrentPage: action.bound,
      setTotal: action.bound,
      setQuery: action.bound,
      setRecipesData: action,
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

  setQuery(query: string) {
    return (this._query = query);
  }

  setCategoriesValue(categoriesValue: Option[]) {
    this._categoriesValue = categoriesValue;
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

  get query(): string {
    return this._query;
  }

  get categoriesValue(): Option[] {
    return this._categoriesValue;
  }

  async fetchRecipes() {
    try {
      this.setMetaFetch({ error: null, isLoading: true } as MetaFetchModel);
      const response = await axios.get(`${BASE_URL}/recipes/complexSearch`, {
        params: {
          query: this.query,
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
    if (this._categoriesValue && this._categoriesValue.length > 0) {
      return this._categoriesValue.map((el) => el.value).join(', ');
    }
    return 'Choose categories';
  }

  destroy() {}
}

const searchRecipeStore = new SearchRecipesStore();

export default searchRecipeStore;
