import { stringify } from "qs";
import { OffsetPaginationMeta } from "./interfaces";

export function getNumberOfPages(meta: OffsetPaginationMeta) {
  const { limit, total } = meta;
  return Math.ceil(total / limit);
}

export function constructPaginationQueryString(
  numberOfEntitiesPerPage: number,
  page: number,
  filter?: Object,
  order?: Object
): string {
  const offset = (page - 1) * numberOfEntitiesPerPage;
  const limit = numberOfEntitiesPerPage;

  return stringify(
    { offset, limit, ...filter, order },
    { addQueryPrefix: true }
  );
}
