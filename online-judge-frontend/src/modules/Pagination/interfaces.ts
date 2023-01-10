import { AppError } from "../../AppError";

export interface OffsetPaginationMeta {
  offset: number;
  limit: number;
  total: number;
}

export interface OffsetPaginationResult<DataType> {
  data: DataType[];
  meta: OffsetPaginationMeta;
}

export type OffsetPaginationRequestHook<Entity, Filter, Order> = (
  numberOfEntitiesPerPage: number,
  page: number,
  filter?: Filter,
  order?: Order
) => {
  isLoading: boolean;
  result: OffsetPaginationResult<Entity> | undefined;
  error: AppError | undefined;
  requestFunction: () => Promise<void>;
};
