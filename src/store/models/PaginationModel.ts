import { QueryParamType } from 'store/QueryParamsStore';

export type PaginationModel = {
  currentPage: QueryParamType;
  total: QueryParamType;
};
