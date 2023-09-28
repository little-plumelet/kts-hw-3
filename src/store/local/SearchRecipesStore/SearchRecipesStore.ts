import axios, { AxiosError } from 'axios';
import { IReactionDisposer, action, computed, makeObservable, observable, reaction, runInAction } from 'mobx';
import { API_KEY, RECIPES_PER_PAGE, BASE_URL } from '@configs/constants';
import { MealMap } from '@customTypes/MealMap';
import { Option } from '@customTypes/MultiDropdownOption';
import { RecipeData } from '@customTypes/RecipeData';
import rootStore from '@store/global/RootStore/instance';
import { ILocalStore } from '@store/local/LocalStoreInterface';
import MetaModelStore, { LoadingState } from '@store/local/MetaModelStore';
import { PaginationModel } from '@store/models/PaginationModel';

type PrivateFields =
  | '_recipesData'
  | '_pagination'
  | '_meta'
  | '_setPagination'
  | '_inputValue'
  | '_categoriesValue'
  | '_categoriesOptions'
  | '_firstRenderTrigger'
  | '_reactionDisposers'
  | '_error'
  | '_loading';

export class SearchRecipesStore implements ILocalStore {
  private _recipesData: RecipeData[] = [];
  private _pagination: PaginationModel = {
    currentPage: rootStore.query.getParam('page'),
    total: rootStore.query.getParam('total'),
  };
  private _meta = new MetaModelStore();
  private _inputValue: string = String(rootStore.query.getParam('query') ?? '');
  private _categoriesOptions: Option[] = Object.entries(MealMap).map(([key, value]) => ({ key, value }));
  private _categoriesValue: Option[] = this._categoriesOptions.filter((option) =>
    String(rootStore.query.getParam('type') ?? '')
      .split(' ')
      .includes(option.value),
  );
  private _firstRenderTrigger: boolean = true;
  private readonly _reactionDisposers: IReactionDisposer[] = [];
  private _error: string | null = null;
  private _loading: boolean = false;

  constructor() {
    makeObservable<SearchRecipesStore, PrivateFields>(this, {
      _recipesData: observable.ref,
      recipesData: computed,
      setRecipesData: action,
      _pagination: observable,
      pagination: computed,
      _meta: observable,
      meta: computed,
      fetchRecipes: action,
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
      _error: observable,
      error: computed,
      setError: action,
      _loading: observable,
      loading: computed,
      setLoading: action,
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

      reaction(
        () => {
          return this._meta.state;
        },
        () => {
          if (this._meta.state === LoadingState.loading) {
            this.setLoading(true);
          } else {
            this.setLoading(false);
          }
        },
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
    this._recipesData = [...recipesData];
  }

  private _setPagination(pagination: PaginationModel) {
    this._pagination = pagination;
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

  setError(error: string) {
    this._error = error;
  }

  setLoading(loading: boolean) {
    this._loading = loading;
  }

  get recipesData(): RecipeData[] {
    return this._recipesData;
  }

  get meta(): MetaModelStore {
    return this._meta;
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

  get error(): string | null {
    return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }

  async fetchRecipes() {
    this._meta.setLoadingStart();
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
        this._meta.setLoadingSuccess();
      });
    } catch (error) {
      this._meta.setLoadingError();
      if (error instanceof AxiosError) {
        this.setError(error.message);
      } else {
        this.setError('Unknown error occurred');
      }
    }
  }

  destroy() {
    this._reactionDisposers.forEach((reactionDisposer) => reactionDisposer());
    this._meta.destroy();
  }
}
