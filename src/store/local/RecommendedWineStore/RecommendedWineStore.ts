import axios, { AxiosError } from 'axios';
import { action, computed, makeObservable, observable } from 'mobx';
import { API_KEY, BASE_URL } from '@configs/constants';
import { RecommendedWineData } from '@customTypes/RecommendedWineData';
import { ILocalStore } from '../LocalStoreInterface';
import MetaModelStore from '../MetaModelStore';

type PrivateFields = '_recommendedWineData' | '_meta' | '_error';
export default class RecommendedWineStore implements ILocalStore {
  private _recommendedWineData: RecommendedWineData[] = [];
  private _meta = new MetaModelStore();
  private _error = '';

  constructor() {
    makeObservable<RecommendedWineStore, PrivateFields>(this, {
      _recommendedWineData: observable.ref,
      recommendedWineData: computed,
      setRecommendedWineData: action,
      _meta: observable,
      meta: computed,
      _error: observable,
      setError: action,
      error: computed,
    });
  }
  setRecommendedWineData(data: RecommendedWineData[]) {
    this._recommendedWineData = data;
  }

  setError(error: string) {
    this._error = error;
  }

  get recommendedWineData(): RecommendedWineData[] {
    return this._recommendedWineData;
  }

  get meta(): MetaModelStore {
    return this._meta;
  }

  get error(): string {
    return this._error;
  }

  async fetchRecommendedWineData(query: string) {
    this._meta.setLoadingStart();
    try {
      const response = await axios.get(`${BASE_URL}/food/wine/recommendation`, {
        params: {
          apiKey: API_KEY,
          number: 4,
          wine: query,
        },
      });
      this.setRecommendedWineData(response?.data?.recommendedWines);
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
    this._meta.destroy();
  }
}
