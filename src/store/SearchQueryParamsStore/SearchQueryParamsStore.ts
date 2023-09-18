import { action, computed, makeObservable, observable } from 'mobx';
import { L_KEY_CATEGORIES, L_KEY_SEARCH } from 'configs/constants';
import { Option } from 'types/MultiDropdownOption';

type PrivateFields = '_search' | '_categoriesValue';

export default class SearchQueryParamsStore {
  private _search: string = localStorage.getItem(L_KEY_SEARCH) ?? '';
  private _categoriesValue: Option[] = JSON.parse(localStorage.getItem(L_KEY_CATEGORIES) ?? '[]');

  constructor() {
    makeObservable<SearchQueryParamsStore, PrivateFields>(this, {
      _search: observable,
      search: computed,
      setSearch: action.bound,
      _categoriesValue: observable,
      categoriesValue: computed,
      setCategoriesValue: action.bound,
    });
  }

  setSearch(search: string) {
    localStorage.setItem(L_KEY_SEARCH, search);
    this._search = search;
  }

  setCategoriesValue(categoriesValue: Option[]) {
    localStorage.setItem(L_KEY_CATEGORIES, JSON.stringify(categoriesValue));
    this._categoriesValue = categoriesValue;
  }

  get search(): string {
    return this._search;
  }

  get categoriesValue(): Option[] {
    return this._categoriesValue;
  }

  destroy() {}
}
