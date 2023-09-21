import axios, { AxiosError } from 'axios';
import { IReactionDisposer, action, computed, makeObservable, observable, reaction, runInAction } from 'mobx';
import { API_KEY, RECIPES_PER_PAGE, BASE_URL } from 'configs/constants';
import rootStore from 'store/global/RootStore/instance';
import { ILocalStore } from 'store/local/LocalStoreInterface';
import { MetaFetchModel } from 'store/models/MetaFetchModel';
import { PaginationModel } from 'store/models/PaginationModel';
import { MealMap } from 'types/MealMap';
import { Option } from 'types/MultiDropdownOption';
import { RecipeData } from 'types/RecipeData';

type PrivateFields =
  | '_recipesData'
  | '_pagination'
  | '_metaFetch'
  | '_setPagination'
  | '_inputValue'
  | '_categoriesValue'
  | '_categoriesOptions'
  | '_firstRenderTrigger'
  | '_reactionDisposers';

export class SearchRecipesStore implements ILocalStore {
  private _recipesData: RecipeData[] = observable.array([]);
  private _pagination: PaginationModel = {
    currentPage: rootStore.query.getParam('page'),
    total: rootStore.query.getParam('total'),
  };
  private _metaFetch: MetaFetchModel = { isLoading: false, error: null };
  private _inputValue: string = String(rootStore.query.getParam('query') ?? '');
  private _categoriesOptions: Option[] = Object.entries(MealMap).map(([key, value]) => ({ key, value }));
  private _categoriesValue: Option[] = this._categoriesOptions.filter((option) =>
    String(rootStore.query.getParam('type') ?? '')
      .split(' ')
      .includes(option.value),
  );
  private _firstRenderTrigger: boolean = true;
  private readonly _reactionDisposers: IReactionDisposer[] = [];

  constructor() {
    makeObservable<SearchRecipesStore, PrivateFields>(this, {
      _recipesData: observable.ref,
      recipesData: computed,
      setRecipesData: action,
      _pagination: observable,
      pagination: computed,
      _metaFetch: observable,
      meta: computed,
      fetchRecipes: action,
      setMetaFetch: action.bound,
      _setPagination: action,
      setCurrentPage: action.bound,
      setTotal: action.bound,
      query: computed,
      _inputValue: observable,
      inputValue: computed,
      setInputValue: action.bound,
      _categoriesValue: observable,
      categoriesValue: computed,
      setCategoriesValue: action.bound,
      _categoriesOptions: observable,
      categoriesOptions: computed,
      _firstRenderTrigger: observable,
      setFirstRenderTrigger: action,
      _reactionDisposers: observable,
    });

    this._reactionDisposers.push(
      reaction(
        () => rootStore.query.getParam('query'),
        () => {
          this.fetchRecipes();
        },
      ),

      reaction(
        () => rootStore.query.getParam('type'),
        () => {
          this.fetchRecipes();
        },
      ),

      reaction(
        () => rootStore.query.getParam('page'),
        () => {
          this.fetchRecipes();
        },
      ),

      reaction(
        () => {
          return this._firstRenderTrigger;
        },
        () => {
          if (this._firstRenderTrigger) {
            this.fetchRecipes();
            this.setFirstRenderTrigger(false);
          }
        },
        { fireImmediately: true },
      ),
    );
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

  setInputValue(value: string) {
    this._inputValue = value;
  }

  setCategoriesValue(values: Option[]) {
    this._categoriesValue = values;
  }

  setFirstRenderTrigger(value: boolean) {
    this._firstRenderTrigger = value;
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

  get inputValue(): string {
    return this._inputValue;
  }

  get categoriesValue(): Option[] {
    return this._categoriesValue;
  }

  get categoriesOptions(): Option[] {
    return this._categoriesOptions;
  }

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
          offset: (Number(rootStore.query.getParam('page') ?? 1) - 1) * RECIPES_PER_PAGE,
        },
      });
      runInAction(() => {
        this.setRecipesData(response?.data?.results);
        this.setTotal(String(Math.ceil(response?.data?.totalResults / RECIPES_PER_PAGE)));
        this.setMetaFetch({ error: null, isLoading: false } as MetaFetchModel);
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        this.setMetaFetch({ isLoading: false, error: error.message } as MetaFetchModel);
      } else {
        this.setMetaFetch({ isLoading: false, error: 'Unknown error occurred' } as MetaFetchModel);
      }
    }
  }

  destroy() {
    this._reactionDisposers.forEach((reactionDisposer) => reactionDisposer());
  }
}
