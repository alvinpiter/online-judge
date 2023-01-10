export interface OffsetPaginationMeta {
  offset: number;
  limit: number;
  total: number;
}

export interface OffsetPaginationResult<DataType> {
  data: DataType[];
  meta: OffsetPaginationMeta;
}
