import { action, computed, makeObservable, observable } from 'mobx';
import { ILocalStore } from '@store/local/LocalStoreInterface';

export enum LoadingState {
  notStarted = 'notStarted',
  error = 'error',
  success = 'success',
  loading = 'loading',
}

type PrivateFields = '_state';

export default class MetaModelStore implements ILocalStore {
  private _state: LoadingState = LoadingState.notStarted;

  constructor() {
    makeObservable<MetaModelStore, PrivateFields>(this, {
      _state: observable,
      state: computed,
      setLoadingSuccess: action,
      setLoadingError: action,
      setLoadingStart: action,
    });
  }

  setLoadingSuccess() {
    this._state = LoadingState.success;
  }

  setLoadingError() {
    this._state = LoadingState.error;
  }

  setLoadingStart() {
    this._state = LoadingState.loading;
  }

  get state(): LoadingState {
    return this._state;
  }

  destroy() {}
}
