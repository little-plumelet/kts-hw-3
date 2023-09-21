import axios, { AxiosError } from 'axios';
import { action, computed, makeObservable, observable } from 'mobx';
import { API_KEY, BASE_URL } from 'configs/constants';
import { MetaFetchModel } from 'store/models/MetaFetchModel';
import { RecipeData } from 'types/RecipeData';
import { ILocalStore } from '../LocalStoreInterface';

type PrivateFields = '_recipeData' | '_metaFetch';

export default class RecipeStore implements ILocalStore {
  private _recipeData: RecipeData | null = null;
  private _metaFetch: MetaFetchModel = { isLoading: false, error: null };

  constructor() {
    makeObservable<RecipeStore, PrivateFields>(this, {
      _recipeData: observable,
      recipeData: computed,
      _metaFetch: observable,
      meta: computed,
      setRecipeData: action,
      setMetaFetch: action,
      fetchRecipeData: action,
    });
  }

  setRecipeData(recipeData: RecipeData) {
    this._recipeData = recipeData;
  }

  setMetaFetch({ isLoading, error }: MetaFetchModel) {
    this._metaFetch = { isLoading, error };
  }

  get recipeData(): RecipeData | null {
    return this._recipeData;
  }

  get meta(): MetaFetchModel {
    return this._metaFetch;
  }

  async fetchRecipeData(recipeId: string) {
    this.setMetaFetch({ error: null, isLoading: true } as MetaFetchModel);
    try {
      const response = await axios.get(`${BASE_URL}/recipes/${recipeId}/information`, {
        params: {
          apiKey: API_KEY,
          includeNutrition: true,
        },
      });
      this.setRecipeData(response?.data);
      this.setMetaFetch({ error: null, isLoading: false } as MetaFetchModel);
    } catch (error) {
      if (error instanceof AxiosError) {
        this.setMetaFetch({ isLoading: false, error: error.message } as MetaFetchModel);
      } else {
        this.setMetaFetch({ isLoading: false, error: 'Unknown error occurred' } as MetaFetchModel);
      }
    }
  }

  destroy() {}
}
