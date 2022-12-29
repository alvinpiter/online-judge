export interface OffsetPaginationParameter {
  offset: number;
  limit: number;
}

export interface OffsetPaginationMeta extends OffsetPaginationParameter {
  total: number;
}

export type OffsetPaginationResult<DataType> = {
  result: DataType[];
  meta: OffsetPaginationMeta;
};

export interface OffsetPaginationQueryBuilder<DataType> {
  offset: (offset: number) => void;
  limit: (limit: number) => void;
  getDataAndTotalCount: () => Promise<[DataType[], number]>;
}
