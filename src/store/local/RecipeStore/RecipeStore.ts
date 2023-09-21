import axios, { AxiosError } from 'axios';
import { IReactionDisposer, action, computed, makeObservable, observable, reaction } from 'mobx';
import { API_KEY, BASE_URL } from 'configs/constants';
import MetaModelStore, { LoadingState } from 'store/local/MetaModelStore';
import { RecipeData } from 'types/RecipeData';
import { ILocalStore } from '../LocalStoreInterface';

type PrivateFields = '_recipeData' | '_meta' | '_error' | '_loading' | '_reactionDisposers';

export default class RecipeStore implements ILocalStore {
  private _recipeData: RecipeData | null = null;
  private _meta: MetaModelStore = new MetaModelStore();
  private _error: string | null = null;
  private _loading: boolean = false;
  private readonly _reactionDisposers: IReactionDisposer[] = [];

  constructor() {
    makeObservable<RecipeStore, PrivateFields>(this, {
      _recipeData: observable,
      recipeData: computed,
      _meta: observable,
      meta: computed,
      setRecipeData: action,
      fetchRecipeData: action,
      _error: observable,
      error: computed,
      setError: action,
      _loading: observable,
      loading: computed,
      setLoading: action,
      _reactionDisposers: observable,
    });

    this._reactionDisposers.push(
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

  setRecipeData(recipeData: RecipeData) {
    this._recipeData = recipeData;
  }

  setError(error: string | null) {
    this._error = error;
  }

  setLoading(loading: boolean) {
    this._loading = loading;
  }

  get recipeData(): RecipeData | null {
    return this._recipeData;
  }

  get meta(): MetaModelStore {
    return this._meta;
  }

  get error(): string | null {
    return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }

  async fetchRecipeData(recipeId: string) {
    this._meta.setLoadingStart();
    try {
      const response = await axios.get(`${BASE_URL}/recipes/${recipeId}/information`, {
        params: {
          apiKey: API_KEY,
          includeNutrition: true,
        },
      });
      this.setRecipeData(response?.data);
      this._meta.setLoadingSuccess();
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
  }
}
