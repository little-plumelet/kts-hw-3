import { QueryParamType } from '@store/global/QueryParamsStore';

export type PaginationModel = {
  currentPage: QueryParamType;
  total: QueryParamType;
};
