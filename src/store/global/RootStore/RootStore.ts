import QueryParamsStore from 'store/global/QueryParamsStore';

export default class RootStore {
  readonly query = new QueryParamsStore();
}
