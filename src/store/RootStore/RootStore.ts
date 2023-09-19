import QueryParamsStore from 'store/QueryParamsStore';

export default class RootStore {
  readonly query = new QueryParamsStore();
}
