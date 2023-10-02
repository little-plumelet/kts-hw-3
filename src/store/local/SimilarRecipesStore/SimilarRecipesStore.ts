import axios, { AxiosError } from 'axios';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { API_KEY, BASE_URL, SIMILAR_RECIPES_PER_PAGE } from '@configs/constants';
import { RecipeData } from '@customTypes/RecipeData';
import { ILocalStore } from '../LocalStoreInterface';
import MetaModelStore from '../MetaModelStore';

type PrivateFields = '_similarRecipesData' | '_setSimilarRecipesData' | '_meta' | '_error';

export default class SimilarRecipesStore implements ILocalStore {
  private _similarRecipesData: RecipeData[] = [];
  private _meta = new MetaModelStore();
  private _error: string | null = null;

  constructor() {
    makeObservable<SimilarRecipesStore, PrivateFields>(this, {
      _similarRecipesData: observable.ref,
      similarRecipesData: computed,
      _setSimilarRecipesData: action,
      _meta: observable,
      meta: computed,
      _error: observable,
      error: computed,
    });
  }

  private _setSimilarRecipesData(recipes: RecipeData[]) {
    this._similarRecipesData = recipes;
  }

  setError(error: string | null) {
    this._error = error;
  }

  get similarRecipesData(): RecipeData[] {
    return this._similarRecipesData;
  }

  get meta(): MetaModelStore {
    return this._meta;
  }

  get error(): string | null {
    return this._error;
  }

  async fetchRecipes(recipeId: string) {
    this._meta.setLoadingStart();
    try {
      const response = await axios.get(`${BASE_URL}/recipes/${recipeId}/similar`, {
        params: {
          apiKey: API_KEY,
          number: SIMILAR_RECIPES_PER_PAGE,
        },
      });
      runInAction(() => {
        this._setSimilarRecipesData(response?.data);
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

  destroy() {}
}
