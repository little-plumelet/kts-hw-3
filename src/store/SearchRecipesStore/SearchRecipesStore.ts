import axios, { AxiosError } from 'axios';
import { IReactionDisposer, action, computed, makeObservable, observable, reaction } from 'mobx';
import {
  API_KEY,
  RECIPES_PER_PAGE,
  BASE_URL,
  L_KEY_PAGINATION_CURRENT,
  L_KEY_PAGINATION_TOTAL,
} from 'configs/constants';
import { ILocalStore } from 'store/LocalStoreInterface';
import rootStore from 'store/RootStore/instance';
import { MetaFetchModel } from 'store/models/MetaFetchModel';
import { PaginationModel } from 'store/models/PaginationModel';
import { RecipeData } from 'types/RecipeData';

type PrivateFields = '_recipesData' | '_pagination' | '_metaFetch' | '_setPagination' | '_query' | '_type';

export class SearchRecipesStore implements ILocalStore {
  private _recipesData: RecipeData[] = [];
  private _pagination: PaginationModel = {
    currentPage: localStorage.getItem(L_KEY_PAGINATION_CURRENT) ?? '1',
    total: localStorage.getItem(L_KEY_PAGINATION_TOTAL),
  };
  private _metaFetch: MetaFetchModel = { isLoading: false, error: null };

  private _query = rootStore.query.getParam('query');
  private _type = rootStore.query.getParam('type');

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
      _query: observable,
      query: computed,
      _type: observable,
      type: computed,
    });
  }

  setCurrentPage(currentPage: string) {
    this._setPagination({ total: this._pagination.total, currentPage });
  }

  setTotal(total: string) {
    this._setPagination({ total, currentPage: this._pagination.currentPage });
  }

  setRecipesData(recipesData: RecipeData[]) {
    this._recipesData = recipesData;
  }

  private _setPagination(pagination: PaginationModel) {
    localStorage.setItem(L_KEY_PAGINATION_CURRENT, String(pagination.currentPage));
    localStorage.setItem(L_KEY_PAGINATION_TOTAL, String(pagination.total));
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

  get query(): string {
    return String(this._query ?? '');
  }

  get type(): string {
    return String(this._type);
  }

  private readonly _qpQueryReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam('query'),
    () => {
      this.fetchRecipes();
    },
  );

  private readonly _qpTypeReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam('type'),
    () => {
      this.fetchRecipes();
    },
  );

  async fetchRecipes() {
    this.setMetaFetch({ error: null, isLoading: true } as MetaFetchModel);
    try {
      const response = await axios.get(`${BASE_URL}/recipes/complexSearch`, {
        params: {
          query: rootStore.query.getParam('query'),
          apiKey: API_KEY,
          number: RECIPES_PER_PAGE,
          addRecipeInformation: true,
          addRecipeNutrition: true,
          type: rootStore.query.getParam('type'),
          offset: +this._pagination.currentPage - 1,
        },
      });
      this.setRecipesData(response?.data?.results);
      this.setTotal(String(Math.ceil(response?.data?.totalResults / RECIPES_PER_PAGE)));
      this.setMetaFetch({ error: null, isLoading: false } as MetaFetchModel);
    } catch (error) {
      if (error instanceof AxiosError) {
        this.setMetaFetch({ isLoading: false, error: error.message } as MetaFetchModel);
      } else {
        this.setMetaFetch({ isLoading: false, error: 'Unknown error occurred' } as MetaFetchModel);
      }
    }
  }

  destroy() {
    this._qpQueryReaction();
    this._qpTypeReaction();
  }
}
