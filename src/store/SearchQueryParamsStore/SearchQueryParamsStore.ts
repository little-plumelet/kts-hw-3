import { action, computed, makeObservable, observable } from 'mobx';
import { Option } from 'types/MultiDropdownOption';

type PrivateFields = '_search' | '_categoriesValue';
export default class SearchQueryParamsStore {
  private _search: string = '';
  private _categoriesValue: Option[] = [];

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
    this._search = search;
  }

  setCategoriesValue(categoriesValue: Option[]) {
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
