import axios, { AxiosError } from 'axios';
import { IReactionDisposer, action, computed, makeObservable, observable, reaction } from 'mobx';
import { API_KEY, RECIPES_PER_PAGE, BASE_URL } from 'configs/constants';
import { ILocalStore } from 'store/LocalStoreInterface';
import rootStore from 'store/RootStore/instance';
import { MetaFetchModel } from 'store/models/MetaFetchModel';
import { PaginationModel } from 'store/models/PaginationModel';
import { RecipeData } from 'types/RecipeData';

type PrivateFields = '_recipesData' | '_pagination' | '_metaFetch' | '_setPagination';

export class SearchRecipesStore implements ILocalStore {
  private _recipesData: RecipeData[] = [];
  private _pagination: PaginationModel = {
    currentPage: rootStore.query.getParam('page'),
    total: rootStore.query.getParam('total'),
  };
  private _metaFetch: MetaFetchModel = { isLoading: false, error: null };

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
      query: computed,
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
    return String(rootStore.query.getParam('query') ?? '');
  }

  get type(): string {
    return String(rootStore.query.getParam('type') ?? '');
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
          offset: +(this._pagination.currentPage ?? 1) - 1,
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
